import styles from "./Contact.module.sass";
// import { regexConditions } from "../../helpers/regexs.js";

const Contact = () => {
  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <h1>Contacto</h1>
      </div>
      <div className={styles.contact}>
        <h2>Contactate con ANIMATCH</h2>
        <p>
          Gracias por visitar ANIMATCH :) <br />
          Si tienes dudas, sugerencias o necesitas más información, puedes contactarte con nosotros
          a través del formulario de contacto de esta página. Vamos a responderte lo más rápido
          posible.
        </p>
      </div>
      <form className={styles.form}>
        <div className={styles.inputs}>
          <input type="text" placeholder="Nombre y Apellido" />
          <input type="email" placeholder="Correo electronico" required />
          <input type="text" placeholder="Asunto" />
          <textarea type="textarea" placeholder="Escribe aqui tu mensaje..." />{" "}
        </div>
        <div className={styles.conditions}>
          <input className={styles.checkbox} type="checkbox" name="conditions" />
          <label htmlFor="conditions">
            <span></span>Acepto las condiciones y politicas de privacidad
          </label>
        </div>
        <button>Enviar</button>
      </form>
    </div>
  );
};
export default Contact;
