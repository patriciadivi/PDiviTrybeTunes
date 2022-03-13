import React from 'react';
import { Link } from 'react-router-dom';
import Loading from '../pages/Loading';
import { getUser } from '../services/userAPI';
import '../styles/Header.css';

class Header extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
    };
  }

  async componentDidMount() {
    const saveValue = await getUser();
    this.setState({ name: saveValue.name });
  }

  render() {
    const { name } = this.state;
    // console.log(this.state);
    return (
      <section className="Header">
        <header data-testid="header-component">
          { name
            ? <p data-testid="header-user-name">{ name }</p>
            : <Loading />}
          <nav>
            <Link to="/search" data-testid="link-to-search">Pesquisa</Link>
            <Link to="/favorites" data-testid="link-to-favorites">Favoritos</Link>
            <Link to="/profile" data-testid="link-to-profile">Perfil</Link>
          </nav>
        </header>
      </section>
    );
  }
}

export default Header;
