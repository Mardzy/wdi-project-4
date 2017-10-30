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
    errors: {
      name: '',
      dob: '',
      gender: '',
      type: ''
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

  handleSubmit = (e) => {
    e.preventDefault();

    Axios
      .post('/api/cats', this.state.cat, {
        headers: { 'Authorization': 'Bearer ' + Auth.getToken() }
      })
      .then(() => this.props.history.push('/index'))
      .catch(err => this.setState({ errors: err.response.data.errors }));
  }

  render() {
    // console.log(this.state.errors);
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

export default CatsNew;
