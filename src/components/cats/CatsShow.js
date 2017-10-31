import React from 'react';
import Axios from 'axios';
import Cat from './Cat';
import Auth from '../../lib/Auth';

class CatsShow extends React.Component {
  state = {
    cat: {},
    users: []
  };

  componentDidMount() {
    // load the cat item from the API
    Axios.get(`/api/cats/${this.props.match.params.id}`)
      .then(res => this.setState({ cat: res.data }/*() => console.log(res.data)*/))
      .catch(err => console.log(err));
    // Axios
    //   .get('/api/users')
    //   .then(res => this.setState({users: res.data}/*, ()=> console.log(res.data)*/))
    //   .catch(err=> console.log(err));
  }

  deleteCat = () => {
    Axios
      .delete(`/api/cats/${this.props.match.params.id}`, {
        headers: { 'Authorization': 'Bearer ' + Auth.getToken() }
      })
      .then(() => this.props.history.push('/index'))
      .catch(err => console.log(err));
  }
  // createGalleryItem(){
  //   // console.log('in gallery');
  //   Axios
  //     .post(`/api/cats/${this.state.cat}`, {
  //       headers: { 'Authorization': 'Bearer ' + Auth.getToken() }
  //     })
  //     .then((item) => {
  //       item.push(src);
  //       const src = Object.assign({}, this.state.src, { [name]: item });
  //       this.setState({ src });
  //     })
  //     .catch(err => console.log(err));
  // }

  render() {
    // console.log('cats show', this.state.cat);
    return (
      <div id="cat-show">
        {this.state.cat && <Cat
          {...this.state.cat}
          show={true}
          deleteCat={this.deleteCat}
        ></Cat>}
      </div>
    );
  }
}

export default CatsShow;
