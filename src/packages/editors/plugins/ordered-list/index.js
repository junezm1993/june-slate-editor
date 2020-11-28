import React from "react";
import createBlockPlugin from '../../utils/create-block-plugin';

export const OrderedListPlugin = createBlockPlugin({
  format: 'orderedList',
  title: '有序列表',
  processElement: ({ attributes, children, element }) => {
    if (element.type === 'orderedList') {
      return <ol {...attributes}>{children}</ol>;
    }
    if (element.type === 'list-item') {
      return <li {...attributes}>{children}</li>;
    }
  }
});
