import classes from "./ChangePassForm.module.sass";
import { useForm } from "../../hooks/useForm";
import { regexConditions } from "../../helpers/regexs";
import { useDispatch, useSelector } from "react-redux";
import { modifyUserInfo } from "../../Redux/slices/user/userAction";

const ChangePassForm = () => {
  const { userInfo } = useSelector(state => state.user);
  const dispatch = useDispatch();

  const initForm = {
    data: {
      pwdActual: {
        initVal: "",
        required: true
      },
      password: {
        initVal: "",
        validation: [
          {
            condition: val => regexConditions("passwordHard").test(val),
            error:
              "La contraseña debe tener de 8 a 28 caracteres, al menos 1 mayúsucla, 1 minúsucla, un número y un signo ./*-"
          }
        ],
        required: true
      },
      passConfirm: {
        initVal: "",
        validation: [
          {
            condition: val => val && val === form?.password,
            error: "Las contraseñas no coinciden."
          }
        ],
        required: true
      },
      apicall: () => {
        return dispatch(
          modifyUserInfo({
            userId: userInfo.id,
            userObject: { oldpassword: form.pwdActual, password: form.password }
          })
        );
      }
    }
  };

  // Form handler
  const { form, errors, handleChange, handleBlur, handleSubmit } = useForm(initForm);

  return (
    <div className={classes.form}>
      <h3>Configuración de la contraseña</h3>
      <form onSubmit={handleSubmit}>
        <div className={classes.form_wrapper}>
          <div>
            <div className={classes.form_group}>
              <input
                name="pwdActual"
                type="password"
                placeholder="Contraseña actual"
                onBlur={handleBlur}
                onChange={handleChange}
                value={form.pwdActual}
              />
              {errors?.pwdActual && <p className={classes.instructions}>{errors.pwdActual}</p>}
            </div>
            <div className={classes.form_group}>
              <input
                name="password"
                type="password"
                placeholder="Nueva contraseña"
                onBlur={handleBlur}
                onChange={handleChange}
                value={form.password}
              />
              {errors?.password && <p className={classes.instructions}>{errors.password}</p>}
            </div>
            <div className={classes.form_group}>
              <input
                name="passConfirm"
                type="password"
                placeholder="Confirmar la nueva contraseña"
                onChange={handleChange}
                onInput={handleBlur}
                value={form.passConfirm}
              />
              {errors?.passConfirm && <p className={classes.instructions}>{errors.passConfirm}</p>}
            </div>
          </div>
        </div>
        <button type="submit" className={classes.form_submit}>
          Guardar
        </button>
      </form>
    </div>
  );
};

export default ChangePassForm;
