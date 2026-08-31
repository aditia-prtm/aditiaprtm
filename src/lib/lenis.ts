import Lenis, { type LenisOptions } from 'lenis';

/**
 * Module-level Lenis singleton.
 *
 * The instance is created once in App and kept here so that any component
 * (e.g. ProjectModal) can pause/resume page scrolling via lenis.stop() /
 * lenis.start() without prop drilling the instance through the tree.
 */
let lenisInstance: Lenis | null = null;

/** Create (or re-create) the global Lenis instance. Called once from App. */
export function initLenis(options?: LenisOptions): Lenis {
  destroyLenis();
  lenisInstance = new Lenis(options);
  return lenisInstance;
}

/** Get the global Lenis instance (null before init or after destroy). */
export function getLenis(): Lenis | null {
  return lenisInstance;
}

/** Destroy the global Lenis instance and clear the reference. */
export function destroyLenis(): void {
  lenisInstance?.destroy();
  lenisInstance = null;
}
