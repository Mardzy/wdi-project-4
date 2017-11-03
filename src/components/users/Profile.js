import React from 'react';
import { Link } from 'react-router-dom';
import Axios from 'axios';
import { Row, Col, Button } from 'reactstrap';
import GoogleMap from  '../utility/GoogleMap';
import BackButton from '../utility/BackButton';
import Auth from '../../lib/Auth';

class Profile extends React.Component {
  state = {
    user: {
      comments: []
    },
    location: {},
    comment: '',
    errors: {
      comment: ''
    }
  }

  componentDidMount () {
    Axios
      .get(`/api/users/${this.props.match.params.id}`)
      .then(res => this.setState({ user: res.data }/*, () => console.log(res)*/))
      .catch(err => {
        if(err.response && err.response.status === 404) return this.props.history.reuser('/404');
        console.log(err);
      });
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

  render() {
    if(!this.state.user) return null;
    const userId = Auth.getPayload() ? Auth.getPayload().userId : null;
    const authenticated = Auth.isAuthenticated();
    const { name, imageSRC, id, cats, bio } = this.state.user;
    return (
      <div id="profile" className="container-fluid">
        <div className="page-banner">
          <BackButton history={this.props.history} />
          <h2>{name}`s Profile</h2>
          <div></div>
        </div>
        <div className="">
          <Row>
            <Col className="user">
              <div>
                {imageSRC && <img className="profile-image" src={imageSRC} />}
                <p>{bio}</p>
              </div>
              {userId !== id &&<Button className="add message" outline onClick={this.createConversation}><i className="fa fa-envelope" aria-hidden="true"></i> Message {name}</Button>}
              {authenticated && userId === id && <div className="buttons">
                <Link className="btn btn-outline edit" to={`/users/${id}/edit`}>Edit Profile</Link>
                <Button outline className="delete" onClick={this.deleteUser}>Delete Profile</Button>
              </div>}
            </Col>
          </Row>
          <Row>
            <Col md={5}>
              {this.state.user.location && <GoogleMap
                center={this.state.user.location}
              />}
            </Col>
            <Col md={5} id="cat-hero-col">
              {cats && cats.map(cat => <Col id="profile-cats" key={cat.id}>
                <h4>{cat.name}</h4>
                {cat && <Link to={`/cats/${cat.id}`}>{cat.heroImage && <img className="cat-profile" src={cat.heroImage.imageSRC} />}</Link>}
              </Col>
              )}
            </Col>
          </Row>

        </div>
      </div>
    );
  }
}

export default Profile;
