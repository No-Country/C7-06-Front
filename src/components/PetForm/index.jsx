import classes from "./PetForm.module.sass";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { apiPub } from "../../helpers/axios";
import { useForm } from "../../hooks/useForm";
import { regexConditions } from "../../helpers/regexs";
import { Spinner } from "../../components";

function PetForm({ petId }) {
  const [loading, setLoading] = useState();
  const [characteres, setCharacteres] = useState(500);

  // const getImages = () => {
  //   const AnimalPhotos = [];
  //   for (let i = 1; i <= form.pictures.length - 1; i++) {
  //     AnimalPhotos.push(form.pictures[i]);
  //   }
  //   return AnimalPhotos;
  // };

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
        initVal: 0,
        required: true,
        validation: [
          {
            condition: val => regexConditions("age").test(val),
            error: "Solo se aceptan caracteres numéricos."
          }
        ]
      },
      location: {
        initVal: "",
        required: true,
        validation: [
          {
            condition: val => regexConditions("adress").test(val),
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
        initVal: ""
      },
      gender: {
        initVal: ""
      },
      race: {
        initVal: ""
      },
      weigth: {
        initVal: ""
      },
      vaccinationUpToDate: {
        initVal: false
      },
      pureRace: {
        initVal: false
      },
      size: {
        initVal: ""
      },
      pictures: {
        initVal: [],
        validation: [
          {
            condition: val => val.length <= 4,
            error: "No se aceptan mas que 4 archivos."
          }
        ]
      },
      files: {
        initVal: ""
      }
    }
  };
  // Form handler
  const { form, errors, addForm, handleChange, handleBlur, handleMultipleFiles, handleSubmit } =
    useForm(initForm);

  useEffect(() => {
    if (petId) {
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
              pureRace: response.data.pureRace,
              pictures: response.data.pictures || ""
            });
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
                  type="number"
                  min="0"
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
                      onChange={handleChange}
                      checked={form.animalType === "CAT"}
                    />
                    <label htmlFor="cat">Gato</label>
                  </div>

                  <div>
                    <input
                      type="radio"
                      id="dog"
                      onChange={handleChange}
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
                        onChange={handleChange}
                        checked={form.size === "SHORT"}
                      />
                      <label htmlFor="sizes">Pequeño</label>
                    </div>

                    <div>
                      <input
                        type="radio"
                        id="sizem"
                        onChange={handleChange}
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
                        onChange={handleChange}
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
                      name="vaccinationsUpToDate"
                      value="true"
                      onChange={handleChange}
                      checked={form.vaccinationsUpToDate}
                    />
                    <label htmlFor="vacyes">Completa</label>
                  </div>

                  <div>
                    <input
                      type="radio"
                      id="vacNo"
                      onChange={handleChange}
                      name="vaccinationsUpToDate"
                      value="false"
                      checked={form.vaccinationsUpToDate}
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
                      name="pureRace                      "
                      value="true"
                      onChange={handleChange}
                      checked={form.pureRace === true}
                    />
                    <label htmlFor="pureRaceYes">Si</label>
                  </div>

                  <div>
                    <input
                      type="radio"
                      id="pureRaceNo"
                      onChange={handleChange}
                      name="pureRace"
                      value="false"
                      checked={form.pureRace === false}
                    />
                    <label htmlFor="pureRaceNo">No</label>
                  </div>
                </fieldset>
              </div>
            </div>
            <div className={classes.from_wrapper_pictures}>
              <h3>Imágenes:</h3>
              <p>Puedes agregar hasta 4 imágenes de cada mascota.</p>
              <div className={classes.form_avatar_image}>
                {form.files &&
                  form.files.map((image, key) => (
                    <img key={`file${key}`} src={image} alt={"nombre mascota"} />
                  ))}
                {form.picture &&
                  form.picture.map((image, key) => (
                    <img key={`picture${key}`} src={image.path} alt={"nombre mascota"} />
                  ))}
              </div>
              <div className={classes.form_avatar_editButton}>
                <label htmlFor="images">Seleccionar Archivos</label>
                <input
                  id="images"
                  name="pictures"
                  onChange={handleMultipleFiles}
                  type="file"
                  multiple
                  hidden
                  accept="image/jpg, image/jpeg, image/png, image/webp"
                  value={form.files}
                />
                {errors?.pictures && <p className={classes.instructions}>{errors.pictures}</p>}
              </div>
            </div>
          </form>
        </div>
      )}
    </>
  );
}

PetForm.propTypes = {
  petId: PropTypes.number
};

export default PetForm;
