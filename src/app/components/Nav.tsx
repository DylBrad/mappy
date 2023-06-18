'use client';
import * as React from 'react';
import Link from 'next/link';
import { GrMapLocation } from 'react-icons/gr';
import { FaUserAlt } from 'react-icons/fa';
import { CgFeed } from 'react-icons/cg';
import { useCookies } from 'react-cookie';

import AuthModal from './AuthModal';

const Nav = () => {
  let ShowAuthModal: boolean;
  ShowAuthModal = false;
  let IsSignUp: boolean;
  IsSignUp = true;
  let CookieName: string;
  CookieName = 'user';

  const [showAuthModal, setShowAuthModal] = React.useState(ShowAuthModal);
  const [isSignUp, setIsSignUp] = React.useState(IsSignUp);
  const [cookies, setCookie, removeCookie] = useCookies([CookieName]);
  const authToken = cookies.token;

  const handleSignUp = () => {
    setShowAuthModal(true);
    setIsSignUp(true);
  };

  const handleLogIn = () => {
    setShowAuthModal(true);
    setIsSignUp(false);
  };

  const handleLogOut = () => {
    console.log('log me out');
    removeCookie('token', cookies.token);
    window.location.reload();
  };

  return (
    <>
      <nav className="main-navigation">
        <div className="nav-top-section">
          <h1>mAppy</h1>
          <ul>
            <li>
              <GrMapLocation className="react-icons" size="24" />
              <Link className="span" href="/home">
                Home
              </Link>
            </li>
            <li>
              <CgFeed className="react-icons" size="24" />
              <Link className="span" href="/newsfeed">
                Newsfeed
              </Link>
            </li>
            {authToken && (
              <li>
                <FaUserAlt className="react-icons" size="24" />
                <Link className="span" href="/profile">
                  Profile
                </Link>
              </li>
            )}
          </ul>
        </div>
        <section className="nav-btn-container">
          {authToken ? (
            <button className="primary-button" onClick={handleLogOut}>
              Sign Out
            </button>
          ) : (
            <>
              <button className="primary-button" onClick={handleSignUp}>
                Create Account
              </button>
              <button className="primary-button" onClick={handleLogIn}>
                Log In
              </button>
            </>
          )}
        </section>
      </nav>
      {showAuthModal && (
        <AuthModal
          setShowAuthModal={setShowAuthModal}
          isSignUp={isSignUp}
          setIsSignUp={setIsSignUp}
        />
      )}
    </>
  );
};

export default Nav;
