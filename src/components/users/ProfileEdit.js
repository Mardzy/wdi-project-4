import React from 'react';
import Axios from 'axios';
import Auth from '../../lib/Auth';
import ProfileForm from './ProfileForm';
import { geocodeByAddress, getLatLng } from 'react-places-autocomplete';

class ProfileEdit extends React.Component {
  state = {
    user: {
      name: '',
      location: {},
      dob: '',
      email: '',
      imageSRC: '',
      id: ''
    },
    address: '',
    errors: {
      name: '',
      location: {},
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

    geocodeByAddress(this.state.address)
      .then(results => getLatLng(results[0]))
      .then(latLng => {
        const user = Object.assign({}, this.state.user, { location: latLng });
        this.setState({ user });
      });
  }

  updateUser = () => {
    Axios
      .put(`/api/users/${this.props.match.params.id}`, this.state.user, {
        headers: { Authorization: `Bearer ${Auth.getToken()}` }
      })
      .then(res => this.props.history.push(`/users/${res.data.id}`))
      .catch(err => this.setState({ errors: err.response.data.errors }));
  }

  handleAddress = address => this.setState({ address });

  render() {
    return (
      <ProfileForm
        history={this.props.history}
        handleSubmit={this.handleSubmit}
        handleChange={this.handleChange}
        handleAddress={this.handleAddress}
        user={this.state.user}
        address={this.state.address}
        errors={this.state.errors}
      />
    );
  }
}

export default ProfileEdit;
