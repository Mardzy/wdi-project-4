import React from 'react';
import BackButton from '../utility/BackButton';
import {Container, Alert, Button, Form, FormGroup, Label, Input } from 'reactstrap';

function CatsForm ({ history, handleSubmit, handleChange, cat, errors }) {
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
            value={cat.name}
            onChange={handleChange}
          />
          {errors.name && <Alert color="danger">
            <small>{errors.name}</small>
          </Alert>}
        </FormGroup>
        <FormGroup className={errors.dob ? 'form-group has-error' : 'form-group'}>
          <Label for="exampleDate">Date of Birth</Label>
          <Input
            type="date"
            name="date"
            id="exampleDate"
            value={cat.dob}
            onChange={handleChange}
          />
          {errors.dob && <Alert color="danger">
            <small>{errors.dob}</small>
          </Alert>}
        </FormGroup>
        <FormGroup className={errors.gender ? 'form-group has-error' : 'form-group'}>
          <Label for="exampleSelect">Gender</Label>
          <Input
            type="select"
            name="select"
            id="exampleSelect"
            value={cat.gender}
            onChange={handleChange}
          >
            <option>{cat.gender}</option>
            <option>female</option>
            <option>male</option>
          </Input>
          {errors.gender && <Alert color="danger">
            <small>{errors.gender}</small>
          </Alert>}
        </FormGroup>
        <FormGroup className={errors.type ? 'form-group has-error' : 'form-group'}>
          <Label for="type">Type</Label>
          <Input
            type="text"
            name="type"
            id="type"
            value={cat.type}
            onChange={handleChange}
          />
          {errors.type && <Alert color="danger">
            <small>{errors.type}</small>
          </Alert>}
        </FormGroup>
        <Button>Submit</Button>
      </Form>
    </Container>
  );
}

export default CatsForm;
