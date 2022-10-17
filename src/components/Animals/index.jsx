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
        const response = await apiPub.get(`/petsByAnimalType?animal=${type}`, {
          signal: controller.signal
        });

        if (isMounted) {
          if (type === "CAT") {
            const catsLoaded = response.data.petCardResponses;
            console.log("cat ", catsLoaded);
            setCats(catsLoaded);
            setLoadingCat(false);
          } else if (type === "DOG") {
            const dogsLoaded = response.data.petCardResponses;
            console.log("dog ", dogsLoaded);
            setDogs(dogsLoaded);
            setLoadingDog(false);
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
              ) : (
                dogs.map(dog => <Card key={dog.id} animal={dog} />)
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
              ) : (
                cats.map(cat => <Card key={cat.id} animal={cat} />)
              )}
            </>
          )}
        </div>
      </section>
    </>
  );
};
export default Animals;
