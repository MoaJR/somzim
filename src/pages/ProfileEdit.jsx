import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../Components/Header';
import Loading from '../Components/Loading';
import { getUser, updateUser } from '../services/userAPI';

import '../styles/PageProfileEdit.scss';

function ProfileEdit() {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const history = useHistory();

  useEffect(() => {
    async function getUserData() {
      setLoading(true);
      const userData = await getUser();
      setUser(userData);
      setLoading(false);
    }
    getUserData();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    await updateUser(user);
    setLoading(false);
    history.push('/profile');
  };

  // https://stackoverflow.com/questions/41348459/regex-in-react-email-validation
  const emailValidation = () => {
    const regEx = /[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,8}(.[a-z{2,8}])?/g;
    return (!regEx.test(user.email));
  };

  const handleDisabledButton = () => {
    const { name, email, description, image } = user;
    if ([name, email, description, image]
      .some((field) => field === '') || emailValidation()) {
      setIsButtonDisabled(true);
    } else {
      setIsButtonDisabled(false);
    }
  };

  useEffect(() => {
    handleDisabledButton();
    emailValidation();
  }, [user]);

  const handleInputChange = ({ target }) => {
    const { name, value } = target;
    setUser({ ...user, [name]: value });
  };

  return (
    <div data-testid="page-profile-edit" className="profileEditBox">
      <Header />
      <div className="pageProfileEditBox">
        {
          loading ? <Loading /> : (
            <form className="formEdit">
              <label htmlFor="name">
                Nome
                <input
                  type="text"
                  id="name"
                  name="name"
                  data-testid="edit-input-name"
                  value={ user.name }
                  onChange={ handleInputChange }
                />
              </label>
              <label htmlFor="email">
                Email
                <input
                  type="email"
                  id="email"
                  name="email"
                  data-testid="edit-input-email"
                  pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+[.]{1}[a-zA-Z]{2,}$"
                  value={ user.email }
                  onChange={ handleInputChange }
                />
              </label>
              <label htmlFor="description">
                Descrição
                <input
                  id="description"
                  name="description"
                  data-testid="edit-input-description"
                  type="text"
                  value={ user.description }
                  onChange={ handleInputChange }
                />
              </label>
              <label htmlFor="image">
                Imagem
                <input
                  type="text"
                  id="image"
                  name="image"
                  data-testid="edit-input-image"
                  value={ user.image }
                  onChange={ handleInputChange }
                />
              </label>
              <button
                className="button"
                type="button"
                data-testid="edit-button-save"
                onClick={ handleSubmit }
                disabled={ isButtonDisabled }
              >
                Salvar
              </button>
            </form>
          )
        }
      </div>
    </div>
  );
}

export default ProfileEdit;
