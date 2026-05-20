type Listener = () => void;

let scrolling = false;
let scrollEndTimer: ReturnType<typeof setTimeout> | undefined;
let initialized = false;
const listeners = new Set<Listener>();

function notify() {
  listeners.forEach((listener) => listener());
}

export function initScrollPlaybackGate(): () => void {
  if (initialized || typeof window === "undefined") {
    return () => {};
  }
  initialized = true;

  const onScroll = () => {
    if (!scrolling) {
      scrolling = true;
      notify();
    }

    clearTimeout(scrollEndTimer);
    scrollEndTimer = setTimeout(() => {
      scrolling = false;
      notify();
    }, 160);
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  return () => {
    window.removeEventListener("scroll", onScroll);
    clearTimeout(scrollEndTimer);
    initialized = false;
    scrolling = false;
    listeners.clear();
  };
}

export function isScrolling(): boolean {
  return scrolling;
}

export function subscribeScrollPlaybackGate(listener: Listener): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}
