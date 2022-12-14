import classes from "./RegisterForm.module.sass";
import { useRef, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "../../hooks/useForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEyeSlash, faEye, faUser, faLock, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { regexConditions } from "../../helpers/regexs";
import { useDispatch, useSelector } from "react-redux";
import { registerUser, userLoginGoogle } from "../../Redux/slices/auth/authAction";

const RegisterForm = () => {
  // States
  const [seePass, setSeePass] = useState(false);

  const { userLogged, success } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    // redirect user to login page if registration was successful
    if (success) {
      navigate("/login");
    }
    // redirect authenticated user to profile screen
    if (userLogged) {
      navigate("/account");
    }
  }, [userLogged, success]);

  // Referencies
  const emailRegRef = useRef();

  // Form values on init
  const initForm = {
    data: {
      email: {
        initVal: "",
        required: true,
        validation: [
          {
            condition: val => regexConditions("email").test(val),
            error: "Usar un formato de email válido. Ej: joedoe@mail.com"
          }
        ]
      },
      name: {
        initVal: "",
        required: true,
        validation: [
          {
            condition: val => regexConditions("name").test(val),
            error: "No se aceptan caracteres numéricos"
          }
        ]
      },
      surname: {
        initVal: "",
        required: true,
        validation: [
          {
            condition: val => regexConditions("name").test(val),
            error: "No se aceptan caracteres numéricos"
          }
        ]
      },
      pwd: {
        initVal: "",
        required: true,
        validation: [
          {
            condition: val => regexConditions("passwordHard").test(val),
            error:
              "La contraseña debe tener de 8 a 28 caracteres, al menos 1 mayúsucla, 1 minúsucla, un número y un signo ./*-"
          }
        ]
      },
      conditions: {
        initVal: false,
        validation: [
          {
            condition: val => val === false,
            error: "Debes aceptar los términos y condiciones"
          }
        ]
      }
    },
    apicall: () => {
      return dispatch(
        registerUser({
          name: form.name,
          surname: form.surname,
          email: form.email,
          password: form.pwd
        })
      );
    }
  };

  // Form Handler
  const { form, errors, handleChange, handleCheck, handleBlur, handleSubmit } = useForm(initForm);

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
                  <label htmlFor="surname">
                    <FontAwesomeIcon icon={faUser} />
                  </label>
                  <input
                    id="surname"
                    name="surname"
                    type="text"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={form.surname}
                    placeholder="Apellido"
                    autoComplete="off"
                    required
                  />
                </div>
                {errors?.surname && <p className={classes.instructions}>{errors.surname}</p>}
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
                onChange={handleCheck}
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
