import React from 'react';
import createMarkPlugin from "../../utils/create-mark-plugin";

export const InlineCodePlugin = createMarkPlugin({
  format: 'inlineCode',
  title: '行内代码',
  processLeaf: ({ leaf, childMark }) => {
    if (leaf.inlineCode) {
      childMark.children = <code>{childMark.children}</code>;
    }
  }
});
