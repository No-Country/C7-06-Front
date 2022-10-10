import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationPin,
  faMobileScreen,
  faEnvelope,
  faPaw,
  faPlusCircle
} from "@fortawesome/free-solid-svg-icons";
import Card from "../Card";
import styles from "./UserInfo.module.sass";
import user from "../../data/usermock.json";
import PropTypes from "prop-types";
import dogsMock from "../../data/dogsmock.json";
import catsMock from "../../data/catsmock.json";
import { Link } from "react-router-dom";

const allPets = [...dogsMock, ...catsMock];

// Componente: Foto de usuario
const UserPicture = ({ image, name }) => {
  return (
    <div className={styles.userInfo_avatar}>
      <img src={`/${image}`} alt={name} />
    </div>
  );
};

// Componente: Mascotas de usuario
const Pets = props => {
  return (
    <div className={styles.petsContainer}>
      <h3>Mis mascotas</h3>
      <div className={styles.petsContainer_mine}>
        {allPets
          .filter(pet => props.pets.includes(pet.id))
          .map(pet => (
            <Card key={pet.id} animal={pet} />
          ))}
        <AddPet />
      </div>
    </div>
  );
};

// Componente: Favoritos de usuario
const Favorites = props => {
  return (
    <div className={styles.petsContainer}>
      <h3>Mis favoritos</h3>
      <div className={styles.petsContainer_favorites}>
        {allPets
          .filter(pet => props.pets.includes(pet.id))
          .map(pet => (
            <Card key={pet.id} animal={pet} />
          ))}
      </div>
    </div>
  );
};

// Componente: Información de usuario
const UserInfo = () => {
  return (
    <>
      <div className={styles.userInfo}>
        <UserPicture image={user.image} name={user.name} />
        <div className={styles.userInfo_data}>
          <h2>{user.name}</h2>
          <ul>
            <li>
              <FontAwesomeIcon icon={faLocationPin} className={styles.icon} />
              {user.address}
            </li>
            <li>
              <FontAwesomeIcon icon={faMobileScreen} className={styles.icon} />
              {user.phone_number}
            </li>
            <li>
              <FontAwesomeIcon icon={faEnvelope} className={styles.icon} />
              {user.mail}
            </li>
            <li>
              <FontAwesomeIcon icon={faPaw} className={styles.icon} />
              {user.mail}
            </li>
          </ul>
          <div className={styles.userAbout}>
            <h3>Acerca de mí y mis mascotas</h3>
            <p>{user.description}</p>
          </div>
        </div>
      </div>
      <Pets pets={user.pets} />
      <Favorites pets={user.favourite} />
    </>
  );
};

// Componente: Boton de agregar mascota
// eslint-disable-next-line no-unused-vars
const AddPet = () => {
  return (
    <Link to="/add-pet">
      <div className={styles.addPet}>
        <FontAwesomeIcon icon={faPlusCircle} className="fa-6x" />
      </div>
    </Link>
  );
};

// Validación de tipos de propiedades
UserPicture.propTypes = {
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired
};

Pets.propTypes = {
  pets: PropTypes.array.isRequired
};

Favorites.propTypes = {
  pets: PropTypes.array.isRequired
};

export default UserInfo;