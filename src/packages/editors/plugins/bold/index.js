import React from 'react';
import createMarkPlugin from "../../utils/create-mark-plugin";

export const BoldPlugin = createMarkPlugin({
  format: 'bold',
  title: '加粗',
  processLeaf: ({ leaf, childMark }) => {
    if (leaf.bold) {
      childMark.children = <strong>{childMark.children}</strong>;
      // childMark.style.fontWeight = 'bold';
    }
  }
});
