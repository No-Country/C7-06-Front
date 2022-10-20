import {
  UserInfoForm,
  Spinner,
  ChangePassForm,
  UserDescriptionForm,
  DeleteAccountForm
  // PetForm
} from "../components";
import { useSelector, useDispatch } from "react-redux";
import { getUserLogged } from "../Redux/slices/user/userAction";
import { useEffect } from "react";

const styles = {
  backgroundColor: "#f5f2ff"
};

const UserAccount = () => {
  const { userInfo, loading, error } = useSelector(state => state.user);
  const { userLogged } = useSelector(state => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!userInfo && !error) {
      dispatch(getUserLogged({ id: userLogged.id }));
    }
  }, [userInfo, error]);

  return (
    <>
      {loading ? (
        <Spinner />
      ) : error ? (
        <div>Se ha producido un error, intentarlo nuevamente mas tarde.</div>
      ) : (
        <div style={styles}>
          <UserInfoForm />
          <UserDescriptionForm />
          <ChangePassForm />
          <DeleteAccountForm />
          {/* <PetForm /> */}
        </div>
      )}
    </>
  );
};
export default UserAccount;
