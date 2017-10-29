import React from 'react';
import MessageForm from './MessageForm';
import Axios from 'axios';
import Auth from '../../lib/Auth';


class Message extends React.Component {

  state = {
    message: {
      text: '',
      to: '',
      from: '',
      image: '',
      read: ''
    },
    error: {
      text: '',
      to: '',
      from: '',
      image: '',
      read: ''
    }
  };

  handleChange = ({ target: { name, value } }) => {
    const message = Object.assign({}, this.state.message, { [name]: value });
    this.setState({ message });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    Axios.post('/api/login', this.state.credentials)
      .then((res) =>{
        Auth.setToken(res.data.token);
        console.log(res.data.token);
        this.props.history.push('/index');
      })
      .catch(() => this.setState({ error: 'Unrecognizable user login credentials'}));
  }

  render() {
    return (
      <MessageForm
        credentials={this.state.credentials}
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmit}
        error={this.state.error}
        history={this.props.history}
      />
    );
  }
}

export default Message;
