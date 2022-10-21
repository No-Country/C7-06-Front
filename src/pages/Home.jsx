import { PetBanner, Intro, Animals, About } from "../components";
import homeMobil from "../assets/home_mobile.webp";
import homeDesktop from "../assets/home_desktop.webp";

const Home = () => {
  return (
    <div>
      <div>
        <PetBanner
          text="Encuentra al mejor compañero para tu mascota"
          images={{
            mobile: { src: homeMobil, size: 2207 },
            desktop: { src: homeDesktop, size: 3360 }
          }}
        />
        <Intro />
      </div>
      <Animals />
      <About />
    </div>
  );
};
export default Home;
