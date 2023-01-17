/**
 * @file menu.jsx - Componente menu navegación
 * @author José Luis Tocino Rojo
 */

/**
 * @module Component[Layout]_Menu
 */

/**
 * Componente que es usado como menu de navegación de la web
 * 
 * @memberof module:Component[Layout]_Menu
 * @param {boolean} showMenu Booleano que indica si se debe mostrar o no el menu
 * @param {toggleOverlay} toggleOverlay Función que, en este componente nos ayuda a esconderlo
 * @returns {JSX.Element} Contenido HTML referente al menu de navegación
 */
function Menu({showMenu, toggleOverlay}) {
    return (
        <nav className={showMenu ? "menu mostrar" : "menu"} id="menu__opciones">
            <i className="menu__close material-symbols-rounded" onClick={toggleOverlay}>Close</i>
            <div className="menu__perfil perfil">
                <a href="/profile" className="menu__perfil__enlace">
                    <img className="menu__perfil__enlace--pfp" src={require("../../assets/images/pfp.jpg")} alt="Imagen de perfil"/>
                    <p>{localStorage.getItem("user") ? localStorage.getItem("user") : "NOUSER"}</p>
                </a>
            </div>
            <a className="menu__enlace login" href="/login">
                <i className="material-symbols-rounded">login</i>
                <p>Login</p>
            </a>
            <a className="menu__enlace registro" href="/register">
                <i className="material-symbols-rounded">person_add</i>
                <p>Registro</p>
            </a>
            <a className="menu__enlace inicio" href="/">
                <i className="material-symbols-rounded">home</i>
                <p>Inicio</p>
            </a>
            <a className="menu__enlace lista" href="/savedlist">
                <i className="material-symbols-rounded">list</i>
                <p>Mi lista</p>
            </a>
            <a className="menu__enlace contacto" href="/contact">
                <i className="material-symbols-rounded">mail</i>
                <p>Contacto</p>
            </a>
        </nav>
)}

export default Menu;