import ImporterFactory from "../../services/importers/ImporterFactory";
import { JsonImporter } from "../../services/importers/JsonImporter";
import XmlImporter from "../../services/importers/XmlImporter";

test("Make sure factory return correct xml importer", () => {
  expect(ImporterFactory.getImporter(".xml")).toBeInstanceOf(XmlImporter);
});

test("Make sure factory return correct .json importer", () => {
  expect(ImporterFactory.getImporter(".json")).toBeInstanceOf(JsonImporter);
});
