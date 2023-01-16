import React, { useState } from 'react';
import Menu from './menu';

function Header(props) {
  const [showMenu, setShowMenu] = useState(false);
  const [isRotate, setRotate] = useState(false);


  function activateRotation(){
    console.log("heeeey")
    setRotate(true);
  }

  function rotateLogo(){
    setTimeout(activateRotation, 5000)
  }

  if (isRotate){
    clearTimeout(rotateLogo);
  }

  rotateLogo();

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
        <img className={isRotate ? "header__logo--imagen rotation" : "header__logo--imagen"} alt="logo AML" src={require("../assets/images/logoAML2.png")}/>
      </a>
    </header>
  );
}

export default Header;