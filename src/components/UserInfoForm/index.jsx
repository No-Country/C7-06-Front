import classes from "./UserInfoForm.module.sass";
import { useState } from "react";
import { useForm } from "../../hooks/useForm";
import { apiUser } from "../../helpers/axios";

const UserInfoForm = () => {
  const [user] = useState({
    avatar: "/persons/user1.jpg",
    name: "Jane",
    lastname: "Doe",
    email: "janedoe@gmail.com",
    phone: "+33 565458111",
    place: "Paris",
    userId: 1
  });

  // Form values on init
  const initForm = {
    file: null,
    avatar: user.avatar,
    name: user.name,
    lastName: user.lastname,
    email: user.email,
    phone: user.phone,
    place: user.place
  };

  // Form validation function
  const validationsForm = (form, name, val) => {
    const validationTypes = {
      avatar: "path",
      email: "email",
      name: "name",
      lastname: "name",
      phone: "phone",
      place: "name"
    };

    const type = validationTypes[name];
    let error;
    const REGNAME = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/;
    const REGEMAIL = /^(\w+[/./-]?){1,}@[a-z]+[/.]\w{2,}$/;
    const REGPHONE = /^(\+\d{1,3}( )?)?((\(\d{1,3}\))|\d{1,3})[- .]?\d{3,4}[- .]?\d{4}$/;
    const REGPATH = /^[A-Za-z0-9.:/]+[(".jpg")(".png")("webp")]$/;
    const REGADDRES = /[\w',-\\/.\s]/;

    // If no info
    if (!form[name]?.trim()) {
      error = "El campo es requerido.";
      return error;
    }

    switch (type) {
      case "name":
        if (!REGNAME.test(form[name].trim())) {
          error = "Sólo se admiten caracteres";
        } else {
          error = false;
        }
        return error;

      case "email":
        if (!REGEMAIL.test(form[name].trim())) {
          error = "Debes introducir un email. Ejemplo: joedoe@email.com";
        } else {
          error = false;
        }
        return error;

      case "phone":
        if (!REGPHONE.test(form[name].trim())) {
          error = "Debes introducir un teléfono";
        } else {
          error = false;
        }
        return error;

      case "place":
        if (!REGADDRES.test(form[name].trim())) {
          error = "Debes introducir una dirección válida";
        } else {
          error = false;
        }
        return error;

      case "path":
        if (!REGPATH.test(val.name.trim())) {
          error = "Solo se admiten los formatos jpg, png y webp";
        } else if (val.size > 5000000) {
          error = "El archivo no puede ser de mas de 5mb";
        } else {
          error = false;
        }
        return error;

      default:
        console.log("Validación no prevista para el campo ", name, "del tipo ", type);
        return error;
    }
  };

  // Api Call Function
  const apicall = () => {
    return apiUser.put(`/api/users/$userId/update'`, form);
  };

  // Form handler
  const { form, errors, handleChange, handleBlur, handleFiles, handleSubmit } = useForm(
    initForm,
    validationsForm,
    apicall
  );

  // On success

  // On Error

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
                  name="lastname"
                  placeholder="Apellido"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={form.lastname}
                />
                {errors?.lastname && <p className={classes.instructions}>{errors.lastname}</p>}
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
                name="place"
                placeholder="Lugar de residencia"
                onBlur={handleBlur}
                onChange={handleChange}
                value={form.place}
              />
              {errors?.place && <p className={classes.instructions}>{errors.place}</p>}
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
