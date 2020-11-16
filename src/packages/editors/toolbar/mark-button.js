import React from "react";
import { Editor } from "slate";
import { useSlate } from "slate-react";
import {
  BoldOutlined,
  ItalicOutlined,
  QuestionOutlined,
  UnderlineOutlined,
  StrikethroughOutlined,
  CodeOutlined,
} from '@ant-design/icons';
import { BOLD_TYPE, CODE_TYPE, ITALIC_TYPE, STRIKETHROUGH_TYPE, UNDERLINE_TYPE } from '../plugins/plugin-types';


const MarkButton = ({ format }) => {
  const editor = useSlate();
  // mark是否激活
  const isMarkActive = (editor, format) => {
    const marks = Editor.marks(editor);
    return marks ? marks[format] === true : false
  };
  const isActive = isMarkActive(editor, format);

  // 切换mark
  const toggleMark = (editor, format) => {
    const isActive = isMarkActive(editor, format);
    if (isActive) {
      Editor.removeMark(editor, format);
    } else {
      Editor.addMark(editor, format, true);
    }
  };
  // mark buttons
  function SwitchIcon(props) {
    switch(props.format) {
      case BOLD_TYPE:
        return <BoldOutlined />;
      case ITALIC_TYPE:
        return <ItalicOutlined />;
      case UNDERLINE_TYPE:
        return <UnderlineOutlined />;
      case STRIKETHROUGH_TYPE:
        return <StrikethroughOutlined />;
      case CODE_TYPE:
        return <CodeOutlined />;
      default:
        return <QuestionOutlined />;
    }
  }

  return <div
    className="toolbar-mark-button"
    onMouseDown={event => {
      event.preventDefault();
      toggleMark(editor, format)
    }}
    style={{ color: isActive ? '#1890ff' : '' }}>
    <SwitchIcon format={format} active={isActive}/>
  </div>
};

export default MarkButton;
