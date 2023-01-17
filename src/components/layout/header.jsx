/**
 * @file header.jsx - Componente header
 * @author José Luis Tocino Rojo
 */

/**
 * @module Component[Layout]_Header
 */

import React, { useState } from 'react';
import Menu from './menu';

/**
 * Componente que renderiza el header en toda la página web
 * <br>
 * <br>
 * <b><u>FUNCIONES INTERNAS</u></b>
 * <br>
 * - <b>activateRotation</b>
 * - <b>rotateLogo</b>
 * - <b>toggleOverlay</b>
 * 
 * @memberof module:Component[Layout]_Header
 * @param {Object} props Objeto que contiene el titulo que sera usado como header
 * @returns {JSX.Element} Contenido HTML referente al header de la página
 */
function Header(props) {
  // Variables usadas para indicar si el menu de navegación debe ser mostrado o no
  const [showMenu, setShowMenu] = useState(false);
  // Variables usadas para el evento de tiempo que indica si el logo debe girar o no
  const [isRotate, setRotate] = useState(false);

  /** 
   * @description Función que es llamada cuando se necesita indicar que comience la rotación del logo
   * @name activateRotation
   * @function
   */
  function activateRotation(){
    setRotate(true);
  }

  /**
   * @description Función llamada para activar el evento por tiempo
   * @name rotateLogo
   * @function
   */
  function rotateLogo(){
    setTimeout(activateRotation, 5000)
  }

  if (isRotate){
    clearTimeout(rotateLogo);
  }

  rotateLogo();

  /**
   * @description Función usada para indicar que el menu debe ser visto o no
   * @name toggleOverlay
   * @function
   */
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
        <img className={isRotate ? "header__logo--imagen rotation" : "header__logo--imagen"} alt="logo AML" src={require("../../assets/images/logoAML2.png")}/>
      </a>
    </header>
  );
}

export default Header;