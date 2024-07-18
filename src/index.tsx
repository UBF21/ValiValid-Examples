import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { FluentProvider, webLightTheme } from '@fluentui/react-components';
import { RouterProvider } from 'react-router-dom';
import { router } from './routers/ContentRouters';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const routers = router;

root.render(
  <React.StrictMode>
    <FluentProvider theme={webLightTheme}>
      <RouterProvider
        router={routers}
      />
    </FluentProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
