import React from 'react';
import ReactDOM from 'react-dom';
import {
  // HashRouter,
  BrowserRouter,
} from 'react-router-dom';
import './index.scss';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { App } from './App';
// import { SignInPage } from './pages/SignInPage/SignInPage';
// import { MainPage } from './pages/MainPage/MainPage';
// import { ProjectPage } from './components/ProjectPage/ProjectPage';
// import { ProfilePage } from './components/ProfilePage/ProfilePage';
// import { EditProject } from './components/EditProject/EditProject';
// import { PasswordRecovery } from './components/PasswordRecovery/PasswordRecovery';
// import { RecoveryComplete } from './components/RecoveryComplete/RecoveryComplete';
// import { CreateProfile } from './components/CreateProfile/CreateProfile';
// import { SignUp } from './pages/SignUpPage/SignUp';
import { ModalProvider } from './Providers/ModalProvider';

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <BrowserRouter>
        <ModalProvider>
          <App />
        </ModalProvider>
      </BrowserRouter>
    </React.StrictMode>
  </Provider>,
  document.getElementById('root'),
);
