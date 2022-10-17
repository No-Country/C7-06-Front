import { PetInfoCard, PetBanner, CommentsPetsList } from "../components";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
// import petMock from "../data/petprofilemock.json";
import classes from "./styles/PetProfile.module.sass";
import catMobile from "../assets/perfil_mascotas_gato_mobile.webp";
import catDesktop from "../assets/perfil_mascotas_gato_desktop.webp";
import dogMobile from "../assets/perfil_mascotas_perro_mobile.webp";
import dogDesktop from "../assets/perfil_mascotas_perro_desktop.webp";
import { apiPub } from "../helpers/axios";

const PetProfile = () => {
  // User Logged
  // --> recover user logged from context;

  // Determinate Profile Pet Id
  const params = useParams();
  const navigate = useNavigate();
  const petId = parseInt(params.id);
  const [pet, setPet] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  // const [notMyPet, setNotMyProfile] = useState(auth.user.id !== profileId.user.id);

  // Load Pet by Id
  useEffect(() => {
    // const animals = [...petMock];
    // const petObj = animals.filter(animals => animals.id === petId)[0];
    // if (petObj) {
    //  setPet(petObj);
    // } else {
    //  console.log("No hay ninguna mascota con ese Id");
    // }
    // setIsLoading(false);
    let isMounted = true;
    const controller = new AbortController();

    const getPet = async () => {
      try {
        const response = await apiPub.get(`/pets/${petId}`, {
          signal: controller.signal
        });

        if (isMounted) {
          // Stock data
          console.log(response.data);
          setPet(response.data);
          setIsLoading(false);
        }
      } catch (err) {
        console.log(err);
        if (err.response?.status === 404) {
          navigate("/404", { replace: true }); // redirect to last location);
        }
      }
    };
    getPet();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  return (
    <>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <>
          {pet.type === "cat" ? (
            <PetBanner
              text="Gato"
              images={{
                mobile: { src: catMobile, size: 500 },
                desktop: { src: catDesktop, size: 1920 }
              }}
              className={classes.overlay}
            />
          ) : (
            <PetBanner
              text={"Perro"}
              image={{
                mobile: { src: dogMobile, size: 2412 },
                desktop: { src: dogDesktop, size: 3013 }
              }}
              className={classes.overlay}
            />
          )}
          <section className={classes.infoPet}>
            <PetInfoCard pet={pet} />
          </section>
          <section className={classes.comments}>
            <CommentsPetsList petId={pet.id} />
          </section>
        </>
      )}
    </>
  );
};
export default PetProfile;
