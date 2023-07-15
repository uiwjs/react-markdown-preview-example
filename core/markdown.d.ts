/// <reference types="react" />

declare module '@uiw/react-markdown-preview-example/markdown' {
  import type { MarkdownPreviewProps } from '@uiw/react-markdown-preview';
  import type { CodeBlockData } from 'markdown-react-code-preview-loader';
  export interface MarkdownProps extends MarkdownPreviewProps {
    data: CodeBlockData;
  }
  export default function Markdown(props: MarkdownProps): import('react/jsx-runtime').JSX.Element;
}
