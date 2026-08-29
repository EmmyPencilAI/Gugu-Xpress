import React from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useApp();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed top-16 right-3 sm:right-6 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      {toasts.map((t) => (
        <div
          key={t.id}
          className={`pointer-events-auto flex items-center justify-between gap-2 p-3 rounded-lg shadow-lg border text-xs font-medium animate-in fade-in slide-in-from-top-2 duration-200 ${
            t.type === 'success'
              ? 'bg-white border-[#FF6A00] text-[#111111]'
              : t.type === 'error'
              ? 'bg-white border-red-500 text-red-700'
              : 'bg-[#111111] border-gray-700 text-white'
          }`}
        >
          <div className="flex items-center gap-2">
            {t.type === 'success' && <CheckCircle2 className="w-4 h-4 text-[#FF6A00] shrink-0" />}
            {t.type === 'error' && <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />}
            {t.type === 'info' && <Info className="w-4 h-4 text-[#FF6A00] shrink-0" />}
            <span>{t.message}</span>
          </div>
          <button
            onClick={() => removeToast(t.id)}
            className="p-1 hover:opacity-70 transition-opacity"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      ))}
    </div>
  );
};
