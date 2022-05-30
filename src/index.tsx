import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';

import 'style/__app.scss';

import {Home} from 'pages/Home';

import {NewsTable} from 'containers/NewsTable';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <NewsTable/>
  </React.StrictMode>
);

reportWebVitals();
