import React from 'react';
import Axios from 'axios';
import MessagesForm from './MessagesForm';
import { Container, Row } from 'reactstrap';
import Auth from '../../lib/Auth';
import { Link } from 'react-router-dom';
import BackButton from '../utility/BackButton';



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
    return (
      <Container className="conversation-show">
        {this.state.conversation && <div className="page-banner">
          <BackButton history={history} />
          <h2>Message History for {this.state.conversation.from.name} & {this.state.conversation.to.name}</h2>
          <div></div>

        </div>}
        <div id="conversations-show" className="container">
          <div className="conversation-body">
            {this.state.conversation && this.state.conversation.messages.map(message =>
              <Row className="message" key={message.id}>
                <Link className="btn btn-outline" to={`/users/${message.from.id}`}><img className="round-image" src={message.from.imageSRC} /></Link>
                <p>{message.text}</p>
                <small><em>{message.createdAt}</em></small>
              </Row>
            )}
          </div>
          <MessagesForm
            message={this.state.message}
            handleChange={this.handleChange}
            handleSubmit={this.handleSubmit}
            errors={this.state.errors}
            history={this.props.history}
          />
        </div>
      </Container>
    );
  }
}

export default MessageShow;
