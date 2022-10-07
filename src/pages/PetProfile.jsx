import { Navbar, PetInfoCard, Footer, PetCategoryBanner, CommentsPetsList } from "../components";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import petMock from "../data/petprofilemock.json";
import classes from "./PetProfile.module.sass";
// import { useState } from "react";

const PetProfile = () => {
  // User Logged
  // --> recover user logged from context;

  // Determinate Profile Pet Id
  const params = useParams();
  const petId = parseInt(params.id);
  const [pet, setPet] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  // const [notMyPet, setNotMyProfile] = useState(auth.user.id !== profileId.user.id);

  // Load Pet by Id
  useEffect(() => {
    const animals = [...petMock];
    const petObj = animals.filter(animals => animals.id === petId)[0];
    if (petObj) {
      setPet(petObj);
    } else {
      console.log("No hay ninguna mascota con ese Id");
    }
    setIsLoading(false);
  }, []);

  return (
    <>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <>
          <Navbar />
          <PetCategoryBanner category={pet.type} />
          <section className={classes.infoPet}>
            <PetInfoCard pet={pet} />
          </section>
          <section className={classes.comments}>
            <CommentsPetsList />
          </section>
          <Footer />
        </>
      )}
    </>
  );
};
export default PetProfile;
