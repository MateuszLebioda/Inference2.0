import AttributeCollectionService from "../../model/attribute/AttributeCollectionService";
import DefaultValidator, { VALUE_CON_COT_BE_EMPTY } from "./DefaultValidator";

class AttributeValidator extends DefaultValidator {
  attributeCollectionService = new AttributeCollectionService();

  validateCollectionsDependency = (collectionsElement, dependencies) => {
    let tempCollection = [];
    collectionsElement.forEach((c) => {
      let tempCollectionElement =
        this.attributeCollectionService.copyCollectionAttribute(c);

      tempCollectionElement.warnings = this.validateCollectionDependency(
        tempCollectionElement,
        dependencies
      );

      tempCollection.push(tempCollectionElement);
    });

    return tempCollection;
  };

  validateCollectionDependency = (collectionElement, dependencies) => {
    let tempWarning = [...collectionElement.warnings];
    if (this.isDependent(collectionElement, dependencies)) {
      tempWarning = this.addError(tempWarning, DEPENDENT_COLLECTION_ELEMENT);
    } else {
      tempWarning = this.removeError(tempWarning, DEPENDENT_COLLECTION_ELEMENT);
    }
    return tempWarning;
  };

  validateEmptyName = (element) => {
    let tempErrors = [...element.errors];
    if (element.value === "") {
      tempErrors = this.addError(tempErrors, VALUE_CON_COT_BE_EMPTY);
    } else {
      tempErrors = this.removeError(tempErrors, VALUE_CON_COT_BE_EMPTY);
    }
    return tempErrors;
  };

  isDependent = (collectionElement, dependencies) => {
    return (
      dependencies.dependentRules.some(
        (d) => d.collectionElementId === collectionElement.value
      ) ||
      dependencies.dependentFacts.some(
        (d) => d.collectionElementId === collectionElement.value
      )
    );
  };

  isElementDependent = (collectionElement) => {
    return collectionElement.warnings.some(
      (w) => w.key === DEPENDENT_COLLECTION_ELEMENT.key
    );
  };

  isElementValid = (attribute) => {
    if (attribute.errors.length > 0) {
      return false;
    }

    for (let element of attribute.collections) {
      if (element.errors.length > 0) {
        return false;
      }
    }
    return true;
  };
}

export default AttributeValidator;

export const DEPENDENT_COLLECTION_ELEMENT = {
  key: "DependentCollectionElement",
  value: "Wartość jest używana w regułach i faktach",
};

export const DEPENDENT_ATTRIBUTE = {
  key: "DependentAttribute",
  value: "Atrybut jest używany w regułach i faktach",
};
