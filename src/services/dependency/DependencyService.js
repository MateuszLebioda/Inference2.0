import store from "../../store";
import { objectType } from "../../model/enumeration/ObjectType";

class DependencyService {
  getCompleteRules = (rules) => {
    let attributes = [...store.getState().file.value.attributes];
    if (!attributes) {
      return [];
    }
    return rules
      .map((r) => {
        let tempConclusion = { ...r.conclusion };
        tempConclusion.attributeName = attributes.find(
          (a) => a.id === r.conclusion.attributeID
        ).value;

        let tempRule = { ...r, conclusion: tempConclusion };

        tempRule.conditions = [...r.conditions].map((c) => {
          let tempCondition = { ...c };
          tempCondition.attributeName = attributes.find(
            (a) => a.id === c.attributeID
          ).value;
          return tempCondition;
        });

        return tempRule;
      })
      .sort((r1, r2) =>
        r1.conclusion.attributeName.localeCompare(r2.conclusion.attributeName)
      );
  };

  getCompleteFacts = (facts) => {
    let attributes = [...store.getState().file.value.attributes];
    if (!attributes) {
      return [];
    }
    return facts
      .map((f) => {
        let attributeName = attributes.find(
          (a) => a.id === f.attributeID
        ).value;
        return { ...f, attributeName: attributeName };
      })
      .sort((f1, f2) => f1.attributeName.localeCompare(f2.attributeName));
  };

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
