import { useNavigate } from "react-router-dom"; // Para importar el hook useNavigate

// Props para que el componente sa reutilizable.
function CreditCard({ nombre, descripcion, tasa, monto, plazo, imagen }) {
  const navigate = useNavigate(); // Guarda la función navigate que permiter cambiar la ruta. 

  //Que pasa al ahcer clic en solicitar ahora.
  const handleSolicitarClick = () => {
    navigate("/request"); //Lleva a la ruta del formulario.
  };

  return ( //Determina lo que se va a mostrar en pantalla
    //Toda la tarjeta está dentro de este contenedor.
    <div className="credit-card"> 
      {imagen && <img src={imagen} alt={nombre} className="card-image" />}

      <div className="card-content">
        {/* Muestra el nombre del crédito en un h4 */}
        <h4 className="credit-title">{nombre}</h4>
        
        {/*Si existe descripción la muesta en un p */}
        {descripcion && <p className="card-description">{descripcion}</p>}

        <div className="details">
          <div className="detail-item">
            <span className="label">Tasa de interés</span>
            <span className="value highlight">{tasa}%</span>
          </div>

          <div className="detail-item">
            <span className="label">Monto</span>
            <span className="value">{monto}</span>
          </div>

          <div className="detail-item">
            <span className="label">Plazo</span>
            <span className="value">{plazo}</span>
          </div>
        </div>
      </div>

      <button className="btn-primary" onClick={handleSolicitarClick}> {/* al hacer clic, navega al formulario.*/}
        Solicitar ahora
      </button>
    </div>
  );
}

export default CreditCard; //Permite importar CreditCard en otras páginas.
