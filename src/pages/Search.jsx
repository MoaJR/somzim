/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';

import Header from '../Components/Header';
import Loading from '../Components/Loading';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

import '../styles/Search.scss';

function Search() {
  const [search, setSearch] = useState('');
  const [response, setResponse] = useState([]);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(false);

  const inputRef = useRef();

  const history = useHistory();

  const inputChange = ({ target }) => {
    setResponse([]);
    setStatus(false);
    setSearch(target.value);
    setIsButtonDisabled((target.value.length < 2));
  };

  const handleButtonSearch = async () => {
    setLoading(true);
    setResponse([]);
    inputRef.current.value = '';
    await searchAlbumsAPI(search).then((apiResponse) => {
      setResponse(apiResponse);
    });
    setStatus(true);
    setLoading(false);
    setIsButtonDisabled(true);
  };

  const handleSearchResultRender = () => {
    if (status === false) return null;
    if (response.length === 0 && status) {
      return (
        <h2
          style={ { textAlign: 'center', margin: '2rem 0' } }
        >
          Nenhum álbum foi encontrado
        </h2>
      );
    }
    if (response.length > 0 && status) {
      return (
        <h2 style={ { textAlign: 'center', margin: '2rem 0' } }>
          Resultado de álbuns de:
          {' '}
          {search}
        </h2>
      );
    }
  };

  return (
    <div data-testid="page-search" className="searchBox">
      <Header />
      <div className="pageBox">
        <h1 className="title">Pesquisar</h1>
        <input
          className="input"
          data-testid="search-artist-input"
          type="text"
          onChange={ inputChange }
          ref={ inputRef }
          placeholder="Álbum ou Artista"
        />
        <button
          className="button"
          type="button"
          data-testid="search-artist-button"
          onClick={ handleButtonSearch }
          disabled={ isButtonDisabled }
        >
          Pesquisar
        </button>
      </div>
      <div>
        {
          handleSearchResultRender()
        }
        <div className="albumBox">
          {
            loading ? <Loading /> : (
              response.map((album) => (
                <div
                  style={ { cursor: 'pointer' } }
                  key={ album.collectionId }
                  className="cardBox"
                  onClick={ () => history.push(`/album/${album.collectionId}`) }
                >
                  <img src={ album.artworkUrl100 } alt={ album.title } />
                  <h2 style={ { textAlign: 'center' } }>{album.artistName}</h2>
                  <h3 style={ { textAlign: 'center' } }>
                    {album.collectionName}
                  </h3>
                </div>
              ))
            )
          }
        </div>
      </div>
    </div>
  );
}

export default Search;
