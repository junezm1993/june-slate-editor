import React, {useCallback, useMemo} from "react";
import { Editor } from "slate";
import { useSlate } from "slate-react";
import { Tooltip } from 'antd';
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

  /** 返回mark button 的 tips
   * @return {string}
   */
  const SwitchTips = useMemo(() => {
      switch(format) {
        case BOLD_TYPE:
          return '粗体';
        case ITALIC_TYPE:
          return '斜体';
        case UNDERLINE_TYPE:
          return '下划线';
        case STRIKETHROUGH_TYPE:
          return '删除线';
        case CODE_TYPE:
          return '行内代码';
        default:
          return '';
      }
  }, []);

  return <Tooltip
      placement="bottom"
      title={SwitchTips}
    ><div
      className="toolbar-mark-button"
      onMouseDown={event => {
        event.preventDefault();
        toggleMark(editor, format)
      }}
      style={{ color: isActive ? '#1890ff' : '' }}>
      <SwitchIcon format={format} />
    </div>
  </Tooltip>
};

export default MarkButton;
