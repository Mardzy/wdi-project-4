import React from 'react';
import { Container, Row, Col } from 'reactstrap';
// import Auth from '../../lib/Auth';
import { Link } from 'react-router-dom';

const Cat =  ({name, age, gender, type, imageSRC, image, id, deleteCat, show }) => {
  // const authenticated = Auth.isAuthenticated();
  // const currentUser = Auth.getPayload().userId;

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
      {show && <Link to={`/cats/${id}/edit`} className="btn">Edit</Link>}
      {' '}
      {show &&
        <button className="btn" onClick={deleteCat}>Delete</button>}
    </Container>

  );
};

export default Cat;
