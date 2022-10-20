import classes from "./LoginForm.module.sass";
import { useRef, useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useForm } from "../../hooks/useForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEyeSlash, faEye, faLock, faEnvelope } from "@fortawesome/free-solid-svg-icons";
// import { getUserLogin } from "../../Redux/slices/auth";
import { useDispatch, useSelector } from "react-redux";
import { userLogin, userLoginGoogle } from "../../Redux/slices/auth/authAction";
import { regexConditions } from "../../helpers/regexs";

const LoginForm = () => {
  // User from context
  const { userToken, success, error } = useSelector(state => state.auth); // leer los datos de la store
  const dispatch = useDispatch(); // llamar funcion para actualizar estado
  // Navigate handler
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/"; // Get where user came from

  useEffect(() => {
    console.log("success", success);
    if (success && userToken) {
      // extraer datos de usuario
      navigate("/account");
    } else if (userToken) {
      // extraer datos de usuario
      emailRef.current.focus();
      navigate(from, { replace: true });
    } else if (error) {
      alert(`No se ha podido loguear. Error: ${error}`);
    }
  }, [success, userToken, error]);

  // Referencies
  const emailRef = useRef();

  // Password visibility handler
  const [seePass, setSeePass] = useState(false);

  // FORM LOGIC

  // Form values on init
  const initForm = {
    data: {
      email: {
        initVal: "",
        validation: [
          {
            condition: val => regexConditions("email").test(val),
            error: "Debe tener un formato email válido. Ejemplo: joeDoe@mail.com"
          }
        ],
        required: true
      },
      pwd: {
        initVal: "",
        validation: [
          {
            condition: val => regexConditions("passwordHard").test(val),
            error:
              "La contraseña debe tener de 8 a 28 caracteres, al menos 1 mayúsucla, 1 minúsucla, un número y un signo ./*-"
          }
        ],
        required: true
      }
    },
    apicall: () => {
      return dispatch(userLogin({ email: form.email, password: form.pwd }));
    }
  };

  // Form handler
  const { form, errors, handleChange, handleBlur, handleSubmit } = useForm(initForm);

  // GOOGLE LOGIN
  function handleCallbackResponse(response) {
    return dispatch(
      userLoginGoogle({
        token: response.credential
      })
    );
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
                  autoComplete="email"
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
                    autoComplete="password"
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
