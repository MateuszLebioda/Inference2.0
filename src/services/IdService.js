import { attributeType } from "../model/attribute/AttributeType";
import store from "../store";

class IdService {
  getId = (array) => {
    if (array.length === 0) return 0;
    return Math.max(...array.map((a) => a.id)) + 1;
  };

  getNextAttributeCollectionId = () => {
    let attributes = [...store.getState().file.value.attributes];

    const id =
      Math.max(
        ...attributes
          .filter((a) => a.type === attributeType.SYMBOLIC)
          .flatMap((a) => a.collections.flatMap((c) => Number(c.id)))
      ) + 1;

    return id;
  };
}
export default new IdService();
