import React from "react";
import createBlockPlugin from '../../utils/create-block-plugin';

export const UnorderedListPlugin = createBlockPlugin({
  format: 'unorderedList',
  title: '无序列表',
  icon: 'bfi-list',
  processElement: ({ attributes, children, element }) => {
    console.log(element);
    if (element.type === 'unorderedList') {
      return <ul {...attributes}>{children}</ul>;
    }
    if (element.type === 'list-item') {
      return <li {...attributes}>{children}</li>;
    }
  }
});
