import React from 'react';
import { Container/*, Row, Col*/ } from 'reactstrap';
// import Auth from '../../lib/Auth';
// import { Link } from 'react-router-dom';

const Gallery =  ({ deleteImage, src }) => {
  // const authenticated = Auth.isAuthenticated();
  // const currentUser = Auth.getPayload().userId;
  console.log('gallery log', src);
  return (

    <Container className="container">
      <h1>Gallery</h1>



      <button className="btn" onClick={deleteImage}>Delete</button>
    </Container>

  );
};

export default Gallery;
