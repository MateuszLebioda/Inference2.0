import NumberComparator from "../../services/tools/NumberComparator";

export default class AttributeCollectionService {
  createEmptyAttributeCollectionElement = (id = null, value = null) => {
    return {
      id: id,
      value: value,
    };
  };

  getCollectionAttributeToEdit = (collectionElement, tempElement = false) => {
    let tempCollectionElement = this.createEmptyAttributeCollectionElement(
      collectionElement.id,
      collectionElement.value
    );
    tempCollectionElement.defaultValue = collectionElement.value;
    tempCollectionElement.tempElement = tempElement;

    tempCollectionElement.errors = [];
    tempCollectionElement.warnings = [];
    return tempCollectionElement;
  };

  mapCollectionAttributeToEditToCollectionElement = (collectionElement) => {
    let { defaultValue, errors, warnings, tempElement, ...collectionObject } =
      collectionElement;
    return collectionObject;
  };

  copyCollectionAttribute = (collectionElement) => {
    let tempCollectionElement = this.createEmptyAttributeCollectionElement(
      collectionElement.id,
      collectionElement.value
    );

    tempCollectionElement.defaultValue = collectionElement.value;
    tempCollectionElement.tempElement = collectionElement.tempElement;

    if (collectionElement.errors && collectionElement.warnings) {
      tempCollectionElement.errors = [...collectionElement.errors];
      tempCollectionElement.warnings = [...collectionElement.warnings];
    }

    return tempCollectionElement;
  };

  areCollectionsEquals = (collection1, collection2) => {
    let tempCollection1 = collection1.map((c) => ({
      id: Number(c.id),
      value: c.value,
    }));
    let tempCollection2 = collection2.map((c) => ({
      id: Number(c.id),
      value: c.value,
    }));
    if (tempCollection1.length === tempCollection2.length) {
      tempCollection1.sort((e1, e2) => NumberComparator.compare(e1, e2));
      tempCollection2.sort((e1, e2) => NumberComparator.compare(e1, e2));
      for (let i = 0; i < tempCollection2.length; i++) {
        if (tempCollection1[i].value !== tempCollection2[i].value) {
          return false;
        }
      }
      return true;
    }
    return false;
  };

  allChangesInAttributeCollections = (
    attributeId,
    oldAttributeCollection,
    editedAttributeCollection
  ) => {
    let changedElements = this.changeInAttributeCollection(
      attributeId,
      oldAttributeCollection,
      editedAttributeCollection
    );
    let addedElements = this.newCollectionElementsInArray(
      attributeId,
      oldAttributeCollection,
      editedAttributeCollection
    );

    let removedElements = this.deletedCollectionElementsInArray(
      attributeId,
      oldAttributeCollection,
      editedAttributeCollection
    );

    return {
      changedElements,
      addedElements,
      removedElements,
    };
  };

  changeInAttributeCollection = (
    attributeId,
    oldAttributeCollection,
    editedAttributeCollection
  ) => {
    let changes = [];
    oldAttributeCollection.forEach((old) => {
      editedAttributeCollection.forEach((edit) => {
        if (old.id === edit.id && old.value !== edit.value) {
          changes.push({
            key: attributeId,
            oldValue: old.value,
            newValue: edit.value,
          });
        }
      });
    });

    return changes;
  };

  newCollectionElementsInArray = (
    attributeId,
    oldAttributeCollection,
    editedAttributeCollection
  ) => {
    let newAttributes = [];
    editedAttributeCollection.forEach((edited) => {
      if (!oldAttributeCollection.find((o) => o.id === edited.id)) {
        newAttributes.push({
          key: attributeId,
          oldValue: null,
          newValue: edited.value,
        });
      }
    });
    return newAttributes;
  };

  deletedCollectionElementsInArray = (
    attributeId,
    oldAttributeCollection,
    editedAttributeCollection
  ) => {
    let newAttributes = [];
    oldAttributeCollection.forEach((old) => {
      if (!editedAttributeCollection.find((e) => e.id === old.id)) {
        newAttributes.push({
          key: attributeId,
          oldValue: old.value,
          newValue: null,
        });
      }
    });
    return newAttributes;
  };
}
