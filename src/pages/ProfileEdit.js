import React from 'react';
import PropTypes from 'prop-types';
import Loading from '../components/Loading';
import { getUser, updateUser } from '../services/userAPI';
import Header from '../components/Header';

class ProfileEdit extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      Name: '',
      Description: '',
      Email: '',
      Image: '',
    };
  }

  componentDidMount = () => {
    this.getUserLogin();
  }

  getUserLogin = async () => {
    this.setState({
      loading: true,
    });
    const result = await getUser();
    this.setState({
      loading: false,
      Name: result.name,
      Description: result.description,
      Email: result.email,
      Image: result.image,
    });
  }

  handleUser= ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  btnValidation = () => {
    const { Name, Description, Email, Image } = this.state;
    const regexVerify = /\S+@\S+\.\S+/;
    const emailVerify = regexVerify.test(Email);
    if (Name.length > 0 && Description.length > 0 && Image.length > 0 && emailVerify) {
      return false;
    } return true;
  }

  profileEdit = async () => {
    const { history } = this.props;
    const { Name, Description, Email, Image } = this.state;
    this.setState({
      loading: true,
    });
    await updateUser({ name: Name,
      email: Email,
      image: Image,
      description: Description });
    this.setState({
      loading: false,
    });
    history.push('/profile');
  }

  render() {
    const { loading, Name, Description, Email, Image } = this.state;
    return (
      <div data-testid="page-profile-edit">
        <Header />
        {loading ? <Loading /> : (
          <form>
            <label htmlFor="input-name">
              <input
                data-testid="edit-input-name"
                id="input-name"
                name="Name"
                defaultValue={ Name }
                onChange={ this.handleUser }
              />
            </label>
            <label htmlFor="input-email">
              <input
                data-testid="edit-input-email"
                id="input-email"
                name="Email"
                defaultValue={ Email }
                onChange={ this.handleUser }
              />
            </label>
            <label htmlFor="input-description">
              <input
                data-testid="edit-input-description"
                id="input-description"
                name="Description"
                defaultValue={ Description }
                onChange={ this.handleUser }
              />
            </label>
            <label htmlFor="input-image">
              <input
                data-testid="edit-input-image"
                id="input-image"
                name="Image"
                defaultValue={ Image }
                onChange={ this.handleUser }
              />
            </label>

            <button
              data-testid="edit-button-save"
              id="validationBtn"
              name="validationBtn"
              type="button"
              disabled={ this.btnValidation() }
              onClick={ this.profileEdit }
            >
              Salvar
            </button>

          </form>

        )}
      </div>
    );
  }
}

ProfileEdit.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default ProfileEdit;
