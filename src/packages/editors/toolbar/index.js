// 工具栏 1.mark工具栏  2.block工具栏
import React from "react";
import {BOLD_TYPE, CODE_TYPE, ITALIC_TYPE, STRIKETHROUGH_TYPE, UNDERLINE_TYPE, H1} from '../plugins/plugin-types';

import MarkButton from "./mark-button";
import BlockButton from "./block-button";

// const Toolbar = () => {
//   return <>
//     <div className="editor-toolbar-item">
//       <BlockButton format={H1} />
//     </div>
//     <div className="editor-toolbar-item">
//       <MarkButton format={BOLD_TYPE} />
//       <MarkButton format={ITALIC_TYPE} />
//       <MarkButton format={UNDERLINE_TYPE} />
//       <MarkButton format={STRIKETHROUGH_TYPE} />
//       <MarkButton format={CODE_TYPE} />
//     </div>
//   </>
// };

export default React.memo(({ plugins }) => {
  return <>
    {
      plugins.map((plugin, index) => {
        if (plugin === 'line') {
          return <span key={'line' + index} className="slate-toolbar-line" />;
        }
        return <div key={index} config={plugin.config}/>
      })
    }
    </>
});

// export default Toolbar;
