import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../Components/Header';
import Loading from '../Components/Loading';
import MusicCard from '../Components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import getMusics from '../services/musicsAPI';

function Album() {
  const { id } = useParams();
  const [album, setAlbum] = useState([]);
  const [favoriteSongs, setFavoriteSongs] = useState([]);

  useEffect(() => {
    async function fetchAlbum() {
      await getMusics(id).then((data) => setAlbum(data));
    }
    async function fetchFavoriteSongs() {
      await getFavoriteSongs().then((data) => {
        setFavoriteSongs(data);
      });
    }
    fetchFavoriteSongs();
    fetchAlbum();
  }, []);

  const handleFavorites = (music) => {
    const isFavorite = favoriteSongs.some(
      (favoriteSong) => favoriteSong.trackId === music.trackId,
    );
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
  }, [album]);

  return (
    <div data-testid="page-album">
      <Header />

      {album.length === 0 ? (
        <Loading />
      ) : (
        <div>
          <h1>Álbum</h1>
          <br />
          <img
            src={ album[0].artworkUrl100 }
            alt={ album[0].title }
          />
          <h2 data-testid="album-name">{album[0].collectionName}</h2>
          <h3 data-testid="artist-name">{album[0].artistName}</h3>
          <ul>
            {album.slice(1).map((music) => (
              <li key={ music.trackId }>
                <MusicCard
                  music={ music }
                  isFavorite={ handleFavorites(music) }
                />
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Album;
