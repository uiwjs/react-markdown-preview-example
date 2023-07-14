import { forwardRef } from 'react';
import '@wcj/dark-mode';
import { styled } from 'styled-components';
import type { CodeBlockData } from 'markdown-react-code-preview-loader';
import GitHubCorners from '@uiw/react-github-corners';
import BackToUp from '@uiw/react-back-to-top';
import { Github } from './Github';
import { Corners } from './Corners';
import { Example } from './Example';
import { useStores } from './store';
import Markdown from './Markdown';

const ExampleWrapper = styled.div`
  max-width: 56rem;
  margin: 0 auto;
  padding: 2.3rem 3rem;
`;
const Wrappper = styled.div`
  padding-bottom: 9rem;
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

export interface MarkdownPreviewExampleProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  source: string;
  components: CodeBlockData['components'];
  data: CodeBlockData['data'];
  version?: string;
  title?: JSX.Element | string;
}

const InternalMarkdownPreviewExample = forwardRef<HTMLUListElement, MarkdownPreviewExampleProps>((props, ref) => {
  const { version, title, source, components, data, children } = props;
  const store = useStores();
  return (
    <Wrappper>
      <dark-mode
        permanent
        style={{ position: 'fixed', top: 8, left: 12, zIndex: 99, fontSize: 28 }}
        {...store.darkMode}
      ></dark-mode>
      <GitHubCorners fixed target="__blank" zIndex={10} {...store.corners} />
      <Header>
        {title && (
          <h1>
            {title}
            {version && <SupVersion>{version}</SupVersion>}
          </h1>
        )}
      </Header>
      {store.example && <ExampleWrapper>{store.example}</ExampleWrapper>}
      <Markdown source={source} components={components} data={data} />
      {children}
      <BackToUp>Top</BackToUp>
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
