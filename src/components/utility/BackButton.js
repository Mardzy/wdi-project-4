import React from 'react';
import { Button } from 'reactstrap';


const BackButton = ({ history }) => {
  return (
    <div>
      <Button className="back" outline onClick={history.goBack}>
        <i className="fa fa-chevron-left" aria-hidden="true"></i>
      </Button>
    </div>
  );
};

export default BackButton;
