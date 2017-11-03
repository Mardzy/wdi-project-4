import React from 'react';
import DragDrop from '../utility/DragDrop';
import { Button, Form, FormGroup, Label, Container, Input, Alert } from 'reactstrap';

const CatsImagesForm = ({handleSubmit, handleChange, errors, gallery}) => {

  return (
    <Container >
      <Form className="register" onSubmit={handleSubmit}>
        <FormGroup className={errors ? ' has-error' : ''}>
          <Label for="image">Add Image</Label>
          <DragDrop
            onChange={handleChange}
            value={gallery.base64 || gallery.imageSRC}
          />
        </FormGroup>
        <FormGroup className={errors ? 'has-error' : ''}>
          <Label for="caption">Caption</Label>
          <Input
            type="text"
            name="caption"
            id="caption"
            placeholder="Image caption"
            value={gallery.caption}
            onChange={handleChange}
            required
          />
          {errors.caption && <Alert color="danger">
            <small>{errors.caption}</small>
          </Alert>}
        </FormGroup>
        <Button outline className="add">Submit</Button>
      </Form>
    </Container>
  );

};

export default CatsImagesForm;
