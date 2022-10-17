// ProtectedRoute.js
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { Forbidden401 } from "../pages";

const ProtectedRoute = () => {
  const { userInfo } = useSelector(state => state.auth);
  console.log("userInfo=", userInfo);
  // show unauthorized screen if no user is found in redux store
  if (!userInfo) {
    return <Forbidden401 />;
  }
  // returns child route elements
  return <Outlet />;
};
export default ProtectedRoute;
