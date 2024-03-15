import type { FC } from 'react';
import CodeLayout from 'react-code-preview-layout';
import { getMetaId, isMeta, getURLParameters } from 'markdown-react-code-preview-loader';
import MarkdownPreview from '@uiw/react-markdown-preview';
import type { MarkdownPreviewProps } from '@uiw/react-markdown-preview';
import type { CodeBlockData } from 'markdown-react-code-preview-loader';
import type { Element, RootContent } from 'hast';
import styled from 'styled-components';
import rehypeIgnore from 'rehype-ignore';

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

type CodePreviewProps = React.HTMLAttributes<HTMLPreElement> & {
  node?: RootContent;
  components: CodeBlockData['components'];
  data: CodeBlockData['data'];
};

const CodePreview: FC<CodePreviewProps> = ({ components, data, node, ...props }) => {
  if (node && node.type === 'element' && node.tagName === 'pre') {
    const child = node.children[0] as Element;
    if (!child) return <pre {...props} />;
    const meta = ((child.data as any)?.meta || child.properties?.dataMeta) as string;
    if (!isMeta(meta)) {
      return <pre {...props} />;
    }
    const line = node?.position?.start.line;
    const metaId = getMetaId(meta) || String(line);
    const Child = components[`${metaId}`];
    if (metaId && typeof Child === 'function') {
      const code = data[metaId].value || '';
      const { title, boreder = 1, checkered = 1, code: codeNum = 1, toolbar = 1 } = getURLParameters(meta || '');
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
            <Code tagName="pre" style={{ marginBottom: 0 }} className={props.className}>
              {props.children}
            </Code>
          )}
        </CodeLayout>
      );
    }
  }
  return <code {...props} />;
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
      source={data.source}
      components={{
        ...components,
        pre: (rest) => <CodePreview {...rest} components={data.components} data={data.data} />,
      }}
    />
  );
}
