import { useParams } from 'react-router-dom';

export function StaticContentViewer() {
  const { concern, type } = useParams<{ concern: string; type: string }>();
  // We use _ to join concern and type just as they are in the folder names
  const src = `/therapy/static/content/${concern}_${type}/index.html`;

  return (
    <iframe
      src={src}
      title={`${concern} ${type}`}
      style={{ width: '100%', height: '100%', border: 'none', minHeight: '80vh' }}
      sandbox="allow-scripts allow-same-origin"
    />
  );
}
