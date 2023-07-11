import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import './App.scss';
import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';
// import { getData } from './helpers/helpers';

export const App: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isSignedIn, setIsSignedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // const isLoggedIn = localStorage.getItem('isSignedIn');

    // if (isLoggedIn === 'true') {
    //   setIsSignedIn(true);
    //   navigate('/main');
    // } else {
    //   setIsSignedIn(false);
    //   navigate('/signIn');
    // }

    // return () => {
    //   localStorage.setItem('isSignedIn', 'false');
    // };
    navigate('/signIn');
  }, []);

  // function request() {
  //   fetch('https://80e6-78-25-5-216.ngrok-free.app/projects', {
  //     method: 'GET',
  //     headers: new Headers({
  //       'ngrok-skip-browser-warning': '3000',
  //     }),
  //     mode: 'no-cors',
  //   })
  //     .then((response) => response.json())
  //     /* eslint-disable-next-line */
  //     .then((result) => console.log(result))
  //     /* eslint-disable-next-line */
  //     .catch((err) => console.error(err));
  // }

  // useEffect(() => {
  //   request();
  // }, []);

  return (
    <div className="starter">
      <header>
        <Header />
      </header>
      <main>
        <Outlet />
      </main>
      { isSignedIn && (
        <footer>
          <Footer />
        </footer>
      )}
    </div>
  );
};
