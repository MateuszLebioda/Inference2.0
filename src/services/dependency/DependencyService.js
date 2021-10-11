import store from "../../store";
import { objectType } from "../../model/enumeration/ObjectType";

class DependencyService {
  isAttributeDependent = (attribute) => {
    let facts = [...store.getState().file.value.facts];
    let rules = [...store.getState().file.value.rules];

    for (let fact of facts) {
      if (attribute.id === fact.attributeID) {
        return true;
      }
    }

    for (let rule of rules) {
      if (attribute.id === rule.conclusion.attributeID) {
        return true;
      }
      for (let condition of rule.conditions) {
        if (attribute.id === condition.attributeID) {
          return true;
        }
      }
    }

    return false;
  };

  findDependencyToAttribute = (attribute) => {
    let facts = [...store.getState().file.value.facts];
    let factsDependent = [];
    let rules = [...store.getState().file.value.rules];
    let rulesDependent = [];

    facts.forEach((fact) => {
      if (fact.attributeID === attribute.id) {
        factsDependent.push(
          this.createDependencyObject(
            objectType.FACT,
            fact.id,
            attribute.id,
            fact.value
          )
        );
      }
    });

    rules.forEach((rule) => {
      if (rule.conclusion.attributeID === attribute.id) {
        rulesDependent.push(
          this.createDependencyObject(
            objectType.RULE,
            rule.id,
            attribute.id,
            rule.conclusion.value
          )
        );
      }
      rule.conditions.forEach((condition) => {
        if (condition.attributeID === attribute.id) {
          rulesDependent.push(
            this.createDependencyObject(
              objectType.RULE,
              rule.id,
              attribute.id,
              condition.value
            )
          );
        }
      });
    });

    return {
      dependentRules: rulesDependent,
      dependentFacts: factsDependent,
    };
  };

  createDependencyObject = (
    objectType = null,
    objectId = null,
    attributeId = null,
    collectionElementId = null
  ) => {
    return {
      objectType: objectType,
      objectId: objectId,
      attributeId: attributeId,
      collectionElementId: collectionElementId,
    };
  };
}
export default new DependencyService();
