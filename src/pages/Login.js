import React from 'react';
import { Redirect } from 'react-router-dom';
import Loading from '../components/Loading';
import { createUser } from '../services/userAPI';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      nameInput: '',
      searchRedirect: false,
    };
  }

  nameInsertCreateUser = () => {
    const { nameInput } = this.state;
    this.setState({
      loading: true,
    }, async () => {
      await createUser({ name: nameInput });
      this.setState({
        searchRedirect: true,
      });
    });
  }

  render() {
    const { nameInput, loading, searchRedirect } = this.state;
    return (
      <div data-testid="page-login">
        { loading ? <Loading /> : (
          <section className="form-container">
            <form>
              <label htmlFor="name-input">
                <input
                  type="name"
                  name="name-input"
                  data-testid="login-name-input"
                  placeholder="Insira seu nome"
                  onChange={ ({ target }) => {
                    this.setState({
                      nameInput: target.value,
                    });
                  } }
                />
              </label>
              <button
                type="submit"
                data-testid="login-submit-button"
                disabled={ nameInput.length < +'3' }
                onClick={ this.nameInsertCreateUser }
              >
                Entrar
              </button>
            </form>
          </section>
        ) }
        { searchRedirect && <Redirect to="/search" /> }
      </div>
    );
  }
}

export default Login;
