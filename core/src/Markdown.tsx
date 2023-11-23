import CodeLayout from 'react-code-preview-layout';
import { getMetaId, isMeta, getURLParameters } from 'markdown-react-code-preview-loader';
import MarkdownPreview from '@uiw/react-markdown-preview';
import type { MarkdownPreviewProps } from '@uiw/react-markdown-preview';
import type { CodeBlockData } from 'markdown-react-code-preview-loader';
import { type Node } from 'unist';
import styled from 'styled-components';
import rehypeIgnore from 'rehype-ignore';
import { Root, Element, RootContent } from 'hast';
import type { FC } from 'react';
import type { MarkdownPreviewExampleProps } from './';

const Preview = CodeLayout.Preview;
const Code = CodeLayout.Code;
const Toolbar = CodeLayout.Toolbar;

const MarkdownStyle = styled(MarkdownPreview)`
  margin: 0 auto;
  box-shadow:
    rgb(8 15 41 / 8%) 0.5rem 0.5rem 2rem 0px,
    rgb(8 15 41 / 8%) 0px 0px 1px 0px;
  border: 1px solid var(--color-border-default, #30363d);
  text-align: left;
  max-width: 56rem;
  overflow: auto;
  padding: 2rem;
  border-radius: 0.55rem;
`;

type CodePreviewProps = React.HTMLAttributes<HTMLDivElement> & {
  node?: Node;
  components: MarkdownPreviewExampleProps['components'];
  data: MarkdownPreviewExampleProps['data'];
  'data-meta'?: string;
  'data-md'?: string;
};

const CodePreview: FC<CodePreviewProps> = ({ components, data, node, ...props }) => {
  const { 'data-meta': meta, 'data-md': metaData, ...rest } = props;
  if (!isMeta(metaData)) {
    return <div {...props} />;
  }
  const line = node?.position?.start.line;
  const metaId = getMetaId(metaData) || String(line);
  const Child = components[`${metaId}`];
  if (metaId && typeof Child === 'function') {
    const code = data[metaId].value || '';
    const { title, boreder = 1, checkered = 1, code: codeNum = 1, toolbar = 1 } = getURLParameters(metaData || '');
    return (
      <CodeLayout bordered={!!Number(boreder)} disableCheckered={!Number(checkered)} style={{ marginBottom: 16 }}>
        <Preview>
          <Child />
        </Preview>
        {!!Number(toolbar) && (
          <Toolbar text={code} visibleButton={!!Number(codeNum)}>
            {title || 'Code Example'}
          </Toolbar>
        )}
        {!!Number(codeNum) && (
          <Code tagName="pre" style={{ marginBottom: 0 }}>
            <code {...rest} />
          </Code>
        )}
      </CodeLayout>
    );
  }
  return <code {...rest} />;
};

export interface MarkdownProps extends MarkdownPreviewProps {
  data: CodeBlockData;
}

export default function Markdown(props: MarkdownProps) {
  const { source, components, data, rehypeRewrite, ...reset } = props;
  return (
    <MarkdownStyle
      disableCopy={true}
      rehypePlugins={[rehypeIgnore, ...(reset.rehypePlugins || [])]}
      {...reset}
      rehypeRewrite={(node: Root | RootContent, index: number, parent: Root | Element) => {
        if (node.type === 'element' && node.tagName === 'pre' && /(pre|code)/.test(node.tagName) && node.children[0]) {
          const child = node.children[0] as Element;
          // @ts-ignore
          const meta = (child.data?.meta || child.properties?.dataMeta) as string;
          if (isMeta(meta)) {
            node.tagName = 'div';
            if (!node.properties) {
              node.properties = {};
            }
            node.properties['data-md'] = meta;
            node.properties['data-meta'] = 'preview';
          }
        }
        rehypeRewrite && rehypeRewrite(node, index, parent);
      }}
      source={data.source}
      components={{
        ...components,
        div: (rest) => <CodePreview {...rest} components={data.components} data={data.data} />,
      }}
    />
  );
}
