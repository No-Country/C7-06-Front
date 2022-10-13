import { useState, useEffect } from "react";
import Card from "../Card";
import dogsMock from "../../data/dogsmock.json";
import catsMock from "../../data/catsmock.json";
import styles from "./Animals.module.sass";

const Animals = () => {
  const [dogs, setDogs] = useState([]);
  const [cats, setCats] = useState([]);
  useEffect(() => {
    // https://dog.ceo/api/breeds/image/random

    setDogs(dogsMock);
    setCats(catsMock);
  }, []);

  return (
    <>
      <section className={styles.animalSection}>
        <h2 className={styles.animalSection__title}>Perros</h2>
        <h3 className={styles.more}>Ver más</h3>
        <div className={styles.animalSection__container}>
          {dogs.map(dog => (
            <Card key={dog.id} animal={dog} />
          ))}
        </div>
      </section>

      <section className={styles.animalSection}>
        <h2 className={styles.animalSection__title}>Gatos</h2>
        <h3 className={styles.more}>Ver más</h3>
        <div className={styles.animalSection__container}>
          {cats.map(cat => (
            <Card key={cat.id} animal={cat} />
          ))}
        </div>
      </section>
    </>
  );
};
export default Animals;
