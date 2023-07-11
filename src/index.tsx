import React from 'react';
import ReactDOM from 'react-dom';
import {
  HashRouter, Routes, Route, Navigate,
} from 'react-router-dom';
import './index.scss';
import { App } from './App';
import { SignInPage } from './pages/SignInPage/SignInPage';
import { MainPage } from './pages/MainPage/MainPage';
import { ProjectPage } from './components/ProjectPage/ProjectPage';
import { ProfilePage } from './components/ProfilePage/ProfilePage';
import { EditProject } from './components/EditProject/EditProject';
import { PasswordRecovery } from './components/PasswordRecovery/PasswordRecovery';
import { RecoveryComplete } from './components/RecoveryComplete/RecoveryComplete';
import { CreateProfile } from './components/CreateProfile/CreateProfile';
import { SignUp } from './pages/SignUpPage/SignUp';

ReactDOM.render(
  <React.StrictMode>
    <HashRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="main" element={<Navigate to="../" replace />} />
          <Route index element={<MainPage />} />
          <Route path="project" element={<ProjectPage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="edit_project" element={<EditProject />} />
          <Route path="signIn" element={<SignInPage />} />
          <Route path="recovery" element={<PasswordRecovery />} />
          <Route path="recoveryComplete" element={<RecoveryComplete />} />
          <Route path="profileCreate" element={<CreateProfile />} />
          <Route path="signUp" element={<SignUp />} />
        </Route>
      </Routes>
    </HashRouter>
  </React.StrictMode>,
  document.getElementById('root'),
);
