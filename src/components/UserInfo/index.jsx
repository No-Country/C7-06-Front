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
// import user from "../../data/usermock.json";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import userDefault from "../../assets/userDefault.png";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { apiPub } from "../../helpers/axios";
import Paginator from "../Paginator";
import Spinner from "../Spinner";

// Componente: Foto de usuario
const UserPicture = ({ image, name }) => {
  return (
    <div className={styles.userInfo_avatar}>
      <img src={image} alt={name} />
    </div>
  );
};

// Componente: Mascotas de usuario
const Pets = props => {
  return (
    <>
      <h3>Mis mascotas</h3>
      <div className={styles.petsContainer_mine}>
        {props.pets.map(pet => (
          <Card key={pet.id} animal={pet} />
        ))}
        <AddPet />
      </div>
    </>
  );
};

// Componente: Favoritos de usuario
const Favorites = props => {
  return (
    <>
      <h3>Mis favoritos</h3>
      <div className={styles.petsContainer_favorites}>
        {props.pets.map(pet => (
          <Card key={pet.id} animal={pet} />
        ))}
      </div>
    </>
  );
};

// Componente: Información de usuario
const UserInfo = () => {
  const { userInfo } = useSelector(state => state.user);

  const [petsParams, setPetsParams] = useState({ pageNumber: 0 });
  const [favouritesParams, setFavouritesParams] = useState({ pageNumber: 0 });

  const [callbacks, setCallbacks] = useState({
    firstCallError: false,
    secondCallError: false,
    firstCallData: {
      lastPage: false,
      pageNumber: 0,
      totalElements: 0,
      totalPages: 0,
      content: []
    },
    secondCallData: {
      lastPage: false,
      pageNumber: 0,
      totalElements: 0,
      totalPages: 0,
      content: []
    },
    firstCallLoading: false,
    secondCallLoading: false,
    firstCallResultsEmpty: false,
    secondCallResultsEmpty: false
  });

  useEffect(() => {
    if (userInfo?.id) {
      loadPets();
    } else {
      setCallbacks(prevCallbacks => ({ ...prevCallbacks, firstCallLoading: true }));
    }
  }, [petsParams.pageNumber, userInfo.id]);

  useEffect(() => {
    if (userInfo?.id) {
      loadFavourites();
    } else {
      setCallbacks(prevCallbacks => ({ ...prevCallbacks, secondCallLoading: true }));
    }
  }, [favouritesParams.pageNumber, userInfo.id]);

  const loadPetsFromPage = page => {
    setPetsParams(prevParams => ({ ...prevParams, pageNumber: page }));
  };

  const loadFavouritesFromPage = page => {
    setFavouritesParams(prevParams => ({ ...prevParams, pageNumber: page }));
  };

  const loadPets = () => {
    setCallbacks(prevCallbacks => ({ ...prevCallbacks, firstCallLoading: true }));
    apiPub
      .get(`/users/${userInfo.id}/pets?pageNumber=${petsParams.pageNumber}`)
      .then(response => {
        setCallbacks(prevCallbacks => ({
          ...prevCallbacks,
          firstCallData: {
            ...prevCallbacks.firstCallData,
            lastPage: response.data.lastPage,
            pageNumber: response.data.pageNumber,
            totalElements: response.data.totalElements,
            totalPages: response.data.totalPages,
            content: response.data.content
          },
          firstCallLoading: false
        }));
      })
      .catch(error => {
        console.log(error);
        setCallbacks(prevCallbacks => ({
          ...prevCallbacks,
          firstCallLoading: false,
          firstCallError: true
        }));
      });
  };

  const loadFavourites = () => {
    setCallbacks(prevCallbacks => ({ ...prevCallbacks, firstCallLoading: true }));
    apiPub
      .get(`/users/${userInfo?.id}/favourites?pageNumber=${favouritesParams.pageNumber}`)
      .then(response => {
        setCallbacks(prevCallbacks => ({
          ...prevCallbacks,
          secondCallData: {
            ...prevCallbacks.firstCallData,
            lastPage: response.data.lastPage,
            pageNumber: response.data.pageNumber,
            totalElements: response.data.totalElements,
            totalPages: response.data.totalPages,
            content: response.data.content
          },
          secondCallLoading: false
        }));
      })
      .catch(error => {
        console.log(error);
        setCallbacks(prevCallbacks => ({
          ...prevCallbacks,
          secondCallLoading: false,
          secondCallError: true
        }));
      });
  };

  const loremIpsum =
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia, molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborumnumquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentiumoptio, eaque rerum! Provident similique accusantium nemo autem.";
  return (
    <>
      <div className={styles.userInfo}>
        <UserPicture image={userDefault} name={userInfo?.name} />
        <div className={styles.userInfo_data}>
          <h2>
            {userInfo?.name} {userInfo?.surname}
          </h2>
          <ul>
            <li>
              <FontAwesomeIcon icon={faLocationPin} className={styles.icon} />
              {userInfo?.address ? userInfo?.address : "No disponible"}
            </li>
            <li>
              <FontAwesomeIcon icon={faMobileScreen} className={styles.icon} />
              {userInfo?.phone_number ? userInfo?.phone_number : "12345678"}
            </li>
            <li>
              <FontAwesomeIcon icon={faEnvelope} className={styles.icon} />
              {userInfo?.email}
            </li>
            <li>
              <FontAwesomeIcon icon={faPaw} className={styles.icon} />
              {userInfo?.email}
            </li>
          </ul>
          <div className={styles.userAbout}>
            <h3>Acerca de mí y mis mascotas</h3>
            <p>{userInfo?.description ? userInfo?.description : loremIpsum}</p>
          </div>
        </div>
      </div>
      <div className={styles.petsContainer}>
        <Paginator
          pageNumber={callbacks.firstCallData.pageNumber}
          totalPages={callbacks.firstCallData.totalPages}
          loadDataFromPage={loadPetsFromPage}>
          {callbacks.firstCallLoading ? (
            <Spinner />
          ) : callbacks.firstCallError ? (
            <h3>Se ha producido un error.</h3>
          ) : (
            callbacks.firstCallData.content &&
            (callbacks.firstCallData.content.length === 0 ? (
              <></>
            ) : (
              <Pets pets={callbacks.firstCallData.content} />
            ))
          )}
        </Paginator>
        <Paginator
          pageNumber={callbacks.secondCallData.pageNumber}
          totalPages={callbacks.secondCallData.totalPages}
          loadDataFromPage={loadFavouritesFromPage}>
          {callbacks.secondCallLoading ? (
            <Spinner />
          ) : callbacks.secondCallError ? (
            <h3>Se ha producido un error.</h3>
          ) : (
            callbacks.secondCallData.content &&
            (callbacks.secondCallData.content.length === 0 ? (
              <h3>No se han agregado favoritos.</h3>
            ) : (
              <Favorites pets={callbacks.secondCallData.content} />
            ))
          )}
        </Paginator>
      </div>
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
