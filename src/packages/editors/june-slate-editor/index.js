import React, { useMemo, useState, useCallback } from "react";
import PropTypes from 'prop-types';
import { createEditor } from "slate";
import { Slate, Editable, withReact } from "slate-react";
import merge from 'merge';

import './index.scss';
import Toolbar from '../toolbar';
import { defaultPlugins } from "../consts/default-plugins";
import { RenderElement, RenderLeaf, pluginMap } from '../plugins/index';

const EditorComponent = React.memo(({ className: _className, value, onChange, plugins: _plugins }) => {
  const editor = useMemo(() => withReact(createEditor()), []);

  const plugins = useMemo(() => {
    return _plugins.map((item) => {
      if (typeof item === 'string') {
        return pluginMap[item] || item;
      } else if (pluginMap[item.key]) {
        return merge(pluginMap[item.key], item);
      } else {
        return item;
      }
    });
  }, [_plugins]);

  const renderElement = useCallback(props => <RenderElement {...props} plugins={plugins}/>, [])
  const renderLeaf = useCallback(props => <RenderLeaf {...props} plugins={plugins}/>, [])

  return (
    <Slate editor={editor} value={value} onChange={onChange}>
      <div className="editor-wrapper">
        <div className="editor-toolbar">
          <Toolbar plugins={plugins}/>
        </div>
        <div className="editor-content-container editor-scroll-container">
          <div className="editor-content">
            <Editable
              className="editor-core"
              renderElement={renderElement}
              renderLeaf={renderLeaf}
            />
          </div>
        </div>
      </div>
    </Slate>
  );
});
// 默认插件
EditorComponent.defaultProps = {
  plugins: defaultPlugins
};
// 类型
EditorComponent.prototype = {
  className: PropTypes.string,
  plugins: PropTypes.array,
  value: PropTypes.string,
  onChange: PropTypes.func,
}

export default EditorComponent;
