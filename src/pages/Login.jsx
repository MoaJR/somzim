import React, { useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';

import Loading from '../Components/Loading';
import { createUser } from '../services/userAPI';

function Login() {
  const [userName, setUserName] = useState({});
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [loading, setLoading] = useState(false);

  const inputRef = useRef();

  const history = useHistory();

  const minNumber = 3;

  const inputChange = ({ target }) => {
    setUserName({ name: target.value });
    setIsButtonDisabled(target.value.length < minNumber);
  };

  const handleButtonSubmit = async () => {
    inputRef.current.value = '';
    setLoading(true);
    await createUser(userName);
    setLoading(false);
    history.push('/search');
  };

  return (
    <div data-testid="page-login">
      <h1>Login</h1>
      {loading ? <Loading /> : null}
      <input
        data-testid="login-name-input"
        type="text"
        onChange={ inputChange }
        ref={ inputRef }
      />
      <button
        type="button"
        data-testid="login-submit-button"
        disabled={ isButtonDisabled }
        onClick={ handleButtonSubmit }
      >
        Entrar
      </button>
    </div>
  );
}

export default Login;
