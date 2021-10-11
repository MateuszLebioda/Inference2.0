class DefaultValidator {
  addError = (errors, error) => {
    let tempErrors = [...errors];

    if (!tempErrors.includes(error)) {
      tempErrors.push(error);
    }

    return tempErrors;
  };

  removeError = (errors, error) => {
    let tempErrors = [...errors];

    tempErrors = tempErrors.filter((e) => e.name !== error.name);

    return tempErrors;
  };

  displayErrors = (errors) => {
    return errors
      .map((e) => {
        return e.value;
      })
      .join("\n");
  };
}

export default DefaultValidator;

export const VALUE_CON_COT_BE_EMPTY = {
  key: "ValueCanNotBeEmpty",
  value: "Wartość w polu nie może być pusta",
};
