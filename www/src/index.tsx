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
    title="MarkdownPreviewExample for React"
    version={`v${VERSION}`}
  >
    <MarkdownPreviewExample.Github href="https://github.com/uiwjs/react-markdown-preview-example" />
    <MarkdownPreviewExample.Example>
      <div></div>
    </MarkdownPreviewExample.Example>
  </MarkdownPreviewExample>,
);
