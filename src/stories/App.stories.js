import React from 'react';

import App from '../App';

export default {
  title: 'Example/Editor',
  component: App,
};

const Template = (args) => <App {...args} />;

export const EditorApp = Template.bind({});
EditorApp.args = {
  primary: true,
  label: 'EditorApp',
};
