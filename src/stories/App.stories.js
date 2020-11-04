import React from 'react';

import App from '../App';

export default {
  title: 'Example/App',
  component: App,
};

const Template = (args) => <App {...args} />;

export const DefaultApp = Template.bind({});
DefaultApp.args = {
  primary: true,
  label: 'DefaultApp',
};
