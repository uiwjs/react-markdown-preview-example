import { useEffect } from 'react';
import type { PropsWithChildren } from 'react';
import { store } from './store';

export function Example({ children }: PropsWithChildren) {
  useEffect(() => store.setExample(children), [children]);
  return null;
}
