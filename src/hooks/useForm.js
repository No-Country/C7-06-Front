import { useState } from "react";
import Swal from "sweetalert2";

export const useForm = initForm => {
  console.log("initform ", initForm);
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
    if (!initForm.data[champ].required && !value) {
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
    if (champ?.required && !val) return "Este campo es requerido";
    const result = champ.validation?.find(el => !el.condition(val));
    return result?.error || false;
  };

  // leer files
  const readFile = async file => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    const result = await new Promise(
      (resolve, reject) =>
        (reader.onload = function (e) {
          resolve(reader.result);
        })
    );
    return result;
  };

  // Handle multiple files load
  const handleMultipleFiles = e => {
    const files = e.target.files;
    const name = e.target.name;
    // const prevFiles = form[name];

    if (files) {
      setForm(prev => {
        return {
          ...prev,
          [name]: files
        };
      });
    }
    const newFiles = [];
    for (const file of files) {
      newFiles.push(readFile(file));
    }
    console.log(newFiles);
    setForm(prev => {
      return {
        ...prev,
        files: newFiles
      };
    });
    console.log("archivos muliples:", form.files);
  };

  // Validation Files
  const handleFiles = e => {
    const file = e.target.files[0];
    const name = e.target.name;
    const oldUrl = form[name];
    console.log("file", file);
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
        return;
      }
      const reader = new FileReader();
      reader.onload = function (e) {
        setForm(prev => {
          return {
            ...prev,
            file: e.target.result
          };
        });
      };
      reader.readAsDataURL(file);
    }
  };

  // Submit validation
  const handleSubmit = async e => {
    e.preventDefault();
    console.log("submit");
    // Checking validation of all champs
    Object.entries(form).forEach(([key]) => {
      setErrors(Object.assign(errors, { [key]: _validate(initForm.data[key], form[key]) }));
    });
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

        console.log(response);
        setLoading(false);
        if (!form.notreset) {
          e.target.reset();
          setForm(formStructure);
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
    handleMultipleFiles,
    handleCheck,
    handleBlur,
    handleSubmit
  };
};
