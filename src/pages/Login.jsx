import React from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import Loading from './Loading';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      user: '',
      isSaveButtonDisabled: true,
      loading: false,
      logado: false,
    };
  }

  handlerChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    }, this.validLogin);
  };

  validLogin = () => {
    const minlengthValue = 3;
    const { user } = this.state;
    const userValid = user.length >= minlengthValue;
    this.setState({
      isSaveButtonDisabled: !userValid,
    });
  }

  handlerOnclick = async () => {
    const { user } = this.state;
    this.setState({
      loading: true,
    });
    await createUser({ name: user });
    this.setState({
      logado: true,
    });
  }

  render() {
    const { user, isSaveButtonDisabled, loading, logado } = this.state;
    return (
      <section>
        {
          !loading
            ? (
              <div data-testid="page-login">
                <h2>Login</h2>
                <input
                  type="text"
                  id="user"
                  name="user"
                  value={ user }
                  onChange={ this.handlerChange }
                  data-testid="login-name-input"
                />
                <button
                  type="submit"
                  disabled={ isSaveButtonDisabled }
                  data-testid="login-submit-button"
                  onClick={ this.handlerOnclick }
                >
                  Entrar
                </button>
              </div>
            )
            : (
              <div>
                { logado ? (<Redirect to="/search" />) : (<Loading />) }
              </div>
            )
        }
      </section>
    );
  }
}

export default Login;
