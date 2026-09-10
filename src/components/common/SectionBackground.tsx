import DotMatrixBackground from './DotMatrixBackground';

interface SectionBackgroundProps {
  glowPosition?: 'top-left' | 'top-right' | 'both' | 'none';
  withDotMatrix?: boolean;
  dotGap?: number;
  dotSize?: number;
  dotOpacity?: number;
}

/**
 * SectionBackground
 * Renders the animated dot matrix layer, subtle geometric grid overlay,
 * and ambient warm gold radial glow pools.
 */
export default function SectionBackground({
  glowPosition = 'both',
  withDotMatrix = true,
  dotGap = 32,
  dotSize = 1.4,
  dotOpacity = 0.85,
}: SectionBackgroundProps) {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {/* Animated Dot Matrix Layer - Active in dark mode for sections */}
      {withDotMatrix && (
        <div className="hidden dark:block absolute inset-0">
          <DotMatrixBackground
            gap={dotGap}
            dotSize={dotSize}
            opacityMultiplier={dotOpacity}
            maskVariant="radial"
          />
        </div>
      )}

      {/* Background grid */}
      <div className="absolute inset-0 section-grid-bg" />

      {/* Light mode: ambient glow pools */}
      {(glowPosition === 'top-left' || glowPosition === 'both') && (
        <div
          className="dark:hidden absolute"
          style={{
            top: '-5%',
            left: '-8%',
            width: 560,
            height: 560,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(184,134,11,0.06) 0%, transparent 70%)',
          }}
        />
      )}

      {(glowPosition === 'top-right' || glowPosition === 'both') && (
        <div
          className="dark:hidden absolute"
          style={{
            bottom: '-5%',
            right: '-6%',
            width: 480,
            height: 480,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(184,134,11,0.05) 0%, transparent 70%)',
          }}
        />
      )}

      {/* Dark mode: ambient gold pools */}
      {(glowPosition === 'top-left' || glowPosition === 'both') && (
        <div
          className="hidden dark:block absolute"
          style={{
            top: '-5%',
            left: '-8%',
            width: 600,
            height: 600,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(212,175,55,0.05) 0%, transparent 70%)',
          }}
        />
      )}

      {(glowPosition === 'top-right' || glowPosition === 'both') && (
        <div
          className="hidden dark:block absolute"
          style={{
            bottom: '-5%',
            right: '-6%',
            width: 520,
            height: 520,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(212,175,55,0.04) 0%, transparent 70%)',
          }}
        />
      )}
    </div>
  );
}
