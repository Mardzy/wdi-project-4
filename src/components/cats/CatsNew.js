import React from 'react';
import Axios from 'axios';
import Auth from '../../lib/Auth';
import CatsForm from './CatsForm';

class CatsNew extends React.Component {
  state = {
    cat: {
      name: '',
      dob: '',
      gender: '',
      type: '',
      owner: Auth.getPayload().userId
    },
    gallery: {
      base64: '',
      imageSRC: '',
      caption: ''
    },

    errors: {
      name: '',
      dob: '',
      gender: '',
      type: '',
      imageSRC: ''
    }
  };

  // componentWillMount() {
  //   console.log('Component will mount');
  // }
  //
  // componentDidMount() {
  //   console.log('Component did mount');
  // }

  handleChange = ({ target: { name, value } }) => {
    const cat = Object.assign({}, this.state.cat, { [name]: value });
    this.setState({ cat });
  }

  handleGalleryChange = ({ target: { name, value } }) => {
    const gallery = Object.assign({}, this.state.gallery, { [name]: value });
    this.setState({ gallery });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    Axios
      .post('/api/cats', this.state.cat, {
        headers: { 'Authorization': 'Bearer ' + Auth.getToken() }
      })
      .then((res) => this.postImage(res.data.id))
      .catch(err => this.setState({ errors: err.response.data.errors }));
  }

  postImage = id => {
    Axios
      .post(`/api/cats/${id}/images/`, this.state.gallery, {
        headers: { Authorization: `Bearer ${Auth.getToken()}` }
      })
      .then(() => this.props.history.push(`/cats/${id}`))
      .catch(err => this.setState({ errors: err.response.data.errors }));

  }

  render() {
    // console.log(this.state.errors);
    return (
      <CatsForm
        history={this.props.history}
        handleSubmit={this.handleSubmit}
        handleChange={this.handleChange}
        handleGalleryChange={this.handleGalleryChange}
        cat={this.state.cat}
        errors={this.state.errors}
        gallery={this.state.gallery}
        create={true}
      />
    );
  }
}

export default CatsNew;
