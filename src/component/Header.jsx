import React from 'react';
import Loading from '../pages/Loading';
// import Login from '../pages/Login';
import { getUser } from '../services/userAPI';

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
    console.log(this.state);
    return (
      <section>
        <header data-testid="header-component">
          { name
            ? <p data-testid="header-user-name">{ name }</p>
            : <Loading />}
        </header>
      </section>
    );
  }
}

export default Header;
