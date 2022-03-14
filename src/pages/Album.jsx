import React from 'react';
import PropType from 'prop-types';
import getMusics from '../services/musicsAPI';
import Header from '../component/Header';
import Loading from './Loading';
import { addSong, getFavoriteSongs } from '../services/favoriteSongsAPI';

class Album extends React.Component {
  constructor() {
    super();

    this.state = {
      dataMusics: '',
      favorite: '',
      loading: false,
    };
  }

  async componentDidMount() {
    const { match } = (this.props);
    const restMusic = await getMusics(match.params.id);
    const resultFavoriteMusic = await getFavoriteSongs();
    const filterFavoriteId = resultFavoriteMusic
      .map((musicFavorite) => musicFavorite[0].trackId);
    this.setState({
      dataMusics: restMusic,
      favorite: filterFavoriteId,
    });
  }

  checkFavorite = async ({ target }) => {
    const { id } = target;
    this.setState({ loading: true });
    console.log(target.id);

    if (target.checked) {
      const music = await getMusics(id);
      await addSong(music);
      this.setState((prevState) => ({
        favorite: [...prevState.favorite, id], loading: false,
      }));
    } else {
      const { favorite } = this.state;
      const musicDelete = favorite.filter((musicFavorite) => musicFavorite !== id);
      this.setState(() => ({
        favorite: [musicDelete], loading: false,
      }));
    }
  }

  verifyFavoriteCheck = (id) => {
    const { favorite } = this.state;
    const verifyFavorite = favorite.find((musicFavorite) => Number(musicFavorite) === id);
    return verifyFavorite;
  }

  render() {
    const { dataMusics, favorite, loading } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        <p>Album</p>

        {!favorite ? ''
          : (
            <section>
              <div>
                <div>
                  <img
                    src={ dataMusics[0].artworkUrl100 }
                    alt={ dataMusics.collectionName }
                  />
                  <p data-testid="artist-name">{dataMusics[0].artistName }</p>
                  <p data-testid="album-name">{dataMusics[0].collectionName}</p>
                </div>
              </div>

              { loading ? <Loading />
                : (
                  <div>
                    {(
                      dataMusics.map((mus, index) => (
                        index === 0 ? ''
                          : (
                            <div key={ mus.trackId }>
                              <p>{mus.trackName}</p>
                              <audio
                                data-testid="audio-component"
                                src={ mus.previewUrl }
                                controls
                              >
                                <track kind="captions" />
                                O seu navegador não suporta o elemento
                                {' '}
                                <code>audio</code>
                              </audio>
                              <label htmlFor={ mus.trackId }>
                                Favorita
                                <input
                                  type="checkbox"
                                  id={ mus.trackId }
                                  name="favoritaMusic"
                                  onChange={ this.checkFavorite }
                                  data-testid={ `checkbox-music-${mus.trackId}` }
                                  checked={ this.verifyFavoriteCheck(mus.trackId) }
                                />
                              </label>
                            </div>)
                      ))
                    )}
                    ;
                  </div>
                )}
            </section>)}
      </div>
    );
  }
}

Album.propTypes = {
  match: PropType.shape().isRequired,
};

export default Album;
