import React from 'react';
import Header from '../component/Header';
// import { Link } from 'react-router-dom';

class Favorites extends React.Component {
  render() {
    return (
      <section>
        <div data-testid="page-favorites">
          <Header />
          <p>Favorites</p>
          {/* <Link to="/">Home</Link> - Exemplo */}
        </div>
      </section>
    );
  }
}

export default Favorites;
