import React, {useMemo, useState, useCallback, useRef} from "react";
import PropTypes from 'prop-types';
import { createEditor } from "slate";
import { Slate, Editable, withReact } from "slate-react";
import merge from 'merge';
import classnames from 'classnames';

import './index.scss';
import Toolbar from '../toolbar';
import { defaultPlugins } from "../consts/default-plugins";
import { RenderElement, RenderLeaf, pluginMap } from '../plugins/index';
import {handlePaintFormat} from "../plugins/paint-format";
import { withBlockEditor } from '../utils/toolbar-helpers';

const EditorComponent = React.memo(({ className: _className, value, onChange, plugins: _plugins }) => {
  // const editor = useMemo(() => withReact(createEditor()), []);
  // 插件map初始化
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

  const [className, setClassName] = useState('');
  const editor = useMemo(() => {
    let editor = withBlockEditor(withReact(createEditor()));
    plugins.forEach(item => {
      if (item.withEditor) {
        editor = item.withEditor(editor);
      }
    });
    let _className = className;
    Object.defineProperty(editor, 'className', {
      get() {
        return _className;
      },
      set: function (value) {
        _className = value;
        setClassName(value);
      }
    });

    return editor;
  }, []);

  const renderElement = useCallback(props => <RenderElement {...props} plugins={plugins}/>, [])
  const renderLeaf = useCallback(props => <RenderLeaf {...props} plugins={plugins}/>, [])
  // 格式刷的函数
  const handleMouseUp = useCallback(() => handlePaintFormat({ editor, getEditorContainer}), []);
  // editor ref
  const containerNode = useRef(null);
  const getEditorContainer = useCallback(() => containerNode.current, []);

  return (
    <Slate editor={editor} value={value} onChange={onChange}>
      <div className="editor-wrapper">
        <div className="editor-toolbar">
          <Toolbar plugins={plugins} getEditorContainer={getEditorContainer}/>
        </div>
        <div className="editor-content-container editor-scroll-container">
          <div className={classnames({
            "editor-content": true,
            "editor-content-painter": editor.formatStatus === 1,
          })} ref={containerNode}>
            <Editable
              className="editor-core"
              renderElement={renderElement}
              renderLeaf={renderLeaf}
              onMouseUp={handleMouseUp}
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
};

export default EditorComponent;
