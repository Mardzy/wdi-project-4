import React from 'react';
import RegisterForm from './RegisterForm';
import Axios from 'axios';

class Register extends React.Component {

  state = {
    user: {
      name: '',
      dob: '',
      email: '',
      password: '',
      passwordConfirmation: ''
    },
    errors: {
      name: '',
      dob: '',
      email: '',
      password: '',
      passwordConfirmation: ''
    }
  };

  handleChange = ({ target: { name, value }}) => {
    const user = Object.assign({}, this.state.user, { [name]: value });
    this.setState({ user });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    Axios.post('/api/register', this.state.user)
      .then(() => this.props.history.push('/login'))
      .catch(err => console.log('ERROR:', err.response));
  }

  render() {
    return (
      <RegisterForm
        user={this.state.user}
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmit}
        errors={this.state.errors}
        history={this.props.history}
      />
    );
  }
}

export default Register;
