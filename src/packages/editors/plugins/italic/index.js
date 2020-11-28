import React from 'react';
import createMarkPlugin from "../../utils/create-mark-plugin";
// bold block节点
export const ItalicElement = props => {
  return <p {...props.attributes}>{props.children}</p>
};
// bold 叶子节点
export const ItalicLeaf = ({ children }) => {
  return <em>{children}</em>;
};

export const ItalicPlugin = createMarkPlugin({
  format: 'italic',
  title: '斜体',
  processLeaf: ({ leaf, childMark }) => {
    if (leaf.italic) {
      childMark.children = <em>{childMark.children}</em>;
      // childMark.style.fontStyle = 'italic';
    }
  }
})
