import React from 'react';
import Axios from 'axios';
import Auth from '../../lib/Auth';
import ProfileForm from './ProfileForm';

class ProfileEdit extends React.Component {
  state = {
    user: {
      name: '',
      dob: '',
      email: '',
      imageSRC: '',
      id: ''
    },
    errors: {
      name: '',
      dob: '',
      email: '',
      imageSRC: '',
      id: ''
    }
  };

  componentDidMount() {
    Axios
      .get(`/api/users/${this.props.match.params.id}`)
      .then(res => this.setState({ user: res.data }))
      .catch(err => console.log(err));
  }

  handleChange = ({ target: { name, value } }) => {
    const user = Object.assign({}, this.state.user, { [name]: value });
    this.setState({ user });
  }

  handleSubmit = (e) => {
    e.preventDefault();

    Axios
      .put(`/api/users/${this.props.match.params.id}`, this.state.user, {
        headers: { Authorization: `Bearer ${Auth.getToken()}` }
      })
      .then(res => this.props.history.push(`/users/${res.data.id}`))
      .catch(err => this.setState({ errors: err.response.data.errors }));
  }
  render() {
    return (
      <ProfileForm
        history={this.props.history}
        handleSubmit={this.handleSubmit}
        handleChange={this.handleChange}
        user={this.state.user}
        errors={this.state.errors}
      />
    );
  }
}

export default ProfileEdit;
