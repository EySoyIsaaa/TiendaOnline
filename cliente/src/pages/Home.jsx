import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <section>
      <div className="hero">
        <h1>Audio Automotriz Premium de Alta Gama</h1>
        <p>
          Lleva tu sistema al siguiente nivel con subwoofers, amplificadores y DSP de élite.
          Instalación profesional, sonido preciso y presencia brutal.
        </p>
        <Link to="/productos" className="btn">Explorar Catálogo</Link>
      </div>
    </section>
  );
}
