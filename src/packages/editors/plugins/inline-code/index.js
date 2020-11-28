import React from 'react'

import { Editor, Transforms, Text } from 'slate';
import { Tooltip, Button } from 'antd';

// 当前选中的是否 code
const isCodeBlockActive = (editor) => {
  const [match] = Editor.nodes(editor, {
    match: n => n.type === 'code',
  })

  return !!match
}
// 切换 code 状态
export const toggleCodeBlock = (editor) => {
  const isActive = isCodeBlockActive(editor);
  Transforms.setNodes(
      editor,
      {
        type: isActive ? null : 'code',
        code: isActive ? null : true
      },
      { match: n => Text.isText(n), split: true }
  )
};

// code block节点
export const CodeElement = props => {
  return (
      <pre {...props.attributes}>
        <code>{props.children}</code>
      </pre>
  )
};

// code 叶子节点
const styles = {
  fontFamily: 'monospace',
  fontSize: 'inherit',
  backgroundColor: 'rgba(0, 0, 0, 0.06)',
  padding: '0 2px',
  border: '1px solid rgba(0, 0, 0, 0.08)',
  borderRadius: '2px 2px',
  lineHeight: 'inherit',
  wordWrap: 'break-word',
  textIndent: 0
}
export const CodeLeaf = props => {
  return (
      <code
          {...props.attributes}
          style={styles}
      >
        {props.children}
      </code>
  )
}

// Code 按钮
export const CodeBtn = () => {
  return (
      <Tooltip placement="top" title={'代码'}>
        <Button>Code</Button>
      </Tooltip>
  )
}
