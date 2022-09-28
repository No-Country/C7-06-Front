import React from "react";
import styles from "./Intro.module.sass"

const Intro = () => {
  return (
    <div className={styles.intro}>
      <h2>Como funciona ANIMATCH?</h2>
      <p>
        Con ANIMATCH podrás encontrar el compañero ideal para tu mascota. Navega por el sitio,<br></br>
        conoce todas las opciones y crea tu lista de candidatos favoritos.
      </p>
      <p>Conoce más de cada mascota visitando su perfil.</p>
      <h2>Comienza ya!</h2>
    </div>
  );
};

export default Intro;
