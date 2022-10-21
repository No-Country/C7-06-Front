import { createContext, useState } from "react";
import PropTypes from "prop-types";

export const NavbarContext = createContext();

const NavbarProvider = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <NavbarContext.Provider value={[isMenuOpen, setIsMenuOpen]}>{children}</NavbarContext.Provider>
  );
};

NavbarProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export default NavbarProvider;
