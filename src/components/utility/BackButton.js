import React from 'react';
import { Button } from 'reactstrap';


const BackButton = ({ history }) => {
  return (
    <div>
      <Button outline onClick={history.goBack}>
        <i className="fa fa-arrow-left" aria-hidden="true"></i>Back
      </Button>
    </div>
  );
};

export default BackButton;
