import React from 'react';
import {Container, Alert, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import BackButton from '../utility/BackButton';
import DragDrop from '../utility/DragDrop';



const ProfileForm = ({ handleChange, handleSubmit, user, errors }) => {
  console.log(user);
  return (

    <Container>
      <div className="col-md-12">
        <BackButton history={history} />
      </div>
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
          <Label for="dob">Date of Birth</Label>
          <Input
            type="date"
            name="dob"
            id="dob"
            value={user.dob}
            onChange={handleChange}
          />
          {errors.dob && <Alert color="danger">
            <small className="text-danger">{errors.dob}</small>
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
        <FormGroup className={errors.image ? ' has-error' : ''}>
          <Label for="image">Image</Label>
          <DragDrop
            onChange={handleChange}
            value={user.base64 || user.imageSRC}
          />
        </FormGroup>
        <Button>Submit</Button>
      </Form>
    </Container>

  );
};

export default ProfileForm;
