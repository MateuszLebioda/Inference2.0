import DefaultValidator from "./DefaultValidator";

class FactValidator extends DefaultValidator {
  validateEmptyValue = (fact) => {
    let tempErrors = [...fact.errors];
    if (!fact.value || fact.value === "") {
      return this.addError(tempErrors, EMPTY_FACT_VALUE);
    } else {
      return this.removeError(tempErrors, EMPTY_FACT_VALUE);
    }
  };
}

export default FactValidator;

export const EMPTY_FACT_VALUE = {
  key: "EmptyFactValue",
  value: "Wartość faktu musi mieć wartość",
};

export const FACT_VALUE_ERRORS = [EMPTY_FACT_VALUE];
