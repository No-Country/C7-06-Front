import classes from "./DeleteAccountForm.module.sass";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser } from "../../Redux/slices/user/userAction";

const DeleteAccountForm = () => {
  const { userLogged } = useSelector(state => state.auth);
  const { userInfo, success, error } = useSelector(state => state.user);
  const dispatch = useDispatch();

  const handleSubmit = e => {
    e.preventDefault();
    if (userLogged && userInfo.id) {
      dispatch(deleteUser({ id: userInfo.id }));
      if (success) {
        // logout if not admin not owner of account
      } else {
        alert("No se ha podido efectuar la operacion: ", error);
      }
    }
  };

  return (
    <div className={classes.form}>
      <h3>Eliminar cuenta</h3>

      <form onSubmit={handleSubmit}>
        <div className={classes.form_wrapper}>
          <div>
            <p>¿Seguro quieres eliminar tu cuenta de ANIMATCH?</p>
            <p>
              Al eliminar la cuenta se borrará la totalidad de los contenidos y datos asociados a
              ella.
            </p>
            <input type="number" name="DeleteAccount" defaultValue={`${userInfo.id}`} hidden />
            <button type="submit">Quiero eliminar mi cuenta.</button>
          </div>
        </div>
      </form>
    </div>
  );
};
export default DeleteAccountForm;
