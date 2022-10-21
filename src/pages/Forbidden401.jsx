import image401 from "../assets/image401.png";
import { Link } from "react-router-dom";
import classes from "./styles/NotFound.module.sass";

const Forbidden401 = () => {
  return (
    <div className={classes.container}>
      <div className={classes.image}>
        <img src={image401} alt="La página que buscas no existe." />
      </div>
      <p>Acceso permitido solamente para usuarios registrados.</p>

      <Link to="/login" className={classes.login}>
        Iniciar sesión
      </Link>
      <Link to="/" className={classes.button}>
        Volver al inicio
      </Link>
    </div>
  );
};
export default Forbidden401;
