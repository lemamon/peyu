import React, { Component } from 'react';
import { ref, firebaseAuth } from '../../constants/config';
import { Map, Marker } from 'google-maps-react';
import { Modal } from '../Buttons'

class MapContainer extends Component {

  state = {
    showModal: false,
    locations: [],
    occurrence: {},
    userLocation: {
      lat: -3.10719,
      lng: -60.0261
    },
  }

  componentDidMount() {
    this.currentLocation();
    loc.on('value', snap => {
      this.setLocations(snap.val());
    });
  }

  setLocations(locations) {
    locations = Object.keys(locations).map(i => locations[i]);
    this.setState({ locations });
  }

  currentLocation() {
    if (!navigator.geolocation) return;

    navigator.geolocation.getCurrentPosition(position => {
      this.setState({
        userLocation: {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        }
      });
    }, error => console.log(error));

  }

  async mapClicked(mapProps, map, clickEvent) {
    if (!firebaseAuth().currentUser) return;

    this.setState({ showModal: true });

    let occurrence = {}

    occurrence.author = firebaseAuth().currentUser.uid;

    occurrence.location = {
      lat: clickEvent.latLng.lat(),
      lng: clickEvent.latLng.lng(),
    }

    occurrence.name = await getFormattedAddress({
      geocoder: new mapProps.google.maps.Geocoder(),
      latLng: new mapProps.google.maps.LatLng(occurrence.location.lat, occurrence.location.lng),
      statusOk: mapProps.google.maps.GeocoderStatus.OK,
    });

    this.setState({ occurrence })

    // this.saveData(occurrence)
  }

  saveData() {
    this.setState({ showModal: false});
    let { occurrence: { author, name, location }} = this.state;

    let key = loc.push().key;
    let newLoc = {};

    newLoc[key] = {
      location,
      key,
      name,
      author,
      type: '1',
    };

    loc.update(newLoc);
  }

  handleModal(mod) {
    this.setState({ showModal: mod })
  }

  render() {
    let { locations, userLocation, showModal, occurrence } = this.state;
    let { google } = this.props ? this.props : {};

    return (

      <div className="card" style={style.card}>
        <Modal
          handleModal={this.handleModal.bind(this)}
          show={showModal}
          title="Nova Ocorrência em:"
          onSubmit={this.saveData.bind(this)}
        >
          <h1>{occurrence.name}</h1>
          <hr />
          <div className="control">
            <input className="input" type="text" placeholder="Ponto de refencia" />
            <input className="input" type="text" placeholder="Descricao" />
              <div className="select">
                <select>
                  <option>Select dropdown</option>
                  <option>With options</option>
                </select>
              </div>
          </div>
        </Modal>
        {
          locations && google ?

            <Map
              className="card-content"
              style={style.map}
              initialCenter={userLocation}
              center={userLocation}
              zoom={15}
              google={google}
              onClick={this.mapClicked.bind(this)}
            >
              {
                locations.map((location, idx) => (
                  <Marker
                    position={location.location}
                    title={location.name}
                    onClick={() => console.log(location.name)}
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

const loc = ref.child('locations');

const getFormattedAddress = ({ geocoder, latLng, statusOk }) => {

  return new Promise((resolve, reject) => {
    geocoder.geocode({
      'latLng': latLng
    }, (results, status) => {
      if (status === statusOk) {
        if (results[1]) {
          return resolve(results[1].formatted_address)
        } else {
          return reject('No results found');
        }
      } else {
        return reject('Geocoder failed due to: ' + status);
      }
    })
  })
}

export default MapContainer;

