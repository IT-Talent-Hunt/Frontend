import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';

import './index.scss';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { App } from './App';
import { ModalProvider } from './Providers/ModalProvider';

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <HashRouter>
        <ModalProvider>
          <App />
        </ModalProvider>
      </HashRouter>
    </React.StrictMode>
  </Provider>,
  document.getElementById('root'),
);
