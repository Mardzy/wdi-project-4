import React from 'react';
import { Container, Row, Col, Button } from 'reactstrap';
import Auth from '../../lib/Auth';
import { Link } from 'react-router-dom';

const Cat =  ({name, age, gender, type, id, gallery, heroImage, deleteCat, show, index, owner }) => {
  const authenticated = Auth.isAuthenticated();
  // const userId = Auth.getPayload() ? Auth.getPayload.userId : null;
  return (

    <Container className="container">
      <h2>{name}</h2>

      <Row className="show-row">

        <Col className="info">

          {show && owner &&<div>
            <h3>Breed: <em>{type}</em></h3>
            <h5>{name} is {age} old {gender} {type} cat.</h5>
            <p></p>
            <p>Owner: {owner.name}</p>

            <Button className="new-button" outline><Link to={`/users/${owner.id}`}><img className="round-image" src={owner.imageSRC} /> Visit {owner.name}`s Profile</Link></Button></div>}
        </Col>
        <Col className="hero-col">
          {heroImage && gallery && <img id="hero" src={heroImage.imageSRC || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyo5A_G2Vzc1vU5Rmljj1vVRVYeH1Fthl0Aplhi4ErssVoLZ9AdA'} alt={name} /> }
        </Col>
        {show && authenticated && <Col>
          <Button className="new-button" outline><Link to={`/cats/${id}/images/new`}>Add Photo</Link></Button>
          <Button className="new-button" outline><Link to={`/messages/${id}`}>Add Photo</Link></Button>
          <Button className="edit-button" outline><Link to={`/cats/${id}/edit`}>Edit</Link></Button>
          <Button outline color="danger" onClick={deleteCat}>Delete</Button>
        </Col>}
      </Row>
    </Container>

  );
};

export default Cat;
