import classes from "./UserInfoForm.module.sass";
import { useForm } from "../../hooks/useForm";
import { regexConditions } from "../../helpers/regexs";
import { useDispatch, useSelector } from "react-redux";
import avatar from "../../assets/userDefault.png";
import { modifyUserInfo } from "../../Redux/slices/user/userAction";

const UserInfoForm = () => {
  const { userInfo } = useSelector(state => state.user);
  const dispatch = useDispatch();

  const initForm = {
    data: {
      file: {
        initVal: null
      },
      avatar: {
        initVal: userInfo.picture,
        validation: [
          // {
          // condition: val => !val || regexConditions("path").test(val?.path),
          // error: "Sólo acepta formatos jpg, png, y webp."
          // },
          {
            condition: val => !val || val.size <= 5000000,
            error: "Sólo acepta archivos de menos de 5GB"
          }
        ]
      },
      name: {
        initVal: userInfo.name,
        validation: [
          {
            condition: val => regexConditions("name").test(val),
            error: "No se aceptan caracteres numéricos"
          }
        ],
        required: true
      },
      surname: {
        initVal: userInfo.surname,
        required: true,
        validation: [
          {
            condition: val => regexConditions("name").test(val),
            error: "No se aceptan caracteres numéricos"
          }
        ]
      },
      email: {
        initVal: userInfo.email,
        required: true,
        validation: [
          {
            condition: val => regexConditions("email").test(val),
            error: "Usar un formato de email válido. Ej: joedoe@mail.com"
          }
        ]
      },
      phone_number: {
        initVal: userInfo.phone_number || "",
        validation: [
          {
            condition: val => !val || regexConditions("phone").test(val),
            error: "Usar un formato de número de teléfono"
          }
        ]
      },
      address: {
        initVal: userInfo.address || "",
        validation: [
          {
            condition: val => !val || regexConditions("address").test(val),
            error: "Escribe una dirección válida"
          }
        ]
      }
    },
    apicall: () => {
      return dispatch(modifyUserInfo({ userId: userInfo.id, userObject: form }));
    },
    noreset: true
  };

  // Form handler
  const { form, errors, handleChange, handleBlur, handleFiles, handleSubmit } = useForm(initForm);

  return (
    <div className={classes.form}>
      <h3>Información Básica</h3>
      <form onSubmit={handleSubmit}>
        <div className={classes.form_wrapper}>
          <div className={classes.form_avatar}>
            <div className={classes.form_avatar_image}>
              <img src={form.file || form.avatar || avatar} alt={"nombre persona"} />
            </div>
            <div className={classes.form_avatar_editButton}>
              <label htmlFor="avatar">Editar</label>
              <input
                id="avatar"
                name="avatar"
                onChange={handleFiles}
                type="file"
                value={form.files}
                hidden
              />
              {errors?.avatar && <p className={classes.instructions}>{errors.avatar}</p>}
            </div>
          </div>
          <div className={classes.form_info}>
            <div className={classes.form_info_name}>
              <div>
                <input
                  name="name"
                  placeholder="Nombre"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={form.name}
                />
                {errors?.name && <p className={classes.instructions}>{errors.name}</p>}
              </div>
              <div>
                <input
                  name="surname"
                  placeholder="Apellido"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={form.surname}
                />
                {errors?.surname && <p className={classes.instructions}>{errors.surname}</p>}
              </div>
            </div>
            <div>
              <input
                name="email"
                placeholder="Correo Electrónico"
                onBlur={handleBlur}
                onChange={handleChange}
                value={form.email}
              />
              {errors?.email && <p className={classes.instructions}>{errors.email}</p>}
            </div>
            <div>
              <input
                name="phone_number"
                placeholder="Teléfono"
                onBlur={handleBlur}
                onChange={handleChange}
                value={form.phone_number}
              />
              {errors?.phone_number && (
                <p className={classes.instructions}>{errors.phone_number}</p>
              )}
            </div>
            <div>
              <input
                name="address"
                placeholder="Lugar de residencia"
                onBlur={handleBlur}
                onChange={handleChange}
                value={form.address}
              />
              {errors?.address && <p className={classes.instructions}>{errors.address}</p>}
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

export default UserInfoForm;
