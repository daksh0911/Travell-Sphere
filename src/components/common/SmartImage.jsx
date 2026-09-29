import './SmartImage.css';

const WIDTHS = [480, 768, 1200, 1600, 1920];

function withWidth(source, width) {
  if (!source || !source.includes('images.unsplash.com')) return source;
  const separator = source.includes('?') ? '&' : '?';
  const cleaned = source.replace(/[?&]w=\d+/, '').replace(/[?&]q=\d+/, '');
  return `${cleaned}${separator}w=${width}&q=92&auto=format&fit=crop`;
}

export default function SmartImage({ src, alt, className = '', sizes = '100vw', priority = false, ...props }) {
  const responsive = src?.includes('images.unsplash.com');
  const srcSet = responsive ? WIDTHS.map(width => `${withWidth(src, width)} ${width}w`).join(', ') : undefined;
  return <img
    src={responsive ? withWidth(src, priority ? 1600 : 768) : src}
    srcSet={srcSet}
    sizes={responsive ? sizes : undefined}
    alt={alt}
    loading={priority ? 'eager' : 'lazy'}
    decoding="async"
    fetchPriority={priority ? 'high' : 'auto'}
    className={`smart-image ${className}`}
    {...props}
  />;
}
