import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import Auth from '../../lib/Auth';
import { Link } from 'react-router-dom';

const Cat =  ({name, age, gender, type, gallery, id, owner, deleteCat, index }) => {
  const authenticated = Auth.isAuthenticated();
  const currentUser = Auth.getPayload().userId;
  // console.log(owner.id);

  return (

    <Container className="container">
      {gallery.map((item, i) => <Row key={i}>
        <Col>
          <img src={item.image} alt={name} />
          <p className="info">{item.description}</p>
        </Col>
      </Row>)}
      <Row>
        <Col className="info">
          <h4><em>{name}</em></h4>
          <h5>{type}</h5>
          {!index && <h5>{age} old</h5>}
          {!index && <p>{gender}</p>}
        </Col>
      </Row>
      {authenticated && !index && currentUser === owner.id && <Link to={`/cats/${id}/edit`} className="btn">Edit</Link>}
      {' '}
      {authenticated && !index && currentUser === owner.id &&
        <button className="btn" onClick={deleteCat}>Delete</button>}
    </Container>

  );
};

export default Cat;
