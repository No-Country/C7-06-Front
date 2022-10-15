import styles from "./Contact.module.sass";

const Contact = () => {
  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <h1>Contacto</h1>
      </div>
      <div className={styles.contact}>
        <h2>Contactate con ANIMATCH</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Dui vel morbi cursus sed sodales
          molestie proin dictum gravida. Porttitor maecenas tincidunt ipsum semper malesuada. In
          sapien feugiat laoreet convallis eu sed.{" "}
        </p>
      </div>
      <div className={styles.inputs}>
        <input type="text" placeholder="Nombre y Apellido" />
        <input type="text" placeholder="Correo electronico" />
        <input type="text" placeholder="Asunto" />
        <textarea type="textarea" placeholder="Escribe aqui tu mensaje..." />{" "}
      </div>
      <div className={styles.conditions}>
        <input type="checkbox" />
        <p>Acepto las condiciones y politicas de privacidad</p>
      </div>
      <button>Enviar</button>
    </div>
  );
};
export default Contact;
