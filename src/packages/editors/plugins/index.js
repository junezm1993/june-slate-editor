import React from 'react'

import { BoldPlugin } from './bold';
import { ItalicPlugin } from './italic';
import { historyPlugin } from './history';
import {UnderlinePlugin} from "./underlined";
import {StrikethroughPlugin} from "./strikethrough";
import {SuperscriptPlugin} from "./superscript";
import {SubscriptPlugin} from "./subscript";
import {InlineCodePlugin} from './inline-code';
import {removeFormatPlugin} from "./remove-format";
import {paintFormatPlugin} from "./paint-format";
import {headingPlugin} from "./heading";
import {fontSizePlugin} from "./font-size";
import {colorPlugin} from "./color";
import {IndentPlugin} from "./indent";
import {AlignPlugin} from "./align";
import {UnorderedListPlugin} from "./unordered-list";
import {OrderedListPlugin} from "./ordered-list";
import {LineHeightPlugin} from "./line-height";

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
});

// 个性化 leaf 节点
export const RenderLeaf = React.memo((props) => {
  let { attributes, children, leaf, plugins } = props;
  const childMark = { children, style: {} };
  console.log(leaf);
  plugins.forEach((plugin) => {
    if (plugin.processLeaf) {
      plugin.processLeaf({ attributes, children, leaf, childMark })
    }
  });

  if (leaf.key) {
    attributes.key = leaf.key;
  }
  return <span {...attributes} style={childMark.style}>{childMark.children}</span>;
});

// plugin map
export const pluginMap = {
  history: historyPlugin,
  paintFormat: paintFormatPlugin,
  removeFormat: removeFormatPlugin,
  headings: headingPlugin,
  fontSize: fontSizePlugin,
  color: colorPlugin,
  bold: BoldPlugin,
  italic: ItalicPlugin,
  underline: UnderlinePlugin,
  strikethrough: StrikethroughPlugin,
  superscript: SuperscriptPlugin,
  subscript: SubscriptPlugin,
  inlineCode: InlineCodePlugin,
  indent: IndentPlugin,
  align: AlignPlugin,
  lineHeight: LineHeightPlugin,
  unorderedList: UnorderedListPlugin,
  orderedList: OrderedListPlugin,
};
