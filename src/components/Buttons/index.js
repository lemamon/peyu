import React from 'react';
import loginImg from '../../assets/images/google-icon.webp';
import PropTypes from 'prop-types';

const ButtonLogin = (props) => {
  return (
    <a {...props} className="button"><img style={{ margin: '2px' }} alt="Google icon webp" src={loginImg} />Login</a>
  );
};


const ButtonLogout = (props) => {
  const { text, ...rest } = props;

  return (
    <a {...rest} className="button is-primary">{text}</a>
  );
};

ButtonLogout.propTypes = {
  text: PropTypes.string
};


const DropDown = (props) => {

  const handleDropDown = () => {
    let els = document.querySelectorAll('.dropdown');
    els.forEach(el => (
      el.classList.toggle('is-active', !el.classList.contains('is-active'))
    ));
  };

  return (
    <div className="dropdown is-right">
      <div className="dropdown-trigger">
        <a onClick={handleDropDown} className={props.className} aria-haspopup="true" aria-controls="dropdown-menu3">
          {props.label}
        </a>
      </div>
      <div className="dropdown-menu" id="dropdown-menu3" role="menu">
        <div className="dropdown-content">
          {props.children}
        </div>
      </div>
    </div>
  );
};

DropDown.propTypes = { 
  className: PropTypes.string,
  label: PropTypes.any,
  children: PropTypes.any,
};


const Modal = (props) => {

  return (
    <div className={`modal ${props.show ? 'is-active' : ''}`}>
      <div className="modal-background"></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">{props.title}</p>
          <button onClick={() => props.handleModal(false)} className="delete" aria-label="close"></button>
        </header>
        <section className="modal-card-body">
          {props.children}
        </section>
        <footer className="modal-card-foot">
          {
            props.onSubmit ?
              <button onClick={() => props.onSubmit()} className="button is-success">Salvar</button> : ''
          }
          <button onClick={() => props.handleModal(false)} className="button">Cancelar</button>
        </footer>
      </div>
    </div>
  );
};

Modal.propTypes = {
  show: PropTypes.bool,
  title: PropTypes.string,
  handleModal: PropTypes.func,
  children: PropTypes.any,
  onSubmit: PropTypes.func,
};

export { 
  ButtonLogin,
  ButtonLogout,
  DropDown,
  Modal,
};