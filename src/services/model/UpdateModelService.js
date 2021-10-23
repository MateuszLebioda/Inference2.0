import AttributeCollectionService from "../../model/attribute/AttributeCollectionService";
import AttributeService from "../../model/attribute/AttributeService";
import FactService from "../../model/fact/FactService";
import RuleService from "../../model/rule/RuleService";
import { updateElement } from "../../slice/FileSlice";
import store from "../../store";
import DependencyService from "../dependency/DependencyService";
import IdService from "../IdService";

class UpdateModelService {
  attributeService = new AttributeService();
  attributeCollectionService = new AttributeCollectionService();
  ruleService = new RuleService();
  factService = new FactService();
  attributeService = new AttributeService();

  deleteFact = (fact) => {
    store.dispatch(
      updateElement({
        attributes: [...store.getState().file.value.attributes],
        facts: [...store.getState().file.value.facts].filter(
          (f) => f.id !== fact.id
        ),
        rules: [...store.getState().file.value.rules],
      })
    );
  };

  addNewFact = (fact) => {
    let tempFacts = [...store.getState().file.value.facts];

    fact.id = IdService.getId(tempFacts);

    store.dispatch(
      updateElement({
        attributes: [...store.getState().file.value.attributes],
        facts: tempFacts.concat([fact]),
        rules: [...store.getState().file.value.rules],
      })
    );

    return Promise.resolve(fact);
  };

  updateFact = (fact) => {
    let attributes = [...store.getState().file.value.attributes];
    let rules = [...store.getState().file.value.rules];

    let tempFacts = this.factService.replaceFact(
      [...store.getState().file.value.facts],
      fact
    );

    store.dispatch(
      updateElement({
        attributes: attributes,
        facts: tempFacts,
        rules: rules,
      })
    );

    return Promise.resolve(fact);
  };

  deleteAttributes = (attribute) => {
    let rules = [...store.getState().file.value.rules];
    let facts = [...store.getState().file.value.facts];

    let dependency = DependencyService.findDependencyToAttribute(attribute);

    let newRules = this.getRulesWithRemovedAttributes(
      rules,
      dependency,
      attribute
    );

    let newFacts = this.getFactWithRemovedAttributes(facts, dependency);

    store.dispatch(
      updateElement({
        attributes: [...store.getState().file.value.attributes].filter(
          (a) => a.id !== attribute.id
        ),
        facts: newFacts,
        rules: newRules,
      })
    );

    return Promise.resolve(attribute);
  };

  addAttribute = (attribute) => {
    let attributes = [...store.getState().file.value.attributes];
    let id = IdService.getId(attributes);
    let tempAttribute = { ...attribute, id: id };
    store.dispatch(
      updateElement({
        attributes: attributes.concat([tempAttribute]),
        facts: [...store.getState().file.value.facts],
        rules: [...store.getState().file.value.rules],
      })
    );
  };

  updateAttribute = (attribute) => {
    let facts = [...store.getState().file.value.facts];
    let rules = [...store.getState().file.value.rules];
    let attributes = [...store.getState().file.value.attributes];
    let originalAttribute = attributes.find((a) => a.id === attribute.id);

    let attributeCollectionChanges =
      this.attributeCollectionService.allChangesInAttributeCollections(
        attribute.id,
        originalAttribute.collections,
        attribute.collections
      );

    let dependency =
      DependencyService.findDependencyToAttribute(originalAttribute);

    let newAttributes = this.attributeService.replaceAttribute(
      attributes,
      attribute
    );

    let newRules = this.getUpdatedRules(
      rules,
      dependency,
      attributeCollectionChanges
    );

    newRules = this.getRulesWithRemovedAttributesValue(
      newRules,
      dependency,
      attributeCollectionChanges
    );

    let newFacts = this.getUpdatedFacts(
      facts,
      dependency,
      attributeCollectionChanges
    );

    newFacts = this.getFactWithRemovedAttributesValue(
      newFacts,
      dependency,
      attributeCollectionChanges
    );

    store.dispatch(
      updateElement({
        attributes: newAttributes,
        facts: newFacts,
        rules: newRules,
      })
    );

    return Promise.resolve(attribute);
  };

