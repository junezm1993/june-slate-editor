import React from 'react';
import { useSlate } from 'slate-react';
import { withHistory } from 'slate-history';
import classnames from 'classnames';
import { HISTORY, HISTORY_TYPES } from '../plugin-types';
import {Tooltip} from "antd";
import { UndoOutlined, RedoOutlined } from '@ant-design/icons';

const historyPlugin = {
  key: HISTORY,
  config: {
    title: {
      [HISTORY_TYPES.UNDO]: '撤销',
      [HISTORY_TYPES.REDO]: '重做'
    }
  },
  withEditor: (editor) => {
    return withHistory(editor);
  },
  ToolbarButton: React.memo(({ config }) => {
    const editor = useSlate();
    const history = editor.history;
    return (
      <>
        <Tooltip
          placement="bottom"
          title={config.title.undo}
        ><div
          className={classnames({
            "editor-toolbar-item": true,
            "editor-toolbar-item-disabled": history.undos.length < 2,
          })}
          onMouseDown={event => {
            event.preventDefault();
            editor.undo();
          }}
        >
          <UndoOutlined />
        </div>
        </Tooltip>
        <Tooltip
          placement="bottom"
          title={config.title.redo}
        ><div
          className={classnames({
            "editor-toolbar-item": true,
            "editor-toolbar-item-disabled": history.redos.length === 0,
          })}
          onMouseDown={event => {
            event.preventDefault();
            editor.redo();
          }}
        >
          <RedoOutlined />
        </div>
        </Tooltip>
      </>
    );
  })
};

export default historyPlugin;
