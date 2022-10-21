import { useRef } from "react";
import emailjs from "@emailjs/browser";
import styles from "./Contact.module.sass";
import Swal from "sweetalert2";
// import { regexConditions } from "../../helpers/regexs.js";

const Contact = () => {
  const form = useRef();

  const sweetAlert = () => {
    Swal.fire({
      icon: "success",
      title: "¡Perfecto!",
      text: "Tu mensaje ha sido enviado."
    });
  };

  const sendEmail = e => {
    e.preventDefault();

    emailjs.sendForm("service_hnycp0f", "template_8x2adlb", form.current, "ITxN3AiPibCI_hmn1").then(
      result => {
        console.log(result.text);
        console.log("Se envio el mensaje");
      },
      error => {
        console.log(error.text);
      }
    );
    e.target.reset();
    sweetAlert();
  };
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
      <form className={styles.form} ref={form} onSubmit={sendEmail}>
        <div className={styles.inputs}>
          <input type="text" placeholder="Nombre y Apellido" name="nombre" />
          <input type="email" placeholder="Correo electronico" name="correo" required />
          <input type="text" placeholder="Asunto" name="asunto" />
          <textarea type="textarea" placeholder="Escribe aqui tu mensaje..." name="mensaje" />{" "}
        </div>
        <div className={styles.conditions}>
          <input className={styles.checkbox} type="checkbox" name="conditions" required />
          <label htmlFor="conditions">Acepto las condiciones y politicas de privacidad</label>
        </div>
        <button>Enviar</button>
      </form>
    </div>
  );
};
export default Contact;
