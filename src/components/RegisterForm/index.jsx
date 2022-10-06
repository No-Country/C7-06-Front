import classes from "./RegisterForm.module.sass";
import { useRef, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "../../hooks/useForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEyeSlash, faEye, faUser, faLock, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import jwtDecode from "jwt-decode";

const RegisterForm = () => {
  // States
  const [seePass, setSeePass] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [user, setUser] = useState();

  // Navigation
  const navigate = useNavigate();

  // Referencies
  const emailRegRef = useRef();

  // focus on user input on init
  useEffect(() => {
    emailRegRef.current.focus();
  }, []);

  // FORM LOGIC

  // Form values on init
  const initForm = {
    email: "",
    name: "",
    lastName: "",
    pwd: "",
    conditions: false
  };

  // Form validation function
  const validationsForm = (form, name) => {
    const validationTypes = {
      email: "email",
      name: "name",
      lastName: "name",
      pwd: "password",
      conditions: "conditions"
    };
    const type = validationTypes[name];
    let error;
    const REGNAME = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/;
    const REGEMAIL = /^(\w+[/./-]?){1,}@[a-z]+[/.]\w{2,}$/;
    const REGPWD = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!$%@.]).{8,24}$/;

    // If no info
    if (!form[name]?.trim()) {
      error = "El campo es requerido.";
      return error;
    }

    switch (type) {
      case "name":
        if (!REGNAME.test(form[name].trim())) {
          error = "Solo se aceptan letras y espacios en blanco.";
        } else {
          error = false;
        }
        break;
      case "email":
        if (!REGEMAIL.test(form[name].trim())) {
          error = "Debes introducir un email. Ejemplo: joedoe@email.com";
        } else {
          error = false;
        }
        break;
      case "password":
        if (!REGPWD.test(form[name].trim())) {
          error =
            "La contraseña debe tener entre 8 a 28 caracteres y al menos una letra minúscula, una mayúscula, una cifra y alguno de estos caracteres: ! $ % @ .";
        } else {
          error = false;
        }
        break;

      case "conditions":
        if (!form[name]) {
          error = "Debes aceptar los términos y condiciones";
        } else {
          error = false;
        }
        break;

      default:
        console.log("Validación no prevista para el campo ", name, "del tipo ", type);
    }
    return error;
  };

  // Function on Success of Response
  const onSuccess = async () => {
    emailRegRef.current.focus();
    navigate("/login");
  };

  // On error of submit form
  const onError = error => {
    return `Se ha producido un error. Inténtelo de nuevo o contacte con administración: ${error}`;
  };

  // Form Handler
  const { form, errors, handleChange, handleBlur, handleSubmit } = useForm(
    initForm,
    validationsForm,
    onSuccess,
    onError
  );

  // GOOGLE LOGIN
  function handleCallbackResponse(response) {
    const userObject = jwtDecode(response.credential);
    setUser(userObject);
  }

  useEffect(() => {
    /* global google */

    google.accounts.id.initialize({
      client_id: "416379331606-68jrqo6sg4mdv0q7g4l7mj2msvc4q628.apps.googleusercontent.com",
      callback: handleCallbackResponse
    });

    google.accounts.id.renderButton(document.getElementById("signInDiv"), {
      theme: "outline",
      size: "large",
      width: 300
    });
  }, []);

  return (
    <>
      <section className={classes.myForm}>
        <div className={classes.myForm_wrapper}>
          <h1>Regístrate</h1>
          <form onSubmit={handleSubmit}>
            <div className={classes.myForm_holder}>
              <div className={classes.myForm_control}>
                <div className={classes.myForm_control_group}>
                  <label htmlFor="email">
                    <FontAwesomeIcon icon={faEnvelope} />
                  </label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    ref={emailRegRef}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={form.email}
                    placeholder="Correo Electrónico"
                    autoComplete="on"
                    required
                  />
                </div>
                {errors?.email && <p className={classes.instructions}>{errors.email}</p>}
              </div>

              <div className={classes.myForm_control}>
                <div className={classes.myForm_control_group}>
                  <label htmlFor="name">
                    <FontAwesomeIcon icon={faUser} />
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={form.name}
                    placeholder="Nombre"
                    autoComplete="on"
                    required
                  />
                </div>
                {errors?.name && <p className={classes.instructions}>{errors.name}</p>}
              </div>

              <div className={classes.myForm_control}>
                <div className={classes.myForm_control_group}>
                  <label htmlFor="lastName">
                    <FontAwesomeIcon icon={faUser} />
                  </label>
                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={form.lastName}
                    placeholder="Apellido"
                    autoComplete="off"
                    required
                  />
                </div>
                {errors?.lastName && <p className={classes.instructions}>{errors.lastName}</p>}
              </div>

              <div className={classes.myForm_control}>
                <div className={classes.myForm_control_group}>
                  <label htmlFor="password">
                    <FontAwesomeIcon icon={faLock} />
                  </label>
                  <span>
                    <input
                      id="password"
                      name="pwd"
                      type={seePass ? "text" : "password"}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={form.pwd}
                      placeholder="Contraseña"
                      required
                    />
                    {seePass ? (
                      <FontAwesomeIcon
                        icon={faEye}
                        className={classes.passIcon}
                        onClick={() => setSeePass(false)}
                      />
                    ) : (
                      <FontAwesomeIcon
                        icon={faEyeSlash}
                        className={classes.passIcon}
                        onClick={() => setSeePass(true)}
                      />
                    )}
                  </span>
                </div>
                {errors?.pwd && <p className={classes.instructions}>{errors.pwd}</p>}
              </div>
            </div>

            <div className={classes.myForm_check}>
              <input
                id="conditions"
                name="conditions"
                type="checkbox"
                onChange={handleChange}
                value={form.conditions}
                required
              />
              <label htmlFor="conditions">
                Accepto los <Link to="/">términos y condiciones</Link>.
              </label>
            </div>
            {errors?.conditions && <p className={classes.instructions}>{errors.conditions}</p>}

            <div className={classes.myForm_actions}>
              <button
                type="submit"
                className={classes.myForm_actions_link}
                // disabled={!(validEmail && validLastName && validName && validPwd && conditions)}>
              >
                Regístrate
              </button>

              <p className={classes.myForm_actions_separator}> o </p>

              <div id="signInDiv"></div>

              <p className={classes.myForm_actions_text}>Ya tienes cuenta?</p>
              <Link className={classes.myForm_actions_link} to="/login">
                Ingresar
              </Link>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default RegisterForm;
