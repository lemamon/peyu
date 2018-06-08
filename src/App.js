import React, { Component, Fragment } from 'react';
import { GoogleApiWrapper } from 'google-maps-react';
import MapContainer from './components/Maps/MapContainer';
import { firebaseAuth } from './constants/config';
import { LoadingContainer } from './components/Loading';
import { Toolbar } from './components/Toolbar';
import { Occurrence } from './components/Occurrence';
import PropTypes from 'prop-types';

class App extends Component {

  state = {
    user: null,
    showMyOccurrences: false,
  }

  componentDidMount = () => {
    firebaseAuth().onAuthStateChanged(user => {
      if (user) {
        this.setState({ user: firebaseAuth().currentUser });
        localStorage.setItem(appTokenKey, user.uid);
      } else {
        this.setState({ user: null });
        localStorage.setItem(appTokenKey, 'appTokenKey');
      }
    });
  }

  handleMyOccurrences = (mod) => {
    this.setState({ showMyOccurrences: mod });
  }


  render() {
    let { user } = this.state;

    return (
      <Fragment>
        <Toolbar user={user} ctx={this} />
        <Occurrence
          user={user}
          show={this.state.showMyOccurrences}
          handle={this.handleMyOccurrences.bind(this)}
        />
        <MapContainer google={this.props.google} />
      </Fragment>
    );
  }
}


const appTokenKey = 'appToken';

App.propTypes = { 
  google: PropTypes.func,
};

export default GoogleApiWrapper({
  apiKey: 'AIzaSyCP0qBpkBupQAlZs9T8wzHEcwYg3k_qW5I',
  LoadingContainer: LoadingContainer,
})(App);



