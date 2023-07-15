import type { GitHubCornersProps } from '@uiw/react-github-corners';
import { useEffect } from 'react';
import { store } from './store';

export function Github(props: GitHubCornersProps) {
  useEffect(() => store.setCorners({ ...props }), [props]);
  return null;
}