  getFactWithRemovedAttributes = (facts, dependency) => {
    let removedFactsId = [];

    dependency.dependentFacts.forEach((dependentFact) => {
      let fact = facts.find((r) => r.attributeID === dependentFact.attributeId);
      removedFactsId.push(fact.id);
    });

    return facts.filter((f) => !removedFactsId.includes(f.id));
  };

  getFactWithRemovedAttributesValue = (
    facts,
    dependency,
    attributeCollectionChanges
  ) => {
    let removedFactsId = [];

    dependency.dependentFacts.forEach((dependentFact) => {
      attributeCollectionChanges.removedElements.forEach((change) => {
        if (dependentFact.collectionElementId === change.oldValue) {
          let fact = facts.find(
            (r) => r.attributeID === dependentFact.attributeId
          );
          removedFactsId.push(fact.id);
        }
      });
    });

    return facts.filter((f) => !removedFactsId.includes(f.id));
  };

  getRulesWithRemovedAttributes = (rules, dependency, attribute) => {
    let removedRulesId = [];
    let updateRules = [];
    dependency.dependentRules.forEach((dependentRule) => {
      let rule = rules.find((r) => r.id === dependentRule.objectId);
      let handleRemoveAttribute = this.ruleService.handleRemoveAttribute(
        rule,
        attribute.id
      );
      if (handleRemoveAttribute) {
        updateRules.push(handleRemoveAttribute);
      } else {
        removedRulesId.push(rule.id);
      }
    });
    let rulesAfterRemove = rules.filter((r) => !removedRulesId.includes(r.id));
    return this.ruleService.replaceRules(rulesAfterRemove, updateRules);
  };

  getRulesWithRemovedAttributesValue = (
    rules,
    dependency,
    attributeCollectionChanges
  ) => {
    let removedRulesId = [];
    let updateRules = [];
    dependency.dependentRules.forEach((dependentRule) => {
      attributeCollectionChanges.removedElements.forEach((change) => {
        if (dependentRule.collectionElementId === change.oldValue) {
          let rule = rules.find((r) => r.id === dependentRule.objectId);
          let handleRemoveAttribute =
            this.ruleService.handleRemoveAttributeValue(rule, change);
          if (handleRemoveAttribute) {
            updateRules.push(handleRemoveAttribute);
          } else {
            removedRulesId.push(rule.id);
          }
        }
      });
    });

    let rulesAfterRemove = rules.filter((r) => !removedRulesId.includes(r.id));
    return this.ruleService.replaceRules(rulesAfterRemove, updateRules);
  };

  getUpdatedFacts = (facts, dependency, attributeCollectionChanges) => {
    let newFacts = [];
    dependency.dependentFacts.forEach((dependentFact) => {
      attributeCollectionChanges.changedElements.forEach((change) => {
        if (dependentFact.collectionElementId === change.oldValue) {
          let fact = facts.find(
            (r) => r.attributeID === dependentFact.attributeId
          );
          newFacts.push({ ...fact, value: change.newValue });
        }
      });
    });

    return this.factService.replaceFacts(facts, newFacts);
  };

  getUpdatedRules = (rules, dependency, attributeCollectionChanges) => {
    let newRules = [];
    dependency.dependentRules.forEach((dependentRule) => {
      attributeCollectionChanges.changedElements.forEach((change) => {
        if (dependentRule.collectionElementId === change.oldValue) {
          let rule = rules.find((r) => r.id === dependentRule.objectId);
          newRules.push(this.ruleService.updateAttributeValue(rule, change));
        }
      });
    });

    return this.ruleService.replaceRules(rules, newRules);
  };
}
export default UpdateModelService;
