import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';

export function StaticContentViewer() {
  const { concern, type } = useParams<{ concern: string; type: string }>();
  const navigate = useNavigate();
  
  // Normalize concern: replace hyphens with underscores to match folder names (e.g. eating-disorder → eating_disorder)
  const normalizedConcern = (concern || '').replace(/-/g, '_');
  const src = `/static/content/${normalizedConcern}_${type}/index.html`;

  return (
    <div className="flex flex-col h-screen bg-[#F6F8FB]">
      <header className="flex items-center px-4 h-14 bg-white border-b gap-3">
        <button 
          onClick={() => {
            if (window.parent !== window) {
              window.parent.postMessage({ action: 'exit' }, 'https://web.mantracare.com');
            } else {
              window.location.href = 'https://web.mantracare.com';
            }
          }}
          className="p-2 hover:bg-slate-100 rounded-full transition-colors"
        >
          <ChevronLeft size={20} />
        </button>
        <h1 className="text-sm font-semibold capitalize">
          {concern?.replace(/-/g, ' ')} - {type}
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
