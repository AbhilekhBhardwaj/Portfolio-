const MAX_CONCURRENT_LOADS = 1;

let activeLoads = 0;
const waitQueue: Array<() => void> = [];

export function requestVideoLoadSlot(): Promise<void> {
  if (activeLoads < MAX_CONCURRENT_LOADS) {
    activeLoads += 1;
    return Promise.resolve();
  }

  return new Promise((resolve) => {
    waitQueue.push(() => {
      activeLoads += 1;
      resolve();
    });
  });
}

export function releaseVideoLoadSlot(): void {
  activeLoads = Math.max(0, activeLoads - 1);
  const next = waitQueue.shift();
  if (next) next();
}
