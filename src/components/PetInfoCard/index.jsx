import classes from "./PetInfoCard.module.sass";
import PropTypes from "prop-types";
import { useState } from "react";
import { Link } from "react-router-dom";

function PetInfoCard({ pet }) {
  // States
  const quantityPhotos = pet.pictures.length;
  const [images, setImages] = useState(pet.pictures);
  const [isFavourite, setIsFavourite] = useState(false);

  // Create array Thumbnail Views
  const addImages = () => {
    const AnimalPhotos = [];
    for (let i = 1; i <= quantityPhotos - 1; i++) {
      AnimalPhotos.push(images[i]);
    }
    return AnimalPhotos;
  };

  // Function rotate photo image
  const changePhotoHandler = e => {
    const fileName = e.target.src.split("/");
    const index = images.indexOf(fileName[fileName.length - 1]);
    const newMainImage = images[index];
    const newThumbnail = images.filter(val => val !== newMainImage);
    setImages([newMainImage, ...newThumbnail]);
  };

  // AddFavouriteHanlder

  const favouriteHandler = () => {
    if (isFavourite) {
      // Llamada API quitar de favoritos
    } else {
      // Llamada API agregar a favoritos
    }
    setIsFavourite(!isFavourite);
  };

  return (
    <div className={classes.card}>
      <h2> Caniche Macho </h2>
      <div className={classes.card_wrapper}>
        <div className={classes.card_gallery}>
          <div className={classes.card_gallery_wrapper}>
            <div className={classes.card_gallery_image}>
              <img
                src={`/animals/${images[0]}`}
                className={classes.active}
                alt={`Foto de ${pet.name}`}
              />
            </div>
            <div className={classes.card_gallery_thumbnail}>
              {quantityPhotos > 1 &&
                addImages().map(photo => (
                  <img
                    src={`/animals/${photo}`}
                    alt={`Foto de ${pet.name}`}
                    key={photo}
                    onClick={changePhotoHandler}
                  />
                ))}
            </div>
          </div>
        </div>

        <div className={classes.card_info}>
          <div className={classes.card_info_header}>
            <h3> {pet.name} </h3>
          </div>
          <div className={classes.card_info_body}>
            <p>
              Raza: <span>{pet.raza}</span>
            </p>
            <p>
              Sexo: <span>{pet.sexo}</span>
            </p>
            <p>
              Edad: <span>{pet.age}</span> años
            </p>
            <p>
              Ubicación: <span>{pet.place}</span>
            </p>
            <p className={classes.description}>{pet.description}</p>
          </div>
          <div className={classes.card_footer}>
            <button className={classes.favourite} onClick={favouriteHandler}>
              {isFavourite ? "Quitar de Favoritos" : "Añadir a Favoritos"}
            </button>
            <Link to={`/user/${pet.userId}`} className={classes.contact}>
              Contactar a su dueño
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PetInfoCard;

PetInfoCard.propTypes = {
  pet: PropTypes.object
};
