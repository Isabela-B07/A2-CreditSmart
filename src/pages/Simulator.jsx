//Importaciones
import React, { useState, useMemo } from "react";
import Hero from "../components/Hero";
import Footer from "../components/Footer";
import CreditCard from "../components/CreditCard";
import creditsData from "../data/creditsData";
import "../styles/simulador.css";

function Simulador() {
  //Estados
  const [nombreSeleccionado, setNombreSeleccionado] = useState(""); //Guarda el nombre del crédito que el usuario elige en el select
  const [montoMin, setMontoMin] = useState(0); //Guarda el monto mínimo que el usuario escoge
  const [montoMax, setMontoMax] = useState(999999999); //Guarda el monto máximo elegido
  const [tasaOrden, setTasaOrden] = useState(""); //Guarda cómo quiere ordenar el usuario:

  // Select de nombres
  const nombresDisponibles = useMemo(
    () => Array.from(new Set(creditsData.map((c) => c.nombre))), //Saca todos los nombres
    []
  );

  // Select de montos disponibles
  //Recorre los créditos, extrae los min y max, y los ordena de menor a mayor
  const montosDisponibles = useMemo(() => {
    const valores = []; //Crea el arreglo de valores, para guardar los montos
    creditsData.forEach((c) => {//Recorre todos los créditos dentro de credisData
      valores.push(c.minAmount); //Cada crédito se llama c (Guarda los min)
      valores.push(c.maxAmount); //Guarda los max
    });

    return Array.from(new Set(valores)).sort((a, b) => a - b); //Orena los números de menor a mayor
  }, []);

  // ---- FILTRADO ----
  const filtrarCreditos = () => {
    let resultados = [...creditsData]; //Crea una copia del array, para no cambiar los datos originales

    // Filtrar por nombre
    //Revisa si el usuario seleccionó un nombre de crédito
    //toma la copia de todos los créditos y solo deja los que tienen el mismo nombre que eligió el usuario.
    if (nombreSeleccionado) {
      resultados = resultados.filter(
        (c) => c.nombre === nombreSeleccionado
      );
    }

    // Filtrar por rango: se revisa si el rango seleccionado se cruza con el rango del crédito
    resultados = resultados.filter(
      (c) => c.maxAmount >= montoMin && c.minAmount <= montoMax
    );

    // Ordenar por tasa
    if (tasaOrden === "asc") {
      resultados.sort((a, b) => a.tasa - b.tasa);
    }

    return resultados;
  };

  const resultados = filtrarCreditos(); //Llama la función

  // ---- LIMPIAR FILTROS ----
  // Restablece los filtros a sus valores iniciales
  const limpiarFiltros = () => {
    setNombreSeleccionado("");
    setMontoMin(0);
    setMontoMax(999999999);
    setTasaOrden("");
  };

  return (
    <div>
      <Hero
        titulo="Simulador de Créditos"
        parrafos={[
          "Encuentra el crédito perfecto para ti de manera rápida y sencilla.",
          "Utiliza nuestro buscador y filtros para comparar tasas, montos y plazos.",
        ]}
      />

      {/* CONTENEDOR DE FILTROS */}
      <section className="simulador-filtros">
        <h3>Buscar Créditos</h3>

        <div className="filtros-grid">

          {/* Buscar por nombre */}
          <div className="filtro">
            <label htmlFor="nombre">Buscar por nombre</label> {/*Conecta esta etiqueta con el <select> que tiene */}
            <select
              id="nombre"
              value={nombreSeleccionado} //Está ligado al estado nombreSelccionado
              onChange={(e) => setNombreSeleccionado(e.target.value)} //Cada vez que se selecciona algo diferente, se actualiza el estado
            >
              <option value="">Seleccione una opción</option>
              
              {/* se recorre el array y según la opción elegida, este se muestra en el option */}
              {nombresDisponibles.map((n, i) => ( 
                <option key={i} value={n}>{n}</option>
              ))}
            </select>
          </div>

          {/* Monto mínimo */}
          <div className="filtro">
            <label htmlFor="montoMin">Monto mínimo</label> {/*Conecta el texto "Monto mínimo" con el <select id="montoMin"> */}
            <select
              id="montoMin"
              value={montoMin}
              onChange={(e) => setMontoMin(Number(e.target.value))} //cada vez que el usuario elige un monto, se guarda en el estado como número
            >
              <option value={0}>No mínimo</option>
              {montosDisponibles.map((m, i) => ( //Misma lógica que con nombres preo aplicada a monto
                <option key={i} value={m}>
                  ${m.toLocaleString()}
                </option>
              ))}
            </select>
          </div>

          {/* Monto máximo */}
          <div className="filtro">
            <label htmlFor="montoMax">Monto máximo</label>
            <select
              id="montoMax"
              value={montoMax}
              onChange={(e) => setMontoMax(Number(e.target.value))}
            >
              <option value={999999999}>No máximo</option>
              {montosDisponibles.map((m, i) => (
                <option key={i} value={m}>
                  ${m.toLocaleString()}
                </option>
              ))}
            </select>
          </div>

          {/* Orden por tasa */}
          <div className="filtro">
            <label htmlFor="tasaOrden">Ordenar por tasa</label>
            <select
              id="tasaOrden"
              value={tasaOrden} //el valor actual del select está controlado por el estado tasaOrden.
              onChange={(e) => setTasaOrden(e.target.value)} //cuando el usuario elige una opción, se guarda en el estado tasaOrden.
            >
              <option value="">Seleccione una opción</option>
              <option value="asc">Menor a mayor</option>
            </select>
          </div>

          {/* Botón limpiar */}
          <div className="boton-filtros">
            <button
              type="button"
              onClick={limpiarFiltros} //cuando el usuario hace clic, se ejecuta la función limpiarFiltros.
              className="btn-secondary"
            >
              Limpiar Filtros
            </button>
          </div>
        </div>
      </section>

      {/* RESULTADOS */}
      <div className="credit-list">
        {resultados.length > 0 ? (//Si hay resultados se muestra el bloque, si no, el mensaje
          <>
            <p className="result-count"> {/*Muestra cuántos resultados hay. */}
              Mostrando {resultados.length} resultado {/*Para el número de resultados */}
              {resultados.length !== 1 && "s"}
            </p>

            <div className="credits-grid">
              {resultados.map((credit) => ( //Recorre el arreglo resultados
                <CreditCard
                  key={credit.id}
                  nombre={credit.nombre}
                  descripcion={credit.descripcion}
                  tasa={credit.tasa}
                  monto={credit.monto}
                  plazo={credit.plazo}
                  imagen={credit.imagen}
                />
              ))}
            </div>
          </>
        ) : (
          <p className="no-results">No hay créditos disponibles</p>
        )}
      </div>

      <Footer />
    </div>
  );
}

export default Simulador;
