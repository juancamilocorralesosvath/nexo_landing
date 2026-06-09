export default function Footer() {
  return (
    <footer>
      <div>
        <img src="/assets/nexo-logo.svg" alt="NEXO SAS" className="footer-logo" />
        <p className="footer-desc">Consultoría en Recursos Humanos · Comprometidos con Colombia · Desde 1987</p>
        <p className="footer-copy">© 2026 NEXO SAS. Todos los derechos reservados.</p>
      </div>
      <div>
        <ul className="footer-links">
          <li><a href="#servicios">Servicios</a></li>
          <li><a href="#nosotros">Nosotros</a></li>
          <li><a href="#empleos">Empleos</a></li>
          <li><a href="#contacto">Contacto</a></li>
          <li><a href="#">LinkedIn</a></li>
          <li><a href="#">Instagram</a></li>
          <li><a href="#">Privacidad</a></li>
        </ul>
      </div>
    </footer>
  );
}
