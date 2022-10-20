import classes from "./PetForm.module.sass";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { apiPrivate, apiPub } from "../../helpers/axios";
import { useForm } from "../../hooks/useForm";
import { regexConditions } from "../../helpers/regexs";
import { Spinner, ThumbnailInput } from "../../components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

function PetForm({ petId }) {
  const [id, setId] = useState(petId);
  const [loading, setLoading] = useState();
  const [characteres, setCharacteres] = useState(500);
  const [pictures, setPictures] = useState("");

  const initForm = {
    data: {
      name: {
        initVal: "",
        required: true,
        validation: [
          {
            condition: val => regexConditions("name").test(val),
            error: "No se aceptan caracteres numéricos."
          }
        ]
      },
      age: {
        initVal: "",
        required: true,
        validation: [
          {
            condition: val => regexConditions("age").test(val),
            error: "Solo se aceptan caracteres numéricos y no mas de dos dígitos."
          }
        ]
      },
      location: {
        initVal: "",
        required: true,
        validation: [
          {
            condition: val => regexConditions("address").test(val),
            error: "Indica una dirección válida."
          }
        ]
      },
      description: {
        initVal: "",
        validation: [
          {
            condition: val => val.length <= 500,
            error: "No se aceptan mas de 500 caracteres."
          }
        ]
      },
      animalType: {
        initVal: "",
        required: true,
        validation: [
          {
            condition: val => val === "DOG" || val === "CAT",
            error: "Los valores solo pueden ser gato o perro"
          }
        ]
      },
      gender: {
        initVal: "",
        required: true,
        validation: [
          {
            condition: val => val === "MALE" || val === "FEMALE",
            error: "Los valores solo pueden ser macho o hembra."
          }
        ]
      },
      race: {
        initVal: "",
        validation: [
          {
            condition: val => val,
            error: false
          }
        ]
      },
      weight: {
        initVal: "",
        validation: [
          {
            condition: val => regexConditions("age").test(val),
            error: "Solo se aceptan caracteres numéricos y no mas de dos dígitos."
          }
        ]
      },
      vaccinationUpToDate: {
        initVal: false,
        validation: [
          {
            condition: val => val === "true" || val === "false",
            error: false
          }
        ]
      },
      pureRace: {
        initVal: false,
        validation: [
          {
            condition: val => val === "true" || val === "false",
            error: false
          }
        ]
      },
      size: {
        initVal: "",
        validation: [
          {
            condition: val => val === "SHORT" || val === "MEDIUM" || val === "BIG",
            error: "Sólo se admiten las medidas pequeño, medio y grande"
          }
        ]
      }
    },
    apicall: () => {
      const formToSend = {
        name: form.name,
        age: form.age,
        location: form.location,
        description: form.description,
        animalType: form.animalType,
        gender: form.gender,
        race: form.race,
        weight: form.weight,
        size: form.size,
        vaccinationUpToDate: form.vaccinationUpToDate,
        pureRace: form.pureRace
      };
      if (petId) {
        return apiPrivate.put(`/pets/${petId}`, formToSend);
      } else {
        return apiPrivate.post("/pets", formToSend);
      }
    }
  };
  // Form handler
  const { form, response, errors, addForm, handleChange, handleRadio, handleBlur, handleSubmit } =
    useForm(initForm);

  useEffect(() => {
    if (response?.data.id) {
      setId(response.data.id);
    }
  }, [response]);
  useEffect(() => {
    if (id) {
      let isMounted = true;
      const controller = new AbortController();

      const getPets = async type => {
        try {
          const response = await apiPub.get(`/pets/${petId}`, {
            signal: controller.signal
          });

          if (isMounted) {
            addForm({
              name: response.data.name,
              age: response.data.age,
              location: response.data.location,
              description: response.data.description,
              animalType: response.data.animalType,
              gender: response.data.gender,
              race: response.data.race,
              weight: response.data.weight,
              size: response.data.size,
              vaccinationsUpToDate: response.data.vaccinationsUpToDate,
              pureRace: response.data.pureRace
            });
            setPictures(response.data.pictures);
            console.log("respuesta", response.data);
            setCharacteres(500 - response.data.description.length);
            setLoading(false);
          }
        } catch (err) {
          console.log(`"ERROR": ${err.message}`);
          setLoading(false);
        }
      };

      getPets();

      // if unmounted component
      return () => {
        isMounted = false;
        controller.abort();
      };
    } else {
      setLoading(false);
    }
  }, []);

  const handleInput = e => {
    handleChange(e);
    setCharacteres(500 - e.target.value.length);
  };

  const handleDeletePicture = async e => {
    const pictureId = parseInt(e.target.closest("div").id);
    try {
      const response = await apiPrivate.delete(`/pictures/${pictureId}`);
      if (response) {
        setPictures(pictures.filter(el => parseInt(el.id) !== response.data.id));
      }
    } catch (err) {
      alert("No ha sido posible borrar la foto. Intentalo nuevamente.");
      console.log(err);
    }
  };

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <div className={classes.form}>
          <h3>Perfil de mascotas</h3>
          <form onSubmit={handleSubmit}>
            <div className={classes.form_wrapper}>
              <div className={classes.form_group}>
                <input
                  name="name"
                  placeholder="Nombre de la mascota"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={form.name}
                />
                {errors?.name && <p className={classes.instructions}>{errors.name}</p>}
              </div>
              <div className={classes.form_group}>
                <input
                  name="age"
                  placeholder="Edad de la mascota"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={form.age}
                />
                {errors?.age && <p className={classes.instructions}>{errors.age}</p>}
              </div>
              <div className={classes.form_group}>
                <input
                  name="location"
                  placeholder="Lugar de residencia"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={form.location}
                />
                {errors?.location && <p className={classes.instructions}>{errors.location}</p>}
              </div>
              <div className={classes.form_group_textarea}>
                <textarea
                  name="description"
                  placeholder="Escribe aquí..."
                  onInput={handleInput}
                  value={form.description}
                />
                <p>
                  <span>{characteres} caracteres restantes.</span>
                </p>
                {errors?.description && (
                  <p className={classes.instructions}>{errors.description}</p>
                )}
              </div>
            </div>
            <div className={classes.form_wrapper_pets}>
              <h3>Mascota</h3>
              <div className={classes.form.group_controler}>
                <fieldset>
                  <div>
                    <input
                      type="radio"
                      id="cat"
                      name="animalType"
                      value="CAT"
                      onChange={handleRadio}
                      checked={form.animalType === "CAT"}
                    />
                    <label htmlFor="cat">Gato</label>
                  </div>

                  <div>
                    <input
                      type="radio"
                      id="dog"
                      onChange={handleRadio}
                      name="animalType"
                      value="DOG"
                      checked={form.animalType === "DOG"}
                    />
                    <label htmlFor="dog">Perro</label>
                  </div>
                </fieldset>
              </div>
              <div className={classes.form.group_controler}>
                <fieldset>
                  <div>
                    <input
                      type="radio"
                      id="male"
                      name="gender"
                      value="MALE"
                      onChange={handleChange}
                      checked={form.gender === "MALE"}
                    />
                    <label htmlFor="male">Macho</label>
                  </div>

                  <div>
                    <input
                      type="radio"
                      id="female"
                      onChange={handleChange}
                      name="gender"
                      value="FEMALE"
                      checked={form.gender === "FEMALE"}
                    />
                    <label htmlFor="female">Hembra</label>
                  </div>
                </fieldset>
              </div>
              <div className={classes.form_group}>
                <input
                  name="race"
                  placeholder="Raza"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={form.race}
                />
                {errors?.race && <p className={classes.instructions}>{errors.race}</p>}
              </div>
              <div className={classes.form_group}>
                <input
                  name="weight"
                  placeholder="peso"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={form.weight}
                />
                {errors?.weight && <p className={classes.instructions}>{errors.weight}</p>}
              </div>

              <div className={classes.form.group_controler}>
                <fieldset>
                  <div className={classes.legend}>Tamaño:</div>
                  <div className={classes.wrapper_options}>
                    <div>
                      <input
                        type="radio"
                        id="sizes"
                        name="size"
                        value="SHORT"
                        onChange={handleBlur}
                        checked={form.size === "SHORT"}
                      />
                      <label htmlFor="sizes">Pequeño</label>
                    </div>

                    <div>
                      <input
                        type="radio"
                        id="sizem"
                        onChange={handleBlur}
                        name="size"
                        value="MEDIUM"
                        checked={form.size === "MEDIUM"}
                      />
                      <label htmlFor="sizem">Mediano</label>
                    </div>

                    <div>
                      <input
                        type="radio"
                        id="sizel"
                        onChange={handleBlur}
                        name="size"
                        value="BIG"
                        checked={form.size === "BIG"}
                      />
                      <label htmlFor="sizel">Grande</label>
                    </div>
                  </div>
                </fieldset>
              </div>

              <div className={classes.form.group_controler}>
                <fieldset>
                  <div className={classes.legend}>Vacunación:</div>
                  <div className={classes.wrapper_options}>
                    <input
                      type="radio"
                      id="vacyes"
                      name="vaccinationUpToDate"
                      value="true"
                      onChange={handleBlur}
                      checked={form.vaccinationUpToDate === "true"}
                    />
                    <label htmlFor="vacyes">Completa</label>
                  </div>

                  <div>
                    <input
                      type="radio"
                      id="vacNo"
                      onChange={handleBlur}
                      name="vaccinationUpToDate"
                      value="false"
                      checked={form.vaccinationUpToDate === "false"}
                    />
                    <label htmlFor="vacNo">Incompleta</label>
                  </div>
                </fieldset>
              </div>

              <div className={classes.form.group_controler}>
                <fieldset>
                  <div className={classes.legend}>Pura raza:</div>
                  <div className={classes.wrapper_options}>
                    <input
                      type="radio"
                      id="pureRaceYes"
                      name="pureRace"
                      value="true"
                      onChange={handleBlur}
                      checked={form.pureRace === "true"}
                    />
                    <label htmlFor="pureRaceYes">Si</label>
                  </div>

                  <div>
                    <input
                      type="radio"
                      id="pureRaceNo"
                      onChange={handleBlur}
                      name="pureRace"
                      value="false"
                      checked={form.pureRace === "false"}
                    />
                    <label htmlFor="pureRaceNo">No</label>
                  </div>
                </fieldset>
              </div>
            </div>
            <div className={classes.form_wrapper}>
              <button type="submit" className={classes.form_submit}>
                Guardar
              </button>
            </div>
          </form>
          <div className={classes.form_wrapper_pictures}>
            <h3>Imágenes:</h3>
            {pictures ? (
              <div className={classes.pictures_wrapper}>
                {pictures &&
                  pictures.map((image, key) => (
                    <div key={`photo${image.id}`} id={image.id} className={classes.pictures_image}>
                      <img src={image.path} alt={image.name} />
                      <FontAwesomeIcon
                        onClick={handleDeletePicture}
                        icon={faTrash}
                        className={classes.pictures_icon}
                      />
                    </div>
                  ))}
              </div>
            ) : null}
            {id ? (
              <>
                <p>Puedes agregar hasta 4 imágenes de cada mascota.</p>
                <ThumbnailInput id={id} pictures={pictures} setPictures={setPictures} />
                {errors?.pictures && <p className={classes.instructions}>{errors.pictures}</p>}
              </>
            ) : null}
          </div>
        </div>
      )}
    </>
  );
}

PetForm.propTypes = {
  petId: PropTypes.number
};

export default PetForm;
