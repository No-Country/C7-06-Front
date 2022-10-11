import classes from "./UserInfoForm.module.sass";
import { useState } from "react";
import { useForm } from "../../hooks/useForm";

const UserInfoForm = () => {
  const [urlImageLoaded, setUrlImageLoaded] = useState("/persons/user1.jpg"); // if url exists will storage url file
  const [file, setFile] = useState(); // if file is charged it will storage the file to send

  const [user] = useState({
    avatar: "/persons/user1.jpg",
    name: "Jane",
    lastname: "Doe",
    email: "janedoe@gmail.com",
    phone: "+33 565458111",
    place: "Paris",
    userId: 1,
    file
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
  const validationsForm = (form, name) => {
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
    const REGPHONE = /[0-9]/;

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

      case "path":
        if (!form[name].trim()) {
          error = "Solo se admiten los formatos jpg, png y webp de no mas de 1mb";
        } else {
          error = false;
        }
        return error;

      default:
        console.log("Validación no prevista para el campo ", name, "del tipo ", type);
        return error;
    }
  };

  // Form handler
  const { form, errors, handleChange, handleBlur, handleSubmit } = useForm(
    initForm,
    validationsForm
  );

  // Event Handler for Preview Image
  const changeAvatarHandler = e => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = function (e) {
        setUrlImageLoaded(e.target.result);
      };
      reader.readAsDataURL(e.target.files[0]);
      setFile(e.target.files[0]);
    } else {
      setUrlImageLoaded(false);
    }
  };

  return (
    <div className={classes.form}>
      <h3>Información Básica</h3>
      <form onSubmit={handleSubmit}>
        <div className={classes.form_wrapper}>
          <div className={classes.form_avatar}>
            <div className={classes.form_avatar_image}>
              <img src={urlImageLoaded} alt={"nombre persona"} />
            </div>
            <div className={classes.form_avatar_editButton}>
              <label htmlFor="avatar">Editar</label>
              <input id="avatar" name="avatar" onChange={changeAvatarHandler} type="file" hidden />
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
