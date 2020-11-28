import React, { useState } from 'react';
import { Editor } from 'slate';
import { useSlate } from 'slate-react';
import classnames from 'classnames';
import {Dropdown, Tooltip} from "antd";
import { FontColorsOutlined } from "@ant-design/icons";
// import { IconFont } from "../../utils/icon-font";
import './index.scss';

const ColorPicker = React.memo(({ presetColors, color, onChange }) => (
  <ul className="slate-color-list">
    {presetColors.map((item, index) => {
      return (<li
        key={index}
        title={item}
        className={classnames({active: color && item === color})}
        style={{color: item}}
        onMouseDown={(e) => {
          e.preventDefault();
          onChange(item);
        }}/>
      );
    })}
  </ul>
));

function TextColor({ config, format }) {
  const [colorType, setColorType] = useState('color');
  const editor = useSlate();
  const marks = Editor.marks(editor);
  let bgColor = 'transparent';
  let fontColor = '#000000';
  if (marks && marks['color']) {
    fontColor = marks['color'];
  }
  if (marks && marks['backgroundColor']) {
    bgColor = marks['backgroundColor'];
  }
  let currentColor = colorType === 'color' ? fontColor : bgColor;
  const colors =  colorType === 'color' ? config.fontColors: config.bgColors;

  const menu = () => <>
    <div className="slate-color-switch">
      <button
        type="button"
        key="fontColor"
        className={colorType === 'color' ? 'active' : ''}
        onMouseDown={(e) => {
          e.preventDefault();
          setColorType('color');
        }}>
        {config.title.fontColor}
      </button>
      <button
        type="button"
        key="bgColor"
        className={colorType === 'backgroundColor' ? 'active' : ''}
        onMouseDown={(e) => {
          e.preventDefault();
          setColorType('backgroundColor');
        }}>
        {config.title.bgColor}
      </button>
    </div>
    <ColorPicker
      width={200}
      color={currentColor}
      disableAlpha={true}
      presetColors={colors}
      onChange={(color) => {
        Editor.addMark(editor, colorType, color);
      }}
    />
  </>;
  return <Tooltip placement="bottom" title={config.title.button}>
    <Dropdown overlay={menu} trigger={['click']} arrow={true} overlayClassName="editor-toolbar-color__content">
      <div className="editor-toolbar-item" onMouseDown={e => e.preventDefault()} style={{ background: bgColor, color: fontColor}}>
        {/*<IconFont format={format}/>*/}
        <FontColorsOutlined />
      </div>
    </Dropdown>
  </Tooltip>;
}

export const colorPlugin = {
  key: 'color',
  config: {
    title: {
      button: '颜色',
      fontColor: '文字颜色',
      bgColor: '背景颜色'
    },
    fontColors: [
      '#000000',
      '#333333',
      '#666666',
      '#999999',
      '#cccccc',
      '#ffffff',
      '#61a951',
      '#16a085',
      '#07a9fe',
      '#003ba5',
      '#8e44ad',
      '#f32784',
      '#c0392b',
      '#d35400',
      '#f39c12',
      '#fdda00',
    ],
    bgColors: [
      '#000000',
      '#333333',
      '#666666',
      '#999999',
      '#cccccc',
      '#ffffff',
      '#61a951',
      '#16a085',
      '#07a9fe',
      '#003ba5',
      '#8e44ad',
      '#f32784',
      '#c0392b',
      '#d35400',
      '#f39c12',
      '#fdda00',
      '#ababab',
      '#bcbcbc',
    ],
  },
  ToolbarButton: TextColor,
  processLeaf({ leaf, childMark }) {
    if (leaf.color) {
      childMark.style.color = leaf.color;
    }
    if (leaf.backgroundColor) {
      childMark.style.backgroundColor = leaf.backgroundColor;
    }
  }
};
