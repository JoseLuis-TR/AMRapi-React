import React, { useState } from 'react';
import Menu from './menu';

function Header(props) {
  const [showMenu, setShowMenu] = useState(false);

  const toggleOverlay = () => {
    setShowMenu(!showMenu);
  };

  return (
    <header className="header">
      <i className="header__menu material-symbols-rounded" onClick={toggleOverlay}>menu</i>
      <Menu 
        showMenu = {showMenu}
        toggleOverlay = {toggleOverlay}
      />
      <h1 id="header__titulo" className="header__titulo">{props.titulo}</h1>
      <a className="header__logo" href="/">
        <img className="header__logo--imagen" alt="logo AML" src={require("../assets/images/logoAML2.png")}/>
      </a>
    </header>
  );
}

export default Header;