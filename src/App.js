import React, { Component } from 'react';
import { GoogleApiWrapper } from 'google-maps-react'
import MapContainer from './components/Maps/MapContainer'
import { ButtonLogin, DropDown } from './components/Buttons/'
import { firebaseAuth, googleProvider } from './constants/config'
import { LoadingContainer } from './components/Loading'

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
        <section className="hero is-primary">

          <div className="hero-head">
            <nav className="navbar">
              <div className="container">
                <div className="navbar-brand">
                  <a className="navbar-item">
                    <h1 className="title">pEYU</h1>
                  </a>
                  <span className="navbar-burger burger" data-target="navbarMenuHeroA">
                    {
                      user ?
                        <DropDown
                          handleLogout={() => this.handleLogout()}>
                          <img alt="user avatar" style={{ borderRadius: '50%', margin: '10%', width: '80%' }} src={user.photoURL} />
                        </DropDown>
                        : <ButtonLogin onClick={() => this.handleLogin()} />
                    }
                  </span>
                </div>
                <div id="navbarMenuHeroA" className="navbar-menu">
                  <div className="navbar-end">
                    <span className="navbar-item">
                      {
                        user ?
                          <DropDown
                            className="button"
                            handleLogout={() => this.handleLogout()}>
                            <span>{user.displayName}</span>
                            <span className="icon is-small">
                              <img alt="user avatar" style={{ borderRadius: '50%' }} src={user.photoURL} />
                            </span>
                          </DropDown>
                          : <ButtonLogin onClick={() => this.handleLogin()} />
                      }
                    </span>
                  </div>
                </div>
              </div>
            </nav>
          </div>
        </section>
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
  LoadingContainer: LoadingContainer,
})(App)



