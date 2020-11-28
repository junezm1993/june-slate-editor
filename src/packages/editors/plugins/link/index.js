import React, {useState, useRef} from "react";
import { Editor, Transforms, Point, Range } from 'slate';
import { useSlate, ReactEditor } from 'slate-react';
import {Tooltip, Form, Input, Button, Switch, Popover } from "antd";
import { IconFont } from "../../utils/icon-font";
import './index.scss';

const urlReg = /^(?:(http|https|ftp):\/\/)?((?:[\w-]+\.)+[a-z0-9]+)((?:\/[^/?#]*)+)?(\?[^#]+)?(\#.+)?$/i;
const layout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 19 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const isLinkActive = (editor) => {
  const [link] = Editor.nodes(editor, { match: (n) => n.type === 'link' });
  return !!link;
};

const insertLink = (editor, props, flag) => {
  if (editor.selection) {
    wrapLink(editor, props, flag);
  }
};

const unwrapLink = (editor) => {
  Transforms.unwrapNodes(editor, {
    match: (n) => n.type === 'link',
    split: true
  });
};

const wrapLink = (editor, { url, name, target }, flag) => {
  const { selection } = editor;
  const isActive = isLinkActive(editor);
  if (Point.equals(selection.anchor, selection.focus) && isActive) {
    Transforms.setNodes(
      editor,
      {
        type: 'link',
        url,
        target
      },
      { match: (n) => n.type === 'link' }
    );
    return;
  }
  if (isActive) {
    unwrapLink(editor);
  }
  const isCollapsed = selection && Range.isCollapsed(selection);
  const link = {
    type: 'link',
    url,
    name,
    target,
    children: isCollapsed ? [{ text: name || url }] : []
  };
  if (isCollapsed) {
    Transforms.insertNodes(editor, link);
  } else {
    Transforms.wrapNodes(editor, link, { split: true });
    if (flag) {
      Transforms.collapse(editor, { edge: 'end' });
    }
  }
};

const LinkButton = React.memo(({config, format}) => {
  const editor = useSlate();
  const [ visible, setVisible ] = useState(false);
  const tmpSelection = useRef(null);

  const onFinish = values => {
    Transforms.select(editor, tmpSelection.current);
    editor.selection = tmpSelection.current;
    insertLink(
      editor,
      {
        url: values.href,
        name: values.name,
        target: values.target ? '_blank' : ''
      },
      true
    );
    ReactEditor.focus(editor);
    setVisible(false);
  };

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  const handlePopoverVisible = (_visible) => {
    if (visible === _visible) return;
    setVisible(_visible);
    if (_visible) {
      handleShow();
    }
  };
  // popover显示记录 current selection
  const handleShow = () => {
    let editorEnd = Editor.end(editor, []);
    if (!editor.selection) {
      Transforms.select(editor, {anchor: editorEnd, focus: editorEnd});
    }
    tmpSelection.current = editor.selection;
  };

  const content = () => {
    return <div className="editor-toolbar-link">
      <Form
        {...layout}
        name="linkForm"
        initialValues={{}}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item label="名称" name="name">
          <Input />
        </Form.Item>
        <Form.Item label="链接" name="href" rules={[{ required: true, message: '请填写正确链接地址', pattern: urlReg }]}>
          <Input />
        </Form.Item>
        <Form.Item label="新窗口打开" name="target" valuePropName="false">
          <Switch />
        </Form.Item>
        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit" onMouseDown={e => e.preventDefault()}>
            确认
          </Button>
          <Button onClick={() => setVisible(false)} onMouseDown={e => e.preventDefault()}>
            取消
          </Button>
        </Form.Item>
      </Form>
    </div>
  };

  return <Tooltip placement="bottom" title={config.title}>
    <Popover content={content} trigger="click" visible={visible} onVisibleChange={handlePopoverVisible}>
      <div className="editor-toolbar-item" onMouseDown={e => e.preventDefault()}>
        <IconFont format={format}/>
      </div>
    </Popover>
  </Tooltip>
});

export const linkPlugin = {
  key: 'link',
  config: {
    title: '插入链接',
  },
  withEditor: (editor) => {
    const { insertData, insertText, isInline } = editor;
    editor.isInline = (element) => {
      return element.type === 'link' ? true : isInline(element);
    };
    editor.insertText = (text) => {
      if (text && urlReg.test(text)) {
        wrapLink(editor, text);
      } else {
        insertText(text);
      }
    };
    editor.insertData = (data) => {
      const text = data.getData('text/plain');
      if (text && urlReg.test(text)) {
        wrapLink(editor, { url: text });
      } else {
        insertData(data);
      }
    };
    return editor;
  },
  ToolbarButton: LinkButton,
  processElement: ({ editor, attributes, children, element }) => {
    if (element.type === 'link') {
      const handleLink = () => {
        if (element.target && element.target === '_blank') {
          window.open(element.url, '_blank');
        } else {
          window.open(element.url);
        }
      };
      const handleUnLink = () => {
        unwrapLink(editor)
      };
      const content = <>
        <Button onClick={handleLink}>访问链接</Button>
        <Button onClick={handleUnLink}>取消链接</Button>
      </>;
      return (
        <Popover content={content} placement={'bottom'}>
          <a {...attributes} href={element.url}>
            {children}
          </a>
        </Popover>
      );
    }
  }
};
