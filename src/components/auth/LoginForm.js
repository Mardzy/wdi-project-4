import React from 'react';
import OAuthButton from '../utility/OAuthButton';

import {Container, Alert, Button, Form, FormGroup, Label, Input } from 'reactstrap';

const LoginForm = ({ handleChange, handleSubmit, credentials, error }) => {
  return (
    <Container className="login">
      <h2>Login</h2>
      <Form onSubmit={handleSubmit}>
        <FormGroup className={error.email ? 'has-error' : ''}>
          <Label for="email">Email</Label>
          <Input
            type="emali"
            name="email"
            id="email"
            placeholder="Email"
            value={credentials.email}
            onChange={handleChange}
            required
          />
          {error.email && <Alert color="danger">
            <small>{error.email}</small>
          </Alert>}
        </FormGroup>
        <FormGroup className={error.password ? 'has-error' : ''}>
          <Label for="password">Password</Label>
          <Input
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            value={credentials.password}
            onChange={handleChange}
            required
          />
          {error.password && <Alert color="danger">
            <small>{error.password}</small>
          </Alert>}
        </FormGroup>
        {error.invalid && <Alert color="danger">
          <small>{error.invalid}</small>
        </Alert>}
        <Button outline className="add">Submit</Button>
      </Form>
      <OAuthButton provider="facebook">Login with Facebook</OAuthButton>

    </Container>

  );
};

export default LoginForm;
