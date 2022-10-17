import { PetBanner } from "../components";
import UserInfo from "../components/UserInfo";
import mobileBanner from "../assets/perfil_usuarios_mobile.webp";
import desktopBanner from "../assets/perfil_usuarios_desktop.webp";
import classes from "./styles/UserProfile.module.sass";
const UserProfile = () => {
  return (
    <div>
      <PetBanner
        className={classes.banner}
        text="Usuarios"
        images={{
          mobile: { src: mobileBanner, size: 3082 },
          desktop: { src: desktopBanner, size: 3232 }
        }}
      />
      <UserInfo />
    </div>
  );
};
export default UserProfile;
