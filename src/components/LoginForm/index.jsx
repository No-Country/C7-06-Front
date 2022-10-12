import classes from "./LoginForm.module.sass";
import jwtDecode from "jwt-decode";
import { useRef, useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useForm } from "../../hooks/useForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEyeSlash, faEye, faLock, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { apiAuth } from "../../helpers/axios";

const LoginForm = () => {
  // User from context
  // eslint-disable-next-line no-unused-vars
  const [user, setUser] = useState();
  // eslint-disable-next-line no-unused-vars
  const [auth, setAuth] = useState(); // When ready change to auth from context or redux.

  // Navigate handler
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/"; // Get where user came from

  // Referencies
  const emailRef = useRef();

  // Focus on email input at first render
  useEffect(() => {
    emailRef.current.focus();
  }, []);

  // Password visibility handler
  const [seePass, setSeePass] = useState(false);

  // FORM LOGIC

  // Form values on init
  const initForm = {
    email: "",
    pwd: ""
  };

  // Validation function
  const validationsForm = (form, name) => {
    const validationTypes = {
      email: "email",
      pwd: "password"
    };
    const type = validationTypes[name];
    let error;
    const REGEMAIL = /^(\w+[/./-]?){1,}@[a-z]+[/.]\w{2,}$/;
    const REGPWD = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!$%@.]).{8,24}$/;

    // If no info
    if (!form[name]?.trim()) {
      error = "El campo es requerido.";
      return error;
    }

    switch (type) {
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
      default:
        console.log("Validación no prevista para el campo ", name, "del tipo ", type);
    }
    return error;
  };

  // Api Call Function
  const apicall = () => {
    return apiAuth.post("/api/auth/login", {
      email: form.email,
      password: form.pwd
    });
  };

  // On success of submit
  const onSuccess = response => {
    console.log(response);
    // Setting auth value to context or redux
    const token = response?.data?.accessToken;
    const id = response?.data?.id;
    const role = response?.data?.role;
    setAuth({ user: { id, role }, token });
    // Redirection
    emailRef.current.focus();
    navigate(from, { replace: true }); // redirect to last location
  };

  // On error of submit form
  const onError = error => {
    let errMsg;
    switch (error) {
      case 400:
        errMsg = "Falta indicar el email o el password.";
        break;
      case 401:
        errMsg = "El email o el password no son correctos";
        break;
      default:
        errMsg = "Se ha producido un error. Inténtelo de nuevo o contacte con administración";
    }
    return errMsg;
  };

  // Form handler
  const { form, errors, handleChange, handleBlur, handleSubmit } = useForm(
    initForm,
    validationsForm,
    apicall,
    onSuccess,
    onError
  );

  // GOOGLE LOGIN
  function handleCallbackResponse(response) {
    const userObject = jwtDecode(response.credential);
    setUser(userObject);
  }

  useEffect(() => {
    const widthView = window.innerWidth <= 360 ? 200 : 305;
    const sizes = window.innerWidth <= 360 ? "medium" : "large";
    /* global google */
    google.accounts.id.initialize({
      client_id: "416379331606-68jrqo6sg4mdv0q7g4l7mj2msvc4q628.apps.googleusercontent.com",
      callback: handleCallbackResponse
    });

    google.accounts.id.renderButton(document.getElementById("signInDiv"), {
      theme: "outline",
      size: sizes,
      width: widthView,
      height: 40
    });
  }, []);

  return (
    <section className={classes.myForm}>
      <div className={classes.myForm_wrapper}>
        <h1>Iniciar Sesión</h1>
        <form onSubmit={handleSubmit}>
          <div className={classes.myForm_holder}>
            <div className={classes.myForm_control}>
              <div className={classes.myForm_control_group}>
                <label htmlFor="emailLogin">
                  <FontAwesomeIcon icon={faEnvelope} />
                </label>
                <input
                  id="emailLogin"
                  type="email"
                  name="email"
                  ref={emailRef}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={form.email}
                  placeholder="Correo Electrónico"
                  required
                />
              </div>
              {errors?.email && <p className={classes.instructions}>{errors.email}</p>}
            </div>

            <div className={classes.myForm_control}>
              <div className={classes.myForm_control_group}>
                <label htmlFor="passwordLogin">
                  <FontAwesomeIcon icon={faLock} />
                </label>
                <span>
                  <input
                    id="passwordLogin"
                    type={seePass ? "text" : "password"}
                    name="pwd"
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
          <div className={classes.myForm_actions}>
            <button type="submit" className={classes.myForm_actions_link}>
              Ingresar
            </button>
            <p className={classes.myForm_actions_separator}> o </p>
            <div id="signInDiv"></div>
            <p className={classes.myForm_actions_remember}>
              ¿Has olvidado tu contraseña?
              <Link to="/recoverPass">Recuperar</Link>
            </p>
            <p className={classes.myForm_actions_text}>Todavía no tienes cuenta?</p>
            <Link className={classes.myForm_actions_link} to="/register">
              Regístrate
            </Link>
          </div>
        </form>
      </div>
    </section>
  );
};

export default LoginForm;
