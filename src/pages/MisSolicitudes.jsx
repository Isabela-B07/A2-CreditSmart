import { useEffect, useState } from "react";
import { collection, query, where, orderBy, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import { Link } from "react-router-dom";
import Hero from "../components/Hero";
import Footer from "../components/Footer";
import "../styles/misSolicitudes.css";


function MisSolicitudes() {
  const [email, setEmail] = useState(localStorage.getItem("correoUsuario") || "");
  const [solicitudes, setSolicitudes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);


  // 🔽 Estado para expandir y colapsar detalles
  const [expandedId, setExpandedId] = useState(null);


  const fetchSolicitudes = async () => {
    if (!email.trim()) {
      setSolicitudes([]);
      return;
    }


    setLoading(true);
    setError(null);


    try {
      const q = query(
        collection(db, "solicitudes"),
        where("correo", "==", email),
        orderBy("fecha", "desc")
      );


      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));


      setSolicitudes(data);
    } catch (err) {
      setError("Error al cargar solicitudes: " + err.message);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    if (email) fetchSolicitudes();
  }, []);


  const toggleExpand = (id) => {
    setExpandedId(prev => (prev === id ? null : id));
  };


  return (
    <>
      <Hero
        titulo="Mis Solicitudes"
        parrafos={[
          "Consulta fácilmente el historial de solicitudes registradas.",
          "Puedes buscar ingresando tu correo y ver tu historial guardado."
        ]}
      />


      <div className="mis-solicitudes-container">


        {/* 🔍 FILTRO POR EMAIL */}
        <div className="filtro-correo">
          <input
            type="email"
            placeholder="Ingresa tu correo para buscar"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button className="btn-buscar" onClick={fetchSolicitudes}>
            Buscar
          </button>
        </div>


        {loading && <p className="mensaje-cargando">Cargando solicitudes...</p>}
        {error && <p className="mensaje-error">{error}</p>}


        {!loading && solicitudes.length === 0 && (
          <p className="mensaje-vacio">No se encontraron solicitudes.</p>
        )}


        <ul className="lista-solicitudes">
          {solicitudes.map(s => (
            <li key={s.id} className="item-solicitud">
              <strong>{s.tipoCredito}</strong>
              <span>Monto: ${s.monto}</span>
              <span>Plazo: {s.plazo} meses</span>
              <p className="fecha-solicitud">
                Fecha: {new Date(s.fecha).toLocaleDateString()}
              </p>


              {/* 🔽 BOTÓN VER MÁS */}
              <button className="btn-ver-mas" onClick={() => toggleExpand(s.id)}>
                {expandedId === s.id ? "Ver menos ▲" : "Ver más ▼"}
              </button>


              {/* 🔽 DETALLE DESPLEGABLE */}
              {expandedId === s.id && (
                <div className="detalle-solicitud">
                  <p><strong>Nombre:</strong> {s.nombre}</p>
                  <p><strong>Cédula:</strong> {s.cedula}</p>
                  <p><strong>Email:</strong> {s.correo}</p>
                  <p><strong>Teléfono:</strong> {s.telefono}</p>
                  <p><strong>Destino:</strong> {s.destino}</p>
                  <p><strong>Empresa:</strong> {s.empresa}</p>
                  <p><strong>Cargo:</strong> {s.cargo}</p>
                  <p><strong>Ingresos:</strong> ${s.ingresos}</p>
                  <p><strong>Cuota mensual estimada:</strong> ${s.cuota}</p>
                </div>
              )}


            </li>
          ))}
        </ul>


        <div className="botones-navegacion">
          <Link to="/" className="btn-morado">Volver al Inicio</Link>
          <Link to="/request" className="btn-rosa">Nueva Solicitud</Link>
        </div>
      </div>


      <Footer />
    </>
  );
}


export default MisSolicitudes;
