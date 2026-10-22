type Tap = { presentationId: string; x: number; y: number; time: number; pointerId: number };

export function createDoubleTapDetector() {
  let down: Tap | null = null;
  let previous: Tap | null = null;
  const reset = () => { down = null; previous = null; };
  return {
    reset,
    start(tap: Tap) { down = tap; },
    move(pointerId: number, x: number, y: number) {
      if (down?.pointerId === pointerId && Math.hypot(x - down.x, y - down.y) > 10) reset();
    },
    end(tap: Tap) {
      const start = down;
      down = null;
      if (!start || start.pointerId !== tap.pointerId || start.presentationId !== tap.presentationId ||
        tap.time - start.time > 300 || Math.hypot(tap.x - start.x, tap.y - start.y) > 10) {
        previous = null;
        return false;
      }
      const matched = previous && previous.presentationId === tap.presentationId &&
        tap.time - previous.time <= 280 && Math.hypot(tap.x - previous.x, tap.y - previous.y) <= 24;
      previous = matched ? null : tap;
      return !!matched;
    },
  };
}
