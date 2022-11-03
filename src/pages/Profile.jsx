import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import Header from '../Components/Header';
import Loading from '../Components/Loading';
import { getUser } from '../services/userAPI';

import '../styles/Profile.scss';

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
    <div data-testid="page-profile" className="profileBox">
      <Header />
      <div className="pageProfileBox">
        {loading ? <Loading /> : (
          <div className="profileCOntent">
            {
              user.image ? (
                <img
                  data-testid="profile-image"
                  src={ user.image }
                  alt={ user.name }
                  width={ 200 }
                />
              ) : null
            }
            <button
              className="button"
              type="button"
              onClick={ () => history.push('/profile/edit') }
            >
              Editar perfil
            </button>
            <h2 data-testid="profile-name">{user.name}</h2>
            <h4 data-testid="profile-email">{user.email}</h4>
            <p>{user.description}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Profile;
