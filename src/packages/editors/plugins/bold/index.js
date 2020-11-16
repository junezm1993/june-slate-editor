import React from 'react';
// bold block节点
export const BoldElement = props => {
  return <p {...props.attributes}>{props.children}</p>
};
// bold 叶子节点
export const BoldLeaf = ({ children }) => {
  return <strong>{children}</strong>;
};