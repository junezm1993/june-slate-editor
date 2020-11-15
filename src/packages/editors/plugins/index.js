import React from 'react'
import { CodeElement, CodeLeaf } from './inline-code';
import { BoldElement, BoldLeaf } from './bold';

// 个性化block节点
export const RenderElement = (props) => {
  switch (props.element.type) {
    case 'code':
      return <CodeElement {...props} />;
    case 'bold':
      return <BoldElement {...props} />;
    default:
      return <DefaultElement {...props}/>;
  }
};

const DefaultElement = props => {
  return <p {...props.attributes}>{props.children}</p>
};

// 个性化leaf节点
export const RenderLeaf = (props) => {
  if(props.leaf.bold) {
    return <BoldLeaf {...props} />;
  }
  if(props.leaf.code) {
    return <CodeLeaf {...props} />;
  }
  return <DefaultLeaf {...props} />;
};

const DefaultLeaf = props => {
  return <span {...props.attributes}>
        {props.children}
    </span>
};
