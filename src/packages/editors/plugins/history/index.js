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
          <UndoOutlined />
        </div>
        </Tooltip>
        <button
          type="button"
          key="undo"
          disabled={history.undos.length < 2}
          data-title={config.title.undo}
          className="slate-toolbar-item"
          onMouseDown={(e) => {
            e.preventDefault();
            editor.undo();
          }}>
          <i className="bfi-undo"></i>
        </button>
        <button
          type="button"
          key="redo"
          disabled={history.redos.length === 0}
          data-title={config.title.redo}
          className="slate-toolbar-item"
          onMouseDown={(e) => {
            e.preventDefault();
            editor.redo();
          }}>
          <i className="bfi-redo"></i>
        </button>
      </>
    );
  })
};
