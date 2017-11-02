import React from 'react';
import Axios from 'axios';
import {/*Container, Row,*/ Col, Button } from 'reactstrap';
// import Cat from './Cat';
import Auth from '../../lib/Auth';
import CommentForm from '../utility/CommentForm';
import CatGallery from './CatGallery';

class CatsShow extends React.Component {
  state = {
    cat: {},
    comment: [],
    errors: {}
  };

  getInfo = () => {
    // load the cat item from the API
    Axios.get(`/api/cats/${this.props.match.params.id}`)
      .then(res => this.setState({ cat: res.data }/*() => console.log(res.data)*/))
      .catch(err => console.log(err));
  }

  componentWillMount() {
    this.getInfo();
  }

  deleteCat = () => {
    Axios
      .delete(`/api/cats/${this.props.match.params.id}`, {
        headers: { 'Authorization': 'Bearer ' + Auth.getToken() }
      })
      .then(() => this.props.history.push('/index'))
      .catch(err => console.log(err));
  }

  deleteComment = (commentId) => {
    Axios
      .delete(`/api/cats/${this.props.match.params.id}/comments/${commentId}`, {
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
      .post(`/api/users/${this.props.match.params.id}/comments`, { text: this.state.comment }, {
        headers: { 'Authorization': 'Bearer ' + Auth.getToken() }
      })
      .then(res => this.setState({ user: res.data, comment: '' }))
      .catch(err => console.log(err.response.data));
  }

  isOwner(comment) {
    return Auth.getPayload() && Auth.getPayload().userId === comment.createdBy.id;
  }

  render() {
    const authenticated = Auth.isAuthenticated();
    // console.log('cats show', this.state.cat);
    return (
      <div id="cat-show">
        {/* {this.state.cat && <Cat
          {...this.state.cat}
          show={true}
          deleteCat={this.deleteCat}
        ></Cat>} */}
        { this.state.cat &&
          <CatGallery
            gallery={this.state.cat.gallery}
          ></CatGallery>}
        {authenticated && <CommentForm
          comment={this.state.comment}
          handleSubmit={this.handleSubmit}
          handleChange={this.handleChange}
          errors={this.state.errors}
        />}
        {!this.state.cat.comments && <p>Loading comments...</p>}
        {this.state.cat.comments && this.state.cat.comments.map(comment =>{
          console.log('logging inside map comment',comment);
          <Col key={comment.id}>
            By: <small>{comment.createdBy.name}</small>
            <p>{comment.text}</p>
            {authenticated && /*this.isOwner(comment) &&*/
              <Button className="round-delete" onClick={() => this.deleteComment(comment.id)}>X</Button>}
          </Col>;
        }
        )}
      </div>
    );
  }
}

export default CatsShow;
