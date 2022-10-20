import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";
import styles from "./Card.module.sass";
import { Link } from "react-router-dom";
import cat from "../../assets/catDefault.png";
import dog from "../../assets/dogDefault.png";

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
const Card = ({ animal, isFavorite }) => {
  const handleClick = e => {
    console.log("click");
  };

  return (
    <Link to={`/pet/${animal.id}`} className={styles.cardLink}>
      <div className={styles.card}>
        <div className={styles.card__img}>
          {animal.pictureResponse?.path ? (
            <img src={animal.pictureResponse.path} alt={animal?.name} />
          ) : animal.animalType === "CAT" ? (
            <img src={cat} alt={animal?.name} />
          ) : (
            <img src={dog} alt={animal?.name} />
          )}
        </div>
        <div className={styles.card__content}>
          <h3 className={styles.card__title}>{animal?.name}</h3>
          <div className={styles.card__text}>
            <ul>
              <li>
                <span>Raza:</span> {animal?.race}
              </li>
              <li>
                <span>Sexo:</span> {animal?.gender}
              </li>
              <li>
                <span>Edad:</span> {animal?.age}
              </li>
            </ul>
          </div>
          <Favorite isFavorite={isFavorite || false} handleClick={handleClick} />
        </div>
      </div>
    </Link>
  );
};

// Validación de props de la tarjeta de mascota
Card.propTypes = {
  animal: PropTypes.object.isRequired,
  isFavorite: PropTypes.bool
};

export default Card;
