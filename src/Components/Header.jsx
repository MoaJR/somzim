import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { getUser } from '../services/userAPI';
import Loading from './Loading';

import '../styles/Header.scss';

function Header() {
  const [userName, setUserName] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchUser() {
      setLoading(true);
      const user = await getUser();
      setUserName(user.name);
      setLoading(false);
    }
    fetchUser();
  }, []);

  return (
    <header data-testid="header-component" className="Header">
      {
        loading ? <Loading /> : <h2 data-testid="header-user-name">{userName}</h2>
      }
      <nav className="headerNav">
        <ul>
          <li><Link data-testid="link-to-search" to="/search">Search</Link></li>
          <li><Link data-testid="link-to-favorites" to="/favorites">Favorites</Link></li>
          <li><Link data-testid="link-to-profile" to="/profile">Profile</Link></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
