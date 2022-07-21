import React from 'react';
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
      </header>
    );
  }
}

export default Header;
