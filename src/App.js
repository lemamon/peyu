import React, { Component } from 'react';
import './App.css';
import { GoogleApiWrapper } from 'google-maps-react'
import MapContainer from './components/Maps/MapContainer'
import { ButtonLogin, ButtonLogout } from './components/Buttons/'
import { firebaseAuth, googleProvider } from './constants/config'

class App extends Component {

  state = {
    user: null
  }

  handleLogin() {
    console.log('login')    
    loginWithGoogle()
      .catch(err => {
        console.log(err)
      });
  }

  handleLogout() {
    console.log('logout')
    logout().then(() => this.setState({ user: null }))
  }

  componentDidMount() {
    firebaseAuth().onAuthStateChanged(user => {
      if (user) {
        this.setState({ user: firebaseAuth().currentUser })
        localStorage.setItem(appTokenKey, user.uid);
      }
    });
  }

  render() {
    let { user } = this.state;

    return (
      <div>
        <h1> pEYU </h1>
        {
          user ?
            <div>
              <p>{user.displayName}</p>
              <ButtonLogout text="Logout" onClick={() => this.handleLogout()} />
            </div>
            : <ButtonLogin onClick={() => this.handleLogin()} />

        }
        <MapContainer google={this.props.google} />

      </div>
    );
  }
}

const appTokenKey = "appToken";

const loginWithGoogle = () => firebaseAuth().signInWithRedirect(googleProvider);
const logout = () => firebaseAuth().signOut();

export default GoogleApiWrapper({
  apiKey: 'AIzaSyCP0qBpkBupQAlZs9T8wzHEcwYg3k_qW5I',
})(App)