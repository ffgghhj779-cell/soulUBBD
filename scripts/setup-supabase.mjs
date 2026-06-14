/**
 * Soul Gold — One-command Supabase setup
 *
 * Runs SQL migrations, uploads all assets to Storage, and seeds product rows.
 *
 * Required in .env.local (Settings → API):
 *   NEXT_PUBLIC_SUPABASE_URL
 *   NEXT_PUBLIC_SUPABASE_ANON_KEY
 *   SUPABASE_SERVICE_ROLE_KEY
 *
 * Also required for automatic SQL (Settings → Database → Database password):
 *   SUPABASE_DB_PASSWORD="your-password"   ← use quotes if password contains & or @
 *   — or paste the full URI as DATABASE_URL (Connection string → URI)
 *
 * Usage:
 *   npm run setup:supabase
 */

import { createClient } from '@supabase/supabase-js';
import pg from 'pg';
import { readFileSync, existsSync, readdirSync } from 'fs';
import { join, dirname, extname } from 'path';
import { fileURLToPath } from 'url';

const { Client } = pg;

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
const ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim();
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim();
const DB_PASSWORD = process.env.SUPABASE_DB_PASSWORD?.trim();
const DATABASE_URL = process.env.DATABASE_URL?.trim();
const ACCESS_TOKEN = process.env.SUPABASE_ACCESS_TOKEN?.trim();

const PRODUCT_BUCKET = 'product-images';
const BRAND_BUCKET = 'brand-assets';

const MIME = {
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.mp4': 'video/mp4',
  '.webm': 'video/webm',
};

function log(step, message) {
  console.log(`\n[${step}] ${message}`);
}

function fail(message) {
  console.error(`\n❌ ${message}\n`);
  process.exit(1);
}

function getProjectRef(url) {
  const match = url?.match(/https:\/\/([^.]+)\.supabase\.co/);
  return match?.[1] ?? null;
}

/**
 * Build pg client config. Prefer explicit host/user/password so special
 * characters (&, @, #, etc.) never pass through a connection URI.
 */
function buildPgClientConfig() {
  const ssl = { rejectUnauthorized: false };
  const ref = getProjectRef(SUPABASE_URL);

  if (DB_PASSWORD && ref) {
    return {
      host: `db.${ref}.supabase.co`,
      port: 5432,
      database: 'postgres',
      user: 'postgres',
      password: DB_PASSWORD,
      ssl,
    };
  }

  if (DATABASE_URL) {
    return {
      connectionString: encodeDatabaseUrlPassword(DATABASE_URL),
      ssl,
    };
  }

  return null;
}

/** Re-encode the password segment of a postgres URI (handles @ inside password). */
function encodeDatabaseUrlPassword(url) {
  const match = url.match(/^(postgresql?:\/\/)/i);
  if (!match) return url;

  const rest = url.slice(match[0].length);
  const atIndex = rest.lastIndexOf('@');
  if (atIndex === -1) return url;

  const credentials = rest.slice(0, atIndex);
  const hostPart = rest.slice(atIndex + 1);
  const colonIndex = credentials.indexOf(':');
  if (colonIndex === -1) return url;

  const user = credentials.slice(0, colonIndex);
  const rawPassword = credentials.slice(colonIndex + 1);

  let decodedPassword = rawPassword;
  try {
    decodedPassword = decodeURIComponent(rawPassword);
  } catch {
    // Password was not percent-encoded — use as-is
  }

  const encodedPassword = encodeURIComponent(decodedPassword);
  return `${match[0]}${user}:${encodedPassword}@${hostPart}`;
}

async function runSqlViaPg(sql) {
  const config = buildPgClientConfig();
  if (!config) return false;

  const client = new Client(config);

  await client.connect();
  try {
    await client.query(sql);
    return true;
  } finally {
    await client.end();
  }
}

