import classes from "./PetForm.module.sass";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { apiPub } from "../../helpers/axios";
import { useForm } from "../../hooks/useForm";
import { regexConditions } from "../../helpers/regexs";
import { Spinner } from "../../components";

function PetForm({ petId }) {
  const [pet, setPet] = useState([]);
  const [loading, setLoading] = useState();
  const [characteres, setCharacteres] = useState(500);

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
            setPet(response.data);
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

  const initForm = {
    data: {
      name: {
        initVal: pet.name || "",
        required: true,
        validation: [
          {
            condition: val => regexConditions("name").test(val),
            error: "No se aceptan caracteres numéricos."
          }
        ]
      },
      age: {
        initVal: pet.age || "",
        required: true,
        validation: [
          {
            condition: val => regexConditions("age").test(val),
            error: "Solo se aceptan caracteres numéricos."
          }
        ]
      },
      location: {
        initVal: pet.location || "",
        required: true,
        validation: [
          {
            condition: val => regexConditions("adress").test(val),
            error: "Indica una dirección válida."
          }
        ]
      },
      description: {
        initVal: pet.description || "",
        validation: [
          {
            condition: val => val.length <= 500,
            error: "No se aceptan mas de 500 caracteres."
          }
        ]
      }
    }
  };

  // Form handler
  const { form, errors, handleChange, handleBlur, handleSubmit } = useForm(initForm);

  const handleInput = e => {
    handleChange(e);
    setCharacteres(500 - e.target.value.length);
  };

  return (
    <>
      {petId && loading ? (
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
                    <input type="radio" id="cat" name="animalType" value="CAT" />
                    <label htmlFor="cat">Gato</label>
                  </div>

                  <div>
                    <input type="radio" id="dog" name="animalType" value="DOG" />
                    <label htmlFor="dog">Perro</label>
                  </div>
                </fieldset>
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
