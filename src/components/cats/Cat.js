import React from 'react';
import { Container, Row, Button } from 'reactstrap';
import Auth from '../../lib/Auth';
import { Link } from 'react-router-dom';
import CatGallery from './CatGallery';


const Cat =  ({name, type, id, heroImage, deleteCat, show, owner, index, gallery }) => {
  const userId = Auth.getPayload() ? Auth.getPayload().userId : null;
  const authenticated = Auth.isAuthenticated();
  return (
    <Container>

      <Row>
        <div className="hero-col">
          {show && owner&& authenticated && userId === owner.id && <div className="buttons">
            <Link className="btn btn-outline add" to={`/cats/${id}/images/new`}>Add Photo</Link>
            <Link className="btn btn-outline edit" to={`/cats/${id}/edit`}>Edit Cat</Link>
            <Button outline className="delete" onClick={deleteCat}>Delete</Button>
          </div>}
          {index && heroImage && <img id="hero" src={heroImage.imageSRC} alt={name} /> }
          { show && gallery && !!gallery.length &&
            <CatGallery
              gallery={gallery}
            ></CatGallery>}
        </div>
      </Row>
      {index && <div className="name-type">
        <h4>{name}</h4>
        <h6><em>{type}</em></h6>
      </div>}
    </Container>
  );
};

export default Cat;
