import React from "react";
import { Editor } from "slate";
import {useSlate} from "slate-react";
import {Tooltip} from "antd";
import classnames from 'classnames';
import {IconFont} from "../../utils/icon-font";
import IconSelectText from '../../images/brush_ibeam_mac.png';

export const paintFormatPlugin = {
  key: 'paintFormat',
  config: {
    title: '格式刷'
  },
  withEditor: (editor) => {
    editor.formatStatus = 0;
    return editor;
  },
  ToolbarButton: ({ format, config, getEditorContainer }) => {
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
          if (Object.keys(marks).length > 0) {
            editor.formatStatus = 1;
            editor.recordMark = marks;
            getEditorContainer().style.cursor = `url(${IconSelectText}) 5 5,text`;
          }
        }}
      >
        <IconFont format={format} />
      </div>
      </Tooltip>
    );
  }
};

export const handlePaintFormat = ({ editor, getEditorContainer }) => {
  const { formatStatus, recordMark } = editor;
  if (formatStatus === 1) {
    Object.keys(recordMark).forEach(mark => {
      editor.addMark(mark, recordMark[mark]);
    });
    editor.formatStatus = 0;
    getEditorContainer().style.cursor = `text`;
  }
};
