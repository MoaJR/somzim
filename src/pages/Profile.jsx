import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import Header from '../Components/Header';
import Loading from '../Components/Loading';
import { getUser } from '../services/userAPI';

function Profile() {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);

  const history = useHistory();

  useEffect(() => {
    async function getUserData() {
      setLoading(true);
      const userData = await getUser();
      console.log(userData);
      setUser(userData);
      setLoading(false);
    }
    getUserData();
  }, []);

  return (
    <div data-testid="page-profile">
      <Header />
      {loading ? <Loading /> : (
        <div>
          <img
            data-testid="profile-image"
            src={ user.image }
            alt={ user.name }
            width={ 200 }
          />
          <h2 data-testid="profile-name">{user.name}</h2>
          <h4 data-testid="profile-email">{user.email}</h4>
          <p>{user.description}</p>
          <button
            type="button"
            onClick={ () => history.push('/profile/edit') }
          >
            Editar perfil
          </button>
        </div>
      )}
    </div>
  );
}

export default Profile;
