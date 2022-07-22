import React from 'react';
import { Link } from 'react-router-dom';
import Loading from './Loading';
import { getUser } from '../services/userAPI';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nameInput: '',
      loading: true,
    };
  }

  getUserName = async () => {
    const response = await getUser();
    this.setState({ nameInput: response.name, loading: false });
  }

  componentDidMount = () => {
    this.getUserName();
  }

  render() {
    const { nameInput, loading } = this.state;
    return (
      <header data-testid="header-component">
        <nav>
          <ul>
            <li>
              <Link
                to="/search"
                data-testid="link-to-search"
                className="text-decoration-n"
              >
                {' '}
                Search
                {' '}

              </Link>
            </li>
            <li>
              <Link
                to="/favorites"
                data-testid="link-to-favorites"
                className="text-decoration-n"
              >
                {' '}
                Favorites
                {' '}

              </Link>
            </li>
            <li>
              <Link
                to="/profile"
                data-testid="link-to-profile"
                className="text-decoration-n"
              >
                {' '}
                Profile
                {' '}

              </Link>
            </li>
            <li>
              <Link to="/" className="text-decoration-n"> Voltar </Link>
            </li>
          </ul>
        </nav>
        <div>
          <h3 className="header-username" data-testid="header-user-name">
            { loading ? <Loading /> : <h3>{ nameInput }</h3> }
          </h3>
        </div>
      </header>
    );
  }
}

export default Header;
