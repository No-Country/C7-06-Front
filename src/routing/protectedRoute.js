// ProtectedRoute.js
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { Forbidden401 } from "../pages";

const ProtectedRoute = () => {
  const { userLogged } = useSelector(state => state.auth);
  // show unauthorized screen if no user is found in redux store
  if (!userLogged) {
    return <Forbidden401 />;
  }
  // returns child route elements
  return <Outlet />;
};
export default ProtectedRoute;
