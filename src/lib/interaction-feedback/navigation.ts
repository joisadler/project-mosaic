// Keep input intent through native event propagation, then expire it in the next task.
export function createNavigationFeedbackGate() {
  let armed = false;
  let timer: ReturnType<typeof setTimeout> | null = null;
  const cancel = () => {
    armed = false;
    if (timer !== null) clearTimeout(timer);
    timer = null;
  };
  const startDrag = () => { cancel(); armed = true; };
  const armForEvent = () => {
    startDrag();
    timer = setTimeout(cancel, 0);
  };
  return {
    cancel, startDrag, armForEvent,
    consume(initialized: boolean | undefined, changed: boolean, active: boolean) {
      if (!armed || !initialized || !changed || !active) return false;
      cancel();
      return true;
    },
  };
}
