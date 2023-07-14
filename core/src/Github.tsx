import type { GitHubCornersProps } from '@uiw/react-github-corners';
import { useEffect } from 'react';
import { store } from './store';

interface GithubProps extends GitHubCornersProps {}

export function Github(props: GithubProps) {
  useEffect(() => store.setCorners({ ...props }), [props]);
  return null;
}
