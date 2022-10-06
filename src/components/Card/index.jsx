import styles from "./Card.module.sass";
import PropTypes from "prop-types";

const Card = ({ animal }) => {
  return (
    <div className={styles.card}>
      <div className={styles.card__img}>
        <img src={`/animals/${animal?.picture}`} alt={animal?.name} />
      </div>
      <div className={styles.card__content}>
        <h3 className={styles.card__title}>{animal?.name}</h3>
        <div className={styles.card__text}>
          <ul>
            <li>
              <span>Raza:</span> {animal?.raza}
            </li>
            <li>
              <span>Sexo:</span> {animal?.sexo}
            </li>
            <li>
              <span>Edad:</span> {animal?.age}
            </li>
          </ul>
        </div>
        {/* <button className={styles.card__btn}>Ver más</button> */}
      </div>
    </div>
  );
};

Card.propTypes = {
  animal: PropTypes.object.isRequired
};

export default Card;
