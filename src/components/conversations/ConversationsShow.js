import React from 'react';
import Axios from 'axios';
import MessagesForm from './MessagesForm';
import { Row } from 'reactstrap';
// import MessagesNew from './MessagesNew';
import Auth from '../../lib/Auth';
import { Link } from 'react-router-dom';


class MessageShow extends React.Component {
  state = {
    conversation: null,
    message: { text: '' },
    errors: {}
  }

  componentDidMount() {
    // load the message items from the API
    Axios.get(`/api/conversations/${this.props.match.params.id}`, {
      headers: { 'Authorization': 'Bearer ' + Auth.getToken() }
    })
      .then(res => this.setState({ conversation: res.data },/*() => console.log(res.data)*/))
      .catch(err => console.log(err));
  }

  handleChange = ({ target: { value } }) => {
    const message = Object.assign({}, this.state.message, { text: value });
    this.setState({ message });
  }

  handleSubmit = (e) => {
    console.log('props', this.props);
    e.preventDefault();

    Axios
      .post(`/api/conversations/${this.props.match.params.id}/messages`, this.state.message, {
        headers: { 'Authorization': 'Bearer ' + Auth.getToken() }
      })
      .then(res => this.setState({ conversation: res.data, message: { text: '' } }, console.log(res.data)))
      .catch(err => this.setState({ errors: err.response.data.errors }));
  }

  render() {
    console.log('conversation ==>', this.state.conversation);
    // console.log('message ==>', this.state.message);
    return (
      <div className="container">
        {this.state.conversation && <div><h1> Message History for {this.state.conversation.from.name} & {this.state.conversation.to.name}</h1>
          <p></p>
        </div>}
        {this.state.conversation && this.state.conversation.messages.map(message =>
          <Row key={message.id}>
            <Link className="btn btn-outline" to={`/users/${message.from.id}`}><img className="round-image" src={message.from.imageSRC} /> Visit {message.from.name}`s Profile</Link>
            <p>{message.text}</p>
          </Row>
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
