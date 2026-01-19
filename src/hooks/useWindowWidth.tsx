import { useSyncExternalStore } from "react";

let lastWindowWidth = {
  mobile: false,
  tablet: false,
  desktop: false,
};

export function useWindowWidth() {
  return useSyncExternalStore(subscribe, getSnapshot);
}

function getSnapshot() {
  const newWindowWidth = {
    mobile: window.innerWidth <= 767,
    tablet: window.innerWidth <= 1280 && window.innerWidth > 767,
    desktop: window.innerWidth > 1280,
  };

  for (const [newKey, newEntry] of Object.entries(newWindowWidth)) {
    for (const [oldKey, oldEntry] of Object.entries(lastWindowWidth)) {
      if (newKey === oldKey) {
        if (newEntry !== oldEntry) {
          lastWindowWidth = newWindowWidth;
          return newWindowWidth;
        }
      }
    }
  }

  return lastWindowWidth;
}

function subscribe(callback: () => void) {
  window.addEventListener("resize", callback);
  return () => window.removeEventListener("resize", callback);
}
