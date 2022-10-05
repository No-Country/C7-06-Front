import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";
import styles from "./Card.module.sass";

// Boton de favorito
const Favorite = ({ isFavorite, handleClick }) => {
  return (
    <div className={styles.favorite} onClick={handleClick}>
      <span className={`${isFavorite && styles.favorite_active}`}>
        <FontAwesomeIcon icon={faStar} />
      </span>
    </div>
  );
};

// Validación de props del boton favorito
Favorite.propTypes = {
  isFavorite: PropTypes.bool,
  handleClick: PropTypes.func.isRequired
};

// Tarjeta de mascota
const Card = ({ animal }) => {
  const handleClick = e => {
    console.log("click");
  };

  return (
    <div className={styles.card}>
      <div className={styles.card__img}>
        <img src={`/animals/${animal.picture}`} alt={animal.name} />
      </div>
      <div className={styles.card__content}>
        <h3 className={styles.card__title}>{animal.name}</h3>
        <div className={styles.card__text}>
          <ul>
            <li>
              <span>Raza:</span> {animal.raza}
            </li>
            <li>
              <span>Sexo:</span> {animal.sexo}
            </li>
            <li>
              <span>Edad:</span> {animal.age}
            </li>
          </ul>
        </div>
        <Favorite isFavorite={animal.isFavorite} handleClick={handleClick} />
      </div>
    </div>
  );
};

// Validación de props de la tarjeta de mascota
Card.propTypes = {
  animal: PropTypes.object.isRequired
};

export default Card;
