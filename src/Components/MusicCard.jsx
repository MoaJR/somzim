import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { addSong, removeSong } from '../services/favoriteSongsAPI';

function MusicCard({ music, isFavorite, deleted = function () {} }) {
  const [loading, setLoading] = useState(false);
  const [favorite, setFavorite] = useState(isFavorite);

  useEffect(() => {
    setFavorite(isFavorite);
  }, [isFavorite]);

  const addSongsCallback = async (callback, fav) => {
    deleted(true);
    setLoading(true);
    await callback(music);
    setFavorite(fav);
    setLoading(false);
    deleted(false);
  };

  const handleAddSong = () => {
    if (!favorite) {
      addSongsCallback(addSong, true);
    } else {
      addSongsCallback(removeSong, false);
    }
  };

  return (
    <div>
      <h4>{music.trackName}</h4>
      <audio controls data-testid="audio-component">
        <track kind="captions" />
        <source src={ music.previewUrl } type="audio/mpeg" />
      </audio>
      <label htmlFor="favorite">
        Favorita
        <input
          data-testid={ `checkbox-music-${music.trackId}` }
          id="favorite"
          type="checkbox"
          onChange={ handleAddSong }
          checked={ favorite }
        />
      </label>
      {loading && <p>Carregando...</p>}
    </div>
  );
}

MusicCard.propTypes = {
  music: PropTypes.shape({
    trackId: PropTypes.string,
    trackName: PropTypes.string,
    previewUrl: PropTypes.string,
  }).isRequired,
  isFavorite: PropTypes.bool.isRequired,
  deleted: PropTypes.func.isRequired,
};

export default MusicCard;
