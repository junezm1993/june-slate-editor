import React, { useMemo, useState, useCallback } from "react";
import { Editor, createEditor } from "slate";
import { Slate, Editable, withReact } from "slate-react";
import { Button } from "antd";
import { BoldOutlined } from '@ant-design/icons';
import './index.scss';
import Toolbar from '../toolbar';
import { RenderElement, RenderLeaf } from '../plugins/index';

const EditorComponent = () => {
  const editor = useMemo(() => withReact(createEditor()), []);
  // Add the initial value when setting up our state.
  const [value, setValue] = useState([
    {
      type: "paragraph",
      children: [{ text: "A line of text in a paragraph." }],
    },
  ]);

  const renderElement = useCallback(props => <RenderElement {...props} />, [])
  const renderLeaf = useCallback(props => <RenderLeaf {...props} />, [])

  return (
    <Slate
      editor={editor}
      value={value}
      onChange={(newValue) => setValue(newValue)}
    >
      <div className="editor-wrapper">
        <div className="editor-toolbar">
          <Toolbar />
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
};

export default EditorComponent;

const toggleMark = (editor, format) => {
  const isActive = isMarkActive(editor, format);

  if (isActive) {
    Editor.removeMark(editor, format)
  } else {
    Editor.addMark(editor, format, true)
  }
};

const isMarkActive = (editor, format) => {
  const marks = Editor.marks(editor);
  return marks ? marks[format] === true : false
};
