import React from 'react';
import Axios from 'axios';
import MessagesForm from './MessagesForm';

// import MessagesNew from './MessagesNew';
import Auth from '../../lib/Auth';

class MessageShow extends React.Component {
  state = {
    conversations: null,
    message: {
      text: '',
      to: ''
    },
    errors: {
      text: '',
      to: ''
    }
  };

  componentDidMount() {
    // load the message items from the API
    Axios.get(`/api/conversations/${this.props.match.params.id}`, {
      headers: { 'Authorization': 'Bearer ' + Auth.getToken() }
    })
      .then(res => this.setState({ conversations: res.data },/*() => console.log(res.data)*/))
      .catch(err => console.log(err));
  }

  handleChange = ({ target: { name, value } }) => {
    const message = Object.assign({}, this.state.message, { [name]: value });
    this.setState({ message });
  }

  handleSubmit = (e) => {
    console.log('props', this.props);
    e.preventDefault();

    Axios
      .post(`/api/conversations/${this.props.match.params.id}/messages`, this.state.message, {
        headers: { 'Authorization': 'Bearer ' + Auth.getToken() }
      })
      .then(res => this.setState({message: res.data}/*, console.log(res.data)*/))
      .catch(err => this.setState({ errors: err.response.data.errors }));
  }

  render() {
    // const {text, to, from, image, read} = this.state.message
    console.log('conversations ==>', this.state.conversations);
    return (
      <div className="row show">
        <h1>Message</h1>
        {this.state.conversation && this.state.conversation.messages.map(message =>
          <p key={message.id}>{message.text}</p>
        )}
        <MessagesForm
          message={this.state.message}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
          errors={this.state.errors}
          history={this.props.history}
        />
      </div>
    );
  }
}

export default MessageShow;
