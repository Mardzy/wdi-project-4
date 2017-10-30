import React from 'react';
import { Container, Row, Col, Button } from 'reactstrap';
import Auth from '../../lib/Auth';
import { Link } from 'react-router-dom';

const Cat =  ({name, age, gender, type, id, gallery, heroImage, deleteCat, show, index, owner }) => {
  const authenticated = Auth.isAuthenticated();
  // const userId = Auth.getPayload() ? Auth.getPayload.userId : null;
  return (

    <Container className="container-fluid">

      {!show && <div>
        <h2>{name}</h2>
        <h6>Breed: <em>{type}</em></h6>
      </div>}

      <Row className="show-row">

        <Col md={4} className="info">

          {show && owner &&<div>
            <h5>{name} is a {age} old {gender} {type} cat.</h5>
            <p></p>
            <p>Owner: {owner.name}</p>

            <Button className="new-button" outline><Link to={`/users/${owner.id}`}><img className="round-image" src={owner.imageSRC} /> Visit {owner.name}`s Profile</Link></Button></div>}
        </Col>
        <Col md={6} className="hero-col">
          {heroImage && gallery && <img id="hero" src={heroImage.imageSRC || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyo5A_G2Vzc1vU5Rmljj1vVRVYeH1Fthl0Aplhi4ErssVoLZ9AdA'} alt={name} /> }
        </Col>
        {show && authenticated && <Col md={2}>
          <Link className="btn btn-outline new" to={`/cats/${id}/images/new`}>Add Photo</Link>
          <Link className="btn btn-outline edit" to={`/cats/${id}/edit`}>Edit Cat</Link>
          <Button outline color="danger" onClick={deleteCat}>Delete</Button>
        </Col>}
      </Row>
    </Container>

  );
};

export default Cat;
