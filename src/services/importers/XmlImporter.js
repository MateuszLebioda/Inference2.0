import Importer from "./Importer.js";
import XMLParser from "react-xml-parser";
import AttributeService from "../../model/attribute/AttributeService.js";
import FactService from "../../model/fact/FactService.js";
import { attributeType } from "../../model/attribute/AttributeType.js";
import operator from "../../model/operator/Operator.js";
import RuleService from "../../model/rule/RuleService.js";

class XmlImporter extends Importer {
  parser = new XMLParser();

  factId = 0;

  attributeService = new AttributeService();
  factService = new FactService();
  ruleService = new RuleService();

  importFromFile = (file) => {
    let xml = this.parser.parseFromString(file);
    let attributes = this.mapAttributes(xml);
    let facts = this.importFacts(xml);
    let rules = this.importRules(xml);
    console.log(attributes);
    console.log(facts);
    console.log(rules);
    this.factId = 0;
    return {
      attributes,
      facts,
      rules,
    };
  };

  importAttributes = (file) => {
    let xml = this.parser.parseFromString(file);
    return this.mapAttributes(xml);
  };

  mapAttributes = (object) => {
    let tempAttributes = [];

    let xmlAttributes = object.children.find(
      (o) => o.name === "attributes"
    ).children;

    xmlAttributes.forEach((xmlAttribute) => {
      let attribute = this.mapElementFromXmlToAttribute(xmlAttribute);
      tempAttributes.push(attribute);
    });

    return tempAttributes;
  };

  mapElementFromXmlToAttribute = (element) => {
    let attribute = this.attributeService.createEmptyAttribute();
    element.children.forEach((children) => {
      if (children.name === "name") {
        attribute.value = children.value;
        attribute.id = children.attributes.attributeID;
      } else if (children.name === "type") {
        attribute.type = this.matchAttributeType(children.value);
      } else if ((children.name = "values_list")) {
        attribute.collections = this.mapParameterAttributeCollection(
          children.children
        );
      }
    });
    return attribute;
  };

  matchAttributeType = (type) => {
    switch (type) {
      case "continous": {
        return attributeType.CONTINOUS;
      }
      case "symbolic": {
        return attributeType.SYMBOLIC;
      }
      default:
        throw new Error(`Can match attribute type "${type}"`);
    }
  };

  mapParameterAttributeCollection = (element) => {
    return element.map((children) => {
      return this.attributeService.createEmptyAttributeCollectionElement(
        children.children[0].attributes.valueID,
        children.children[0].value
      );
    });
  };

  importFacts = (object) => {
    let tempFacts = [];

    let xmlFacts = object.children.find((o) => o.name === "facts").children;

    xmlFacts.forEach((xmlFact) => {
      let fact = this.mapElementFromXmlToFact(xmlFact);
      fact.id = this.factId++;
      tempFacts.push(fact);
    });

    return tempFacts;
  };

  mapElementFromXmlToFact = (element) => {
    let tempFact = this.factService.createEmptyFact();
    element.children.forEach((children) => {
      if (children.name === "attribute") {
        tempFact.attributeID = children.attributes.attributeID;
      } else if (children.name === "continousValue") {
        tempFact.type = attributeType.CONTINOUS;
        tempFact.value = children.value;
      } else if (children.name === "value") {
        tempFact.type = attributeType.SYMBOLIC;
        tempFact.value = children.value;
      } else if (children.name === "operator") {
        tempFact.operator = this.matchOperator(children.value);
      }
    });
    return tempFact;
  };

  matchOperator = (operatorValue) => {
    switch (operatorValue) {
      case "==":
        return operator.EQUALS;
      case "!=":
        return operator.NOT_EQUALS;
      case "&lt;=":
        return operator.LESS_EQUALS;
      case "&lt;":
        return operator.LESS_THEN;
      case "&gt;=":
        return operator.GREATER_EQUALS;
      case "&gt;":
        return operator.GREATER_THEN;
      default:
        throw new Error(`Can not match operator "${operatorValue}"`);
    }
  };

  importRules = (object) => {
    let tempRules = [];

    let xmlFacts = object.children.find((o) => o.name === "rules").children;

    xmlFacts.forEach((xmlFact) => {
      let fact = this.mapElementFromXmlToRule(xmlFact);
      tempRules.push(fact);
    });

    return tempRules;
  };

  mapElementFromXmlToRule = (xmlRule) => {
    let tempRule = this.ruleService.createEmptyRule();
    tempRule.id = xmlRule.attributes.ruleId;

    xmlRule.children.forEach((children) => {
      if (children.name === "conclusion") {
        let tempFact = this.mapElementFromXmlToFact(children.children[0]);
        tempFact.id = this.factId++;
        tempRule.conclusion = tempFact;
      } else if (children.name === "conditions") {
        children.children.forEach((c) => {
          let tempFact = this.mapElementFromXmlToFact(c);
          tempFact.id = this.factId++;
          tempRule.conditions.push(tempFact);
        });
      }
    });
    return tempRule;
  };
}

export default XmlImporter;
