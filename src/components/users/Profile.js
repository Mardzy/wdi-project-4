import React from 'react';
import { Link } from 'react-router-dom';
import Axios from 'axios';
import {Container, Row, Col, Button } from 'reactstrap';
import GoogleMap from  '../utility/GoogleMap';
import BackButton from '../utility/BackButton';
import CommentForm from '../utility/CommentForm';
import Auth from '../../lib/Auth';

class Profile extends React.Component {
  state = {
    user: null,
    location: {},
    comment: '',
    errors: {
      comment: ''
    }
  }

  getInfo = () => {
    Axios
      .get(`/api/users/${this.props.match.params.id}`)
      .then(res => this.setState({ user: res.data }/*, () => console.log(res)*/))
      .catch(err => {
        if(err.response && err.response.status === 404) return this.props.history.reuser('/404');
        console.log(err);
      });
  }

  componentWillMount() {
    this.getInfo();
  }

  deleteUser = () => {
    Axios
      .delete(`/api/users/${this.props.match.params.id}`)
      .then(() => this.props.history.push('/home'));
  }

  createConversation = () => {
    Axios
      .post('/api/conversations', {to: this.state.user.id}, {
        headers: { Authorization: `Bearer ${Auth.getToken()}` }
      })
      .then(res => this.props.history.push(`/conversations/${res.data.id}`))
      .catch(err => console.log(err));

  }

  deleteComment = (commentId) => {
    Axios
      .delete(`/api/users/${this.props.match.params.id}/comments/${commentId}`, {
        headers: { 'Authorization': 'Bearer ' + Auth.getToken() }
      })
      .then(() => this.getInfo())
      .catch(err => console.log(err));
  }

 handleChange = ({ target: { value } }) => {
   this.setState({ comment: value });
 }

 handleSubmit = e => {
   e.preventDefault();
   Axios
     .post(`/api/users/${this.props.match.params.id}/comments`, { text: this.state.newComment }, {
       headers: { 'Authorization': 'Bearer ' + Auth.getToken() }
     })
     .then(res => this.setState({ user: res.data, comment: '' }))
     .catch(err => console.log(err.response.data));
 }

 isOwner(comment) {
   return Auth.getPayload() && Auth.getPayload().userId === comment.createdBy.id;
 }

 render() {
   if(!this.state.user) return null;
   const userId = Auth.getPayload() ? Auth.getPayload().userId : null;
   const authenticated = Auth.isAuthenticated();
   const { name, imageSRC, id, cats, bio } = this.state.user;
   return (
     <Container id="profile">
       <div className="heading">
         <BackButton history={this.props.history} />
         <h4>{name}`s Profile</h4>
       </div>
       <Row>
         <Col md={2}>

           <div>
             {imageSRC && <img className="profile-image" src={imageSRC} />}
             <p>{bio}</p>
           </div>
           {userId !== id &&<Button className="new-button" outline onClick={this.createConversation}><i className="fa fa-envelope" aria-hidden="true"></i> Message {name}</Button>}
           {authenticated && userId === id && <div>
             <Link className="btn btn-outline edit" to={`/users/${id}/edit`}>Edit Profile</Link>
             <Button outline color="danger" onClick={this.deleteUser}>Delete Profile       </Button>


           </div>}

         </Col>
         <Col id="cat-hero-col">
           {cats && cats.map(cat => <Col id="profile-cats" key={cat.id}>
             <h4>{cat.name}</h4>
             {cat && <Link to={`/cats/${cat.id}`}>{cat.heroImage && <img src={cat.heroImage.imageSRC} />}</Link>}


           </Col>
           )}

         </Col>
         <Col>
           {this.state.user.location && <GoogleMap
             center={this.state.user.location}
           />}
           {authenticated && <CommentForm
             comment={this.state.comment}
             handleSubmit={this.handleSubmit}
             handleChange={this.handleChange}
             errors={this.state.errors}
           />}
           {!this.state.user.comments && <p>Loading comments...</p>}
           <ul>
             {this.state.user.comments && this.state.user.comments.map(comment =>
               <li key={comment.id}>
                 <p>{comment.text}</p>
                 {authenticated && this.isOwner(comment) && <Button onClick={() => this.deleteComment(comment.id)}>X</Button>}
                 By: {comment.id && <small>{comment.createdBy.name}</small>}
               </li>
             )}
           </ul>
         </Col>
       </Row>
     </Container>
   );
 }
}

export default Profile;
