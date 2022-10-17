import classes from "./styles/Layout.module.sass";
import { Outlet } from "react-router-dom";
import { Navbar, Footer, Spinner } from "../components";
import { useEffect } from "react";

const Layout = () => {
  const loading = false;
  useEffect(() => {}, []);
  return (
    <div className={classes.container}>
      {loading ? (
        <Spinner className={classes.spinner} />
      ) : (
        <>
          <Navbar />
          <main className={classes.main}>
            <Outlet />
          </main>
          <Footer />
        </>
      )}
    </div>
  );
};

export default Layout;
