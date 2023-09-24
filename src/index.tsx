import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';

import './index.scss';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { App } from './App';
import { ModalProvider } from './Providers/ModalProvider';

ReactDOM.render(
  <Provider store={store}>
    <HashRouter>
      <ModalProvider>
        <App />
      </ModalProvider>
    </HashRouter>
  </Provider>,
  document.getElementById('root'),
);
