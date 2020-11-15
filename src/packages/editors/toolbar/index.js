// 工具栏 1.mark工具栏  2.block工具栏
import React from "react";
import { BOLD_TYPE } from '../plugins/bold/index';

import MarkButton from "./mark-button";

const Toolbar = () => {
  return <>
    <div className="editor-toolbar-item">
      <MarkButton format={BOLD_TYPE} />
    </div>
  </>
};

export default Toolbar;
