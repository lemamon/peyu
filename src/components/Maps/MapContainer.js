import React, { Component } from 'react';
import { ref, firebaseAuth } from '../../constants/config';
import { Map, Marker, InfoWindow } from 'google-maps-react';
import { Modal } from '../Buttons';
import { LoadingContainer } from '../Loading';

class MapContainer extends Component {

  state = {
    showModal: false,
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: { occurrence: {} },
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

    this.setState({ showingInfoWindow: false });

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
  }

  saveData() {
    this.setState({ showModal: false });

    let {
      type,
      reference,
      description,
      occurrence: {
        author,
        name,
        location
      }
    } = this.state;

    let key = loc.push().key;
    let newLoc = {};

    newLoc[key] = {
      location,
      key,
      name,
      author,
      type,
      reference,
      description,
    };

    loc.update(newLoc);
  }

  onMarkerClick(props, marker, e) {
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });
  }

  handleModal(mod) {
    this.setState({ showModal: mod })
  }

  validateInput(e) {
    const isBlank = (str) => (!str || /^\s*$/.test(str));

    e.target.classList.toggle('is-danger', isBlank(e.target.value));
    if (!isBlank(e.target.value)) {
      this.setState({ [e.target.name]: e.target.value })
    }
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
            <input name="reference" className="input" placeholder="Ponto de refencia" style={style.input} type="text" onChange={this.validateInput.bind(this)} />
            <textarea name="description" className="textarea" placeholder="Descricao" style={style.input} onChange={this.validateInput.bind(this)} />
            <div style={style.input} className="select">
              <select name="type" style={style.select} onChange={this.validateInput.bind(this)}>
                <option value="">Selecionar tipo da Ocorrência</option>
                {types.map((type, idx) => (
                  <option key={idx} value={idx}>{type}</option>
                ))}
              </select>
            </div>
          </div>
        </Modal>
        {
          locations && google ?

            <Map
              // centerAroundCurrentLocation
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
                    occurrence={location}
                    onClick={this.onMarkerClick.bind(this)}
                    key={idx}
                  />)
                )
              }
              <InfoWindow
                marker={this.state.activeMarker}
                visible={this.state.showingInfoWindow}>
                <div>
                  <h1>{this.state.selectedPlace.title}</h1>
                  <p><b>Ponto Referencia:</b> {this.state.selectedPlace.occurrence.reference}</p>
                  <p><b>Descricao:</b> {this.state.selectedPlace.occurrence.description}</p>
                  <p><b>Tipo:</b> {types[this.state.selectedPlace.occurrence.type]}</p>
                </div>
              </InfoWindow>
            </Map>
            :
            <LoadingContainer />
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
  input: {
    marginBottom: '8px',
  },
  select: {
    width: '700px',
  }
}

const types = [
  'Roubo',
  'Furto',
  'Latrocínio',
  'Roubo/furto de veículos',
  'Homicídios',
  'Estupro',
  'Agressão',
];

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