async function runSqlViaManagementApi(sql, projectRef) {
  if (!ACCESS_TOKEN || !projectRef) return false;

  const res = await fetch(
    `https://api.supabase.com/v1/projects/${projectRef}/database/query`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query: sql }),
    }
  );

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Management API SQL failed (${res.status}): ${body}`);
  }

  return true;
}

async function tableExists(supabase, table) {
  const { error } = await supabase.from(table).select('*').limit(1);
  if (!error) return true;
  if (error.code === 'PGRST205' || error.message?.includes('does not exist')) {
    return false;
  }
  return false;
}

/** True when products table has the v2 schema (sku, category_en columns). */
async function isProductsSchemaV2(supabase) {
  const { error } = await supabase.from('products').select('sku, category_en').limit(1);
  if (!error) return true;
  if (
    error.message?.includes('category_en') ||
    error.message?.includes('sku') ||
    error.message?.includes('schema cache')
  ) {
    return false;
  }
  if (error.code === 'PGRST205' || error.message?.includes('does not exist')) {
    return false;
  }
  return false;
}

async function runMigrations(supabase) {
  const sqlPath = join(ROOT, 'supabase/setup-all.sql');
  if (!existsSync(sqlPath)) {
    fail(`Migration file not found: ${sqlPath}`);
  }

  const sql = readFileSync(sqlPath, 'utf8');
  const projectRef = getProjectRef(SUPABASE_URL);

  log('1/3', 'Running SQL migrations…');

  const productsV2 = await isProductsSchemaV2(supabase);
  const ordersExist = await tableExists(supabase, 'orders');

  if (productsV2 && ordersExist) {
    console.log('  ✓ Schema v2 already present — re-applying idempotent SQL…');
  } else if (!productsV2) {
    console.log('  → Upgrading products table to v2 schema…');
  }

  let ran = false;

  try {
    ran = await runSqlViaPg(sql);
    if (ran) {
      console.log('  ✓ SQL executed via direct database connection');
    }
  } catch (err) {
    console.warn(`  ⚠ Direct DB connection failed: ${err.message}`);
  }

  if (!ran && ACCESS_TOKEN) {
    try {
      ran = await runSqlViaManagementApi(sql, projectRef);
      if (ran) console.log('  ✓ SQL executed via Supabase Management API');
    } catch (err) {
      console.warn(`  ⚠ Management API failed: ${err.message}`);
    }
  }

  if (!ran) {
    const productsNow = await isProductsSchemaV2(supabase);
    const ordersNow = await tableExists(supabase, 'orders');

    if (!productsNow || !ordersNow) {
      fail(
        'Could not create database tables automatically.\n' +
          'Add your database password to .env.local (wrap in quotes if it contains & or @):\n' +
          '  SUPABASE_DB_PASSWORD="your-password"   (Settings → Database → Database password)\n' +
          '  — or paste the full connection URI as DATABASE_URL\n' +
          'Optional alternative: SUPABASE_ACCESS_TOKEN from supabase.com/dashboard/account/tokens'
      );
    }

    console.log('  ✓ Tables exist — continuing without SQL migration');
  }
}

async function ensureBuckets(supabase) {
  for (const bucket of [PRODUCT_BUCKET, BRAND_BUCKET]) {
    const { data: existing } = await supabase.storage.getBucket(bucket);
    if (existing) {
      console.log(`  ✓ Bucket "${bucket}" ready`);
      continue;
    }

    const { error } = await supabase.storage.createBucket(bucket, {
      public: true,
    });

    if (error && !error.message?.includes('already exists')) {
      console.warn(`  ⚠ Bucket "${bucket}": ${error.message}`);
    } else {
      console.log(`  ✓ Bucket "${bucket}" created`);
    }
  }
}

function contentType(filename) {
  return MIME[extname(filename).toLowerCase()] ?? 'application/octet-stream';
}

async function uploadFile(supabase, bucket, storagePath, localPath) {
  const buffer = readFileSync(localPath);
  const { error } = await supabase.storage.from(bucket).upload(storagePath, buffer, {
    contentType: contentType(localPath),
    upsert: true,
  });

  if (error) {
    throw new Error(`${storagePath}: ${error.message}`);
  }

  const { data } = supabase.storage.from(bucket).getPublicUrl(storagePath);
  return data.publicUrl;
}

async function uploadAssets(supabase) {
  log('2/3', 'Uploading assets to Supabase Storage…');
  await ensureBuckets(supabase);

  const uploaded = new Map();

  const productsDir = join(ROOT, 'public/products');
  if (existsSync(productsDir)) {
    const files = readdirSync(productsDir).filter((f) =>
      /\.(jpe?g|png|webp)$/i.test(f)
    );

    for (const filename of files) {
      const localPath = join(productsDir, filename);
      process.stdout.write(`  ↑ product-images/catalog/${filename}… `);
      try {
        const url = await uploadFile(
          supabase,
          PRODUCT_BUCKET,
          `catalog/${filename}`,
          localPath
        );
        uploaded.set(filename, url);
        console.log('done');
      } catch (err) {
        console.log(`failed (${err.message})`);
      }
    }
  }

  const brandFiles = [
    { file: 'soul-gold-logo.png', path: 'brand/soul-gold-logo.png' },
    { file: 'soul-gold-film.mp4', path: 'brand/soul-gold-film.mp4' },
  ];

  for (const { file, path } of brandFiles) {
    const localPath = join(ROOT, 'public/brand', file);
    if (!existsSync(localPath)) {
      console.warn(`  ⚠ Brand asset missing locally: ${file}`);
      continue;
    }

    process.stdout.write(`  ↑ brand-assets/${path}… `);
    try {
      const url = await uploadFile(supabase, BRAND_BUCKET, path, localPath);
      uploaded.set(file, url);
      console.log('done');
    } catch (err) {
      console.log(`failed (${err.message})`);
    }
  }

  return uploaded;
}

async function seedProducts(supabase, uploaded) {
  log('3/3', 'Seeding product catalog…');

  const seed = JSON.parse(
    readFileSync(join(ROOT, 'data/products.seed.json'), 'utf8')
  );

  let ok = 0;
  let failed = 0;

  for (const row of seed) {
    const imageUrl =
      uploaded.get(row.image_file) ??
      `/products/${row.image_file.replace(/ /g, '%20')}`;

    const record = {
      sku: row.sku,
      name_en: row.name_en,
      name_ar: row.name_ar,
      description_en: row.description_en,
      description_ar: row.description_ar,
      sub_en: row.sub_en,
      sub_ar: row.sub_ar,
      price: row.price,
      category_en: row.category_en,
      category_ar: row.category_ar,
      image_url: imageUrl,
      image_file: row.image_file,
      stock_quantity: row.stock_quantity,
      is_featured: row.is_featured,
      badge_en: row.badge_en ?? null,
      badge_ar: row.badge_ar ?? null,
      bg_color: 'bg-cream',
    };

    const { error } = await supabase
      .from('products')
      .upsert(record, { onConflict: 'sku' });

    if (error) {
      console.error(`  ❌ ${row.sku}: ${error.message}`);
      failed += 1;
    } else {
      console.log(`  ✓ ${row.sku}`);
      ok += 1;
    }
  }

  return { ok, failed, total: seed.length };
}

async function verify(supabase) {
  const { count, error } = await supabase
    .from('products')
    .select('*', { count: 'exact', head: true });

  if (error) {
    console.warn(`  ⚠ Verification query failed: ${error.message}`);
    return;
  }

  console.log(`  ✓ ${count ?? 0} product rows in database`);
}

async function main() {
  console.log('\n═══════════════════════════════════════════');
  console.log('  Soul Gold — Supabase Setup');
  console.log('═══════════════════════════════════════════');

  if (!SUPABASE_URL || !SERVICE_KEY) {
    fail(
      'Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local'
    );
  }

  if (!ANON_KEY) {
    console.warn('  ⚠ NEXT_PUBLIC_SUPABASE_ANON_KEY not set (recommended for the app)');
  }

  const hasDbAccess = Boolean(DATABASE_URL || DB_PASSWORD || ACCESS_TOKEN);
  if (!hasDbAccess) {
    console.warn(
      '  ⚠ SUPABASE_DB_PASSWORD not set — SQL migrations need your database password.\n' +
        '    Add it from Settings → Database → Database password (or paste DATABASE_URL).\n' +
        '    Storage upload + seeding will still run if tables already exist.\n'
    );
  }

  const supabase = createClient(SUPABASE_URL, SERVICE_KEY, {
    auth: { persistSession: false },
  });

  await runMigrations(supabase);
  const uploaded = await uploadAssets(supabase);
  const seed = await seedProducts(supabase, uploaded);
  await verify(supabase);

  console.log('\n═══════════════════════════════════════════');
  console.log('  ✅ Setup complete');
  console.log(`  • ${uploaded.size} files uploaded to Storage`);
  console.log(`  • ${seed.ok}/${seed.total} products seeded`);
  if (seed.failed) console.log(`  • ${seed.failed} product(s) failed — see errors above`);
  console.log('═══════════════════════════════════════════\n');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
