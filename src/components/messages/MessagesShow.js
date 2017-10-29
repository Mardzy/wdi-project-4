import React from 'react';
import Axios from 'axios';
// import Message from './Message';
// import Auth from '../../lib/Auth';

class MessageShow extends React.Component {
  state = {
    message: null
  };

  componentDidMount() {
    // load the message items from the API
    Axios.get(`/api/messages/${this.props.match.params.id}`)
      .then(res => this.setState({ message: res.data },/*() => console.log(res.data)*/))
      .catch(err => console.log(err));
  }

  // currentUser() {
  //   let currentUser = null;
  //   if(Auth.getPayload().userId){
  //     currentUser = Auth.getPayload().userId;
  //   }
  //   return currentUser;
  // }

  render() {
    // const {text, to, from, image, read} = this.state.message
    console.log(this.state.message);
    return (
      <div className="row show">
        <h1>Message</h1>
      </div>
    );
  }
}

export default MessageShow;
