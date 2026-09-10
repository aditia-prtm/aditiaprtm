import { useEffect, useRef } from 'react';

interface DotMatrixBackgroundProps {
  dotSize?: number;
  gap?: number;
  className?: string;
  opacityMultiplier?: number;
  maskVariant?: 'radial' | 'subtle' | 'none';
}

/**
 * Animated Dot Matrix Background
 * Renders an interactive, wave-pulsing dot matrix canvas with gold highlights
 * and mouse proximity glow.
 *
 * Enhanced for high visibility and crisp contrast in both Light and Dark modes.
 * Automatically halts when outside viewport to ensure 0 CPU overhead when offscreen.
 */
export default function DotMatrixBackground({
  dotSize = 1.4,
  gap = 28,
  className = '',
  opacityMultiplier = 1,
  maskVariant = 'radial',
}: DotMatrixBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mouseRef = useRef<{ x: number; y: number; active: boolean }>({
    x: -1000,
    y: -1000,
    active: false,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let isVisible = true;
    let width = 0;
    let height = 0;
    let time = 0;

    // Detect dark mode
    const isDarkMode = () => document.documentElement.classList.contains('dark');

    const handleResize = () => {
      const rect = container.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    };

    handleResize();

    const resizeObserver = new ResizeObserver(() => {
      handleResize();
    });
    resizeObserver.observe(container);

    // Watch for theme toggle
    const themeObserver = new MutationObserver(() => {
      // Re-trigger render cycle with updated theme colors
    });
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    // Pause when offscreen
    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        if (isVisible) {
          lastTime = performance.now();
          render();
        }
      },
      { threshold: 0.02 }
    );
    intersectionObserver.observe(container);

    // Track mouse over parent container (e.g. section or footer)
    const targetElement = container.parentElement || container;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        active: true,
      };
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
    };

    targetElement.addEventListener('mousemove', handleMouseMove, { passive: true });
    targetElement.addEventListener('mouseleave', handleMouseLeave, { passive: true });

    let lastTime = performance.now();

    const render = () => {
      if (!isVisible) return;

      const now = performance.now();
      const dt = Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;
      time += dt * 1.6;

      ctx.clearRect(0, 0, width, height);

      const dark = isDarkMode();
      const cols = Math.ceil(width / gap) + 1;
      const rows = Math.ceil(height / gap) + 1;
      const mouse = mouseRef.current;

      // Primary gold accent values
      const goldR = dark ? 212 : 184;
      const goldG = dark ? 175 : 134;
      const goldB = dark ? 55 : 11;

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const x = i * gap;
          const y = j * gap;

          // Multi-frequency wave calculation for natural organic flow
          const wave1 = Math.sin(x * 0.012 + y * 0.01 + time);
          const wave2 = Math.cos(x * 0.016 - y * 0.014 + time * 0.75);
          const combinedWave = (wave1 + wave2) * 0.5; // range: -1 to 1

          // Soft subtle base opacity for light mode, rich glow for dark mode
          let opacity = dark
            ? (0.11 + Math.max(0, combinedWave) * 0.26) * opacityMultiplier
            : (0.07 + Math.max(0, combinedWave) * 0.18) * opacityMultiplier;

          let radius = (dark ? dotSize : dotSize * 0.9) * (0.85 + Math.max(0, combinedWave) * 0.45);

          // Interactive mouse proximity glow
          let isHovered = false;
          if (mouse.active) {
            const dx = mouse.x - x;
            const dy = mouse.y - y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            const maxDist = 140;

            if (dist < maxDist) {
              const influence = Math.pow(1 - dist / maxDist, 2);
              opacity += influence * (dark ? 0.7 : 0.45) * opacityMultiplier;
              radius += influence * 1.3;
              isHovered = true;
            }
          }

          const isGold = combinedWave > 0.35 || isHovered;

          ctx.beginPath();
          ctx.arc(x, y, Math.max(0.4, radius), 0, Math.PI * 2);

          if (isGold) {
            ctx.fillStyle = `rgba(${goldR}, ${goldG}, ${goldB}, ${Math.min(opacity * (dark ? 1.2 : 1.0), 0.85)})`;
          } else {
            ctx.fillStyle = dark
              ? `rgba(255, 255, 255, ${opacity * 0.8})`
              : `rgba(24, 24, 27, ${opacity * 0.6})`;
          }

          ctx.fill();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      themeObserver.disconnect();
      intersectionObserver.disconnect();
      targetElement.removeEventListener('mousemove', handleMouseMove);
      targetElement.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [dotSize, gap, opacityMultiplier]);

  const maskStyles = {
    radial: {
      maskImage: 'radial-gradient(ellipse 85% 75% at 50% 50%, black 35%, transparent 95%)',
      WebkitMaskImage: 'radial-gradient(ellipse 85% 75% at 50% 50%, black 35%, transparent 95%)',
    },
    subtle: {
      maskImage: 'radial-gradient(circle at 50% 50%, black 50%, transparent 100%)',
      WebkitMaskImage: 'radial-gradient(circle at 50% 50%, black 50%, transparent 100%)',
    },
    none: {},
  }[maskVariant];

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}
      style={maskStyles}
    >
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  );
}
