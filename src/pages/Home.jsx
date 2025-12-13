//Importaciones
import React, { useEffect, useState } from "react";
import Hero from "../components/Hero";
import CreditCard from "../components/CreditCard";
import Footer from "../components/Footer";
import "../styles/credits.css";
import "../styles/home.css";
import { getProducts } from "../firebase/products.service";


function Home() {
  // Textos del Hero
  const heroTextos = [
    "En CreditSmart, entendemos que cada proyecto de vida es único. Por eso, hemos diseñado una completa gama de productos crediticios que se adaptan a tus sueños y necesidades financieras, desde el crecimiento personal hasta el impulso de tu negocio.",
    "Explora nuestras opciones con tasas competitivas y plazos flexibles, y comienza hoy mismo tu camino hacia el éxito con la tranquilidad y el respaldo de una decisión inteligente."
  ];


  // Estados para productos, loading y error
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  // Efecto para cargar productos desde Firestore
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);


  return (
    <div>
      <Hero titulo="Nuestros Servicios" parrafos={heroTextos} />


      {/* Sección de productos crediticios */}
      <section className="seccion-creditos">
        <div className="credits-grid">
          {loading && <p className="loading-message">Cargando productos...</p>}
          {error && <p style={{ color: "red" }}>{error}</p>}
          {!loading && !error && products.map((credit) => (
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
      </section>


      <Footer />
    </div>
  );
}


export default Home;



