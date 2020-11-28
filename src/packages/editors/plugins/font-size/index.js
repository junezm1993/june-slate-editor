import React, { useRef, useState } from 'react';
import { Tooltip, Dropdown, Menu } from 'antd';
import { Editor } from 'slate';
import { useSlate } from 'slate-react';
import {DownOutlined} from "@ant-design/icons";

const FontSize = React.memo(({ config }) => {
  const editor = useSlate();
  const fontSizes = config.fontSizes;
  // 获取当前selection的fontSize
  const currentFontSize = useRef('14');
  const marks = Editor.marks(editor);
  if (marks && marks['fontSize']) {
    currentFontSize.current = marks['fontSize'];
  } else {
    currentFontSize.current = '14';
  }
  // 选择字体大小
  const onClick = ({ key, domEvent }) => {
    domEvent.preventDefault();
    domEvent.nativeEvent.preventDefault();
    Editor.addMark(editor, 'fontSize', key);
  };

  const menu = () => {
    return <Menu onClick={onClick} onMouseDown={e => e.preventDefault()}>
      {fontSizes.map((item) => <Menu.Item key={item}>{item}</Menu.Item>)}
    </Menu>
  };

  return <Tooltip placement="bottom" title={config.title}>
    <Dropdown overlay={menu} trigger={['click']} arrow={true}>
      <div className="editor-toolbar-item" onMouseDown={e => e.preventDefault()}>
        {currentFontSize.current}<DownOutlined />
      </div>
    </Dropdown>
  </Tooltip>
});

export const fontSizePlugin = {
  key: 'fontSize',
  config: {
    fontSizes: [12, 14, 16, 18, 20, 24, 28, 30],
    title: '字号'
  },
  ToolbarButton: FontSize,
  processLeaf({ leaf, childMark }) {
    if (leaf.fontSize) {
      childMark.style.fontSize = leaf.fontSize + 'px';
    }
  }
};
