import React from "react";
import createBlockPlugin from '../../utils/create-block-plugin';

export const BlockQuotePlugin = createBlockPlugin({
  format: 'blockQuote',
  title: '插入引用',
  processElement: ({ attributes, children, element }) => {
    if (element.type === 'blockQuote') {
      return <blockquote {...attributes}>{children}</blockquote>;
    }
  }
});
