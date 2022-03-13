import Importer from "./Importer";
import store from "../../store";
export class JsonImporter extends Importer {
  importFromFile = (file) => {
    let newFile = JSON.parse(file);
    return Promise.resolve({
      attributes: newFile.attributes,
      facts: newFile.facts,
      rules: newFile.rules,
      metrics: [...newFile.metrics, ...store.getState().file.value.metrics],
      name: newFile.name,
    });
  };
}
