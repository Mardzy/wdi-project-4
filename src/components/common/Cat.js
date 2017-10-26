import React from 'react';
import { Container, Row } from 'reactstrap';
import moment from 'moment';


const Cat =  ({name, age, gender, type/*, gallery, index, id*/}) => {
  // console.log('gallery log', gallery[0].image);
  // let imageHTML = null;
  // if(index) imageHTML = <Link to={`/cats/${id}`}><img src={gallery[0].image} alt={type}/></Link>;
  // else imageHTML = <img className="image" src={gallery[0].image} alt={name} />;
  let yearsOld = null;
  const calculateAge = moment().diff(age, 'months');
  if ( calculateAge > 12 ) yearsOld = moment().diff(age, 'years');
  else yearsOld = moment().diff(age, 'months') + ' months';

  return (

    <Container className="container show-container">
      {/* <Row id="image">
        {imageHTML}
      </Row> */}
      <Row id="info">
        <h4><em>{name}</em></h4>
        <h5>{type}</h5>
        <h5>Age: {yearsOld}</h5>
        <p>Gender: {gender}</p>
      </Row>
    </Container>

  );
};

export default Cat;

// name: 'Cece',
// age: '2017-02-21',
// gender: 'female',
// type: 'Persian British short hair',
// gallery: [{
//   description: 'Do you have treats!?',
//   image: '/images/cece.jpg'
// }],
// owner: users[0]
