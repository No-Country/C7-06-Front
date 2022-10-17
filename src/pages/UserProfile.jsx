import { PetBanner } from "../components";
import UserInfo from "../components/UserInfo";
import mobileBanner from "../assets/perfil_usuarios_mobile.webp";
import desktopBanner from "../assets/perfil_usuarios_desktop.webp";

const UserProfile = () => {
  return (
    <div>
      <PetBanner
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
