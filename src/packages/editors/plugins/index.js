import React from 'react'
import { CodeElement, CodeLeaf } from './inline-code';
import { BoldElement, BoldLeaf,  } from './bold';
import { ItalicElement, ItalicLeaf } from './italic';
import { BOLD_TYPE, ITALIC_TYPE, UNDERLINE_TYPE } from './plugin-types';

// 个性化block节点
export const RenderElement = (props) => {
  switch (props.element.type) {
    case BOLD_TYPE:
      return <BoldElement {...props} />;
    case ITALIC_TYPE:
      return <ItalicElement {...props} />;
    default:
      return <DefaultElement {...props}/>;
  }
};

const DefaultElement = props => {
  return <p {...props.attributes}>{props.children}</p>
};

// 个性化leaf节点
export const RenderLeaf = (props) => {
  let { attributes, children, leaf } =  props;
  console.log(leaf);
  // 加粗
  if (leaf.bold) {
    children = <strong>{children}</strong>
  }
  // 斜体
  if (leaf.italic) {
    children = <em>{children}</em>
  }
  // 中划线
  if (leaf.strikethrough) {
    children = <del>{children}</del>
  }
  // 下划线
  if (leaf.underline) {
    children = <u>{children}</u>
  }
  // 行内代码
  if (leaf.code) {
    children = <code>{children}</code>
  }

  return <span {...attributes}>{children}</span>
};

const DefaultLeaf = props => {
  return <span {...props.attributes}>
        {props.children}
    </span>
};
