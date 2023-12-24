<!--rehype:ignore:start-->
@uiw/react-markdown-preview-example
===
<!--rehype:ignore:end-->

[![Buy me a coffee](https://img.shields.io/badge/Buy%20me%20a%20coffee-048754?logo=buymeacoffee)](https://jaywcjlove.github.io/#/sponsor)
[![CI](https://github.com/uiwjs/react-markdown-preview-example/actions/workflows/ci.yml/badge.svg)](https://github.com/uiwjs/react-markdown-preview-example/actions/workflows/ci.yml)
[![npm version](https://img.shields.io/npm/v/@uiw/react-markdown-preview-example.svg)](https://www.npmjs.com/package/@uiw/react-markdown-preview-example)
[![NPM Downloads](https://img.shields.io/npm/dm/@uiw/react-markdown-preview-example.svg?style=flat&label=)](https://www.npmjs.com/package/@uiw/react-markdown-preview-example)
[![react@^18](https://shields.io/badge/react-^18-green?style=flat&logo=react)](https://github.com/facebook/react/releases)

Preview the markdown files and run the React examples in the documentation.

## Features

📚 Use Typescript to write, better code hints.  
🌒 Support dark/light mode  
🏋🏾‍♂️ Support [GFM](https://github.github.com/gfm/) (autolink literals, footnotes, strikethrough, tables, tasklists).  
🐝 Support for defining styles via comment.  
🙆🏼‍♂️ GitHub style: The markdown content is rendered as close to the way it's rendered on GitHub as possible.

## Quick Start

```bash
$ npm install @uiw/react-markdown-preview-example --save
```

```jsx
import MarkdownPreviewExample from '@uiw/react-markdown-preview-example';
import data from './docs/README.md';

data.source     // => `README.md` raw string text
data.components // => The component index object, the React component converted from the markdown indexed example. (need to configure meta)
data.data       // => The component source code index object, the sample source code indexed from markdown. (need to configure meta)

const Github = MarkdownPreviewExample.Github;
const Example = MarkdownPreviewExample.Example;
const NavMenu = MarkdownPreviewExample.NavMenu;

<MarkdownPreviewExample
  source={data.source}
  components={data.components}
  data={data.data}
  title="MarkdownPreviewExample for React"
  version={`v${VERSION}`}
>
  <Github href="https://github.com/uiwjs/react-markdown-preview-example" />
  <Example>
    <div>test</div>
  </Example>
</MarkdownPreviewExample>
```

```jsx
import PreviewExample from '@uiw/react-markdown-preview-example';

<PreviewExample.NavMenu
  title="Markdown Preview Example"
  menus={[
    <a target="_blank" href="https://uiwjs.github.io/react-markdown-preview/" rel="noopener noreferrer">Markdown</a>,
    <a target="_blank" href="https://jaywcjlove.github.io/#/sponsor" rel="noopener noreferrer">Sponsor</a>
  ]}
/>
```

just markdown _preview_ and **run** in markdown show **react** example.

```tsx
import MarkdownPreview from '@uiw/react-markdown-preview-example/markdown';
import data from './docs/README.md';

data.source     // => `README.md` raw string text
data.components // => The component index object, the React component converted from the markdown indexed example. (need to configure meta)
data.data       // => The component source code index object, the sample source code indexed from markdown. (need to configure meta)

<Markdown source={data.source} data={data} />
```

```ts
import type { MarkdownPreviewProps } from '@uiw/react-markdown-preview';
import type { CodeBlockData } from 'markdown-react-code-preview-loader';
export interface MarkdownProps extends MarkdownPreviewProps {
  data: CodeBlockData;
}
export default function Markdown(props: MarkdownProps): import("react/jsx-runtime").JSX.Element;
```

There is a step to pay attention to, which needs to configure the webpack [`loader`](https://www.npmjs.com/package/markdown-react-code-preview-loader). The configuration and usage methods are consistent in Webpack:

```ts
// .kktrc.ts
import webpack, { Configuration } from 'webpack';
import scopePluginOptions from '@kkt/scope-plugin-options';
import { LoaderConfOptions } from 'kkt';

export default (conf: Configuration, env: 'development' | 'production', options: LoaderConfOptions) => {
  // ....
  config.module.rules.forEach((ruleItem) => {
    if (typeof ruleItem === 'object') {
      if (ruleItem.oneOf) {
        ruleItem.oneOf.unshift({
          test: /.md$/,
          use: [
            {
              loader: 'markdown-react-code-preview-loader',
              options: { lang:["jsx","tsx"] },
            },
          ],
        });
      }
    }
  });
  // ....
  return conf;
};
```

Or

```ts
// .kktrc.ts
import scopePluginOptions from '@kkt/scope-plugin-options';
import { LoaderConfOptions, WebpackConfiguration } from 'kkt';
import { mdCodeModulesLoader } from 'markdown-react-code-preview-loader';

export default (conf: WebpackConfiguration, env: 'development' | 'production', options: LoaderConfOptions) => {
  // ....
  conf = mdCodeModulesLoader(conf);
  // ....
  return conf;
};
```

`src/react-app-env.d.ts`

```ts
declare var VERSION: string;
declare module '*.md' {
  import { CodeBlockData } from 'markdown-react-code-preview-loader';
  const src: CodeBlockData;
  export default src;
}
```

## Preview React Example

```tsx mdx:preview&boreder=0
import React from 'react';
const Demo = () => <div>Preview React Example</div>
export default Demo;
```

Note ⚠️: You need to add a special `meta` identifier to the code block example, and [`loader`](https://www.npmjs.com/package/markdown-react-code-preview-loader) will index the `react` example for code conversion.

```
    Meta Tag         Meta ID   Meta Param
    ┈┈┈┈┈┈┈┈         ┈┈┈┈┈┈┈   ┈┈┈┈┈┈┈┈┈┈
╭┈┈┈┈┈┈┈┈━╲━━━━━━━━━━━━╱━━━━━━━╱━━━━━┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈╮
┆ ```jsx mdx:preview:demo12&boreder=0                     ┆
┆ import React from "react"                               ┆
┆ const Demo = () => <div>Preview React Example</div>     ┆
┆ export default Demo                                     ┆
┆ ```                                                     ┆
╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈╯
```

1. `mdx:` special identifier prefix
2. `mdx:preview` Controls whether to perform example indexing, and obtain the required example object through the corresponding line number.
3. `mdx:preview:demo12` Uniquely identified by `demo12`, accurately obtain the `example code` or `example component object` of the index.
4. `mdx:preview:&code=0&border=0` pass the parameters for the rendering layer to use.

Support **meta** param:

1. `title` sample title
2. `boreder` = `1` | `0`, Set the display border
3. `checkered` = `1` | `0`, disable Checkered
4. `code` = `1` | `0`, Whether to display source code
5. `toolbar` = `1` | `0`, Whether to show the code folding button

```tsx mdx:preview
import React from 'react';
const Demo = () => <div>Preview React Example: <b>mdx:preview</b></div>
export default Demo;
```

```tsx mdx:preview&checkered=0
import React from 'react';
const Demo = () => <div>Preview React Example: <b>mdx:preview&checkered=0</b></div>
export default Demo;
```

## Props

```ts
import '@wcj/dark-mode';
import type { PropsWithChildren } from 'react';
import type { CodeBlockData } from 'markdown-react-code-preview-loader';
import type { GitHubCornersProps } from '@uiw/react-github-corners';
import type { MarkdownPreviewProps } from '@uiw/react-markdown-preview';
declare function Github(props: GitHubCornersProps): null;
declare function Corners(props: GlobalStore['darkMode']): null;
declare function Example({ children }: PropsWithChildren): null;
declare function NavMenu(props: NavMenuProps): null;
export interface MarkdownPreviewExampleProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  source: string;
  components: CodeBlockData['components'];
  data: CodeBlockData['data'];
  version?: string;
  title?: JSX.Element | string;
  markdownProps?: MarkdownPreviewProps;
  exampleProps?: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;
  logo?: JSX.Element;
  description?: JSX.Element | string;
  disableCorners?: boolean;
  disableDarkMode?: boolean;
  disableHeader?: boolean;
  disableBackToUp?: boolean;
}
declare const InternalMarkdownPreviewExample: import("react").ForwardRefExoticComponent<MarkdownPreviewExampleProps & import("react").RefAttributes<HTMLUListElement>>;
type ExampleComponent = typeof InternalMarkdownPreviewExample & {
  Example: typeof Example;
  Github: typeof Github;
  Corners: typeof Corners;
  NavMenu: typeof NavMenu;
};
declare const MarkdownPreviewExample: ExampleComponent;
export default MarkdownPreviewExample;
export interface NavMenuProps {
  title?: string;
  logo?: React.ReactNode;
  github?: string;
  menus?: Array<React.AnchorHTMLAttributes<HTMLAnchorElement>>;
}
export interface GlobalStore {
  corners: GitHubCornersProps;
  darkMode: Partial<HTMLElementTagNameMap['dark-mode']>;
  example?: React.ReactNode;
  navMenu?: NavMenuProps;
}
```

## Development

Runs the project in development mode.  

```bash
# Step 1, run first, listen to the component compile and output the .js file
# listen for compilation output type .d.ts file
npm run watch
# Step 2, development mode, listen to compile preview website instance
npm run start
```

Builds the app for production to the build folder.

```bash
npm run build
```

The build is minified and the filenames include the hashes.
Your app is ready to be deployed!

## Contributors

As always, thanks to our amazing contributors!

<a href="https://github.com/uiwjs/react-markdown-preview-example/graphs/contributors">
  <img src="https://uiwjs.github.io/react-markdown-preview-example/CONTRIBUTORS.svg" />
</a>

Made with [contributors](https://github.com/jaywcjlove/github-action-contributors).

## License

Licensed under the MIT License.
