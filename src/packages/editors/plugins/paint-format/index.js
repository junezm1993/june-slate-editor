import React from "react";
import { Editor } from "slate";
import {useSlate} from "slate-react";
import {Tooltip} from "antd";
import classnames from 'classnames';
import {IconFont} from "../../utils/icon-font";

export const paintFormatPlugin = {
  key: 'paintFormat',
  config: {
    title: '格式刷'
  },
  withEditor: (editor) => {
    const { onChange, insertText, isInline } = editor;
    editor.formatStatus = 0;
    console.log(111111);
    // editor.onChange = () => {
    //   if (editor.formatStatus === 1) {
    //     console.log(2222);
    //     editor.formatStatus = 0;
    //     Editor.addMark(editor,'bold', true);
    //   }
    //
    //   onChange();
    //
    // }
    return editor;
  },
  ToolbarButton: ({ format, config }) => {
    const editor = useSlate();
    return (
      <Tooltip
        placement="bottom"
        title={config.title}
      ><div
        className={classnames({
          "editor-toolbar-item": true,
          "editor-toolbar-item-disabled": false,
        })}
        onMouseDown={event => {
          event.preventDefault();
          const marks = Editor.marks(editor);
          editor.formatStatus = 1;
          editor.recordMark = marks;
          console.log(marks);
          console.log(editor);
        }}
      >
        <IconFont format={format} />
      </div>
      </Tooltip>
    );
  }
};
