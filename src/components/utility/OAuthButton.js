import React from 'react';
import OAuth from '../../lib/OAuth';
import Auth from '../../lib/Auth';
import queryString from 'query-string';
import Axios from 'axios';
import {withRouter} from 'react-router-dom';
class OAuthButton extends React.Component{

  componentWillMount(){
    this.provider = OAuth.getProvider(this.props.provider);
    //if there is no code in the address bar
    //AND the provider in localStorage does not match this button
    //stop here..
    if(!location.search.match(/code/) || localStorage.getItem('provider') !== this.props.provider) return false;
    //get the query string out of the address bar as an Object
    // {code: 'uhgfjsdkhgasjkfhd'}
    const data = queryString.parse(this.props.location.search);
    data.redirectUri = window.location.origin + window.location.pathname;
    console.log(data);
    Axios
      .post(this.provider.url, data)
      .then(res => Auth.setToken(res.data.token))
      .then(() => localStorage.removeItem('provider'))
      .then(() => this.props.history.replace(this.props.location.pathname))
      .then(() => this.props.history.push('/'));
  }

  setProvider = () => {
    localStorage.setItem('provider', this.props.provider);
  }
  render() {
    console.log(this.provider, this.props.provider);
    return(
      <a
        className="btn facebook"
        href={this.provider.authLink}
        onClick={this.setProvider}
      >
        <i className="fa fa-facebook-official" aria-hidden="true"></i>{this.props.children}
      </a>
    );
  }

}

export default withRouter(OAuthButton);
