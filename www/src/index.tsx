import { createRoot } from 'react-dom/client';
import MarkdownPreviewExample from '@uiw/react-markdown-preview-example';
import data from '@uiw/react-markdown-preview-example/README.md';

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(
  <MarkdownPreviewExample
    source={data.source}
    components={data.components}
    data={data.data}
    // logo={null}
    // title="MarkdownPreviewExample for React"
    description="Preview the markdown files and run the React examples in the documentation."
    version={`v${VERSION}`}
  >
    <MarkdownPreviewExample.NavMenu
      title="Markdown Preview Example"
      menus={[
        <a target="_blank" href="https://uiwjs.github.io/react-markdown-preview/" rel="noopener noreferrer">
          Markdown
        </a>,
        <a target="_blank" href="https://jaywcjlove.github.io/#/sponsor" rel="noopener noreferrer">
          Sponsor
        </a>,
      ]}
    />
    <MarkdownPreviewExample.Github href="https://github.com/uiwjs/react-markdown-preview-example" />
    <MarkdownPreviewExample.Example>
      <div></div>
    </MarkdownPreviewExample.Example>
  </MarkdownPreviewExample>,
);
