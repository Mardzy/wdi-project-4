import React from 'react';
import Axios from 'axios';
import { Link } from 'react-router-dom';
import Cat from '../common/Cat';
import Auth from '../../lib/Auth';



class CatsShow extends React.Component {
  state = {
    cat: {
      gallery: {
        description: '',
        image: ''}
    }
  };

  componentDidMount() {
    // load the cat item from the API
    Axios.get(`/api/cats/${this.props.match.params.id}`)
      .then(res => this.setState({ cat: res.data },/*() => console.log(res.data)*/))
      .catch(err => console.log(err));
  }


  render() {
    const imageGallery = {...this.state.cat.gallery};
    const destruct = this.state.cat && imageGallery[0];
    console.log(destruct);
    return (
      <div className="row show">

        {this.state.cat &&
          <img className="image" src={imageGallery.image} alt={this.state.cat.name} />}
        {this.state.cat &&
          <p>{imageGallery.description}</p>}
        {this.state.cat &&
          <Cat {...this.state.cat}></Cat>}
        {Auth.isAuthenticated() && <Link to={`/cats/${this.state.cat.id}/edit`} className="btn">Edit</Link>}
        {' '}
        {Auth.isAuthenticated() &&
          <button className="btn" onClick={this.deleteCat}>Delete</button>}
      </div>
    );
  }
}

export default CatsShow;
