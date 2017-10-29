import React from 'react';
import { Container, Row, Col } from 'reactstrap';
// import Auth from '../../lib/Auth';
import { Link } from 'react-router-dom';

const Message =  ({to, from, text /*, id*/ }) => {


  return (

    <Container className="container">
      <Row>
        <Col className="message">
          <p>To: {to.name}</p>
          <p>{text}</p>
          <Link to={`/users/${from.id}`}>From: {from.name}</Link>
        </Col>
        {/* <Col className="message">
        </Col> */}
      </Row>
    </Container>

  );
};

export default Message;
