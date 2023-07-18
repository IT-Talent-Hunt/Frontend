import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import './App.scss';
import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';

export const App: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isSignedIn, setIsSignedIn] = useState(false);
  // const navigate = useNavigate();

  // useEffect(() => {
  //   // const isLoggedIn = localStorage.getItem('isSignedIn');

  //   // if (isLoggedIn === 'true') {
  //   //   setIsSignedIn(true);
  //   //   navigate('/main');
  //   // } else {
  //   //   setIsSignedIn(false);
  //   //   navigate('/signIn');
  //   // }

  //   // return () => {
  //   //   localStorage.setItem('isSignedIn', 'false');
  //   // };
  //   navigate('/signIn');
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
