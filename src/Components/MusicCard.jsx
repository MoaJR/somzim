import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { addSong, removeSong } from '../services/favoriteSongsAPI';

import '../styles/MusicCard.scss';
import Loading from './Loading';

function MusicCard({ music, isFavorite, deleted = function () {}, artwork }) {
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
    <div className="musicBox">
      {
        artwork ? (
          <img
            src={ music.artworkUrl100 }
            alt={ music.trackName }
          />
        ) : null
      }
      <h4>{music.trackName}</h4>
      {
        artwork ? (
          <h5>{music.artistName}</h5>
        ) : null
      }
      <audio
        controls
        data-testid="audio-component"
      >
        <track kind="captions" />
        <source
          src={ music.previewUrl }
          type="audio/mpeg"
        />
      </audio>
      <input
        style={ { marginLeft: '5px' } }
        data-testid={ `checkbox-music-${music.trackId}` }
        id="favorite"
        type="checkbox"
        onChange={ handleAddSong }
        checked={ favorite }
      />
      {loading && <Loading />}
    </div>
  );
}

MusicCard.propTypes = {
  music: PropTypes.shape({
    trackId: PropTypes.string,
    trackName: PropTypes.string,
    previewUrl: PropTypes.string,
    artistName: PropTypes.string,
    artworkUrl100: PropTypes.string,
  }).isRequired,
  isFavorite: PropTypes.bool.isRequired,
  deleted: PropTypes.func.isRequired,
  artwork: PropTypes.string.isRequired,
};

export default MusicCard;
