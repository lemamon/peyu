import React, { Component } from 'react';
import { ref, firebaseAuth } from '../../constants/config';
import { Map, Marker } from 'google-maps-react';

const loc = ref.child('locations');

class MapContainer extends Component {

  componentDidMount() {
    this.currentLocation();
    loc.once('value')
      .then(snap => {
        let locations = snap.val();
        locations = Object.keys(locations).map(i => locations[i])
        this.setState({ locations })
      });
  }


  currentLocation() {
    if (!navigator.geolocation) return;

    navigator.geolocation.getCurrentPosition(position => {
      this.setState({
        userLocation: {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        }
      })
    }, error => console.log(error));

  }

  mapClicked = (mapProps, map, clickEvent) => {
    if (!firebaseAuth().currentUser) return;

    let { locations } = this.state;

    let newLoc = {
      location: {
        lat: clickEvent.latLng.lat(),
        lng: clickEvent.latLng.lng(),
      },
      name: 'new',
      type: '1'
    };

    loc.push().set(newLoc);

    locations.push(newLoc);
    this.setState({ locations })
  }

  render() {
    let { locations, userLocation } = this.state ? this.state : {};
    let { google } = this.props ? this.props : {};
    return (
    
    <div className="card" style={style.card}>
        {
          locations && google ?
            <Map
              className="card-content"
              style={style.map}
              initialCenter={userLocation ? userLocation : { lat: 40.7485722, lng: -74.0068633 }}
              center={userLocation ? userLocation : { lat: 40.7485722, lng: -74.0068633 }}
              zoom={15}
              google={google}
              onClick={this.mapClicked}
            >
              {
                locations.map((location, idx) => (
                  <Marker
                    position={location.location}
                    title={location.name}
                    onClick={()=> console.log(location.name)}
                    key={idx}
                  />)
                )
              }
            </Map>
            :
            <div>
              Loading...
            </div>
        }
      </div>
    )
  }
}

const style = {
  map: {
    margin: '3vh',
  },
  card: {
    margin: '3vh', 
    height: '75vh',
  },
}

export default MapContainer;

