import { useState } from 'react';
import './SmartImage.css';

const WIDTHS = [480, 768, 1200, 1600, 1920];
const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1200&q=80';

function withWidth(source, width) {
  if (!source || typeof source !== 'string') return source;
  if (!source.includes('images.unsplash.com')) return source;
  try {
    const url = new URL(source);
    url.searchParams.set('w', width.toString());
    url.searchParams.set('q', '92');
    url.searchParams.set('auto', 'format');
    url.searchParams.set('fit', 'crop');
    return url.toString();
  } catch {
    return source;
  }
}

export default function SmartImage({ src, alt, className = '', sizes = '100vw', priority = false, onError, ...props }) {
  const [imgSrc, setImgSrc] = useState(src);
  const responsive = typeof imgSrc === 'string' && imgSrc.includes('images.unsplash.com');
  const srcSet = responsive ? WIDTHS.map(width => `${withWidth(imgSrc, width)} ${width}w`).join(', ') : undefined;

  const handleError = (e) => {
    if (imgSrc !== FALLBACK_IMAGE) {
      setImgSrc(FALLBACK_IMAGE);
    }
    if (onError) onError(e);
  };

  return <img
    src={responsive ? withWidth(imgSrc, priority ? 1600 : 768) : (imgSrc || FALLBACK_IMAGE)}
    srcSet={srcSet}
    sizes={responsive ? sizes : undefined}
    alt={alt || 'Travel image'}
    loading={priority ? 'eager' : 'lazy'}
    decoding="async"
    fetchPriority={priority ? 'high' : 'auto'}
    className={`smart-image ${className}`}
    onError={handleError}
    {...props}
  />;
}

