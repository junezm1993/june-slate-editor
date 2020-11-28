import createMarkPlugin from "../../utils/create-mark-plugin";
import React from "react";

export const StrikethroughPlugin = createMarkPlugin({
  format: 'strikethrough',
  title: '删除线',
  processLeaf: ({ leaf, childMark }) => {
    if (leaf.strikethrough) {
      childMark.children = <del>{childMark.children}</del>;
    }
  }
})
