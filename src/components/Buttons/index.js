import React from 'react';
import loginImg from '../../assets/images/btn-login.png';

export const ButtonLogin = (props) => {
  return (
    <div {...props}>
      <img alt="Google SigIn Button" src={loginImg} />
    </div>
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
    els.forEach(el => {
      if (el.classList.contains('is-active')) {
        el.classList.remove('is-active');
      } else {
        el.classList.add('is-active');
      }
    })
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
          <a className="dropdown-item">Modifiers</a>
          <hr className="dropdown-divider" />
          <a onClick={() => props.handleLogout()} className="dropdown-item">Sair</a>
        </div>
      </div>
    </div>
  )
}