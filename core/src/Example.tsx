import { FC, PropsWithChildren, useEffect } from 'react';
import { store } from './store';

// export const Example: FC<PropsWithChildren> = ({ children }) => {
//   console.log('children:', children)
//   useEffect(() => store.setExample(children), [children])
//   return null;
// }

export function Example({ children }: PropsWithChildren) {
  console.log('children:', children);
  useEffect(() => store.setExample(children), [children]);
  return null;
}
