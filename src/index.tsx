import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';

import {BrowserRouter, Routes, Route} from 'react-router-dom';

import 'style/__app.scss';

import {Home} from 'pages/Home';

import {NewsTable} from 'containers/NewsTable';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const routes = [
    {
        path: "/",
        exact: true,
        main: <Home/>
    },
    {
        path: "/setting",
        exact: true,
        main: <NewsTable/>
    }
]



// @ts-ignore
root.render(
  <React.StrictMode>
      <BrowserRouter>
          <Routes>
              {
                  routes.map((route, index) => {
                      return <Route key={index} path={route.path} element={route.main} />
                  })
              }
          </Routes>
      </BrowserRouter>
  </React.StrictMode>
);
// <NewsTable/>
reportWebVitals();
