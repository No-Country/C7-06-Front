import { useState } from "react";

export const useForm = (initForm, validateForm, onSuccess = () => {}, onError = () => {}) => {
  // States
  const [form, setForm] = useState(initForm);
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
    setErrors(Object.assign(errors, { [champ]: validateForm(form, champ) }));
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
      setErrors(Object.assign(errors, { [champ]: validateForm(form, champ, file) }));
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
  const handleSubmit = e => {
    e.preventDefault();

    // Checking validation of all champs
    Object.entries(form).forEach(([key]) => {
      setErrors(validateForm(Object.assign(errors, { [key]: validateForm(form, [key]) })));
    });

    // Checking if errors has all false values
    if (Object.values(errors).filter(val => val === true).length === 0) {
      alert("Enviando formulario");
      setLoading(true);
      // Cleaning form
      e.target.reset();
      setForm(initForm);
      setErrors({});
      try {
        // here function to call API and get response.
        onSuccess(response);
        setLoading(false);
      } catch (err) {
        onerror(err);
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
    handleBlur,
    handleSubmit
  };
};
