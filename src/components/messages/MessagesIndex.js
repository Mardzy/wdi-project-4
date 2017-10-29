import React from 'react';
import Axios from 'axios';
import Message from '../messages/message';
import {Link} from 'react-router-dom';
import {Container, Row, Col } from 'reactstrap';
// import queryString from 'query-string';


class MessageIndex extends React.Component{
  state = {
    messages: [],
    users: []
  }
  // componentWillMount(){
  //   this.user = OAuth.getProvider(this.props.provider);
  //   if there is no code in the address bar
  //   AND the provider in localStorage does not match this button
  //   stop here..
  //   if(!location.search.match(/code/) || localStorage.getItem('provider') !== this.props.provider) return false;
  //   get the query string out of the address bar as an Object
  //   {code: 'uhgfjsdkhgasjkfhd'}
  //   const data = queryString.parse(this.props.location.search);
  //   data.redirectUri = window.location.origin + window.location.pathname;
  //   console.log(data);
  //   Axios
  //     .get(this.provider.url, data)
  //     .then(res => Auth.setToken(res.data.token))
  //     .then(() => localStorage.removeItem('provider'))
  //     .then(() => this.props.history.replace(this.props.location.pathname))
  //     .then(() => this.props.history.push('/'));
  // }

  componentWillMount(){
    Axios
      .get('/api/messages')
      .then(res => this.setState({messages: res.data}/*, ()=> console.log(res.data)*/))
      .catch(err=> console.log(err));
  }

  render(){

    return(

      <Container id="index">
        <h2>Inbox</h2>
        <Row>
          {this.state.messages && this.state.messages.map(message =>
            <Col xs={12} sm={6} md={4} key={message.id}>
              <Link to={`/messages/${message.id}`}>
                <Message {...message} index={true}></Message>
              </Link>
            </Col>
          )}
        </Row>
      </Container>

    );
  }
}
export default MessageIndex;
