import Importer from "./Importer.js";
import XMLParser from "react-xml-parser";
import AttributeService from "../../model/attribute/AttributeService.js";

class XmlImporter extends Importer {
  parser = new XMLParser();

  attributeService = new AttributeService();

  importFromFile = (file) => {
    let xml = this.parser.parseFromString(file);
    let attributes = this.importAttributes(xml);
    console.log(attributes);
  };

  importAttributes = (object) => {
    let tempAttributes = [];

    let xmlAttributes = object.children.find(
      (o) => o.name === "attributes"
    ).children;

    xmlAttributes.forEach((xmlAttribute, id) => {
      let attribute = this.mapElementFromXmlToAttribute(xmlAttribute);
      attribute.id = id;
      tempAttributes.push(attribute);
    });

    return tempAttributes;
  };

  mapElementFromXmlToAttribute = (element) => {
    let attribute = this.attributeService.createEmptyAttribute();
    element.children.forEach((children) => {
      if (children.name === "name") {
        attribute.value = children.value;
      } else if (children.name === "type") {
        attribute.type = children.value;
      } else if ((children.name = "values_list")) {
        attribute.collections = this.getParameterAttributeCollection(
          children.children
        );
      }
    });
    return attribute;
  };

  getParameterAttributeCollection = (element) => {
    return element.map((children, id) => {
      return this.attributeService.createEmptyAttributeCollectionElement(
        id,
        children.children[0].value
      );
    });
  };
}

export default XmlImporter;
