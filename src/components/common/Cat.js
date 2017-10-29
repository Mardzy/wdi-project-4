import React from 'react';
import { Container, Row, Col, Button } from 'reactstrap';
import Auth from '../../lib/Auth';
import { Link } from 'react-router-dom';

const Cat =  ({name, age, gender, type, imageSRC, image, id, deleteCat, show }) => {
  const authenticated = Auth.isAuthenticated();
  const userId = Auth.getPayload() ? Auth.getPayload.userId : null;

  return (

    <Container className="container">
      {/* {gallery.map((item, i) => <Row key={i}>
        <Col>
          <img src={item.image} alt={name} />
          <p className="info">{item.description}</p>
        </Col>
      </Row>)} */}
      <Row>
        <Col>
          {id && <img src={imageSRC || image} alt={name} />}
        </Col>
      </Row>
      <Row>
        <Col className="info">
          <h4><em>{name}</em></h4>
          <h5>{type}</h5>
          {show && <h5>{age} old</h5>}
          {show && <p>{gender}</p>}
          {/* {show && <Link to={`/users/${owner.id}`}>{owner.name}</Link>} */}
        </Col>
      </Row>
      {show && authenticated && userId === id && <Link to={`/cats/${id}/edit`} className="btn">Edit</Link>}
      {show && authenticated && userId === id && <Button className="btn" onClick={deleteCat}>Delete</Button>}
    </Container>

  );
};

export default Cat;
