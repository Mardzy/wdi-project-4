import React from 'react';
import Axios from 'axios';
import Auth from '../../lib/Auth';
import CatsImagesForm from './CatsImagesForm';

class CatsImagesEdit extends React.Component {
  state = {
    src: {}
  };

  componentDidMount() {
    console.log('gallery didMount', this.props);
    Axios
      .get(`/api/cats/${this.props.match.params.id}/images/${this.props.match.params.srcId}`)
      .then(res => this.setState({ src: res.data }))
      .catch(err => console.log(err));
  }

  handleChange = ({ target: { name, value } }) => {
    const src = Object.assign({}, this.state.src, { [name]: value });
    this.setState({ src });
  }

  handleSubmit = (e) => {

    e.preventDefault();

    Axios
      .put(`/api/cats/${this.props.match.params.id}/images/${this.props.match.params.srcId}`, this.state.src, {
        headers: { Authorization: `Bearer ${Auth.getToken()}` }
      })
      .then(res => this.props.history.push(`/cats/${res.data.id}`))
      .catch(err => this.setState({ errors: err.response.data.errors }));
  }
  render() {
    console.log('gallery edit', this.state.src);
    return (
      <CatsImagesForm
        history={this.props.history}
        handleSubmit={this.handleSubmit}
        handleChange={this.handleChange}
        src={this.state.src}
        errors={this.state.errors}
      />
    );
  }
}

export default CatsImagesEdit;
