import classes from "./PetInfoCard.module.sass";

function PetInfoCard() {
  return (
    <div className={classes.card}>
      <h2> Caniche Macho </h2>
      <div className={classes.card_wrapper}>
        <div className={classes.card_gallery}>
          <div className={classes.card_gallery_wrapper}>
            <div className={classes.card_gallery_image}>
              <img src="/animals/cat1.png" className={classes.active} alt="image" />
            </div>
            <div className={classes.card_gallery_thumbnail}>
              <img src="/animals/cat2.png" alt="" />
              <img src="/animals/cat3.png" alt="" />
              <img src="/animals/cat4.png" alt="" />
            </div>
          </div>
        </div>

        <div className={classes.card_info}>
          <div className={classes.card_info_header}>
            <h3> Teo </h3>
          </div>
          <div className={classes.card_info_body}>
            <p>
              Raza: <span>Caniche</span>
            </p>
            <p>
              Sexo: <span>Macho</span>
            </p>
            <p>
              Edad: <span>2</span> años
            </p>
            <p>
              Ubicación: <span>Madrid</span>
            </p>
            <p className={classes.description}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Dui vel morbi cursus sed
              sodales molestie proin dictum gravida. Porttitor maecenas tincidunt ipsum semper
              malesuada. In sapien feugiat laoreet convallis eu sed.
            </p>
          </div>
          <div className={classes.card_footer}>
            <button className={classes.favourite}> Añadir a Favoritos </button>
            <button className={classes.contact}> Contactar a su dueño </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PetInfoCard;
