import React from 'react';
import { Container, Row, Col, Button } from 'reactstrap';
import Auth from '../../lib/Auth';
import { Link } from 'react-router-dom';

const Cat =  ({name, age, gender, type, id, heroImage, deleteCat, show, owner }) => {
  // console.log('showing owner', owner);
  const userId = Auth.getPayload() ? Auth.getPayload().userId : null;
  const authenticated = Auth.isAuthenticated();
  return (
    <Container className="container-fluid">
      {!show && <div>
        <h2>{name}</h2>
        <h6>Breed: <em>{type}</em></h6>
      </div>}
      <Row className="show-row">
        <Col className="info">
          {show && owner &&<div>
            <h5>{name} is a {age} old {gender} {type} cat.</h5>
            <p></p>
            <p>Owner: {owner.name}</p>
            <Link className="btn btn-outline" to={`/users/${owner.id}`}><img className="round-image" src={owner.imageSRC} /> Visit {owner.name}`s Profile</Link>
          </div>}
        </Col>
        <Col className="hero-col">
          {heroImage && <img id="hero" src={heroImage.imageSRC} alt={name} /> }
        </Col>
        {show && owner&& authenticated && userId === owner.id && <Col md={2}>
          <Link className="btn btn-outline new" to={`/cats/${id}/images/new`}>Add Photo</Link>
          <Link className="btn btn-outline edit" to={`/cats/${id}/edit`}>Edit Cat</Link>
          <Button outline color="danger" onClick={deleteCat}>Delete</Button>
        </Col>}
      </Row>
    </Container>

  );
};

export default Cat;
