import React from 'react';
import {Container, Alert, Button, Form, FormGroup, Label, Input } from 'reactstrap';

const MessageForm = ({ handleChange, handleSubmit, message, errors }) => {
  console.log(message);
  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <FormGroup className={errors ? 'has-error' : ''}>
          <Label for="text">Message</Label>
          <Input type="textarea" name="text" id="text" value={message.text} onChange={handleChange}/>
          {errors && <Alert color="danger">
            <small>{errors.text}</small>
          </Alert>}
        </FormGroup>
        {errors.invalid && <Alert color="danger">
          <small>{errors.invalid}</small>
        </Alert>}
        <Button>Submit</Button>
      </Form>
    </Container>

  );
};

export default MessageForm;
