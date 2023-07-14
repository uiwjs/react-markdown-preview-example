import { useSyncExternalStore } from 'react';
import type { GitHubCornersProps } from '@uiw/react-github-corners';

export interface GlobalStore {
  corners: GitHubCornersProps;
  darkMode: Partial<HTMLElementTagNameMap['dark-mode']>;
  example?: React.ReactNode;
}

let globalStore: GlobalStore = {
  corners: {
    fixed: true,
    target: '__blank',
    zIndex: 10,
  },
  darkMode: {
    permanent: true,
    dark: 'Dark',
    light: 'Light',
  },
  example: null,
};
let listeners: Function[] = [];
export const store = {
  setCorners(opts: GitHubCornersProps) {
    globalStore = {
      ...globalStore,
      corners: {
        ...globalStore.corners,
        ...opts,
      },
    };
    emitChange();
  },
  setDarkMode(opts: GlobalStore['darkMode']) {
    globalStore = {
      ...globalStore,
      darkMode: {
        ...globalStore.darkMode,
        ...opts,
      },
    };
    console.log('globalStore:', globalStore);
    emitChange();
  },
  setExample(example: React.ReactNode) {
    globalStore = {
      ...globalStore,
      example,
    };
    emitChange();
  },
};

function getSnapshot() {
  return globalStore;
}

function subscribe(listener: Function) {
  listeners = [...listeners, listener];
  return () => {
    listeners = listeners.filter((l) => l !== listener);
  };
}

function emitChange() {
  for (let listener of listeners) {
    listener();
  }
}

export function useStores() {
  return useSyncExternalStore(subscribe, getSnapshot);
}
