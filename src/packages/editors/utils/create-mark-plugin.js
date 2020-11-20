import {useSlate} from "slate-react";
import {Editor} from "slate";
import {BOLD_TYPE, CODE_TYPE, ITALIC_TYPE, STRIKETHROUGH_TYPE, UNDERLINE_TYPE, SUPERSCRIPT_TYPE, SUBSCRIPT_TYPE} from "../plugins/plugin-types";
import {
  BoldOutlined,
  CodeOutlined,
  ItalicOutlined,
  QuestionOutlined,
  StrikethroughOutlined,
  UnderlineOutlined,
  createFromIconfontCN,
} from "@ant-design/icons";
import React, {useMemo} from "react";
import {Tooltip} from "antd";

const IconFont = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_2218973_0nxdm9knzbt.js',
});

const MarkButton = React.memo(({ format, title }) => {
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
      case SUPERSCRIPT_TYPE:
        return <IconFont type="slate-shangbiao" />;
      case SUBSCRIPT_TYPE:
        return <IconFont type="slate-xiabiao" />;
      case CODE_TYPE:
        return <CodeOutlined />;
      default:
        return <QuestionOutlined />;
    }
  }

  // /** 返回mark button 的 tips
  //  * @return {string}
  //  */
  // const SwitchTips = useMemo(() => {
  //   switch(format) {
  //     case BOLD_TYPE:
  //       return '粗体';
  //     case ITALIC_TYPE:
  //       return '斜体';
  //     case UNDERLINE_TYPE:
  //       return '下划线';
  //     case STRIKETHROUGH_TYPE:
  //       return '删除线';
  //     case CODE_TYPE:
  //       return '行内代码';
  //     default:
  //       return '';
  //   }
  // }, []);

  return <Tooltip
    placement="bottom"
    title={title}
  ><div
    className="editor-toolbar-item"
    onMouseDown={event => {
      event.preventDefault();
      toggleMark(editor, format)
    }}
    style={{ color: isActive ? '#1890ff' : '' }}>
    <SwitchIcon format={format} />
  </div>
  </Tooltip>
});

export default ({ format, title, otherFormat, config, processLeaf }) => {
  config = config || {};
  config.title = title;
  config.key = format;

  return {
    key: format,
    config,
    ToolbarButton: () => <MarkButton format={format} title={title}/>,
    processLeaf: processLeaf || (({ leaf, style}) => {
      if (leaf[format]) {
        style[format] = leaf[format];
      }
    })
  }
}
