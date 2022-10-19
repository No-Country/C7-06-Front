import classes from "./DeleteAccountForm.module.sass";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser } from "../../Redux/slices/user/userAction";
import Swal from "sweetalert2";

const DeleteAccountForm = () => {
  const { userLogged } = useSelector(state => state.auth);
  const { userInfo, success, error } = useSelector(state => state.user);
  const dispatch = useDispatch();

  const alert = () => {
    Swal.fire({
      title: "Estas seguro?",
      text: "Esta accion es irreversible!",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#6342e8",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, borrala!"
    }).then(result => {
      if (result.value) {
        if (userLogged && userInfo.id) {
          dispatch(deleteUser({ id: userInfo.id }));
          localStorage.removeItem("userToken");
          Swal.fire("Cuenta eliminada exitosamente");
          setTimeout(() => {
            window.location.replace("/");
          }, 1500);
          if (success) {
            // logout if not admin not owner of account
          } else {
            Swal.fire("No se ha podido efectuar la operacion: ", error);
          }
        }
      }
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    alert();
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
            <button type="submit">Quiero eliminar mi cuenta</button>
          </div>
        </div>
      </form>
    </div>
  );
};
export default DeleteAccountForm;
