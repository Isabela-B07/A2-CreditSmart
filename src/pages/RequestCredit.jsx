// Importaciones
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import "../styles/solicitar.css";

// Servicio de Firebase
import { createRequest } from "../firebase/requests.service";

const RequestCredit = () => {
  // Datos personales
  const [nombre, setNombre] = useState("");
  const [cedula, setCedula] = useState("");
  const [correo, setCorreo] = useState("");
  const [telefono, setTelefono] = useState("");

  // Datos del crédito
  const [tipoCredito, setTipoCredito] = useState("");
  const [monto, setMonto] = useState("");
  const [plazo, setPlazo] = useState("");
  const [destino, setDestino] = useState(""); // <-- NUEVO

  // Datos laborales
  const [empresa, setEmpresa] = useState(""); // <-- NUEVO
  const [cargo, setCargo] = useState(""); // <-- NUEVO
  const [ingresos, setIngresos] = useState(""); // <-- NUEVO

  // Control y validaciones
  const [errors, setErrors] = useState({});
  const [cuota, setCuota] = useState(null);
  const [resumenVisible, setResumenVisible] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formError, setFormError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // Validaciones simples
  const validate = (field, value) => {
    let newErrors = { ...errors };

    if (field === "nombre" && value.trim().length < 3) {
      newErrors.nombre = "El nombre debe tener mínimo 3 caracteres.";
    } else delete newErrors.nombre;

    if (field === "cedula" && !/^\d{6,10}$/.test(value)) {
      newErrors.cedula = "La cédula debe tener entre 6 y 10 dígitos.";
    } else delete newErrors.cedula;

    if (field === "correo" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      newErrors.correo = "Correo no válido.";
    } else delete newErrors.correo;

    if (field === "telefono" && !/^\d{10}$/.test(value)) {
      newErrors.telefono = "Debe tener 10 dígitos.";
    } else delete newErrors.telefono;

    setErrors(newErrors);
  };

  // Validación final
  const validateAll = () => {
    let newErrors = {};

    if (nombre.trim().length < 3) newErrors.nombre = "El nombre es inválido.";
    if (!/^\d{6,10}$/.test(cedula)) newErrors.cedula = "Cédula inválida.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo)) newErrors.correo = "Correo inválido.";
    if (!/^\d{10}$/.test(telefono)) newErrors.telefono = "Teléfono inválido.";

    setErrors(newErrors);
    return newErrors;
  };

  // Cálculo de cuota
  const calcularCuota = (monto, plazo) => {
    if (!monto || !plazo) return null;
    const tasaMensual = 0.015;
    const p = parseFloat(monto);
    const n = parseInt(plazo);
    const cuotaCalc = (p * tasaMensual) / (1 - Math.pow(1 + tasaMensual, -n));
    return cuotaCalc.toFixed(2);
  };

  const handleMontoPlazoChange = (field, value) => {
    if (field === "monto") setMonto(value);
    if (field === "plazo") setPlazo(value);
    const updatedMonto = field === "monto" ? value : monto;
    const updatedPlazo = field === "plazo" ? value : plazo;
    setCuota(calcularCuota(updatedMonto, updatedPlazo));
  };

  // Mostrar resumen
  const handleResumen = () => {
    const validationErrors = validateAll();

    if (
      !nombre || !cedula || !correo || !telefono ||
      !tipoCredito || !monto || !plazo ||
      !destino || !empresa || !cargo || !ingresos
    ) {
      setFormError("Por favor completa todos los campos.");
      return;
    }

    if (Object.keys(validationErrors).length > 0) {
      setFormError("Corrige los errores antes de continuar.");
      return;
    }

    setFormError("");
    setResumenVisible(true);
  };

  // Enviar a Firestore
  const enviarSolicitud = async () => {
    const nuevaSolicitud = {
      nombre,
      cedula,
      correo,
      telefono,
      tipoCredito,
      monto,
      plazo,
      cuota,
      destino,   // <-- NUEVO
      empresa,   // <-- NUEVO
      cargo,     // <-- NUEVO
      ingresos,  // <-- NUEVO
      fecha: new Date().toISOString()
    };

    try {
      setLoading(true);
      await createRequest(nuevaSolicitud);

      //Guarda el correo del usuario en localStorage
  localStorage.setItem("correoUsuario", correo);

      setSuccess(true);
      setResumenVisible(false);

      // Resetear form
      setNombre("");
      setCedula("");
      setCorreo("");
      setTelefono("");
      setTipoCredito("");
      setMonto("");
      setPlazo("");
      setDestino("");
      setEmpresa("");
      setCargo("");
      setIngresos("");
      setCuota(null);

      //Esto acá es para que una vez enviado navegue a otra ruta (Si lo vamos a implementar)
      navigate("/mis-solicitudes");

    } catch (err) {
      setFormError("Error al enviar solicitud.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Hero
        titulo="Solicitar Crédito"
        parrafos={[
          "Completa el formulario con tus datos personales, laborales y detalles del crédito que deseas solicitar.",
        ]}
      />

      <div className="solicitar-container">
        <h2 className="titulo-formulario">Formulario de Solicitud</h2>

        <form className="formulario">

          {/* --- DATOS PERSONALES --- */}
          <h3 className="subtitulo">Datos Personales</h3>

          <div className="grupo">
            <label>Nombre Completo</label>
            <input
              type="text"
              value={nombre}
              onChange={(e) => { setNombre(e.target.value); validate("nombre", e.target.value); }}
              onBlur={(e) => validate("nombre", e.target.value)}
            />
            {errors.nombre && <span className="error">{errors.nombre}</span>}
          </div>

          <div className="grupo">
            <label>Cédula</label>
            <input
              type="text"
              value={cedula}
              onChange={(e) => { setCedula(e.target.value); validate("cedula", e.target.value); }}
              onBlur={(e) => validate("cedula", e.target.value)}
            />
            {errors.cedula && <span className="error">{errors.cedula}</span>}
          </div>

          <div className="grupo">
            <label>Email</label>
            <input
              type="email"
              value={correo}
              onChange={(e) => { setCorreo(e.target.value); validate("correo", e.target.value); }}
              onBlur={(e) => validate("correo", e.target.value)}
            />
            {errors.correo && <span className="error">{errors.correo}</span>}
          </div>

          <div className="grupo">
            <label>Teléfono</label>
            <input
              type="text"
              value={telefono}
              onChange={(e) => { setTelefono(e.target.value); validate("telefono", e.target.value); }}
              onBlur={(e) => validate("telefono", e.target.value)}
            />
            {errors.telefono && <span className="error">{errors.telefono}</span>}
          </div>

          {/* --- DATOS DEL CRÉDITO --- */}
          <h3 className="subtitulo">Datos del Crédito</h3>

          <div className="grupo">
            <label>Tipo de Crédito</label>
            <select value={tipoCredito} onChange={(e) => setTipoCredito(e.target.value)}>
              <option value="">Seleccione una opción</option>
              <option value="Libre Inversión">Libre Inversión</option>
              <option value="Vehicular">Vehicular</option>
              <option value="Vivienda">Vivienda</option>
              <option value="Educativo">Educativo</option>
              <option value="Agropecuario">Agropecuario</option>
              <option value="Empresarial">Empresarial</option>
            </select>
          </div>

          <div className="grupo">
            <label>Monto solicitado</label>
            <input
              type="number"
              value={monto}
              min="500000"
              onChange={(e) => handleMontoPlazoChange("monto", e.target.value)}
            />
          </div>

          <div className="grupo">
            <label>Plazo (meses)</label>
            <select
              value={plazo}
              onChange={(e) => handleMontoPlazoChange("plazo", e.target.value)}
            >
              <option value="">Seleccione</option>
              <option value="6">6 meses</option>
              <option value="12">12 meses</option>
              <option value="18">18 meses</option>
              <option value="24">24 meses</option>
            </select>
          </div>

          <div className="grupo">
            <label>Destino del crédito</label>
            <textarea
              value={destino}
              onChange={(e) => setDestino(e.target.value)}
              placeholder="Ejemplo: compra de vehículo, remodelación, estudios..."
            ></textarea>
          </div>

          {cuota && (
            <p className="cuota">
              Cuota mensual estimada: <strong>${cuota}</strong>
            </p>
          )}

          {/* --- DATOS LABORALES --- */}
          <h3 className="subtitulo">Datos Laborales</h3>

          <div className="grupo">
            <label>Empresa donde trabaja</label>
            <input
              type="text"
              value={empresa}
              onChange={(e) => setEmpresa(e.target.value)}
            />
          </div>

          <div className="grupo">
            <label>Cargo</label>
            <input
              type="text"
              value={cargo}
              onChange={(e) => setCargo(e.target.value)}
            />
          </div>

          <div className="grupo">
            <label>Ingresos mensuales</label>
            <input
              type="number"
              value={ingresos}
              onChange={(e) => setIngresos(e.target.value)}
            />
          </div>

          {/* BOTÓN RESUMEN */}
          <button type="button" className="btn-morado" onClick={handleResumen}>
            Ver Resumen
          </button>

          {formError && <p className="error-enviar">{formError}</p>}
        </form>

        {/* --- RESUMEN --- */}
        {resumenVisible && (
          <div className="resumen">
            <h3>Resumen de la solicitud</h3>

            <p><strong>Nombre:</strong> {nombre}</p>
            <p><strong>Cédula:</strong> {cedula}</p>
            <p><strong>Email:</strong> {correo}</p>
            <p><strong>Teléfono:</strong> {telefono}</p>

            <p><strong>Tipo crédito:</strong> {tipoCredito}</p>
            <p><strong>Monto:</strong> ${monto}</p>
            <p><strong>Plazo:</strong> {plazo} meses</p>
            <p><strong>Destino:</strong> {destino}</p>
            <p><strong>Cuota mensual:</strong> ${cuota}</p>

            <p><strong>Empresa:</strong> {empresa}</p>
            <p><strong>Cargo:</strong> {cargo}</p>
            <p><strong>Ingresos:</strong> ${ingresos}</p>

            <button className="btn-rosa" onClick={enviarSolicitud} disabled={loading}>
              {loading ? "Enviando..." : "Enviar Solicitud"}
            </button>
          </div>
        )}

        {success && <div className="exito">¡Solicitud enviada con éxito! 🎉</div>}
      </div>

      <Footer />
    </>
  );
};

export default RequestCredit;
