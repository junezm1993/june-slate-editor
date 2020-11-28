import React from "react";
import {createFromIconfontCN } from "@ant-design/icons";

const IconFonts = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_2218973_63ifesr6i7f.js',
});

export const IconFont = ({ format }) => {
  return <IconFonts type={`slate-${format}`}/>
};
