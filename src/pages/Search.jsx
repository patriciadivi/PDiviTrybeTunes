import React from 'react';
import Header from '../component/Header';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      searchValueInput: '',
      disabledButtom: true,
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

  handlerOnclickSearch = (event) => {
    event.preventDefault();
  }

  render() {
    const { searchValueInput, disabledButtom } = this.state;
    return (
      <section>
        <div data-testid="page-search">
          <Header />
        </div>
        <section>
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
        </section>
      </section>
    );
  }
}

export default Search;
