import * as React from 'react';
import Link from 'next/link';

const Nav = () => {
    return (
        <nav>
        <div>
          <h1>mAppy</h1>
          <ul>
            <li>
              <Link href='/home'>Home</Link>
            </li>
            <li>
              <Link href='/newsfeed'>Newsfeed</Link>
            </li>
            <li>
              <Link href='/profile'>Profile</Link>
            </li>
          </ul>
        </div>
      </nav>
    )
}

export default Nav