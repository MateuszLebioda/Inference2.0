class AttributeService {
  createEmptyAttribute = (id = null, type = null) => {
    return {
      id: id,
      type: type,
      value: null,
      desc: null,
      collections: null,
    };
  };

  createEmptyAttributeCollectionElement = (id = null, value = null) => {
    return {
      id: id,
      value: value,
    };
  };
}

export default AttributeService;
