import React, { useEffect, useState } from 'react';

import Header from '../Components/Header';
import Loading from '../Components/Loading';
import MusicCard from '../Components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

function Favorites() {
  const [loading, setLoading] = useState(false);
  const [favoriteSongs, setFavoriteSongs] = useState([]);
  const [deleted, setDeleted] = useState(false);

  async function fetchFavoriteSongs() {
    setLoading(true);
    const newFavorite = await getFavoriteSongs();
    setFavoriteSongs(newFavorite);
    setLoading(false);
  }

  useEffect(() => {
    fetchFavoriteSongs();
  }, [deleted]);

  const handleFavorites = (music) => {
    const isFavorite = favoriteSongs
      .some((favoriteSong) => favoriteSong.trackId === music.trackId);
    return isFavorite;
  };

  const handleAudios = () => {
    // https://stackoverflow.com/questions/61587406/allow-one-audio-player-to-play-at-a-time
    const audios = document.querySelectorAll('audio');
    const pauseAudios = ({ target }) => {
      audios.forEach((audio) => {
        if (audio !== target) {
          audio.pause();
        }
      });
    };

    audios.forEach((audio) => {
      audio.addEventListener('play', pauseAudios);
    });
    //
  };

  useEffect(() => {
    handleAudios();
  }, [favoriteSongs]);

  return (
    <div data-testid="page-favorites">
      <Header />
      <div>
        <h1>Favorites</h1>
        <br />
        {
          loading ? <Loading /> : (
            <ul>
              {favoriteSongs.map((music) => (
                <li key={ music.trackId }>
                  <MusicCard
                    music={ music }
                    isFavorite={ handleFavorites(music) }
                    deleted={ setDeleted }
                    setFavoriteSongs={ setFavoriteSongs }
                  />
                </li>
              ))}
            </ul>
          )
        }
      </div>
    </div>
  );
}

export default Favorites;
