import { useEffect } from 'react';
import { store } from './store';
import type { GlobalStore } from './store';

export function Corners(props: GlobalStore['darkMode']) {
  useEffect(() => store.setDarkMode({ ...props }), [props]);
  return null;
}
