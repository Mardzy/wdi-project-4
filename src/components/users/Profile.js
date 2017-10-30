import React from 'react';
import { Link } from 'react-router-dom';
import Axios from 'axios';
import {Container, Row, Col, Button } from 'reactstrap';

import BackButton from '../utility/BackButton';
import Auth from '../../lib/Auth';

class Profile extends React.Component {
  state = {
    user: {
      cats: []
    }
  }

  componentWillMount() {
    Axios
      .get(`/api/users/${this.props.match.params.id}`)
      .then(res => this.setState({ user: res.data }))
      .catch(err => {
        if(err.response.status === 404) return this.props.history.replace('/404');
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
    // const User = Auth.getPayload().userId;
    const { name, imageSRC, id, cats, bio } = this.state.user;
    // console.log(this.state.user.cats && user);
    return (
      <Container>
        <BackButton history={this.props.history} />
        <h4>{name}`s Profile</h4>
        <Row>
          <Col md={3}>
            <div>
              <img src={imageSRC || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWstsZn-GdjM44v3LixeexalwxI1nxFQ3Bs8cIkVU5KPE-6zFVfg'} />
              <p>{bio}</p>
            </div>

            {/* <h6>{user.age} old</h6> */}

            {Auth.isAuthenticated() && <div>
              <Button className="new-button" outline onClick={this.createConversation}><i className="fa fa-envelope" aria-hidden="true"></i> Message {name}</Button>
              <Link className="btn btn-outline edit" to={`/users/${id}/edit`}>Edit Profile</Link>
              <Button outline color="danger" onClick={this.deleteUser}>Delete Profile       </Button>
            </div>}
          </Col>
          <Col md={9}>
            {cats && cats.map(cat => <Row key={cat.id}>
              <h4>{cat.name}</h4>
              <Col md={3}>
                <Link to={`/cats/${cat.id}`}><img  src={cat.heroImage.imageSRC} /></Link>
              </Col>
              {/* {cat.gallery.map(item =>
                <Col md={3} key={item.id}>
                  <img  src={item.image} />
                </Col>
              )} */}

            </Row>
            )}
            {/* <img src={userCat.gallery.image} alt={userCat.name}/> */}

          </Col>
        </Row>
      </Container>
    );
  }
}

export default Profile;
