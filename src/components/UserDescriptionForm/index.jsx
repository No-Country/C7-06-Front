import classes from "./UserDescriptionForm.module.sass";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { modifyUserInfo } from "../../Redux/slices/user/userAction";
import Swal from "sweetalert2";

const UserDescriptionForm = () => {
  const { userInfo } = useSelector(state => state.user);
  const [characteres, setCharacteres] = useState(500 - userInfo.description?.length || 500);
  const [description, setDescription] = useState(userInfo.description || "");
  const [errors, setErrors] = useState(false);
  const dispatch = useDispatch();

  const handleInput = e => {
    if (e.target.length > 500) {
      setErrors("Solo se admiten hasta 500 caracteres.");
    } else {
      setErrors(false);
      setDescription(e.target.value);
      setCharacteres(500 - e.target.value.length);
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (description.length <= 500) {
      dispatch(modifyUserInfo({ userId: userInfo.id, userObject: { description } }));
      Swal.fire({
        icon: "success",
        title: "¡Perfecto!",
        text: "Tu descripción ha sido actualizada."
      });
      setErrors(false);
    } else {
      setErrors("No se aceptan descripciones de mas de 500 caracteres");
    }
  };

  return (
    <div className={classes.form}>
      <h3>Acerca de mí</h3>
      <form onSubmit={handleSubmit}>
        <div className={classes.form_wrapper}>
          <p>Cuentanos sobre tí y tus mascotas publicadas en Animatch.</p>
          <div className={classes.form_group}>
            <textarea
              name="description"
              placeholder="Escribe aquí..."
              onInput={handleInput}
              value={description}
            />
            <p>
              <span>{characteres} caracteres restantes.</span>
            </p>
            {errors?.description && <p className={classes.instructions}>{errors.description}</p>}
          </div>
        </div>
        <button type="submit" className={classes.form_submit}>
          Guardar
        </button>
      </form>
    </div>
  );
};

export default UserDescriptionForm;
