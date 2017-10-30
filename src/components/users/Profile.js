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

  render() {
    // const User = Auth.getPayload().userId;
    const { user } = this.state;
    console.log(this.state.user.cats && user);
    return (
      <Container>
        <Row>
          <Col md={3}>
            <img src={user.imageSRC || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWstsZn-GdjM44v3LixeexalwxI1nxFQ3Bs8cIkVU5KPE-6zFVfg'} />
            <h2>Name: {user.name}</h2>
            <h4>{user.age} old</h4>
            <BackButton history={this.props.history} />
            {Auth.isAuthenticated() && <Link to={`/users/${user.id}/edit`} className="standard-button">
              <i className="fa fa-pencil" aria-hidden="true"></i>Edit
            </Link>}
            {' '}
            {Auth.isAuthenticated() && <Button
              color="danger"
              onClick={this.deleteUser}
            >Delete
            </Button>}
          </Col>
          <Col md={9}>
            {user.cats && user.cats.map(cat => <Row key={cat.id}>
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
