import React from 'react';
import PropType from 'prop-types';
import getMusics from '../services/musicsAPI';
import Header from '../component/Header';
import Loading from './Loading';

class Album extends React.Component {
  constructor() {
    super();

    this.state = {
      dataMusics: '',
    };
  }

  async componentDidMount() {
    const { match } = (this.props);
    const restMusic = await getMusics(match.params.id);
    this.setState({ dataMusics: restMusic });
  }

  render() {
    const { dataMusics } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        <p>Album</p>

        {dataMusics.length === 0 ? <Loading />
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
                        </div>)
                  ))
                )}
                ;
              </div>
            </section>)}
      </div>
    );
  }
}

Album.propTypes = {
  match: PropType.shape().isRequired,
};

export default Album;
