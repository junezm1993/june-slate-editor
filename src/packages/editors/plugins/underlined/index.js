import createMarkPlugin from "../../utils/create-mark-plugin";
import React from "react";

export const UnderlinePlugin = createMarkPlugin({
  format: 'underline',
  title: '下划线',
  processLeaf: ({ leaf, childMark }) => {
    if (leaf.underline) {
      childMark.children = <u>{childMark.children}</u>;
    }
  }
})
