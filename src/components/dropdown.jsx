import React from 'react';

function Dropdown(props) {
  return (
      <fieldset key={props.key} className="centro__busqueda--opcion">
          <label for={props.info}>{props.label}</label>
          <select name={props.info} id={props.info} onChange={props.hey}>
          {
            Object.entries(props.opciones).map((key,index) =>
              <option key={index} value={key[0]}>{key[1]}</option>)
          }
          </select>
      </fieldset>
  );
}

export default Dropdown;