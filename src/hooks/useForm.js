import { useState } from "react";

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
    setForm({
      ...form,
      [name]: value
    });
  };

  // Validation when focus is gone
  const handleBlur = e => {
    const champ = e.target.name;
    handleChange(e);
    setErrors(
      Object.assign(errors, { [champ]: validate(initForm.data[champ], form[champ]) } || false)
    );
  };

  // Validation for check champs
  const handleCheck = e => {
    const champ = e.target.name;
    setForm({
      ...form,
      [champ]: !form[champ]
    });
    console.log(form[champ]);
    setErrors(
      Object.assign(errors, { [champ]: validate(initForm.data[champ], form[champ]) } || false)
    );
  };

  // Validation Form

  const validate = (champ, val) => {
    if (champ?.required && !val) return "Este campo es requerido";
    const result = champ.validation?.find(el => !el.condition(val));
    return result?.error || false;
  };

  // Validation Files
  const handleFiles = e => {
    const file = e.target.files[0];
    const champ = e.target.name;
    const oldUrl = form[champ];
    if (file) {
      setForm({
        ...form,
        [champ]: file.name
      });
      setErrors(Object.assign(errors, { [champ]: validate(initForm.data[champ], file) }));
      if (errors[champ]) {
        setForm({
          ...form,
          [champ]: oldUrl
        });
        return;
      }
      const reader = new FileReader();
      reader.onload = function (e) {
        setForm({
          ...form,
          file: e.target.result
        });
      };
      reader.readAsDataURL(file);
    }
  };

  // Submit validation
  const handleSubmit = async e => {
    e.preventDefault();

    // Checking validation of all champs
    Object.entries(form).forEach(([key]) => {
      setErrors(Object.assign(errors, { [key]: validate(initForm.data[key], form[key]) }));
    });

    // Checking if errors has all false values
    if (Object.values(errors).filter(val => val !== false).length === 0) {
      console.log("no hay errores");
      setLoading(true);
      // Cleaning form
      e.target.reset();
      setForm(formStructure);
      setErrors({});
      try {
        setResponse(await initForm.apicall());
        if (initForm?.onSuccess) {
          initForm.onSuccess(response);
        }
        setLoading(false);
      } catch (err) {
        if (initForm?.onError) {
          initForm.onError(err);
        }
        setResponse(false);
      }
    }
  };

  return {
    form,
    errors,
    loading,
    response,
    handleChange,
    handleFiles,
    handleCheck,
    handleBlur,
    handleSubmit
  };
};
