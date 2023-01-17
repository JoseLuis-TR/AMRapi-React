/**
 * @file dropdown.jsx - Componente del desplegable
 * @author José Luis Tocino Rojo
 */

/**
 * @module Component[Unit]_Dropdown
 */

import React from 'react';

/**
 * Componente usado para mostrar un desplegable, el cual se usa para mostrar los desplegables que
 * marcan los filtros de busqueda
 * 
 * @memberof module:Component[Unit]_Dropdown
 * @param {number} key Key para facilitar el trabajo a React a la hora de identificar el componente
 * @param {string} info Texto que conecta el label con el select y es usado para identificar el desplegable
 * @param {string} label Texto que da algo de contexto sobre el desplegable
 * @param {Object} opciones Contiene el valor de cada opción del desplegable, tanto de manera visible como invisible
 * @returns {JSX.Element} Contenido HTML referente a los desplegables usados en las busquedas
 */
function Dropdown({key, info, label, opciones}) {
  return (
      <fieldset key={key} className="centro__busqueda--opcion">
          <label htmlFor={info}>{label}</label>
          <select name={info} id={info}>
          {
            Object.entries(opciones).map((key,index) =>
              <option key={index} value={key[0]}>{key[1]}</option>)
          }
          </select>
      </fieldset>
  );
}

export default Dropdown;