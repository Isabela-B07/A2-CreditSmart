import { NavLink, useLocation } from "react-router-dom";
import "../styles/navbar.css";


function Navbar() {
  const location = useLocation(); //Contiene información de la URL actual.


  // Dependiendo de la página, se devuelve un CSS diferente para el header (En este caso la imagen)
  const getHeaderClass = () => {
    if (location.pathname === "/simulator") return "header-simulador"; //Permite que el header cambie de estilo según la página
    if (location.pathname === "/request") return "header-solicitar";
    if (location.pathname === "/mis-solicitudes") return "header-solicitudes";
    return "header-inicio";
  };


  return (
    <header className={getHeaderClass()}> {/*aplica la clase CSS según la ruta actual.*/}
      <div className="encabezado">
        <div className="logo-contenedor">
          <img src="/img/CreditSmart_logo.png" alt="Logo CreditSmart" className="logo-img" />
        </div>


        <nav>
          <ul className="menu">
            <li>
              <NavLink to="/" end> {/*crea enlaces que React Router maneja sin recargar la página.*/}
                Inicio
              </NavLink>
            </li>


            <li>
              <NavLink to="/simulator">
                Simulador Crédito
              </NavLink>
            </li>


            <li>
              <NavLink to="/request">
                Solicitar Crédito
              </NavLink>
            </li>


            <li>
              <NavLink to="/mis-solicitudes">
                Mis solicitudes
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}


export default Navbar;

