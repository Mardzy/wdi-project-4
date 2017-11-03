import React from 'react';
import Axios from 'axios';
import {Link} from 'react-router-dom';
import {Container, Row} from 'reactstrap';
import Auth from '../../lib/Auth';
import BackButton from '../utility/BackButton';



class MessageIndex extends React.Component{
  state = {
    conversations: null
  }

  componentDidMount(){
    Axios
      .get('/api/conversations', {
        headers: { 'Authorization': `Bearer ${Auth.getToken()}` }
      })
      .then(res => this.setState({ conversations: res.data }, ()=> console.log(res.data)))
      .catch(err=> console.log(err));
  }

  render(){
    // let emptyInbox = null; this.state.conversation.messages.length === null ? emptyInbox = <h4>Sorry no Messages yet..</h4> : null;
    const userId = Auth.getPayload() ? Auth.getPayload().userId : null;
    return(
      <Container id="conversations-index">
        <div className="page-banner">
          <BackButton history={history} />
          <h2>Inbox</h2>
          <div></div>
        </div>
        {/* {emptyInbox} */}
        {this.state.conversations && this.state.conversations.map(conversation =>
          <Row key={conversation.id}>
            {userId !== conversation.to.id &&
              <Link className="btn btn-outline"
                to={`/conversations/${conversation.id}`}
              >
                <img className="round-image" src={conversation.to.imageSRC} />
                {conversation.to.name}`s Messages
              </Link> }
          </Row>
        )}
      </Container>
    );
  }
}
export default MessageIndex;
