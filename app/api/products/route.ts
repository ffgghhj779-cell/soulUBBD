import { NextRequest, NextResponse } from 'next/server';
import { resolveProducts } from '@/lib/products';

export async function GET(req: NextRequest) {
  const category = req.nextUrl.searchParams.get('category');

  try {
    const result = await resolveProducts(category);
    return NextResponse.json(result);
  } catch (err) {
    console.error('[api/products] Unexpected error:', err);
    const { catalogApiResponse } = await import('@/lib/showcaseCatalog');
    return NextResponse.json(catalogApiResponse());
  }
}
