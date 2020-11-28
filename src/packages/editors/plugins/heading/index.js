import React, { useRef } from 'react';
import { Tooltip, Dropdown, Menu } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { useSlate } from 'slate-react';
import { Editor } from 'slate';
import { toggleBlock } from "../../utils/toolbar-helpers";

const Headings = React.memo(({ config }) => {
    const editor = useSlate();
    const names = config.names;

    const currentHeaderType = useRef('h0');
    const [match] = Editor.nodes(editor, {
        match: (n) => n.type && n.type.indexOf('h') === 0
    });
    if (match && match[0]) {
        currentHeaderType.current = match[0].type;
    } else {
        currentHeaderType.current = 'h0'
    }

    const onClick = ({ key, domEvent }) => {
        domEvent.preventDefault();
        domEvent.nativeEvent.preventDefault();
        toggleBlock(editor, key);
    };

    const menu = () => {
        return <Menu onClick={onClick} onMouseDown={e => e.preventDefault()}>
            {Object.keys(names).map(name => <Menu.Item key={name}>{names[name]}</Menu.Item>)}
        </Menu>
    };

    return <Tooltip placement="bottom" title={config.title}>
        <Dropdown overlay={menu} trigger={['click']} arrow={true}>
            <div className="editor-toolbar-item" onMouseDown={e => e.preventDefault()}>
                {names[currentHeaderType.current]}<DownOutlined />
            </div>
        </Dropdown>
    </Tooltip>
});

export const headingPlugin = {
    key: 'heading',
    config: {
        headings: [ 'h0', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6',],
        title: '正文与标题',
        names: {
            'h0': '正文',
            'h1': '标题1',
            'h2': '标题2',
            'h3': '标题3',
            'h4': '标题4',
            'h5': '标题5',
            'h6': '标题6',
        }
    },
    ToolbarButton: Headings,
    processElement: ({ attributes, children, element }) => {
        if (element.type.indexOf('h') === 0) {
            let headSize = element.type.replace('h', '');
            if (headSize !== '0') {
                return React.createElement('h' + headSize, attributes, children);
            }
        }
    }
};
