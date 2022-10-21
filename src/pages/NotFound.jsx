import image404 from "../assets/image404.png";
import { Link } from "react-router-dom";
import classes from "./styles/NotFound.module.sass";

const NotFound = () => {
  return (
    <div className={classes.container}>
      <div className={classes.image}>
        <img src={image404} alt="La página que buscas no existe." />
      </div>
      <p>La página que buscas no existe. Te sugerimos volver al inicio</p>
      <Link to="/" className={classes.button}>
        Volver al inicio
      </Link>
    </div>
  );
};
export default NotFound;
