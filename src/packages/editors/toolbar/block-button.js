import React, {useCallback, useMemo, useState} from "react";
import { Editor } from "slate";
import { useSlate } from "slate-react";
import { Tooltip, Dropdown, Menu, Button } from 'antd';
import {
  BoldOutlined,
  ItalicOutlined,
  QuestionOutlined,
  UnderlineOutlined,
  StrikethroughOutlined,
  CodeOutlined,
} from '@ant-design/icons';
import {
  PARAGRAPH,
  HEADINGS,
  ITALIC_TYPE,
  STRIKETHROUGH_TYPE,
  UNDERLINE_TYPE,
  H1,
  H2,
  H3, H4, H5, H6
} from '../plugins/plugin-types';
import { toggleBlock } from '../utils/toolbar-helpers';

const BlockButton = ({ format }) => {
  const editor = useSlate();
  const [visible, setVisible] = useState(false);

  if (HEADINGS.includes(format)) {
    console.log(format);

    const text = {
      [PARAGRAPH]: '正文',
      [H1]: '标题一',
      [H2]: '标题二',
      [H3]: '标题三',
      [H4]: '标题四',
      [H5]: '标题五',
      [H6]: '标题六',
    };
    const HeadItem = ({type}) => <div key={type} onMouseDown={(event) => {
      event.preventDefault();
      toggleBlock(editor, type);
    }}>{text[type]}</div>;
    const headerOverlay = <>{ HEADINGS.map(item => <HeadItem type={item}/>) }</>;
    return <Tooltip placement="bottom" title="正文与标题">
      <Dropdown
        overlay={headerOverlay}
        trigger={'click'}
        placement="bottomCenter"
        arrow>
        <div>{ format }</div>
      </Dropdown>
    </Tooltip>
  }

  // return <div>aaaa</div>
};

export default BlockButton;
