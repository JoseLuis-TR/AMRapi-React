import React from 'react';

function Header(props) {
  return (
    <header className="header">
      <i className="header__menu material-symbols-rounded" onClick="abrirMenu()">menu</i>
      <h1 id="header__titulo" className="header__titulo">{props.titulo}</h1>
      <a className="header__logo" href="/">
        <img className="header__logo--imagen" alt="logo AML" src={require("../assets/images/logoAML2.png")}/>
      </a>
    </header>
  );
}

export default Header;