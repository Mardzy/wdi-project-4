import React from 'react';
import {Jumbotron} from 'reactstrap';

const NoRoute = () => {
  return (

    <div id="no-route">
      <Jumbotron>
        <h1 className="display-4">Nothing to see here...</h1>
      </Jumbotron>
      <div className="cat">
        <div className="ear ear--left"></div>
        <div className="ear ear--right"></div>
        <div className="face">
          <div className="eye eye--left">
            <div className="eye-pupil"></div>
          </div>
          <div className="eye eye--right">
            <div className="eye-pupil"></div>
          </div>
          <div className="muzzle"></div>
        </div>
      </div>
      <Jumbotron>
        <h1 className="display-1">MEEOOOWW!!</h1>
      </Jumbotron>
    </div>
  );
};

export default NoRoute;
