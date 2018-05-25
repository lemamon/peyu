import React from 'react';
import loginImg from '../../assets/images/google-icon.webp';

export const ButtonLogin = (props) => {
  return (
    <a {...props} className="button"><img style={{margin:'2px'}} alt="Google icon webp" src={loginImg}/>Login</a>
  )
}

export const ButtonLogout = (props) => {

  let { text, ...rest } = props;
  return (
    <a {...rest} className="button is-primary">{text}</a>
  )
}

export const DropDown = (props) => {

  const handleDropDown = () => {
    let els = document.querySelectorAll('.dropdown');
    els.forEach(el => ( 
      el.classList.toggle('is-active', !el.classList.contains('is-active'))
    ))
  }

  return (
    <div className="dropdown is-right">
      <div className="dropdown-trigger">
        <a onClick={handleDropDown} className={props.className} aria-haspopup="true" aria-controls="dropdown-menu3">
          {props.children}
        </a>
      </div>
      <div className="dropdown-menu" id="dropdown-menu3" role="menu">
        <div className="dropdown-content">
          <a className="dropdown-item">Minhas Ocorrências</a>
          <a className="dropdown-item">Nova Ocorrência</a>
          <hr className="dropdown-divider" />
          <a onClick={() => props.handleLogout()} className="dropdown-item">Sair</a>
        </div>
      </div>
    </div>
  )
}

export const Modal = (props) => {

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
          <button onClick={() => props.onSubmit()} className="button is-success">Salvar</button>
          <button onClick={() => props.handleModal(false)} className="button">Cancelar</button>
        </footer>
      </div>
    </div>
  );
}