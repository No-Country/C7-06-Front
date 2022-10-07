import { Navbar, UserBanner, Footer } from "../components";
import UserInfo from "../components/UserInfo";
const UserProfile = () => {
  return (
    <div>
      <Navbar />
      <UserBanner />
      <UserInfo />
      <Footer />
    </div>
  );
};
export default UserProfile;
