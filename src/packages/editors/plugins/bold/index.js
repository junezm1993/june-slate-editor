import React from 'react';
// 类型
export const BOLD_TYPE = 'bold';
// bold block节点
export const BoldElement = props => {
  return <p {...props.attributes}>{props.children}</p>
};
// bold 叶子节点
export const BoldLeaf = props => {
  return (
      <span
          {...props.attributes}
          style={{ fontWeight: props.leaf.bold ? 'bold' : 'normal' }}
      >
        {props.children}
      </span>
  )
};
