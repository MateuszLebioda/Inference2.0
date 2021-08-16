import XmlImporter from "./XmlImporter";

class ImporterFactory {
  getImporter = (file) => {
    switch (file) {
      case ".xml":
        return new XmlImporter();
      default:
        return null;
    }
  };
}

export default new ImporterFactory();
