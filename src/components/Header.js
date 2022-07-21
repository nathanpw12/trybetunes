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
        <p data-testid="header-user-name">
          { loading ? <Loading /> : <h3>{ nameInput }</h3> }
        </p>
        <Link to="/search" data-testid="link-to-search"> Search </Link>
        <Link to="/favorites" data-testid="link-to-favorites"> Favorites </Link>
        <Link to="/profile" data-testid="link-to-profile"> Profile </Link>
      </header>
    );
  }
}

export default Header;
