import React from 'react';
import Axios from 'axios';
import Message from '../messages/message';
import {Link} from 'react-router-dom';
import {Container, Row, Col } from 'reactstrap';
import Auth from '../../lib/Auth';
// import queryString from 'query-string';


class MessageIndex extends React.Component{
  state = {
    messages: [],
    users: []
  }

  componentWillMount(){
    Axios
      .get('/api/messages', {
        headers: { 'Authorization': `Bearer ${Auth.getToken()}` }
      })
      .then(res => this.setState({messages: res.data}/*, ()=> console.log(res.data)*/))
      .catch(err=> console.log(err));
  }

  render(){

    return(

      <Container id="messages-index">
        <h1>Inbox</h1>
        <Row>
          {this.state.messages && this.state.messages.map(message =>
            <Col xs={12} sm={6} md={6} key={message.id}>
              <Message {...message} index={true}></Message>
            </Col>
          )}
        </Row>
      </Container>

    );
  }
}
export default MessageIndex;
