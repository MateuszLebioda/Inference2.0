import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { attributeType } from "../../../model/attribute/AttributeType";
import FactService from "../../../model/fact/FactService";
import FactValidator, {
  FACT_ATTRIBUTES_ERRORS,
  FACT_VALUE_ERRORS,
} from "../../../services/validators/FactValidator";
import AttributeTypeTemplate from "../AttributeTypeTemplate/AttributeTypeTemplate";
import FactAttributeDropdown from "../FactAttributeDropdown/FactAttributeDropdown";
import FactValueDropdown from "../FactValueDropdown/FactValueDropdown";

const FactEditor = (props) => {
  const [fact, setFact] = useState(null);

  const factService = new FactService();
  const validator = new FactValidator();

  const attributes = useSelector((state) => state.file.value.attributes);

  useEffect(() => {
    let tempFact = { ...props.fact };
    if (props.newFact) {
      tempFact = factService.createEmptyFact();
      tempFact.type = attributeType.CONTINOUS;
    }
    tempFact = factService.getFactToEdit(tempFact);
    tempFact.errors = validator.validateEmptyValue(tempFact);
    tempFact.errors = validator.validateAttribute(tempFact);
    setFact(tempFact);
  }, []);

  const getNameOptions = () => {
    if (fact) {
      return attributes;
    }
    return [];
  };

  const updateFactAttribute = (value) => {
    let originalAttribute = getNameOptions().find((a) => a.id === value.id);
    let tempFact = {
      ...fact,
      value: null,
      attributeName: originalAttribute.value,
      attributeID: originalAttribute.id,
      type: originalAttribute.type,
    };
    tempFact.errors = validator.validateEmptyValue(tempFact);
    tempFact.errors = validator.validateAttribute(tempFact);
    setFact({
      ...tempFact,
    });
    props.updateFact(factService.mapEditFactToFact(tempFact));
  };

  const updateFactValue = (value) => {
    let tempFact = {
      ...fact,
      value: value,
    };
    let errors = validator.validateEmptyValue(tempFact);
    setFact({
      ...tempFact,
      errors: errors,
    });
    props.updateFact(factService.mapEditFactToFact(tempFact));
  };

  return (
    <div className={`flex ${props.className}`} style={props.style}>
      <AttributeTypeTemplate
        option={props.fact && props.fact.type}
        short
        className="mx-auto"
      />
      <FactAttributeDropdown
        noHeader
        value={props.fact && props.fact.attributeName}
        className="w-full ml-2"
        errors={
          fact && fact.errors.filter((e) => FACT_ATTRIBUTES_ERRORS.includes(e))
        }
        onChange={(e) => {
          updateFactAttribute(e);
        }}
      />
      <div className="m-auto mx-3"> = </div>
      <FactValueDropdown
        type={props.fact && props.fact.type}
        errors={
          fact && fact.errors.filter((e) => FACT_VALUE_ERRORS.includes(e))
        }
        noHeader
        value={props.fact && props.fact.value}
        className="w-full"
        attributeID={props.fact && props.fact.attributeID}
        onChange={(e) => updateFactValue(e)}
      />
    </div>
  );
};

export default FactEditor;
