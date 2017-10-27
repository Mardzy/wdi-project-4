import React from 'react';
import Axios from 'axios';
import Cat from '../common/Cat';

class CatsShow extends React.Component {
  state = {
    cat: null
  };

  componentDidMount() {
    // load the cat item from the API
    Axios.get(`/api/cats/${this.props.match.params.id}`)
      .then(res => this.setState({ cat: res.data },/*() => console.log(res.data)*/))
      .catch(err => console.log(err));
  }

  deleteCat = () => {

  }


  render() {
    return (
      <div className="row show">
        {this.state.cat && <Cat {...this.state.cat} deleteCat={this.deleteCat}></Cat>}
      </div>
    );
  }
}

export default CatsShow;
