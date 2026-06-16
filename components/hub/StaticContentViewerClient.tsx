'use client';

import { useRouter } from 'next/navigation';
import { ChevronLeft } from 'lucide-react';

interface StaticContentViewerClientProps {
  concern: string;
  type: string;
}

export function StaticContentViewerClient({ concern, type }: StaticContentViewerClientProps) {
  const router = useRouter();

  // Normalize concern: replace hyphens with underscores (eating-disorder → eating_disorder)
  const normalizedConcern = concern.replace(/-/g, '_');
  const src = `/static/content/${normalizedConcern}_${type}/index.html`;

  return (
    <div className="flex flex-col h-screen bg-[#F6F8FB]">
      <header className="flex items-center px-4 h-14 bg-white border-b gap-3 flex-shrink-0">
        <button
          onClick={() => {
            if (typeof window !== 'undefined') {
              if ((window as any).ReactNativeWebView) {
                (window as any).ReactNativeWebView.postMessage(JSON.stringify({ action: 'exit' }));
              } else if (window.parent !== window) {
                window.parent.postMessage({ action: 'exit' }, 'https://web.mantracare.com');
              } else {
                router.back();
              }
            }
          }}
          className="p-2 hover:bg-slate-100 rounded-full transition-colors"
        >
          <ChevronLeft size={20} />
        </button>
        <h1 className="text-sm font-semibold capitalize">
          {concern.replace(/-/g, ' ')} — {type}
        </h1>
      </header>
      <div className="flex-1 overflow-hidden">
        <iframe
          src={src}
          title={`${concern} ${type}`}
          className="w-full h-full border-none"
          sandbox="allow-scripts allow-same-origin"
        />
      </div>
    </div>
  );
}
