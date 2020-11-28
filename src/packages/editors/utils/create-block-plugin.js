import React, { useContext } from 'react';
import { isBlockActive, toggleBlock } from '../utils/toolbar-helpers.js';
import classnames from 'classnames';
import { useSlate } from 'slate-react';
import {Tooltip} from "antd";
import {IconFont} from "./icon-font";

const BlockButton = React.memo(({ children, title, format, otherFormat }) => {
  const editor = useSlate();

  return <Tooltip
    placement="bottom"
    title={title}
  ><div
    className="editor-toolbar-item"
    onMouseDown={event => {
      event.preventDefault();
      toggleBlock(editor, format, otherFormat)
    }}
    style={{ color: isBlockActive(editor, format) ? '#1890ff' : '' }}>
    <IconFont format={format} />
  </div>
  </Tooltip>;
});

export default ({ format, title, otherFormat, config, processElement, icon, withEditor, ...props }) => {
  config = config || {};
  config.title = title;
  return {
    key: format,
    config,
    ToolbarButton: () => {
      return (
        <BlockButton key={format} format={format} title={title} otherFormat={otherFormat} />
      );
    },
    processElement,
    withEditor: (editor) => {
      console.log(editor);
      editor.__BLOCKS__.push(format);
      if (withEditor) {
        return withEditor(editor);
      }
      return editor
    },
    ...props
  };
};

