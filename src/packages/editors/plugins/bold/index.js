import React from 'react';
import createMarkPlugin from "../../utils/create-mark-plugin";
// bold block节点
export const BoldElement = props => {
  return <p {...props.attributes}>{props.children}</p>
};
// bold 叶子节点
export const BoldLeaf = ({ children }) => {
  return <strong>{children}</strong>;
};

export const BoldPlugin = createMarkPlugin({
  format: 'bold',
  title: '加粗',
  processLeaf: ({ leaf, childMark }) => {
    if (leaf.bold) {
      childMark.children = <strong>{childMark.children}</strong>;
      // childMark.style.fontWeight = 'bold';
    }
  }
})
