import React from 'react';
import MessagesForm from './MessagesForm';
import Axios from 'axios';
import Auth from '../../lib/Auth';


class Message extends React.Component {

  state = {
    message: {
      text: '',
      from: '',
      to: ''
    },
    errors: {
      text: '',
      from: '',
      to: ''
    }
  };

  componentDidMount() {
    console.log('component mounted');
  }

  handleChange = ({ target: { name, value } }) => {
    const message = Object.assign({}, this.state.message, { [name]: value });
    this.setState({ message });
  }

  handleSubmit = (e) => {
    e.preventDefault();

    Axios
      .post('/api/messages', this.state.message, {
        headers: { 'Authorization': 'Bearer ' + Auth.getToken() }
      })
      .then(res => this.setState({ message: res.data.text}, console.log(res.data)))
      // .then(() => this.props.history.push('/index'))
      .catch(err => this.setState({ errors: err.response.data.errors }));
  }

  render() {
    return (
      <MessagesForm
        message={this.state.message}
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmit}
        errors={this.state.errors}
        history={this.props.history}
      />
    );
  }
}

export default Message;
