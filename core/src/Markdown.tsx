import CodeLayout from 'react-code-preview-layout';
import { getMetaId, isMeta, getURLParameters } from 'markdown-react-code-preview-loader';
import MarkdownPreview from '@uiw/react-markdown-preview';
import type { MarkdownPreviewProps } from '@uiw/react-markdown-preview';
import styled from 'styled-components';
import rehypeIgnore from 'rehype-ignore';
import { CodeProps } from 'react-markdown/lib/ast-to-react';
import type { MarkdownPreviewExampleProps } from './';
import { FC } from 'react';

const Preview = CodeLayout.Preview;
const Code = CodeLayout.Code;
const Toolbar = CodeLayout.Toolbar;

const MarkdownStyle = styled(MarkdownPreview)`
  margin: 0 auto;
  box-shadow: rgb(8 15 41 / 8%) 0.5rem 0.5rem 2rem 0px, rgb(8 15 41 / 8%) 0px 0px 1px 0px;
  border: 1px solid var(--color-border-default, #30363d);
  text-align: left;
  max-width: 56rem;
  overflow: auto;
  padding: 3rem 3rem;
  border-radius: 5px;
`;

type CodePreviewProps = CodeProps & {
  components: MarkdownPreviewExampleProps['components'];
  data: MarkdownPreviewExampleProps['data'];
};

const CodePreview: FC<CodePreviewProps> = ({ inline, node, components, data, ...props }) => {
  const { 'data-meta': meta, ...rest } = props as any;
  if (inline || !isMeta(meta)) {
    return <code {...props} />;
  }
  const line = node.position?.start.line;
  const metaId = getMetaId(meta) || String(line);
  const Child = components[`${metaId}`];
  if (metaId && typeof Child === 'function') {
    const code = data[metaId].value || '';
    const { title, boreder = 1, checkered = 1, code: codeNum = 1, toolbar = 1 } = getURLParameters(meta);
    return (
      <CodeLayout bordered={!!Number(boreder)} disableCheckered={!Number(checkered)}>
        <Preview>
          <Child />
        </Preview>
        {!!Number(toolbar) && (
          <Toolbar text={code} visibleButton={!!Number(codeNum)}>
            {title || 'Code Example'}
          </Toolbar>
        )}
        {!!Number(codeNum) && (
          <Code>
            <code {...rest} />
          </Code>
        )}
      </CodeLayout>
    );
  }
  return <code {...rest} />;
};

interface MarkdownProps extends MarkdownPreviewProps {
  source: string;
  components: MarkdownPreviewExampleProps['components'];
  data: MarkdownPreviewExampleProps['data'];
}

export default function Markdown(props: MarkdownProps) {
  const { source, components, data } = props;
  return (
    <MarkdownStyle
      // style={{ paddingTop: 30 }}
      disableCopy={true}
      rehypePlugins={[rehypeIgnore]}
      source={source}
      components={{
        code: (rest) => <CodePreview {...rest} components={components} data={data} />,
      }}
    />
  );
}
