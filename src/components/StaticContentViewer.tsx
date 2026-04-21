import { useParams } from 'react-router-dom';

export function StaticContentViewer() {
  const { concern, type } = useParams<{ concern: string; type: string }>();
  // Normalize concern: replace hyphens with underscores to match folder names (e.g. eating-disorder → eating_disorder)
  const normalizedConcern = (concern || '').replace(/-/g, '_');
  const src = `/therapy/static/content/${normalizedConcern}_${type}/index.html`;

  return (
    <iframe
      src={src}
      title={`${concern} ${type}`}
      style={{ width: '100%', height: '100%', border: 'none', minHeight: '80vh' }}
      sandbox="allow-scripts allow-same-origin"
    />
  );
}
