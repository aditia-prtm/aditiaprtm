import { useRef, useCallback } from 'react';

/**
 * useMagneticEffect
 * Makes an element subtly follow the cursor when hovering nearby.
 */
export function useMagneticEffect(strength = 0.3) {
  const ref = useRef<HTMLElement | null>(null);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const deltaX = (e.clientX - centerX) * strength;
    const deltaY = (e.clientY - centerY) * strength;
    el.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
  }, [strength]);

  const handleMouseLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = 'translate(0px, 0px)';
    el.style.transition = 'transform 0.5s cubic-bezier(0.4,0,0.2,1)';
  }, []);

  const handleMouseEnter = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.style.transition = 'transform 0.15s ease';
  }, []);

  const setRef = useCallback((node: HTMLElement | null) => {
    if (ref.current) {
      ref.current.removeEventListener('mousemove', handleMouseMove);
      ref.current.removeEventListener('mouseleave', handleMouseLeave);
      ref.current.removeEventListener('mouseenter', handleMouseEnter);
    }
    if (node) {
      node.addEventListener('mousemove', handleMouseMove);
      node.addEventListener('mouseleave', handleMouseLeave);
      node.addEventListener('mouseenter', handleMouseEnter);
    }
    ref.current = node;
  }, [handleMouseMove, handleMouseLeave, handleMouseEnter]);

  return setRef;
}
