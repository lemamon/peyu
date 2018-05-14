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
    <button {...rest}>{text}</button>
  )
}

