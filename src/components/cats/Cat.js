import React from 'react';
import { Container, Row, Col, Button } from 'reactstrap';
import Auth from '../../lib/Auth';
import { Link } from 'react-router-dom';

const Cat =  ({name, age, gender, type, id, gallery, heroImage, deleteCat, show, index, owner }) => {
  const authenticated = Auth.isAuthenticated();
  // const userId = Auth.getPayload() ? Auth.getPayload.userId : null;
  return (

    <Container className="container">
      {/* {gallery && gallery.map((item, i) => <Row key={i}>
        <Col>
          <img src={item.imageSRC} alt={item.caption} />
        </Col>
      </Row>)} */}
      <Row>
        <Col>
          {show&& gallery && <img src={heroImage.imageSRC || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyo5A_G2Vzc1vU5Rmljj1vVRVYeH1Fthl0Aplhi4ErssVoLZ9AdA' } alt={name} /> }
        </Col>
      </Row>
      <Row>
        <Col className="info">
          <h4><em>{name}</em></h4>
          <h5>{type}</h5>
          {show && <h5>{age} old</h5>}
          {show && <p>{gender}</p>}
          {show && owner &&  <Link to={`/users/${owner.id}`}>{owner.name}</Link>}
        </Col>
      </Row>
      {show && authenticated && <Link to={`/cats/${id}/edit`} className="btn">Edit</Link>}
      {show && authenticated && <Button className="btn" onClick={deleteCat}>Delete</Button>}
    </Container>

  );
};

export default Cat;
