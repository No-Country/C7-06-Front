import { useState, useEffect } from "react";
import { Card, Spinner } from "../../components";
// import dogsMock from "../../data/dogsmock.json";
// import catsMock from "../../data/catsmock.json";
import styles from "./Animals.module.sass";
import { Link } from "react-router-dom";
import { apiPub } from "../../helpers/axios";

const Animals = () => {
  const [dogs, setDogs] = useState([]);
  const [loadingDog, setLoadingDog] = useState(true);
  const [errorDog, setErrorDog] = useState(false);
  const [cats, setCats] = useState([]);
  const [loadingCat, setLoadingCat] = useState(true);
  const [errorCat, setErrorCat] = useState(false);

  useEffect(() => {
    // comentar aquí una vez que funcione la api
    // https://dog.ceo/api/breeds/image/random
    // setDogs(dogsMock);
    // setCats(catsMock);
    // setLoadingDog(false);
    // setLoadingCat(false);
    // setErrorDog(false);
    // setErrorCat(false);

    // descomentar aquí una vez que funcione la api
    let isMounted = true;
    const controller = new AbortController();

    const getPets = async type => {
      try {
        const response = await apiPub.get(`/filteredPets?animal=${type}`, {
          signal: controller.signal
        });

        if (isMounted) {
          if (type === "CAT") {
            const catsLoaded = response.data.petCardResponses;
            console.log("cat ", catsLoaded);
            setCats(catsLoaded);
            setLoadingCat(false);
            setErrorCat(false);
          } else if (type === "DOG") {
            const dogsLoaded = response.data.petCardResponses;
            console.log("perror ", dogs && dogsLoaded.lenght > 0);
            console.log("dog ", dogsLoaded);
            setDogs(dogsLoaded);
            setLoadingDog(false);
            setErrorDog(false);
          } else {
            console.log("Not a category");
          }
        }
      } catch (err) {
        console.log(`"ERROR": ${err.message}`);
        setLoadingCat(false);
        setLoadingDog(false);
        if (type === "CAT") {
          setErrorCat(true);
        } else if (type === "DOG") {
          setErrorDog(true);
        }
      }
    };

    getPets("CAT");
    getPets("DOG");

    // if unmounted component
    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  return (
    <>
      <section className={styles.animalSection}>
        <h2 className={styles.animalSection__title}>Perros</h2>
        <Link to="/search" className={styles.more}>
          Ver más
        </Link>
        <div className={styles.animalSection__container}>
          {loadingDog ? (
            <Spinner />
          ) : (
            <>
              {errorDog ? (
                <p>Se ha producido une error, por favor intente recargar la página.</p>
              ) : dogs && dogs.lenght > 0 ? (
                dogs.map(dog => <Card key={dog.id} animal={dog} />)
              ) : (
                <p> No hay masotas para mostrar.</p>
              )}
            </>
          )}
        </div>
      </section>

      <section className={styles.animalSection}>
        <h2 className={styles.animalSection__title}>Gatos</h2>
        <Link to="/search" className={styles.more}>
          Ver más
        </Link>
        <div className={styles.animalSection__container}>
          {loadingCat ? (
            <Spinner />
          ) : (
            <>
              {errorCat ? (
                <p>Se ha producido un error, por favor intente recargar la página.</p>
              ) : cats && cats.lenght > 0 ? (
                cats.map(cat => <Card key={cat.id} animal={cat} />)
              ) : (
                <p>No hay mascotas para mostrar</p>
              )}
            </>
          )}
        </div>
      </section>
    </>
  );
};
export default Animals;
