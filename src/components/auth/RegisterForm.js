import React from 'react';
import {Container, Alert, Button, Form, FormGroup, Label, Input } from 'reactstrap';

const RegisterForm = ({ handleChange, handleSubmit, user, errors }) => {
  return (

    <Container className="login">
      <h2>Register</h2>
      <Form onSubmit={handleSubmit}>
        <FormGroup className={errors.name ? 'has-error' : ''}>
          <Label for="name">Name</Label>
          <Input
            type="text"
            name="name"
            id="name"
            value={user.name}
            onChange={handleChange}
          />
          {errors.name && <Alert color="danger">
            <small>{errors.name}</small>
          </Alert>}
        </FormGroup>
        <FormGroup className={errors.dob ? 'has-error' : ''}>
          <Label for="dob">Date of Birth (optional)</Label>
          <Input
            type="date"
            name="dob"
            id="dob"
            value={user.dob}
            onChange={handleChange}
          />
          {errors.dob && <Alert color="danger">
            <small>{errors.dob}</small>
          </Alert>}
        </FormGroup>
        <FormGroup className={errors.email ? 'has-error' : ''}>
          <Label for="email">Email</Label>
          <Input
            type="email"
            name="email"
            id="email"
            value={user.email}
            onChange={handleChange}
          />
          {errors.email && <Alert color="danger">
            <small>{errors.email}</small>
          </Alert>}
        </FormGroup>
        <FormGroup className={errors.password ? 'has-error' : ''}>
          <Label for="email">Password</Label>
          <Input
            type="password"
            name="password"
            id="password"
            value={user.password}
            onChange={handleChange}
          />
          {errors.password && <Alert color="danger">
            <small>{errors.password}</small>
          </Alert>}
        </FormGroup>
        <FormGroup className={errors.passwordConfirmation ? 'has-error' : ''}>
          <Label for="password">Password Confirmation</Label>
          <Input
            type="password"
            name="passwordConfirmation"
            id="passwordConfirmation"
            value={user.passwordConfirmation}
            onChange={handleChange}
          />
          {errors.passwordConfirmation && <Alert color="danger">
            <small>{errors.passwordConfirmation}</small>
          </Alert>}
        </FormGroup>
        <Button outline className="add">Submit</Button>
      </Form>

    </Container>

  );
};

export default RegisterForm;
