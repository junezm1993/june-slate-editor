import React from 'react'
import { CodeElement, CodeLeaf } from './inline-code';
import { BoldElement, BoldLeaf,  } from './bold';
import { ItalicElement, ItalicLeaf } from './italic';
import { HISTORY, PARAGRAPH, H1, H2, H3, H4, H5, H6 } from './plugin-types';

import historyPlugin from './history';

import createMarkPlugin from '../utils/create-mark-plugin';

// 个性化block节点
export const RenderElement = React.memo((props) => {
  const {
    attributes, children, element, customElements, plugins
  } = props;
  attributes.style = attributes.style || {};
  let block, plugin;

  for (let i = 0; i < plugins.length; i++) {
    plugin = plugins[i];
    // 如果有个性化的block逻辑
    if (plugin.processElement) {
      block = plugin.processElement({ attributes, children, element });
      if(block) {
        return block;
      }
    }
  }
  // 默认 block 元素
  return <p {...attributes}>{children}</p>;
})

// 个性化 leaf 节点
export const RenderLeaf = React.memo((props) => {
  let { attributes, children, leaf, plugins } = props;
  const style = {};
  const childMark = { children }
  console.log(children);
  plugins.forEach((plugin) => {
    if (plugin.processLeaf) {
      plugin.processLeaf({ attributes, children, leaf, style, childMark })
    }
  })

  if (leaf.key) {
    attributes.key = leaf.key;
  }
  console.log(children);
  debugger;
  return <span {...attributes} style={style}>{childMark.children}</span>;
});

// 个性化block节点
// export const RenderElement = (props) => {
//   const {
//     attributes, children, element, customElements
//   } = props;
//   const { type, data } = element;
//   console.log(customElements);
//   const baseElementRenderer = {
//     [PARAGRAPH]: () => (<p {...attributes}>{children}</p>),
//     [H1]: () => (<h1 {...attributes}>{children}</h1>),
//     [H2]: () => (<h2 {...attributes}>{children}</h2>),
//     [H3]: () => (<h3 {...attributes}>{children}</h3>),
//     [H4]: () => (<h4 {...attributes}>{children}</h4>),
//     [H5]: () => (<h5 {...attributes}>{children}</h5>),
//     [H6]: () => (<h6 {...attributes}>{children}</h6>),
//     default: () => {
//       console.log(`Didn't know how to render ${JSON.stringify(element, null, 2)}`);
//       return <p {...attributes}>{children}</p>;
//     }
//   };
//
//   const elementRenderer = customElements
//     ? { ...baseElementRenderer, ...customElements(attributes, children, element) }
//     : baseElementRenderer;
//
//   return (elementRenderer[type] || elementRenderer.default)();
// };

// const DefaultElement = props => {
//   return <p {...props.attributes}>{props.children}</p>
// };

// 个性化leaf节点
// export const RenderLeaf = (props) => {
//   let { attributes, children, leaf } =  props;
//   // 加粗
//   if (leaf.bold) {
//     children = <strong>{children}</strong>
//   }
//   // 斜体
//   if (leaf.italic) {
//     children = <em>{children}</em>
//   }
//   // 中划线
//   if (leaf.strikethrough) {
//     children = <del>{children}</del>
//   }
//   // 下划线
//   if (leaf.underline) {
//     children = <u>{children}</u>
//   }
//   // 行内代码
//   if (leaf.code) {
//     children = <code>{children}</code>
//   }
//
//   return <span {...attributes}>{children}</span>
// };

// const DefaultLeaf = props => {
//   return <span {...props.attributes}>
//         {props.children}
//     </span>
// };

export const pluginMap = {
  [HISTORY]: historyPlugin,
  bold: createMarkPlugin({
    format: 'bold',
    title: '加粗',
    processLeaf: ({ leaf, style, childMark }) => {
      if (leaf.bold) {
        childMark.children = <strong>{childMark.children}</strong>;
        style.fontWeight = 'bold';
      }
    }
  }),
  italic: createMarkPlugin({
    format: 'italic',
    title: '斜体',
    processLeaf: ({ leaf, style, childMark }) => {
      if (leaf.italic) {
        childMark.children = <em>{childMark.children}</em>;
        style.fontStyle = 'italic';
      }
    }
  }),
}
