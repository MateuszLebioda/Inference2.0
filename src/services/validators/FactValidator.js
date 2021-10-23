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

  validateAttribute = (fact) => {
    let tempErrors = [...fact.errors];
    if (fact.attributeID === null) {
      tempErrors = this.addError(tempErrors, EMPTY_FACT_ATTRIBUTE);
      if (!fact.attributeName) {
        tempErrors = this.addError(tempErrors, EMPTY_FACT_ATTRIBUTE);
      }
    } else {
      tempErrors = this.removeError(tempErrors, EMPTY_FACT_ATTRIBUTE);
      if (!fact.attributeName) {
        tempErrors = this.removeError(tempErrors, EMPTY_FACT_ATTRIBUTE);
      }
    }
    return tempErrors;
  };
}

export default FactValidator;

export const EMPTY_FACT_VALUE = {
  key: "EmptyFactValue",
  value: "Fakt musi posiadać wartość",
};

export const EMPTY_FACT_ATTRIBUTE = {
  key: "EmptyFactAttribute",
  value: "Fakt musi posiadać nazwę atrybutu",
};

export const FACT_ATTRIBUTES_ERRORS = [EMPTY_FACT_ATTRIBUTE];

export const FACT_VALUE_ERRORS = [EMPTY_FACT_VALUE];
