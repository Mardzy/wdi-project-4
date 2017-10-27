import React from 'react';
import {Container, Alert, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import BackButton from '../utility/BackButton';


const RegisterForm = ({ handleChange, handleSubmit, user, errors }) => {
  return (

    <Container>
      <div className="page-banner col-md-12">
        <BackButton history={history} />
      </div>
      <Form onSubmit={handleSubmit}>
        <FormGroup className={errors.name ? 'form-group has-error' : 'form-group'}>
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
        {/* <FormGroup className={errors.dob ? 'form-group has-error' : 'form-group'}>
          <Label for="exampleDate">Date of Birth</Label>
          <Input
            type="date"
            name="date"
            id="exampleDate"
            value={user.dob}
            onChange={handleChange}
          />
          {errors.dob && <Alert color="danger">
            <small>{errors.dob}</small>
          </Alert>}
        </FormGroup> */}
        <FormGroup className={errors.email ? 'form-group has-error' : 'form-group'}>
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
        <FormGroup className={errors.email ? 'form-group has-error' : 'form-group'}>
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
        <FormGroup className={errors.passwordConfirmation ? 'form-group has-error' : 'form-group'}>
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
        <Button>Submit</Button>
      </Form>
    </Container>

  );
};

export default RegisterForm;
