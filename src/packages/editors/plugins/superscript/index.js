import createMarkPlugin from "../../utils/create-mark-plugin";
import React from "react";

export const SuperscriptPlugin = createMarkPlugin({
  format: 'superscript',
  title: '上标',
  processLeaf: ({ leaf, childMark }) => {
    if (leaf.superscript) {
      childMark.children = <sup>{childMark.children}</sup>;
    }
  }
})
