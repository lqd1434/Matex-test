import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter, HashRouter } from 'react-router-dom';
import './globle.css';
import './useWorker';
import 'semantic-ui-css/semantic.min.css';

const isDev = process.env.NODE_ENV === 'development';

ReactDOM.render(renderRoot(<App />), document.getElementById('root'));

function renderRoot(child: React.ReactNode) {
  if (isDev) {
    return <BrowserRouter>{child}</BrowserRouter>;
  } else {
    return <HashRouter>{child}</HashRouter>;
  }
}
