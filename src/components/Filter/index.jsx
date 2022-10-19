import styles from "./Filter.module.sass";
import desktopBanner from "../../assets/buscador_desktop.webp";
import mobileBanner from "../../assets/buscador_mobile.webp";
import { useEffect, useState } from "react";
import { Card, PetBanner, Spinner } from "../../components";
import { apiPrivate, apiPub } from "../../helpers/axios";

const Filter = () => {
  const [callbacks, setCallbacks] = useState({
    firstCallError: false,
    secondCallError: false,
    firstCallData: {
      lastPage: false,
      pageNumber: 0,
      totalElements: 0,
      totalPages: 0,
      content: []
    },
    secondCallData: {
      lastPage: false,
      pageNumber: 0,
      totalElements: 0,
      totalPages: 0,
      content: []
    },
    firstCallLoading: false,
    secondCallLoading: false,
    firstCallResultsEmpty: false,
    secondCallResultsEmpty: false
  });
  const [filteredPetsParams, setFilteredPetsParams] = useState({
    animal: "",
    gender: "",
    startAge: "",
    endAge: "",
    race: "",
    location: "",
    pageNumber: 0
  });

  useEffect(() => {
    loadSuggestedPets();
    loadFilteredPets();
  }, []);

  const handleChangeParam = e => {
    setFilteredPetsParams(prevParams => ({ ...prevParams, [e.target.name]: e.target.value }));
  };

  const handleChangeAgeRange = e => {
    const range = e.target.value.split("-");
    setFilteredPetsParams(prevParams => ({ ...prevParams, startAge: range[0], endAge: range[1] }));
  };

  const handleSearch = e => {
    loadFilteredPets();
  };

  const buildFilteredPetsEndpoint = params => {
    let endpoint = "/filteredPets";
    const keyParams = Object.keys(filteredPetsParams).filter(
      param => filteredPetsParams[param] !== "" && param !== "pageNumber"
    );

    if (keyParams.length > 0) endpoint += "?";

    keyParams.forEach((param, index) => {
      if (index + 1 !== keyParams.length) {
        endpoint += param + "=" + params[param] + "&";
      } else {
        endpoint += param + "=" + params[param];
      }
    });

    return endpoint;
  };

  const loadSuggestedPets = () => {
    setCallbacks(prevCallbacks => ({ ...prevCallbacks, firstCallLoading: true }));
    apiPrivate
      .get("/suggestedPets")
      .then(response => {
        setCallbacks(prevCallbacks => ({
          ...prevCallbacks,
          firstCallData: {
            ...prevCallbacks.firstCallData,
            lastPage: response.data.lastPage,
            pageNumber: response.data.pageNumber,
            totalElements: response.data.totalElements,
            totalPages: response.data.totalPages,
            content: response.data.content
          },
          firstCallLoading: false
        }));
      })
      .catch(error => {
        console.log(error);
        setCallbacks(prevCallbacks => ({
          ...prevCallbacks,
          firstCallLoading: false,
          firstCallError: true
        }));
      });
  };

  const loadFilteredPets = () => {
    const endpoint = buildFilteredPetsEndpoint(filteredPetsParams);
    setCallbacks(prevCallbacks => ({ ...prevCallbacks, secondCallLoading: true }));
    apiPub
      .get(endpoint)
      .then(response => {
        setCallbacks(prevCallbacks => ({
          ...prevCallbacks,
          secondCallData: {
            ...prevCallbacks.secondCallData,
            lastPage: response.data.lastPage,
            pageNumber: response.data.pageNumber,
            totalElements: response.data.totalElements,
            totalPages: response.data.totalPages,
            content: response.data.content
          },
          secondCallLoading: false
        }));
      })
      .catch(error => {
        console.log(error);
        setCallbacks(prevCallbacks => ({
          ...prevCallbacks,
          secondCallLoading: false,
          secondCallError: true
        }));
      });
  };

  return (
    <div>
      <PetBanner
        className={styles.banner}
        text="Buscador de Parejas"
        images={{
          mobile: { src: mobileBanner, size: 2207 },
          desktop: { src: desktopBanner, size: 3310 }
        }}
      />
      {/* Container GENERAL, LADO IZQUIERDO Y DERECHO */}
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
              {callbacks.firstCallLoading ? (
                <Spinner />
              ) : callbacks.firstCallError ? (
                <h3>Error.</h3>
              ) : (
                callbacks.firstCallData.content &&
                (callbacks.firstCallData.content.length === 0 ? (
                  <h3>No se encontraron resultados.</h3>
                ) : (
                  callbacks.firstCallData.content.map(pet => {
                    return <Card key={pet.id} animal={pet} />;
                  })
                ))
              )}
              {callbacks.firstCallData.content &&
                callbacks.firstCallData.content.map(pet => {
                  return <Card key={pet.id} animal={pet} />;
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
              {callbacks.secondCallLoading ? (
                <Spinner />
              ) : callbacks.secondCallError ? (
                <h3>Error.</h3>
              ) : (
                callbacks.secondCallData.content &&
                (callbacks.secondCallData.content.length === 0 ? (
                  <h3>No se encontraron resultados.</h3>
                ) : (
                  callbacks.secondCallData.content.map(pet => {
                    return <Card key={pet.id} animal={pet} />;
                  })
                ))
              )}
            </div>
          </div>
        </div>
        {/* Container lado IZQUIERDO */}
        <div className={styles.leftSide}>
          <h2 style={{ padding: "10px" }}>Mascota</h2>
          <div onChange={handleChangeParam} className={styles.perrogato}>
            <div className={styles.perro}>
              <input type="radio" value="DOG" name="animal" />
              <h4>Perro</h4>
            </div>
            <div className={styles.gato}>
              <input type="radio" value="CAT" name="animal" />
              <h4>Gato</h4>
            </div>
          </div>
          <h2 style={{ padding: "10px" }}>Sexo</h2>
          <div onChange={handleChangeParam} className={styles.machohembra}>
            <div className={styles.macho}>
              <input type="radio" value="MALE" name="gender" />
              <h4>Macho</h4>
            </div>
            <div className={styles.hembra}>
              <input type="radio" value="FEMALE" name="gender" />
              <h4>Hembra</h4>
            </div>
          </div>
          <h2 style={{ padding: "10px" }}>Edad</h2>
          <div onChange={handleChangeAgeRange} className={styles.cachorrojoven}>
            <div className={styles.cachorro}>
              <input type="radio" value="0-3" name="age" />
              <h4>0 - 3 años</h4>
            </div>
            <div className={styles.joven}>
              <input type="radio" value="3-6" name="age" />
              <h4>3 - 6 años</h4>
            </div>
          </div>
          <div onChange={handleChangeAgeRange} className={styles.adulto}>
            <input type="radio" value="6-100" name="age" />
            <h4>6 o mas años</h4>
          </div>
          <div className={styles.inputText}>
            <input
              onChange={handleChangeParam}
              className={styles.input1}
              type="text"
              name="race"
              placeholder="Ingresa la raza"
            />
            <input
              onChange={handleChangeParam}
              className={styles.input2}
              type="text"
              name="location"
              placeholder="Ingresa la ciudad"
            />
            <button className={styles.searchbar} onClick={handleSearch}>
              Buscar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filter;
