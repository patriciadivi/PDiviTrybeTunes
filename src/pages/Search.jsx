import React from 'react';
import { Link } from 'react-router-dom';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Header from '../component/Header';
import Loading from './Loading';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      searchValueInput: '',
      disabledButtom: true,
      dataAlbums: '',
      loading: false,
      valueArtist: '',
    };
  }

  handleChandeSerach = ({ target: { value, name } }) => {
    this.setState({
      [name]: value,
    }, this.validSearch);
  }

  validSearch = () => {
    const numberMin = 2;
    const { searchValueInput } = this.state;
    const validNumberMin = searchValueInput.length >= numberMin;
    this.setState({
      disabledButtom: !validNumberMin,
    });
  }

  handlerOnclickSearch = async (event) => {
    const { searchValueInput } = this.state;
    event.preventDefault();
    this.setState({ loading: true });
    const resultFetchSearch = await searchAlbumsAPI(searchValueInput);
    this.setState({
      searchValueInput: '',
      dataAlbums: resultFetchSearch,
      disabledButtom: true,
      loading: false,
      valueArtist: searchValueInput,
    });
  }

  render() {
    const { searchValueInput, disabledButtom,
      loading, valueArtist, dataAlbums } = this.state;
    return (
      <section>
        <div data-testid="page-search">
          <Header />
        </div>

        <section>
          {
            loading
              ? <Loading />
              : (
                <form action="">
                  <label htmlFor="searchId">
                    Nome do artista:
                    <input
                      id="searchId"
                      name="searchValueInput"
                      value={ searchValueInput }
                      type="text"
                      onChange={ this.handleChandeSerach }
                      data-testid="search-artist-input"
                    />
                  </label>
                  <button
                    type="submit"
                    disabled={ disabledButtom }
                    onClick={ this.handlerOnclickSearch }
                    data-testid="search-artist-button"
                  >
                    Pesquisar
                  </button>
                </form>
              )
          }
        </section>

        <section>
          {valueArtist
    && (
      <div>
        {dataAlbums.length > 0
          ? (
            <div>
              <p>
                Resultado de álbuns de:
                {' '}
                {valueArtist}
              </p>
              <div className="container-card">
                {dataAlbums
                  .map((artist) => (
                    <Link
                      key={ artist.collectionId }
                      data-testid={ `link-to-album-${artist.collectionId}` }
                      to={ `/album/${artist.collectionId}` }
                    >
                      <div className="card">
                        <img src={ artist.artworkUrl100 } alt="" />
                        <p>{artist.collectionName}</p>
                        <p>{artist.artistName}</p>
                      </div>
                    </Link>))}
              </div>
            </div>)
          : <p>Nenhum álbum foi encontrado</p>}
      </div>
    )}
        </section>

      </section>
    );
  }
}

export default Search;
