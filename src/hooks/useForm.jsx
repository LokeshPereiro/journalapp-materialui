import { useEffect, useMemo, useState } from "react";

export const useForm = (initialForm = {}, formValidator = {}) => {
  const [formState, setFormState] = useState(initialForm);
  const [formValidation, setFormValidation] = useState({});

  useEffect(() => {
    createValidators();
  }, [formState]);

  const isValidForm = useMemo(() => {
    // Estoy recorriendo la propiedades para saber si su valor es null(de no ser lo el formulario no es válido )
    for (const formValues of Object.keys(formValidation)) {
      if (formValidation[formValues] !== null)
        // return false porque si un campo está mal no sigue iterando los demás
        return false;
    }
    return true;
  }, [formState]);

  const onInputChange = ({ target }) => {
    const { name, value } = target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const onResetForm = () => {
    setFormState(initialForm);
  };

  const createValidators = () => {
    const formCheckValues = {};
    for (const formField of Object.keys(formValidator)) {
      // Nombre de las propiedades
      // console.log(formField);
      // Destructuring de la función y el msg de mis validator
      const [fn, errorMessage] = formValidator[formField];
      // priemro concateno las propiedades con el 'Valid', luego, evalua si se cumple la función definida (de no serlo Error)
      formCheckValues[`${formField}Valid`] = fn(formState[formField])
        ? null
        : errorMessage;
    }
    setFormValidation(formCheckValues);
    // console.log({ formCheckValues });
  };

  return {
    ...formState,
    formState,
    onInputChange,
    onResetForm,
    ...formValidation,
    isValidForm,
  };
};
