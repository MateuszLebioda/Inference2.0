import { JsonImporter } from "./JsonImporter";
import XmlImporter from "./XmlImporter";

class ImporterFactory {
  getImporter = (file) => {
    switch (file) {
      case ".xml":
        return new XmlImporter();
      case ".json":
        return new JsonImporter();
      default:
        return null;
    }
  };
}

export default new ImporterFactory();
