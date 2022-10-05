import styles from "./Filter.module.sass";
import Navbar from "../Navbar";
import bannerFilter from "../../assets/gatoFilter.png";
import PropTypes from "prop-types";
import catsMock from "../../data/catsmock.json";
import { useEffect, useState } from "react";

const Filter = () => {
  const [cats, setCats] = useState([]);
  console.log("gatos", cats);
  useEffect(() => {
    // https://dog.ceo/api/breeds/image/random
    setCats(catsMock);
  }, []);

  return (
    <div>
      <Navbar />
      <div className={styles.container}>
        <img src={bannerFilter} />
      </div>
      <div className={styles.containerLeftRight}>
        <div className={styles.rightSide}>
          <h3>Posibles animatch</h3>
          {cats &&
            cats.map((cat, index) => {
              return (
                <div className={styles.card} key={index}>
                  <div className={styles.card__img}>
                    <img src={`/animals/${cat?.picture}`} alt={cat?.name} />
                  </div>
                  <div className={styles.card__content}>
                    <h3 className={styles.card__title}>{cat?.name}</h3>
                    <div className={styles.card__text}>
                      <ul>
                        <li>
                          <span>Raza:</span> {cat?.raza}
                        </li>
                        <li>
                          <span>Sexo:</span> {cat?.sexo}
                        </li>
                        <li>
                          <span>Edad:</span> {cat?.age}
                        </li>
                      </ul>
                    </div>
                    {/* <button className={styles.card__btn}>Ver más</button> */}
                  </div>
                </div>
              );
            })}
        </div>
        <div className={styles.leftSide}>
          <h2 style={{ padding: "10px" }}>Mascota</h2>
          <div className={styles.perrogato}>
            <div className={styles.perro}>
              <input type="checkbox" />
              <h4>Perro</h4>
            </div>
            <div className={styles.gato}>
              <input type="checkbox" />
              <h4>Gato</h4>
            </div>
          </div>
          <h2 style={{ padding: "10px" }}>Sexo</h2>
          <div className={styles.machohembra}>
            <div className={styles.macho}>
              <input type="checkbox" />
              <h4>Macho</h4>
            </div>
            <div className={styles.hembra}>
              <input type="checkbox" />
              <h4>Hembra</h4>
            </div>
          </div>
          <h2 style={{ padding: "10px" }}>Edad</h2>
          <div className={styles.cachorrojoven}>
            <div className={styles.cachorro}>
              <input type="checkbox" />
              <h4>0 - 3 anos</h4>
            </div>
            <div className={styles.joven}>
              <input type="checkbox" />
              <h4>3 - 6 anos</h4>
            </div>
          </div>
          <div className={styles.adulto}>
            <input type="checkbox" />
            <h4>6 o mas anos</h4>
          </div>
          <div className={styles.inputText}>
            <input type="text" placeholder="Ingresa la raza" />
            <input type="text" placeholder="Ingresa la ciudad" />
            <button>Buscar</button>
          </div>
        </div>
      </div>
    </div>
  );
};

Filter.propTypes = {
  animal: PropTypes.object.isRequired
};

export default Filter;
