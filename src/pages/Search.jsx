import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';

import Header from '../Components/Header';
import Loading from '../Components/Loading';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

function Search() {
  const [search, setSearch] = useState('');
  const [response, setResponse] = useState([]);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(false);

  const inputRef = useRef();

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
    if (response.length === 0 && status) return <h2>Nenhum álbum foi encontrado</h2>;
    if (response.length > 0 && status) {
      return (
        <h2>
          Resultado de álbuns de:
          {' '}
          {search}
        </h2>
      );
    }
  };

  return (
    <div data-testid="page-search">
      <Header />
      <div>
        <h1>Pesquisar</h1>
        <br />
        <input
          data-testid="search-artist-input"
          type="text"
          onChange={ inputChange }
          ref={ inputRef }
          placeholder="Álbum ou Artista"
        />
        <button
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
        {
          loading ? <Loading /> : (
            response.map((album) => (
              <div key={ album.collectionId }>
                <Link
                  to={ `/album/${album.collectionId}` }
                  data-testid={ `link-to-album-${album.collectionId}` }
                >
                  Link
                </Link>
                <img src={ album.artworkUrl100 } alt={ album.title } />
                <h2>{album.artistName}</h2>
                <h3>{album.collectionName}</h3>
              </div>
            ))
          )
        }
      </div>
    </div>
  );
}

export default Search;
