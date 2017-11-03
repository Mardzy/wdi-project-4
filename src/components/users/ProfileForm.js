import React from 'react';
import {Container, Alert, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import BackButton from '../utility/BackButton';
import DragDrop from '../utility/DragDrop';
import PlacesAutocomplete from 'react-places-autocomplete';

const ProfileForm = ({ handleChange, handleAddress, handleSubmit, user, address, errors }) => {

  const inputProps = {
    value: address,
    onChange: handleAddress
  };

  const cssClasses = {
    root: 'form-group',
    input: 'form-control',
    autocompleteContainer: 'my-autocomplete-container'
  };

  return (
    <Container>
      <div className="page-banner">
        <BackButton history={history} />
        <h2>Update Profile</h2>
        <div></div>
      </div>
      <Container className="register">
        <Form className="login" onSubmit={handleSubmit}>
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
          <FormGroup className={errors.location ? 'has-error' : ''}>
            <Label for="address">Address</Label>
            <PlacesAutocomplete className="form-control" inputProps={inputProps} classNames={cssClasses}/>
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
          <Button outline className="add">Submit</Button>
        </Form>
      </Container>
    </Container>

  );
};

export default ProfileForm;
