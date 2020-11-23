// 工具栏
import React from "react";
import { Divider } from 'antd';
import './index.scss';

export default React.memo(({ getEditorContainer, plugins }) => {
  return <>
    {
      plugins.map((plugin, index) => {
        if (plugin === 'line') {
          return <Divider key={'line-' + index} type="vertical" className="editor-toolbar-divider"/>
        }
          if (typeof plugin === 'string' && plugin !== 'line') {
          return null;
        }
        return <plugin.ToolbarButton key={plugin.key} config={plugin.config} format={plugin.key} getEditorContainer={getEditorContainer}/>;
      })
    }
    </>
});
