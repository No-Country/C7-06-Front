import classes from "./PetInfoCard.module.sass";
import PropTypes from "prop-types";
import cat from "../../assets/catDefault.png";
import dog from "../../assets/dogDefault.png";
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
      console.dir(AnimalPhotos);
    }
    return AnimalPhotos;
  };

  // Function rotate photo image
  const changePhotoHandler = e => {
    const fileName = e.target.src;
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
      <h2>
        {pet.race} {pet.gender}
      </h2>
      <div className={classes.card_wrapper}>
        <div className={classes.card_gallery}>
          <div className={classes.card_gallery_wrapper}>
            <div className={classes.card_gallery_image}>
              {images[0] ? (
                <img src={images[0].path} className={classes.active} alt={`Foto de ${pet.name}`} />
              ) : pet.type === "cat" ? (
                <img src={cat} className={classes.active} alt={`Foto de ${pet.name}`} />
              ) : (
                <img src={dog} className={classes.active} alt={`Foto de ${pet.name}`} />
              )}
            </div>
            <div className={classes.card_gallery_thumbnail}>
              {quantityPhotos > 1 &&
                addImages().map(photo => (
                  <img
                    src={photo.path}
                    alt={`Foto de ${pet.name}`}
                    key={photo.id}
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
              Raza: <span>{pet.race.toLowerCase()}</span>
            </p>
            <p>
              Sexo: <span>{pet.gender.toLowerCase() === "female" ? "Hembra" : "Macho"}</span>
            </p>
            <p>
              Edad: <span>{pet.age} años</span>
            </p>
            <p>
              Ubicación: <span>{pet.location}</span>
            </p>
            <p>
              Peso: <span>{pet.weight} kg</span>
            </p>
            <p>
              Tamaño: <span>{pet.size.toLowerCase()}</span>
            </p>
            <p>
              Certificado pura raza? <span>{pet.pureRace ? "si" : "no"}</span>
            </p>
            <p>
              Vacunas al día? <span>{pet.vaccinationsUpToDate ? "si" : "no"}</span>
            </p>
            <p className={classes.description}>
              Sobre mi: <span>{pet.description}</span>
            </p>
          </div>
          <div className={classes.card_footer}>
            <button className={classes.favourite} onClick={favouriteHandler}>
              {isFavourite ? "Quitar de Favoritos" : "Añadir a Favoritos"}
            </button>
            <Link to={`/user/${pet.user_id}`} className={classes.contact}>
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
