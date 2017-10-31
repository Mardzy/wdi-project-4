import React from 'react';
import { Link } from 'react-router-dom';
import Axios from 'axios';
import {Container, Row, Col, Button } from 'reactstrap';
import GoogleMap from  '../utility/GoogleMap';
import BackButton from '../utility/BackButton';
import Auth from '../../lib/Auth';

class Profile extends React.Component {
  state = {
    user: null,
    location: {}
  }

  componentWillMount() {
    console.log(this.props.match.params.id);
    Axios
      .get(`/api/users/${this.props.match.params.id}`)
      .then(res => this.setState({ user: res.data }, () => console.log(res)))
      .catch(err => {
        if(err.response && err.response.status === 404) return this.props.history.replace('/404');
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
    // console.log(this.state.user.cats && user);
    return (
      <Container>
        <BackButton history={this.props.history} />
        <h4>{name}`s Profile</h4>
        <Row>
          <Col md={3}>
            <div>
              {imageSRC && <img src={imageSRC} />}
              <p>{bio}</p>
            </div>

            {userId !== id &&<Button className="new-button" outline onClick={this.createConversation}><i className="fa fa-envelope" aria-hidden="true"></i> Message {name}</Button>}
            {authenticated && userId === id && <div>
              <Link className="btn btn-outline edit" to={`/users/${id}/edit`}>Edit Profile</Link>
              <Button outline color="danger" onClick={this.deleteUser}>Delete Profile       </Button>
            </div>}
            {this.state.user.location && <GoogleMap
              center={this.user.location}
            />}
          </Col>
          <Col md={9}>
            {cats && cats.map(cat => <Row key={cat.id}>
              <h4>{cat.name}</h4>
              <Col md={3}>
                {cat && <Link to={`/cats/${cat.id}`}>{cat.heroImage && <img src={cat.heroImage.imageSRC} />}</Link>}
              </Col>

            </Row>
            )}

          </Col>
        </Row>
      </Container>
    );
  }
}

export default Profile;
