import React from 'react';
import {Alert, Button, Form, FormGroup, Label, Input } from 'reactstrap';


function CommentForm({ comment, handleSubmit, handleChange, errors }) {
  return (
    <Form onSubmit={handleSubmit} className="col-md-6">
      <FormGroup className={errors.comment ? ' has-error' : ''}>
        <Label id="reviews" for="comment">Reviews</Label>
        <Input
          type="text"
          className="form-control"
          id="comment"
          name="comment"
          value={comment}
          onChange={handleChange}
        />
        {errors.comment && <Alert color="danger">
          <small>{errors.comment}</small>
        </Alert>}
      </FormGroup>
      <div>
        <Button outline className="add">add comment</Button>
      </div>
    </Form>
  );
}

export default CommentForm;
