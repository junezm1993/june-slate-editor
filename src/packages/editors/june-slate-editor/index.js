import React, { useMemo, useState } from "react";
import { createEditor } from "slate";
import { Slate, Editable, withReact } from "slate-react";
import { Button } from "antd";
import './index.scss';

const EditorComponent = () => {
  const editor = useMemo(() => withReact(createEditor()), []);
  // Add the initial value when setting up our state.
  const [value, setValue] = useState([
    {
      type: "paragraph",
      children: [{ text: "A line of text in a paragraph." }],
    },
  ]);

  return (
    <Slate
      editor={editor}
      value={value}
      onChange={(newValue) => setValue(newValue)}
    >
      <div className="editor-wrapper">
        <div className="editor-toolbar">
          11
        </div>
        <div className="editor-content-container editor-scroll-container">
          <div className="editor-content">
            <Editable className="editor-core"/>
          </div>
        </div>
      </div>
    </Slate>
  );
};

export default EditorComponent;
