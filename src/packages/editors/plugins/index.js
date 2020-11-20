import React from 'react'
import { CodeElement, CodeLeaf } from './inline-code';
import { BoldPlugin } from './bold';
import { ItalicPlugin } from './italic';
import { HISTORY, PARAGRAPH, H1, H2, H3, H4, H5, H6 } from './plugin-types';

import historyPlugin from './history';

import createMarkPlugin from '../utils/create-mark-plugin';
import {UnderlinePlugin} from "./underlined";
import {StrikethroughPlugin} from "./strikethrough";
import {SuperscriptPlugin} from "./superscript";
import {SubscriptPlugin} from "./subscript";

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
  const childMark = { children, style: {} }
  plugins.forEach((plugin) => {
    if (plugin.processLeaf) {
      plugin.processLeaf({ attributes, children, leaf, childMark })
    }
  })

  if (leaf.key) {
    attributes.key = leaf.key;
  }
  return <span {...attributes} style={childMark.style}>{childMark.children}</span>;
});

// plugin map
export const pluginMap = {
  [HISTORY]: historyPlugin,
  bold: BoldPlugin,
  italic: ItalicPlugin,
  underline: UnderlinePlugin,
  strikethrough: StrikethroughPlugin,
  superscript: SuperscriptPlugin,
  subscript: SubscriptPlugin,
}
