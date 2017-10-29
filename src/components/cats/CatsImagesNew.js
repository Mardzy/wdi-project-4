import React from 'react';
import Axios from 'axios';
import Auth from '../../lib/Auth';
import CatsImagesForm from './CatsImagesForm';

class CatsImagesNew extends React.Component {
  state = {
    gallery: {
      src: '',
      caption: ''
    },
    errors: {
      src: '',
      caption: ''
    }
  };

  componentDidMount() {
    console.log('new image didMount', this.props);
    Axios
      .post(`/api/cats/${this.props.match.params.id}/images/`)
      .then(res => this.setState({ gallery: res.data }))
      .catch(err => console.log(err));
  }

  handleChange = ({ target: { name, value } }) => {
    const gallery = Object.assign({}, this.state.gallery, { [name]: value });
    this.setState({ gallery });
  }

  handleSubmit = (e) => {

    e.preventDefault();

    Axios
      .put(`/api/cats/${this.props.match.params.id}/images/`, this.state.gallery, {
        headers: { Authorization: `Bearer ${Auth.getToken()}` }
      })
      .then(res => this.props.history.push(`/cats/${res.data.id}`))
      .catch(err => this.setState({ errors: err.response.data.errors }));
  }

  render() {
    console.log('images new', this.state);
    return (
      <CatsImagesForm
        history={this.props.history}
        handleSubmit={this.handleSubmit}
        handleChange={this.handleChange}
        gallery={this.state.src}
        errors={this.state.errors}
      />
    );
  }

}

export default CatsImagesNew;
