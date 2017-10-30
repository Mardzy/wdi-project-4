import React from 'react';
import { Container, Row, Col } from 'reactstrap';
// import Auth from '../../lib/Auth';
// import { Link } from 'react-router-dom';

const Message =  ({ messages/*, id*/ }) => {
  // const currentUser = Auth.getPayload() ? Auth.getPayload().userId : null;
  // console.log('to', to);
  // console.log('from',from);
  console.log(messages);

  return (

    <Container className="container">
      <Row>
        {/* {to && to.map(to => {

          console.log('mapping', to);
          return(
            <div key={to.id}>
              <p>{to.name}</p>
            </div>
          );
        })} */}
        <Col className="message">
          {/* <p>{to}</p>
          <p>{from.name}</p> */}
          {messages && messages.map(message => {

            console.log('message', message);
            return(
              <div key={message.id}>

                <p>From: {message.from}</p>
                <p>{message.text}</p>
              </div>
            );
          })}
        </Col>
        {/* <Col className="message">
        </Col> */}
      </Row>
    </Container>

  );
};

export default Message;
