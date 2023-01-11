import React from 'react';

function Dropdown(props) {
  return (
      <fieldset className="centro__busqueda--opcion">
          <label for={props.info}>{props.label}</label>
          <select name={props.info} id={props.info}>
          {
            Object.entries(props.opciones).map((key,value) =>
              <option value={key[0]}>{key[1]}</option>)
          }
          </select>
      </fieldset>
  );
}

export default Dropdown;