import Importer from "./Importer";

export class JsonImporter extends Importer {
  importFromFile = (file) => {
    let newFile = JSON.parse(file);
    return Promise.resolve({
      attributes: newFile.attributes,
      facts: newFile.facts,
      rules: newFile.rules,
      metrics: newFile.metrics,
      name: newFile.name,
    });
  };
}
