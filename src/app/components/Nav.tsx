import * as React from "react";
import Link from "next/link";
import { GrMapLocation } from "react-icons/gr";
import { FaUserAlt } from "react-icons/fa";
import { CgFeed } from "react-icons/cg";

const Nav = () => {
  return (
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
          <li>
            <FaUserAlt className="react-icons" size="24" />
            <Link className="span" href="/profile">
              Profile
            </Link>
          </li>
        </ul>
      </div>
      <section className="nav-btn-container">
        <button className="primary-button">Sign Out</button>
        <button className="primary-button">Create Account</button>
        <button className="primary-button">Log In</button>
      </section>
    </nav>
  );
};

export default Nav;
