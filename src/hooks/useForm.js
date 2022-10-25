import { useState } from "react";
import Swal from "sweetalert2";

export const useForm = initForm => {
  const formStructure = {};
  Object.keys(initForm.data).forEach(el => (formStructure[el] = initForm.data[el].initVal));
  // States
  const [form, setForm] = useState(formStructure);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);

  // Handle changing values of inputs
  const handleChange = e => {
    const { name, value } = e.target;
    console.log(e.target.value);
    if (!initForm.data[name]?.required && !value) {
      setErrors({ ...errors, [name]: false });
    }
    setForm(prev => {
      return {
        ...prev,
        [name]: value
      };
    });
  };

  // Validation when focus is gone
  const handleBlur = e => {
    const champ = e.target.name;
    const value = e.target.value;
    handleChange(e);
    if (!initForm.data[champ].required && !value && !typeof value === Boolean) {
      console.log("nada que cambiar");
      return;
    }
    setErrors(
      Object.assign(errors, { [champ]: _validate(initForm.data[champ], value, champ) } || false)
    );
  };

  // Load data from outside de hook to the form
  const addForm = obj => {
    setForm(obj);
  };

  // Validation for check champs
  const handleCheck = e => {
    const name = e.target.name;
    const value = !e.target.value;
    setForm(prev => {
      return {
        ...prev,
        [name]: value
      };
    });
    setErrors(Object.assign(errors, { [name]: _validate(initForm.data[name], value) } || false));
  };

  // Validation Form

  const _validate = (champ, val) => {
    if (champ === "avatar") return false;
    if (champ?.required && !val) return "Este campo es requerido";
    if (champ?.validation) {
      const result = champ.validation?.find(el => !el.condition(val));
      return result?.error || false;
    }
  };

  // handle radio buttons

  const handleRadio = e => {
    const value = e.target.value;
    const name = e.target.name;
    console.log("radio ", name, " valor ", value);
    setForm(prev => {
      return {
        ...prev,
        [name]: value
      };
    });
    setErrors(Object.assign(errors, { [name]: _validate(initForm.data[name], value) } || false));
  };

  // Validation Files
  const handleFiles = e => {
    const file = e.target.files[0];
    console.log("file", file);
    const name = e.target.name;
    const oldUrl = form[name];
    if (file) {
      setForm(prev => {
        return {
          ...prev,
          [name]: file
        };
      });
      setErrors(Object.assign(errors, { [name]: _validate(initForm.data[name], file) }));
      if (errors[name]) {
        setForm(prev => {
          return {
            ...prev,
            [name]: oldUrl
          };
        });
      }
    }
  };

  // Submit validation
  const handleSubmit = async e => {
    e.preventDefault();
    console.log("submit");
    // Checking validation of all champs
    Object.entries(form).forEach(([key]) => {
      if (key !== "avatar")
        setErrors(Object.assign(errors, { [key]: _validate(initForm.data[key], form[key]) }));
    });
    console.log("ERRORES ENCONTRAOS ", errors);
    // Checking if errors has all false values
    if (Object.values(errors).filter(val => val !== false).length === 0) {
      console.log("no hay errores");
      setLoading(true);
      try {
        setResponse(await initForm.apicall());
        Swal.fire({
          title: "¡Éxito!",
          text: "Se ha guardado correctamente",
          icon: "success",
          confirmButtonText: "Aceptar"
        });

        setLoading(false);
        if (!form.notreset) {
          e.target.reset();
          setForm(response);
          setErrors({});
        }
      } catch (err) {
        console.log(err);
        setResponse(false);
      }
    } else {
      console.log(errors);
    }
  };

  return {
    form,
    errors,
    loading,
    response,
    addForm,
    handleChange,
    handleFiles,
    handleRadio,
    handleCheck,
    handleBlur,
    handleSubmit
  };
};
