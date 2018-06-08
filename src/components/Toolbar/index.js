import React, { Component, Fragment } from 'react';
import { DropDown, ButtonLogin } from '../Buttons';
import { loginWithGoogle, logout } from '../Auth';
import PropTypes from 'prop-types';

/* eslint-disable no-console */

const DropDownContent = (props) => {
  const { ctx: { handleLogout, handleMyOccurrence, handleNewOccurrence } } = props;
  return (
    <Fragment>
      <a onClick={handleMyOccurrence} className="dropdown-item">Minhas Ocorrências</a>
      <a onClick={handleNewOccurrence} className="dropdown-item">Nova Ocorrência</a>
      <hr className="dropdown-divider" />
      <a onClick={handleLogout} className="dropdown-item">Sair</a>
    </Fragment>
  );
};

DropDownContent.propTypes = {
  ctx: PropTypes.any,
};

class Toolbar extends Component {

  state = {
    overlay: false,
    ctx: this.props.ctx,
  }

  handleMyOccurrence = () => {
    this.state.ctx.setState({ showMyOccurrences: true });
  }

  handleNewOccurrence = () => {
    console.log('new');
  }

  handleLogin = () => {
    console.log('login');
    this.setState({ overlay: true });
    loginWithGoogle()
      .catch(err => {
        console.log(err);
      });
  }

  handleLogout = () => {
    console.log('logout');
    logout();
  }

  render() {
    let { user } = this.props;
    return (
      <section className="hero is-primary" >
        <div className="hero-head">
          <nav className="navbar">
            <div className="container">
              <div className="navbar-brand">
                <a className="navbar-item">
                  <h1 className="title">pEYU</h1>
                </a>
                <div style={{ position: 'fixed', right: '20px' }} className="navbar-item is-hidden-desktop">
                  {
                    user ?
                      <DropDown
                        handleLogout={this.handleLogout}
                        label={<img alt="user avatar" style={{ borderRadius: '50%' }} src={user.photoURL} />}
                      >
                        <DropDownContent ctx={this} />
                      </DropDown>
                      : <ButtonLogin onClick={this.handleLogin} />
                  }
                </div>
              </div>
              <div className="navbar-menu">
                <div className="navbar-end">
                  <span className="navbar-item">
                    {
                      user ?
                        <DropDown
                          className="button"
                          handleLogout={this.handleLogout}
                          label={
                            <Fragment>
                              <span>{user.displayName}</span>
                              <span className="icon is-small">
                                <img alt="user avatar" style={{ borderRadius: '50%' }} src={user.photoURL} />
                              </span>
                            </Fragment>
                          }
                        >
                          <DropDownContent ctx={this} />
                        </DropDown>
                        : <ButtonLogin onClick={this.handleLogin} />
                    }
                  </span>
                </div>
              </div>
            </div>
          </nav>
        </div>
      </section>
    );
  }
}

Toolbar.propTypes = {
  ctx: PropTypes.any,
  user: PropTypes.object,
};

export {
  Toolbar,
};