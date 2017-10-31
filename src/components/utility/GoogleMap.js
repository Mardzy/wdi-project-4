/* global google */
import React from 'react';

class GoogleMap extends React.Component {

  componentDidMount() {
    this.map = new google.maps.Map(this.mapCanvas, {
      zoom: 14,
      center: this.props.center || {lat: 51.5771, lng: -0.1783}
    });

    this.marker = new google.maps.Marker({
      position: this.props.center || {lat: 51.5771, lng: -0.1783},
      map: this.map
    });
  }

  componentWillUnmount(){
    this.marker.setMap(null);
    this.marker = null;
    this.map = null;
  }

  render() {
    return (
      <div className="google-map" ref={element => this.mapCanvas = element}></div>
    );
  }
}

export default GoogleMap;
