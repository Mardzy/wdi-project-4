import React from 'react';
import { Link } from 'react-router-dom';
import Axios from 'axios';
import {Container, Row, Col, Button } from 'reactstrap';

import BackButton from '../utility/BackButton';
import Auth from '../../lib/Auth';

class Profile extends React.Component {
  state = {
    user: {}
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

  deleteuser = () => {
    Axios
      .delete(`/api/users/${this.props.match.params.id}`)
      .then(() => this.props.history.push('/'));
  }

  render() {
    const { user } = this.state;
    return (
      <Container>
        <h2>{user.name} and Cat</h2>
        <Row>
          <Col md={3}>
            <img src={user.image} />
            <h4>{user.age} old</h4>
            <BackButton history={this.props.history} />
            {Auth.isAuthenticated() && <Link to={`/users/${this.state.user.id}/edit`} className="standard-button">
              <i className="fa fa-pencil" aria-hidden="true"></i>Edit
            </Link>}
            {' '}
            {Auth.isAuthenticated() && <Button color="danger" onClick={this.deleteuser}>
              <i className="fa fa-trash" aria-hidden="true"></i>Delete
            </Button>}
          </Col>
          <Col md={9}>
            {user.cats && user.cats.map(cat => <Row key={cat.id}>
              <h4>{cat.name}</h4>
              {cat.gallery.map(item =>
                <Col md={3} key={item.id}>
                  <img  src={item.image} />
                </Col>
              )}

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
