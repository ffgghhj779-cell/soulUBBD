'use client';

import React, { createContext, useContext, useState, useCallback, useRef } from 'react';

export type ToastVariant = 'success' | 'error' | 'info';

export type Toast = {
  id: string;
  message: string;
  variant: ToastVariant;
};

type ToastContextValue = {
  toasts: Toast[];
  toast: (message: string, variant?: ToastVariant, id?: string) => void;
  dismiss: (id: string) => void;
};

const ToastContext = createContext<ToastContextValue | null>(null);

const TOAST_DURATION_MS = 4200;
const MAX_TOASTS = 4;

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const timeoutsRef = useRef<Map<string, ReturnType<typeof setTimeout>>>(new Map());

  const dismiss = useCallback((id: string) => {
    const timeout = timeoutsRef.current.get(id);
    if (timeout) {
      clearTimeout(timeout);
      timeoutsRef.current.delete(id);
    }
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const toast = useCallback(
    (message: string, variant: ToastVariant = 'info', id?: string) => {
      const toastId = id ?? `toast-${Math.random().toString(36).slice(2)}`;

      setToasts((prev) => {
        if (id) {
          const existing = prev.find((t) => t.id === id);
          if (existing) {
            return prev.map((t) =>
              t.id === id ? { ...t, message, variant } : t
            );
          }
        }
        const next = id
          ? [...prev.filter((t) => t.id !== id), { id: toastId, message, variant }]
          : [...prev, { id: toastId, message, variant }];
        return next.slice(-MAX_TOASTS);
      });

      const existingTimeout = timeoutsRef.current.get(toastId);
      if (existingTimeout) clearTimeout(existingTimeout);

      const timeout = setTimeout(() => dismiss(toastId), TOAST_DURATION_MS);
      timeoutsRef.current.set(toastId, timeout);
    },
    [dismiss]
  );

  return (
    <ToastContext.Provider value={{ toasts, toast, dismiss }}>
      {children}
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used within ToastProvider');
  return ctx;
}
