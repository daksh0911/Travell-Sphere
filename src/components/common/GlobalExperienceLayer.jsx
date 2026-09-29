import { useEffect, useRef } from 'react';
import './GlobalExperienceLayer.css';

export default function GlobalExperienceLayer() {
  const layerRef = useRef(null);
  useEffect(() => {
    const layer = layerRef.current;
    if (!layer) return undefined;
    let frame = 0;
    const updatePointer = (event) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        layer.style.setProperty('--pointer-x', `${event.clientX}px`);
        layer.style.setProperty('--pointer-y', `${event.clientY}px`);
      });
    };
    const updateScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      layer.style.setProperty('--scroll-progress', `${max > 0 ? window.scrollY / max : 0}`);
    };
    window.addEventListener('pointermove', updatePointer, { passive: true });
    window.addEventListener('scroll', updateScroll, { passive: true });
    updateScroll();
    return () => { cancelAnimationFrame(frame); window.removeEventListener('pointermove', updatePointer); window.removeEventListener('scroll', updateScroll); };
  }, []);
  return <div ref={layerRef} className="global-experience-layer" aria-hidden="true"><span className="global-scroll-progress" /><span className="global-pointer-light" /><span className="global-ambient-grid" /></div>;
}
