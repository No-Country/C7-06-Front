import classes from "./UserInfoForm.module.sass";
import { useState } from "react";
import { useForm } from "../../hooks/useForm";
import { apiUser } from "../../helpers/axios";
import { regexConditions } from "../../helpers/regexs";

const UserInfoForm = () => {
  const [user] = useState({
    avatar: "/persons/user1.jpg",
    name: "Jane",
    surname: "Doe",
    email: "janedoe@gmail.com",
    phone: "+33 565458111",
    address: "Paris",
    userId: 1
  });

  const initForm = {
    data: {
      file: {
        initVal: null
      },
      avatar: {
        initVal: user.avatar,
        validation: [
          {
            condition: val => regexConditions("path").test(val.name),
            error: "Sólo acepta formatos jpg, png, y webp."
          },
          {
            condition: val => val.size <= 5000000,
            error: "Sólo acepta archivos de menos de 5GB"
          }
        ]
      },
      name: {
        initVal: user.name,
        validation: [
          {
            condition: val => regexConditions("name").test(val),
            error: "No se aceptan caracteres numéricos"
          }
        ]
      },
      surname: {
        initVal: user.surname,
        validation: [
          {
            condition: val => regexConditions("name").test(val),
            error: "No se aceptan caracteres numéricos"
          }
        ]
      },
      email: {
        initVal: user.email,
        required: true,
        validation: [
          {
            condition: val => regexConditions("email").test(val),
            error: "Usar un formato de email válido. Ej: joedoe@mail.com"
          }
        ]
      },
      phone: {
        initVal: user.phone,
        validation: [
          {
            condition: val => regexConditions("phone").test(val),
            error: "Usar un formato de número de teléfono"
          }
        ]
      },
      address: {
        initVal: user.address,
        validation: [
          {
            condition: val => regexConditions("address").test(val),
            error: "Escribe una dirección válida"
          }
        ]
      }
    },
    apicall: () => {
      return apiUser.put(`/api/users/$userId/update'`, form);
    },
    onSuccess: () => {},
    onError: () => {}
  };

  // Api Call Function
  const apicall = () => {};

  // Form handler
  const { form, errors, handleChange, handleBlur, handleFiles, handleSubmit } = useForm(
    initForm,
    apicall
  );

  return (
    <div className={classes.form}>
      <h3>Información Básica</h3>
      <form onSubmit={handleSubmit}>
        <div className={classes.form_wrapper}>
          <div className={classes.form_avatar}>
            <div className={classes.form_avatar_image}>
              <img src={form.file || form.avatar} alt={"nombre persona"} />
            </div>
            <div className={classes.form_avatar_editButton}>
              <label htmlFor="avatar">Editar</label>
              <input id="avatar" name="avatar" onChange={handleFiles} type="file" hidden />
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
                name="phone"
                placeholder="Teléfono"
                onBlur={handleBlur}
                onChange={handleChange}
                value={form.phone}
              />
              {errors?.phone && <p className={classes.instructions}>{errors.phone}</p>}
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
