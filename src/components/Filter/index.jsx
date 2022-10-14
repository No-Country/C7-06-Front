import styles from "./Filter.module.sass";
import bannerFilter from "../../assets/gatoFilter.png";
import PropTypes from "prop-types";
import catsMock from "../../data/catsmock.json";
import { useEffect, useState } from "react";
import Card from "../Card";

const Filter = () => {
  const [cats, setCats] = useState([]);
  console.log("gatos", cats);
  useEffect(() => {
    // https://dog.ceo/api/breeds/image/random
    setCats(catsMock);
  }, []);

  return (
    <div>
      <div className={styles.container}>
        <img src={bannerFilter} />
      </div>
      {/* Container GENERAL, LADO IZQUIERDP Y DERECHO */}
      <div className={styles.containerLeftRight}>
        {/* Container lado derecho */}
        <div className={styles.rightSide}>
          {/* Container de las cards 1 */}
          <div className={styles.firstCards}>
            <div className={styles.containerTitle}>
              <h3 className={styles.title}>Posibles animatch</h3>
            </div>
            {/* Container renderizado de animales CARDS */}
            <div className={styles.renderAnimals}>
              {cats &&
                cats.map(cat => {
                  return <Card key={cat.id} animal={cat} />;
                })}
            </div>
          </div>
          <div className={styles.secondCards}>
            {/* Container de las cards 2 */}
            <div className={styles.containerTitle}>
              <h3 className={styles.title}>Resultados de busqueda</h3>
            </div>
            {/* Container renderizado de animales CARDS */}
            <div className={styles.renderAnimals}>
              {cats &&
                cats.map(cat => {
                  return <Card key={cat.id} animal={cat} />;
                })}
            </div>
          </div>
        </div>
        {/* Container lado IZQUIERDO */}
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
              <h4>0 - 3 años</h4>
            </div>
            <div className={styles.joven}>
              <input type="checkbox" />
              <h4>3 - 6 años</h4>
            </div>
          </div>
          <div className={styles.adulto}>
            <input type="checkbox" />
            <h4>6 o mas años</h4>
          </div>
          <div className={styles.inputText}>
            <input className={styles.input1} type="text" placeholder="Ingresa la raza" />
            <input className={styles.input2} type="text" placeholder="Ingresa la ciudad" />
            <button className={styles.searchbar}>Buscar</button>
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
