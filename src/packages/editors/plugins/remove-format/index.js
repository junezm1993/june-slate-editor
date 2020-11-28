import React from "react";
import {useSlate} from "slate-react";
import {Tooltip} from "antd";
import classnames from 'classnames';
import {removeMark} from "../../utils/remove-mark";
import {IconFont} from "../../utils/icon-font";

export const removeFormatPlugin = {
  key: 'removeFormat',
  config: {
    title: '清除样式'
  },
  ToolbarButton: ({ format, config }) => {
    // console.log(format);
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
          removeMark(editor);
        }}
      >
        <IconFont format={format} />
      </div>
      </Tooltip>
    );
  }
};
