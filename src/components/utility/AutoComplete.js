import React from 'react';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';

class AutoComplete extends React.Component {
  state = {
    address: ''
  }

  handleSubmit = (e) => {
    e.preventDefault();

    geocodeByAddress(this.state.address)
      .then(results => getLatLng(results[0]))
      .then(latLng => console.log('Success', latLng))
      .catch(error => console.error('Error', error));
  }

  handleChange = (address) => {
    this.setState({ address });
  }

  render() {
    const inputProps = {
      value: this.state.address,
      onChange: this.handleChange
    };

    return (
      <form onSubmit={this.handleSubmit}>
        <PlacesAutocomplete inputProps={inputProps} />
        <button type="submit">Submit</button>
      </form>
    );
  }
}

export default AutoComplete;
