import React from "react";

const types = {
  email: {
    regex: /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/,
    message: "Email inválido",
  },
  password: {
    regex: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
    message:
      "A senha precisa ter 1 caractere maiúsculo, 1 minúsculo, 1 dígito, 1 caractere especial e no mínimo 8 caracteres.",
  },
  number: {
    regex: /^\d+$/,
    message: "Utilize apenas números",
  },
};

const useForm = (type) => {
  const [value, setValue] = React.useState("");
  const [error, setError] = React.useState(null);

  function validate(value) {
    if (type === false) return true;
    if (!value.length) {
      setError("Preencha o campo");
      return false;
    } else if (types[type] && !types[type].regex.test(value)) {
      setError(types[type].message);
      return false;
    } else {
      setError("");
      return true;
    }
  }

  function onChange({ target }) {
    setValue(target.value);
    if (error) validate(target.value);
  }

  function onBlur() {
    validate(value);
  }

  return {
    value,
    setValue,
    error,
    onChange,
    onBlur,
    validate: () => validate(value),
  };
};

export default useForm;
