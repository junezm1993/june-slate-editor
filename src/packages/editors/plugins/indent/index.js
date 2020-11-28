import React from "react";
import { Editor, Transforms } from 'slate';
import { useSlate } from 'slate-react';
import classnames from "classnames";
import {Tooltip} from "antd";

import { IconFont } from "../../utils/icon-font";

const IndentButtons = React.memo(({ config }) => {
  const editor = useSlate();
  let increase = 0;
  const [match] = Editor.nodes(editor, {
    match: (n) => n.increase
  });
  if (match && match[0]) {
    increase = match[0].increase;
  }
  return <>
    <Tooltip
      placement="bottom"
      title={config.title.increase}
    ><div
      className={classnames({
        "editor-toolbar-item": true
      })}
      onMouseDown={event => {
        event.preventDefault();
        Transforms.setNodes(editor, {
          increase: increase + 1
        });
      }}
    >
      <IconFont format={'indent'} />
    </div>
    </Tooltip>
    <Tooltip
      placement="bottom"
      title={config.title.decrease}
    ><div
      className={classnames({
        "editor-toolbar-item": true,
        "editor-toolbar-item-disabled": increase === 0,
      })}
      onMouseDown={event => {
        event.preventDefault();
        Transforms.setNodes(editor, {
          increase: increase - 1
        });
      }}
    >
      <IconFont format={'suojin'} />
    </div>
    </Tooltip>
  </>;
});


export const IndentPlugin = {
  key: 'indent',
  config: {
    title: {
      increase: '增加缩进',
      decrease: '减少缩进'
    }
  },
  ToolbarButton: IndentButtons,
  processElement: ({ attributes, children, element }) => {
    if (element.increase) {
      attributes.style['paddingLeft'] = element.increase * 2 + 'em';
    }
  }
};
