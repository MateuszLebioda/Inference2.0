import IdService from "../../services/IdService";
import AttributeValidator from "../../services/validators/AttributeValidator";
import AttributeCollectionService from "./AttributeCollectionService";

class AttributeService {
  attributeCollectionService = new AttributeCollectionService();
  attributeValidator = new AttributeValidator();

  createEmptyAttribute = () => {
    return {
      id: null,
      type: null,
      value: null,
      desc: null,
      collections: [],
    };
  };

  deleteAttributeCollectionElement = (attribute, element) => {
    let tempCollections = [...attribute.collections].filter(
      (e) => e.id !== element.id
    );
    let tempAtt = this.copyAttribute(attribute);
    tempAtt.collections = tempCollections;
    return tempAtt;
  };

  changeAttributeValue = (attribute, value, name) => {
    let tempA = { ...attribute };
    tempA[name] = value;
    tempA.errors = this.attributeValidator.validateEmptyName(tempA);
    return tempA;
  };

  changeElementCollectionValue = (attribute, element, value) => {
    let tempCollections = [...attribute.collections];
    let collectionIndex = tempCollections.findIndex((e) => e.id === element.id);
    let tempElement = { ...element };
    tempElement.value = value;
    tempElement.errors = this.attributeValidator.validateEmptyName(tempElement);
    tempCollections.splice(collectionIndex, 1, tempElement);
    let tempAtt = this.copyAttribute(attribute);
    tempAtt.collections = tempCollections;
    return tempAtt;
  };

  addEmptyCollectionElement = (attributes) => {
    let id = IdService.getNextAttributeCollectionId();
    const localId = IdService.getId(attributes.collections);
    if (id < localId) {
      id = localId;
    }

    let collectionElement =
      this.attributeCollectionService.createEmptyAttributeCollectionElement(
        id,
        ""
      );
    collectionElement =
      this.attributeCollectionService.getCollectionAttributeToEdit(
        collectionElement,
        true
      );
    collectionElement.errors =
      this.attributeValidator.validateEmptyName(collectionElement);
    let tempCollections = [...attributes.collections];

    tempCollections.push(collectionElement);

    let tempAtt = this.copyAttribute(attributes);
    tempAtt.collections = tempCollections;
    return tempAtt;
  };

  areEquals = (attribute1, attribute2) => {
    if (!attribute1 || !attribute2) {
      return false;
    }
    if (attribute1.value !== attribute2.value) {
      return false;
    }
    if (attribute1.type !== attribute2.type) {
      return false;
    }
    if (
      !this.attributeCollectionService.areCollectionsEquals(
        attribute1.collections,
        attribute2.collections
      )
    ) {
      return false;
    }

    return true;
  };

  getAttributeToEdit = (attribute) => {
    let tempAttribute = this.copyAttribute(attribute);
    tempAttribute.defaultValue = attribute.value;

    tempAttribute.errors = [];
    tempAttribute.warnings = [];

    tempAttribute.collections = attribute.collections.map((c) =>
      this.attributeCollectionService.getCollectionAttributeToEdit(c)
    );

    return tempAttribute;
  };

  copyAttribute = (attribute) => {
    let tempAttribute = this.createEmptyAttribute();
    tempAttribute.id = attribute.id;
    tempAttribute.type = attribute.type;
    tempAttribute.value = attribute.value;
    tempAttribute.desc = attribute.desc;
    tempAttribute.collections = [...attribute.collections];
    if (attribute.defaultValue) {
      tempAttribute.defaultValue = attribute.defaultValue;
    }
    if (attribute.errors) {
      tempAttribute.errors = [...attribute.errors];
    }
    if (attribute.warnings) {
      tempAttribute.warnings = [...attribute.warnings];
    }
    return tempAttribute;
  };

  changeInAttribute = (originalAttribute, editedAttribute) => {
    let changes = [];
    Object.entries(originalAttribute).forEach((original) => {
      Object.entries(editedAttribute).forEach((edited) => {
        if (
          !(original[1] instanceof Array) &&
          original[0] === edited[0] &&
          original[1] !== edited[1]
        ) {
          changes.push({
            key: original[0],
            oldValue: original[1],
            newValue: edited[1],
          });
        }
      });
    });
    return changes;
  };

  replaceAttribute = (attributes, changedAttribute) => {
    let tempAttributes = [...attributes];
    let attributeIndex = attributes.findIndex(
      (a) => a.id === changedAttribute.id
    );

    tempAttributes.splice(attributeIndex, 1, changedAttribute);

    return tempAttributes;
  };

  removeAttributes = (attributes, changedAttribute) => {
    return attributes.filter((a) => a.id !== changedAttribute.id);
  };
}

export default AttributeService;

export const TEMPORARY_ELEMENT = "Element został dodany podczas edycji";
