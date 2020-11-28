import React from "react";
import {createFromIconfontCN } from "@ant-design/icons";

const IconFonts = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_2218973_1accem5nt9u.js',
});

export const IconFont = ({ format }) => {
  return <IconFonts type={`slate-${format}`}/>
};
