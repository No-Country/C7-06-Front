import styles from "./Filter.module.sass";
import desktopBanner from "../../assets/buscador_desktop.webp";
import mobileBanner from "../../assets/buscador_mobile.webp";
import { useEffect, useState } from "react";
import { Card, PetBanner, Spinner } from "../../components";
import { apiPrivate, apiPub } from "../../helpers/axios";
import Paginator from "../Paginator";

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
  const [suggestedPetsParams, setSuggestedPetsParams] = useState({ pageNumber: 0 });
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
    // loadSuggestedPets();
    loadFilteredPets();
  }, [filteredPetsParams.pageNumber]);

  useEffect(() => {
    loadSuggestedPets();
  }, [suggestedPetsParams.pageNumber]);

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

  const buildSuggestedPetsEndpoint = params => {
    return `/suggestedPets?pageNumber=${params.pageNumber}`;
  };

  const buildFilteredPetsEndpoint = params => {
    let endpoint = "/filteredPets";
    const keyParams = Object.keys(params).filter(param => params[param] !== "");

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

  const loadFilteredPetsFromPage = page => {
    setFilteredPetsParams(prevParams => ({ ...prevParams, pageNumber: page }));
  };

  const loadSuggestedPetsFromPage = page => {
    setSuggestedPetsParams(prevParams => ({ ...prevParams, pageNumber: page }));
  };

  const loadSuggestedPets = () => {
    const endpoint = buildSuggestedPetsEndpoint(suggestedPetsParams);
    setCallbacks(prevCallbacks => ({ ...prevCallbacks, firstCallLoading: true }));
    apiPrivate
      .get(endpoint)
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
            <Paginator
              pageNumber={callbacks.firstCallData.pageNumber}
              totalPages={callbacks.firstCallData.totalPages}
              loadDataFromPage={loadSuggestedPetsFromPage}>
              <div className={styles.renderAnimals}>
                {callbacks.firstCallLoading ? (
                  <Spinner />
                ) : callbacks.firstCallError ? (
                  <h3>Se ha producido un error.</h3>
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
                {/* {callbacks.firstCallData.content &&
                  callbacks.firstCallData.content.map(pet => {
                    return <Card key={pet.id} animal={pet} />;
                  })} */}
              </div>
            </Paginator>
          </div>
          <div className={styles.secondCards}>
            {/* Container de las cards 2 */}
            <div className={styles.containerTitle}>
              <h3 className={styles.title}>Resultados de busqueda</h3>
            </div>
            {/* Container renderizado de animales CARDS */}
            <Paginator
              pageNumber={callbacks.secondCallData.pageNumber}
              totalPages={callbacks.secondCallData.totalPages}
              loadDataFromPage={loadFilteredPetsFromPage}>
              <div className={styles.renderAnimals}>
                {callbacks.secondCallLoading ? (
                  <Spinner />
                ) : callbacks.secondCallError ? (
                  <h3>Se ha producido un error.</h3>
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
            </Paginator>
          </div>
        </div>
        {/* Container lado IZQUIERDO */}
        <div className={styles.leftSide}>
          <h2>Filtro de búsqueda</h2>
          <div onChange={handleChangeParam} className={styles.perrogato}>
            <fieldset>
              <legend>Mascota</legend>
              <div className={styles.perro}>
                <label htmlFor="animal" className={styles.form_control}>
                  <input type="radio" value="DOG" name="animal" />
                  Perro
                </label>
              </div>
              <div className={styles.gato}>
                <label htmlFor="animal" className={styles.form_control}>
                  <input type="radio" value="CAT" name="animal" />
                  Gato
                </label>
              </div>
            </fieldset>
          </div>

          <div onChange={handleChangeParam} className={styles.machohembra}>
            <fieldset>
              <legend> Sexo </legend>
              <div className={styles.macho}>
                <label htmlFor="gender" className={styles.form_control}>
                  <input type="radio" value="MALE" name="gender" />
                  Macho
                </label>
              </div>
              <div className={styles.hembra}>
                <label htmlFor="age" className={styles.form_control}>
                  <input type="radio" value="FEMALE" name="gender" />
                  Hembra
                </label>
              </div>
            </fieldset>
          </div>

          <div onChange={handleChangeAgeRange} className={styles.cachorrojoven}>
            <fieldset>
              <legend> Edad </legend>
              <div className={styles.cachorro}>
                <label htmlFor="age" className={styles.form_control}>
                  <input type="radio" value="0-3" name="age" />0 - 3 años
                </label>
              </div>
              <div className={styles.joven}>
                <label htmlFor="age" className={styles.form_control}>
                  <input type="radio" value="3-6" name="age" />3 - 6 años
                </label>
              </div>
              <div className={styles.adulto}>
                <label htmlFor="age" className={styles.form_control}>
                  <input type="radio" value="6-100" name="age" />6 o mas años
                </label>
              </div>
            </fieldset>
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
