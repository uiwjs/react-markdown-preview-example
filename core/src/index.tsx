import { forwardRef } from 'react';
import '@wcj/dark-mode';
import type { CodeBlockData } from 'markdown-react-code-preview-loader';
import type { MarkdownPreviewProps } from '@uiw/react-markdown-preview';
import { styled } from 'styled-components';
import BackToUp from '@uiw/react-back-to-top';
import { Github } from './Github';
import { Corners } from './Corners';
import { Example } from './Example';
import { NavMenu, NavMenuView } from './NavMenu';
import { useStores } from './store';
import Markdown from './Markdown';
import { Logo } from './Logo';

const ExampleWrapper = styled.div`
  max-width: 56rem;
  margin: 0 auto;
  padding: 2.3rem 3rem;
  display: flex;
  justify-content: center;
`;
const Wrappper = styled.div`
  padding-bottom: 12rem;
`;

const Header = styled.header`
  padding: 9rem 0 2rem 0;
  text-align: center;
  h1 {
    font-weight: 900;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Noto Sans', Helvetica, Arial, sans-serif,
      'Apple Color Emoji', 'Segoe UI Emoji';
  }
`;

export const SupVersion = styled.sup`
  font-weight: 200;
  font-size: 0.78rem;
  margin-left: 0.5em;
  margin-top: -0.3em;
  position: absolute;
  white-space: nowrap;
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
  exampleProps?: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;
  logo?: JSX.Element | null;
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
    exampleProps,
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
      <NavMenuView version={version} logo={logo} disableDarkMode={disableDarkMode} disableCorners={disableCorners} />
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
      {store.example && <ExampleWrapper {...exampleProps}>{store.example}</ExampleWrapper>}
      <Markdown {...markdownProps} source={source} data={{ data, components, source }} />
      {children}
      {!disableBackToUp && <BackToUp>Top</BackToUp>}
    </Wrappper>
  );
});

type ExampleComponent = typeof InternalMarkdownPreviewExample & {
  Example: typeof Example;
  Github: typeof Github;
  Corners: typeof Corners;
  NavMenu: typeof NavMenu;
};

const MarkdownPreviewExample: ExampleComponent = InternalMarkdownPreviewExample as unknown as ExampleComponent;

MarkdownPreviewExample.Github = Github;
MarkdownPreviewExample.Corners = Corners;
MarkdownPreviewExample.Example = Example;
MarkdownPreviewExample.NavMenu = NavMenu;

export default MarkdownPreviewExample;
