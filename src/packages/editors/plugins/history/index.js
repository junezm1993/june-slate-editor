import React from 'react';
import { Editable, withReact, useSlate, Slate } from 'slate-react';
import { withHistory } from 'slate-history';
import { HISTORY, HISTORY_TYPES } from '../plugin-types';
import {Tooltip} from "antd";
import { UndoOutlined, RedoOutlined } from '@ant-design/icons';

export default {
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
          className="toolbar-mark-button"
          onMouseDown={event => {
            event.preventDefault();
            editor.undo();
          }}
        >
          <UndoOutlined disabled={history.undos.length < 2}/>
        </div>
        </Tooltip>
        <Tooltip
          placement="bottom"
          title={config.title.redo}
        ><div
          className="toolbar-mark-button"
          onMouseDown={event => {
            event.preventDefault();
            editor.redo();
          }}
        >
          <RedoOutlined disabled={history.redos.length === 0}/>
        </div>
        </Tooltip>
      </>
    );
  })
};
