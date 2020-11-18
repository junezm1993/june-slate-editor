import React from 'react'
import { CodeElement, CodeLeaf } from './inline-code';
import { BoldElement, BoldLeaf,  } from './bold';
import { ItalicElement, ItalicLeaf } from './italic';
import { HISTORY, PARAGRAPH, H1, H2, H3, H4, H5, H6 } from './plugin-types';

// 个性化block节点
export const RenderElement = (props) => {
  const {
    attributes, children, element, customElements
  } = props;
  const { type, data } = element;
  console.log(customElements);
  const baseElementRenderer = {
    [PARAGRAPH]: () => (<p {...attributes}>{children}</p>),
    [H1]: () => (<h1 {...attributes}>{children}</h1>),
    [H2]: () => (<h2 {...attributes}>{children}</h2>),
    [H3]: () => (<h3 {...attributes}>{children}</h3>),
    [H4]: () => (<h4 {...attributes}>{children}</h4>),
    [H5]: () => (<h5 {...attributes}>{children}</h5>),
    [H6]: () => (<h6 {...attributes}>{children}</h6>),
    default: () => {
      console.log(`Didn't know how to render ${JSON.stringify(element, null, 2)}`);
      return <p {...attributes}>{children}</p>;
    }
  };

  const elementRenderer = customElements
    ? { ...baseElementRenderer, ...customElements(attributes, children, element) }
    : baseElementRenderer;

  return (elementRenderer[type] || elementRenderer.default)();
};

const DefaultElement = props => {
  return <p {...props.attributes}>{props.children}</p>
};

// 个性化leaf节点
export const RenderLeaf = (props) => {
  let { attributes, children, leaf } =  props;
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

export const defaultPlugins = [
  HISTORY,
  'line',
  'fontSize',
  'lineHeight',
  'letterSpacing',
  'line',
  'textColor',
  'bold',
  'italic',
  'underlined',
  'strikethrough',
  'line',
  'superscript',
  'subscript',
  'format-clear',
  'line',
  'indent',
  'align',
  'line',
  'headings',
  'bulleted-list',
  'numbered-list',
  'block-quote',
  'block-code',
  'line',
  'linkEditor',
  'hr',
  'clear-all',
  'line',
  'fullscreen'
];

const pluginMap = {
  [HISTORY]: 1
}
