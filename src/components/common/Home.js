import React from 'react';
import HomeCarousel from '../utility/HomeCarousel';
import {Row, Col, Jumbotron} from 'reactstrap';

class Home extends React.Component{
  render(){
    return (
      <div id="home">
        <Row className="top"></Row>
        <Row className="middle">
          <Col md={6} id="home-info">

            <h1 className="one">C<span className="ginger">a</span><span className="black">t</span> M<span className="ginger">a</span><span className="black">d</span></h1>
            <h1 className="two">C<span className="black">a</span><span className="white">t</span> M<span className="black">a</span><span className="white">d</span></h1>
            <h1 className="three">C<span className="white">a</span><span className="ginger">t</span> M<span className="white">a</span><span className="ginger">d</span></h1>


          </Col>
          <Col md={6} id="home-hero" className="pr-0"><HomeCarousel/></Col>
        </Row>
        <Row className="bottom"></Row>

      </div>
    );
  }
}

export default Home;
