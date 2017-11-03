import React from 'react';
import HomeCarousel from '../utility/HomeCarousel';
import {Row, Col} from 'reactstrap';

class Home extends React.Component{
  render(){
    return (
      <div id="home">
        <Row className="top"></Row>
        <Row className="middle">
          <Col md={6} id="home-info">

            <h1 className="one">C<span className="ginger">A</span><span className="black">T</span>   M<span className="ginger">A</span><span className="black">D</span></h1>
            <h1 className="two">C<span className="black">A</span><span className="white">T</span>  M<span className="black">A</span><span className="white">D</span></h1>
            <h1 className="three">C<span className="white">A</span><span className="ginger">T</span>   M<span className="white">A</span><span className="ginger">D</span></h1>


          </Col>
          <Col md={6} id="home-hero" className="pr-0"><HomeCarousel/></Col>
        </Row>
        <Row className="bottom"></Row>

      </div>
    );
  }
}

export default Home;
