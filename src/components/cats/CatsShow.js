import React from 'react';
import Axios from 'axios';
import {Container, Col, Button } from 'reactstrap';
import {Link} from 'react-router-dom';
import BackButton from '../utility/BackButton';
import Cat from './Cat';
import Auth from '../../lib/Auth';
import CommentForm from '../utility/CommentForm';


class CatsShow extends React.Component {
  state = {
    cat: {},
    comment: '',
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
      .post(`/api/cats/${this.props.match.params.id}/comments`, { text: this.state.comment }, {
        headers: { 'Authorization': 'Bearer ' + Auth.getToken() }
      })
      .then(res => this.setState({ cat: res.data, comment: '' }))
      .catch(err => console.log(err.response.data));
  }
  isOwner(comment) {
    return Auth.getPayload() && Auth.getPayload().userId === comment.createdBy.id;
  }
  render() {
    const { owner, age, name, gender, type, comments } = this.state.cat;
    const authenticated = Auth.isAuthenticated();
    // console.log('cats show', this.state.cat);
    return (
      <Container>
        <div className="page-banner">
          <BackButton history={history} />
          <h2 className="headline">{name}`s Page</h2>
          <div></div>
        </div>
        <div id="cat-show">


          <div className="info">
            { owner &&<div>
              <h5>{name} is a {age} old {gender} {type} cat.</h5>
              <p>Owner: {owner.name}</p>
              <Link className="btn btn-outline profile" to={`/users/${owner.id}`}><img className="round-image" src={owner.imageSRC} /> Visit {owner.name}`s Profile</Link>
              <h4>Comments</h4>
              <div className="comment-body">
                {comments && comments.map(comment =>{
                  console.log(comment);
                  return(
                    <Col className="cat-comments" key={comment.id}>
                      <Link className="btn btn-outline" to={`/users/${comment.createdBy.id}`}><img className="comment-image" src={comment.createdBy.imageSRC} /></Link>
                      <p>{comment.text}</p>
                      {authenticated && this.isOwner(comment) &&
                      <Button className="round-delete" onClick={() => this.deleteComment(comment.id)}>X</Button>}
                    </Col>);
                }
                )}
              </div>
              {authenticated && <CommentForm
                comment={this.state.comment}
                handleSubmit={this.handleSubmit}
                handleChange={this.handleChange}
                errors={this.state.errors}
              />}

            </div>}
          </div>
          {this.state.cat && <Cat
            {...this.state.cat}
            show={true}
            deleteCat={this.deleteCat}
          ></Cat>}
        </div>
      </Container>
    );
  }
}

export default CatsShow;
