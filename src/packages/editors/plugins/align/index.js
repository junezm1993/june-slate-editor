import React from 'react';
import { Tooltip, Dropdown, Menu } from 'antd';
import { Editor, Transforms } from 'slate';
import { useSlate } from 'slate-react';
import {IconFont} from "../../utils/icon-font";

const Align = React.memo(({ config, format }) => {
  const editor = useSlate();
  const alignTypes = config.alignTypes;
  // 获取当前selection的align
  let align = 'left';
  const [match] = Editor.nodes(editor, {
    match: (n) => n.align
  });
  if (match && match[0]) {
    align = match[0].align;
  }
  // 选择对齐方式大小
  const onClick = ({ key, domEvent }) => {
    domEvent.preventDefault();
    domEvent.nativeEvent.preventDefault();
    Transforms.setNodes(editor, {
      align: key
    });
  };

  const menu = () => {
    return <Menu onClick={onClick} onMouseDown={e => e.preventDefault()}>
      {Object.keys(alignTypes).map((item) =>
        <Menu.Item key={item}>
          {align === item ? <IconFont format={'select'}/>: ''}
          {alignTypes[item]}
        </Menu.Item>)
      }
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

export const AlignPlugin = {
  key: 'align',
  config: {
    alignTypes: {'left': '左对齐', 'right':'右对齐', 'center': '居中对齐', 'justify': '两段对齐'},
    title: '对齐方式'
  },
  ToolbarButton: Align,
  processElement: ({ attributes, element }) => {
    if (element.align) {
      attributes.style['textAlign'] = element.align;
    }
  }
};
