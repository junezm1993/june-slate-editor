import React, { useRef, useState } from 'react';
import { Tooltip, Dropdown, Menu } from 'antd';
import { Editor } from 'slate';
import { useSlate } from 'slate-react';
import {IconFont} from "../../utils/icon-font";

const LineHeight = React.memo(({ config, format }) => {
  const editor = useSlate();
  const lineHeights = config.lineHeights;
  // 获取当前selection的fontSize
  const currentLineHeight = useRef('1');
  const marks = Editor.marks(editor);
  if (marks && marks['lineHeight']) {
    currentLineHeight.current = marks['lineHeight'];
  } else {
    currentLineHeight.current = '1';
  }
  // 选择行高
  const onClick = ({ key, domEvent }) => {
    domEvent.preventDefault();
    domEvent.nativeEvent.preventDefault();
    console.log(key);
    Editor.addMark(editor, 'lineHeight', key);
  };

  const menu = () => {
    return <Menu onClick={onClick} onMouseDown={e => e.preventDefault()}>
      {lineHeights.map((item) => <Menu.Item key={item}>{Number(currentLineHeight.current) === item ? <IconFont format={'select'}/>: ''}{item}</Menu.Item>)}
    </Menu>
  };
  return <Tooltip placement="bottom" title={config.title}>
    <Dropdown overlay={menu} trigger={['click']} arrow={true}>
      <div className="editor-toolbar-item" onMouseDown={e => e.preventDefault()}>
        <IconFont format={format} />
      </div>
    </Dropdown>
  </Tooltip>
});

export const LineHeightPlugin = {
  key: 'lineHeight',
  config: {
    lineHeights: [1, 1.2, 1.5, 1.75, 2, 2.5, 3, 4],
    title: '行高',
  },
  ToolbarButton: LineHeight,
  processLeaf({ leaf, childMark }) {
    console.log('----', leaf);
    if (leaf.lineHeight) {
      childMark.style.lineHeight = leaf.lineHeight;
    }
  }
};
