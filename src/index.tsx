import React from 'react';
import ReactDOM from 'react-dom';
import {
  HashRouter, Routes, Route, Navigate,
} from 'react-router-dom';
import './index.scss';
import { App } from './App';
import { SignInPage } from './pages/SignInPage/SignInPage';
import { MainPage } from './pages/MainPage/MainPage';

ReactDOM.render(
  <React.StrictMode>
    <HashRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="main" element={<Navigate to="../" replace />} />
          <Route index element={<MainPage />} />

          <Route path="signIn" element={<SignInPage />} />
        </Route>
      </Routes>
    </HashRouter>
  </React.StrictMode>,
  document.getElementById('root'),
);
