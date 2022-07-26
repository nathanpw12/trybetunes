import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { getUser } from '../services/userAPI';

class Profile extends React.Component {
  constructor() {
    super();
    this.state = {
      user: {
        description: '',
        email: '',
        image: '',
        name: '',
      },
    };
  }

  componentDidMount() {
    this.handleUser();
  }

  handleUser = async () => {
    const user = await getUser();
    console.log(user);
    this.setState({
      user,
    });
  }

  render() {
    const { user } = this.state;
    return (
      <>
        <Header />
        <div data-testid="page-profile">
          <h2>
            { user.name }
          </h2>
          <h2>
            { user.description }
          </h2>
          <h2>
            { user.email }
          </h2>
          <img data-testid="profile-image" src={ user.image } alt="perfil" />
          <Link to="/profile/edit">Editar perfil</Link>
        </div>
      </>
    );
  }
}

export default Profile;
