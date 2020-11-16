import React from 'react';
// bold block节点
export const ItalicElement = props => {
  return <p {...props.attributes}>{props.children}</p>
};
// bold 叶子节点
export const ItalicLeaf = ({ children }) => {
  return <em>{children}</em>;
};
