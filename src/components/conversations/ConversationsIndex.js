import React from 'react';
import Axios from 'axios';
import Message from '../conversations/message';
// import {Link} from 'react-router-dom';
import {Container, Row, Col } from 'reactstrap';
import Auth from '../../lib/Auth';
// import queryString from 'query-string';


class MessageIndex extends React.Component{
  state = {
    conversations: []
  }

  componentWillMount(){
    Axios
      .get('/api/conversations', {
        headers: { 'Authorization': `Bearer ${Auth.getToken()}` }
      })
      .then(res => this.setState({conversations: res.data}/*, ()=> console.log(res.data)*/))
      .catch(err=> console.log(err));
  }

  render(){
    console.log({...this.state.conversations});
    return(

      <Container id="conversations-index">
        <h1>Inbox</h1>
        <Row>
          {this.state.conversations && this.state.conversations.map(message => {
            console.log('conversation index', message);
            return(<Col xs={12} sm={6} md={6} key={message.id}>
              <Message {...message} index={true}></Message>
            </Col>);
          }
          )}
        </Row>
      </Container>

    );
  }
}
export default MessageIndex;
