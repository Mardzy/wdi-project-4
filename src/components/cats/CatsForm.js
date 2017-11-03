import React from 'react';
import BackButton from '../utility/BackButton';
import {Container, Alert, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import DragDrop from '../utility/DragDrop';


function CatsForm ({ history, handleSubmit, handleChange, handleGalleryChange, cat, errors, gallery, create, update }) {
  return (
    <Container>
      <div className="page-banner">
        <BackButton history={history} />
        {create && <h2>Add a Cat</h2>}
        {update && <h2>Edit Cat</h2>}
        <div></div>

      </div>
      <Container className="register">
        <Form  onSubmit={handleSubmit}>
          <FormGroup className={errors ? 'has-error' : ''}>
            <Label for="name">Name</Label>
            <Input
              type="text"
              name="name"
              id="name"
              value={cat.name}
              onChange={handleChange}
            />
            {errors.name && <Alert color="danger">
              <small className="text-danger">{errors.name}</small>
            </Alert>}
          </FormGroup>
          <FormGroup className={errors.dob ? 'has-error' : ''}>
            <Label for="dob">Date of Birth</Label>
            <Input
              type="date"
              name="dob"
              id="dob"
              value={cat.dob}
              onChange={handleChange}
            />
            {errors.dob && <Alert color="danger">
              <small className="text-danger">{errors.dob}</small>
            </Alert>}
          </FormGroup>
          <FormGroup className={errors.gender ? 'has-error' : ''}>
            <Label for="gender">Gender</Label>
            <Input
              type="select"
              name="gender"
              id="gender"
              value={cat.gender}
              onChange={handleChange}
            >
              <option value="" disabled>Please Select Gender</option>
              <option value="female">Female</option>
              <option value="male">Male</option>
            </Input>
            {errors.gender && <Alert color="danger">
              <small className="text-danger">{errors.gender}</small>
            </Alert>}
          </FormGroup>
          <FormGroup className={errors.type ? 'has-error' : ''}>
            <Label for="type">Type</Label>
            <Input
              type="text"
              name="type"
              id="type"
              value={cat.type}
              onChange={handleChange}
            />
            {errors.type && <Alert color="danger">
              <small className="text-danger">{errors.type}</small>
            </Alert>}
          </FormGroup>
          {create &&<FormGroup className={errors ? ' has-error' : ''}>
            <Label for="image">Add Image</Label>
            <DragDrop
              onChange={handleGalleryChange}
              value={gallery.base64 || gallery.imageSRC}
            />
          </FormGroup>}
          <Button outline className="add">Submit</Button>
        </Form>
      </Container>
    </Container>
  );
}

export default CatsForm;
