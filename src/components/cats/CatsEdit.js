import React from 'react';
import Axios from 'axios';
import Auth from '../../lib/Auth';
import CatsForm from './CatsForm';

class CatsEdit extends React.Component {
  state = {
    cat: {
      name: '',
      dob: '',
      gender: '',
      type: '',
      gallery: [],
      owner: ''
    },
    errors: {
      name: '',
      dob: '',
      gender: '',
      type: '',
      gallery: [],
      owner: ''
    }
  };

  componentDidMount() {
    Axios
      .get(`/api/cats/${this.props.match.params.id}`)
      .then(res => this.setState({ cat: res.data }))
      .catch(err => console.log(err));
  }

  handleChange = ({ target: { name, value } }) => {
    const cat = Object.assign({}, this.state.cat, { [name]: value });
    this.setState({ cat });
  }

  handleSubmit = (e) => {
    e.preventDefault();

    Axios
      .put(`/api/cats/${this.props.match.params.id}`, this.state.cat, {
        headers: { Authorization: `Bearer ${Auth.getToken()}` }
      })
      .then(res => this.props.history.push(`/cats/${res.data.id}`))
      .catch(err => this.setState({ errors: err.response.data.errors }));
  }

  render() {
    return (
      <CatsForm
        history={this.props.history}
        handleSubmit={this.handleSubmit}
        handleChange={this.handleChange}
        cat={this.state.cat}
        errors={this.state.errors}
      />
    );
  }
}

export default CatsEdit;
