import React from 'react';
import {Container, Alert, Button, Form, FormGroup, Label, Input } from 'reactstrap';

const MessageForm = ({ handleChange, handleSubmit, message, error }) => {
  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <FormGroup className={error.text ? 'has-error' : ''}>
          <Label for="text">Email</Label>
          <Input type="textarea" name="text" id="text" value={message.text} onChange={handleChange}/>
          {error.text && <Alert color="danger">
            <small>{error.text}</small>
          </Alert>}
        </FormGroup>
        {error.invalid && <Alert color="danger">
          <small>{error.invalid}</small>
        </Alert>}
        <Button>Submit</Button>
      </Form>
    </Container>

  );
};

export default MessageForm;
