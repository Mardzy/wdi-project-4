import React from 'react';
import Axios from 'axios';
import {Link} from 'react-router-dom';
import {Container, Row} from 'reactstrap';
import Auth from '../../lib/Auth';


class MessageIndex extends React.Component{
  state = {
    conversations: []
  }

  componentWillMount(){
    Axios
      .get('/api/conversations', {
        headers: { 'Authorization': `Bearer ${Auth.getToken()}` }
      })
      .then(res => this.setState({ conversations: res.data }/*, ()=> console.log(res.data)*/))
      .catch(err=> console.log(err));
  }

  render(){
    const userId = Auth.getPayload() ? Auth.getPayload().userId : null;
    // const authenticated = Auth.isAuthenticated();
    return(
      <Container id="conversations-index">
        <h1>Inbox</h1>
        {this.state.conversations && this.state.conversations.map(conversation =>
          <Row key={conversation.id}>
            {userId !== conversation.to.id &&<Link className="btn btn-outline"
              to={`/conversations/${conversation.id}`}
            ><img className="round-image" src={conversation.to.imageSRC} />{conversation.to.name}`s Messages </Link> }
            {/* <Button className="new-button" outline><Link to={`/users/${owner.id}`}> Visit {owner.name}`s Profile</Link>
          </Button> */}
          </Row>
        )}
      </Container>
    );
  }
}
export default MessageIndex;
