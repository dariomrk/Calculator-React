// imports: components
import { App } from './components/app/app';
import { Button } from './components/button/button'
import { Textbox } from './components/textbox/textbox';

import React from 'react';
import ReactDOM from 'react-dom/client';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <React.StrictMode>
  <App></App>
  </React.StrictMode>
);