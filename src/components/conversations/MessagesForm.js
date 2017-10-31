import React from 'react';
import { Alert, Button, Form, FormGroup, Label, Input } from 'reactstrap';

const MessagesForm = ({ handleChange, handleSubmit, message, errors }) => {
  // console.log('message =>', message);
  return (
    <Form onSubmit={handleSubmit}>
      <FormGroup className={errors.text ? 'has-error' : ''}>
        <Label for="text">Message</Label>
        <Input
          type="textarea"
          name="text"
          id="text"
          value={message.text}
          onChange={handleChange}
        />
        {errors.text && <Alert color="danger">
          <small>{errors}</small>
        </Alert>}
      </FormGroup>
      {/* {errors.invalid && <Alert color="danger">
        <small>{errors.invalid}</small>
      </Alert>} */}
      <Button outline>Submit</Button>
    </Form>
  );
};

export default MessagesForm;
