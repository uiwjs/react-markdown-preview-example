import { forwardRef } from 'react';
import '@wcj/dark-mode';
import type { CodeBlockData } from 'markdown-react-code-preview-loader';
import type { MarkdownPreviewProps } from '@uiw/react-markdown-preview';
import { styled } from 'styled-components';
import GitHubCorners from '@uiw/react-github-corners';
import BackToUp from '@uiw/react-back-to-top';
import { Github } from './Github';
import { Corners } from './Corners';
import { Example } from './Example';
import { useStores } from './store';
import Markdown from './Markdown';
import { Logo } from './Logo';

const ExampleWrapper = styled.div`
  max-width: 56rem;
  margin: 0 auto;
  padding: 2.3rem 3rem;
`;
const Wrappper = styled.div`
  padding-bottom: 12rem;
`;

const Header = styled.header`
  padding: 6rem 0 2rem 0;
  text-align: center;
  h1 {
    font-weight: 900;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Noto Sans', Helvetica, Arial, sans-serif,
      'Apple Color Emoji', 'Segoe UI Emoji';
  }
`;

const SupVersion = styled.sup`
  font-weight: 200;
  font-size: 0.78rem;
  margin-left: 0.5em;
  margin-top: -0.3em;
  position: absolute;
`;

const Description = styled.p`
  max-width: 460px;
  margin: 0 auto;
  color: var(--color-fg-subtle, #6e7781);
`;

export interface MarkdownPreviewExampleProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  source: string;
  components: CodeBlockData['components'];
  data: CodeBlockData['data'];
  version?: string;
  title?: JSX.Element | string;
  markdownProps?: MarkdownPreviewProps;
  logo?: JSX.Element;
  description?: JSX.Element | string;
  disableCorners?: boolean;
  disableDarkMode?: boolean;
  disableHeader?: boolean;
  disableBackToUp?: boolean;
}

const InternalMarkdownPreviewExample = forwardRef<HTMLUListElement, MarkdownPreviewExampleProps>((props, ref) => {
  const {
    version,
    title,
    description,
    source,
    logo = Logo,
    components,
    data,
    markdownProps,
    className = '',
    children,
    disableCorners = false,
    disableDarkMode = false,
    disableHeader = false,
    disableBackToUp = false,
    ...reset
  } = props;
  const store = useStores();
  return (
    <Wrappper className={`wmde-markdown-var ${className}`} {...reset}>
      {!disableDarkMode && (
        <dark-mode
          permanent
          style={{ position: 'fixed', top: 8, left: 12, zIndex: 99, fontSize: 28 }}
          {...store.darkMode}
        ></dark-mode>
      )}
      {!disableCorners && <GitHubCorners fixed target="__blank" zIndex={10} {...store.corners} />}
      {!disableHeader && (
        <Header>
          {logo}
          {title && (
            <h1>
              {title}
              {version && <SupVersion>{version}</SupVersion>}
            </h1>
          )}
          {description && <Description>{description}</Description>}
        </Header>
      )}
      {store.example && <ExampleWrapper>{store.example}</ExampleWrapper>}
      <Markdown {...markdownProps} source={source} components={components} data={data} />
      {children}
      {!disableBackToUp && <BackToUp>Top</BackToUp>}
    </Wrappper>
  );
});

type ExampleComponent = typeof InternalMarkdownPreviewExample & {
  Example: typeof Example;
  Github: typeof Github;
  Corners: typeof Corners;
};

const MarkdownPreviewExample: ExampleComponent = InternalMarkdownPreviewExample as unknown as ExampleComponent;

MarkdownPreviewExample.Github = Github;
MarkdownPreviewExample.Corners = Corners;
MarkdownPreviewExample.Example = Example;

export default MarkdownPreviewExample;
