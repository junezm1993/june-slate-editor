import createMarkPlugin from "../../utils/create-mark-plugin";
import React from "react";

export const SubscriptPlugin = createMarkPlugin({
  format: 'subscript',
  title: '删除线',
  processLeaf: ({ leaf, childMark }) => {
    if (leaf.subscript) {
      childMark.children = <sub>{childMark.children}</sub>;
    }
  }
})
