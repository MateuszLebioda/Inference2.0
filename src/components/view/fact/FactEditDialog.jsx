/* eslint-disable react-hooks/exhaustive-deps */
import { Dialog } from "primereact/dialog";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { attributeType } from "../../../model/attribute/AttributeType";
import FactService from "../../../model/fact/FactService";
import FactValidator, {
  FACT_ATTRIBUTES_ERRORS,
  FACT_VALUE_ERRORS,
} from "../../../services/validators/FactValidator";
import AttributeTypeTemplate from "../../custom/AttributeTypeTemplate/AttributeTypeTemplate";
import FactAttributeDropdown from "../../custom/FactAttributeDropdown/FactAttributeDropdown";
import FactValueDropdown from "../../custom/FactValueDropdown/FactValueDropdown";
import PrimaryButton from "../../custom/PrimaryButton/PrimaryButton";
import "./FactEditDialog.css";

const FactEditDialog = (props) => {
  const factService = new FactService();
  const validator = new FactValidator();

  const attributes = useSelector((state) => state.file.value.attributes);

  const [fact, setFact] = useState(null);

  useEffect(() => {
    if (props.fact || props.newFact) {
      let tempFact = { ...props.fact };
      if (props.newFact) {
        tempFact = factService.createEmptyFact();
        tempFact.type = attributeType.CONTINOUS;
      }
      tempFact = factService.getFactToEdit(tempFact);
      tempFact.errors = validator.validateEmptyValue(tempFact);
      tempFact.errors = validator.validateAttribute(tempFact);
      setFact(tempFact);
    }
  }, [props.fact, props.newFact]);

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
  };

  const isFormValid = () => {
    return fact && fact.errors.length === 0;
  };

  const handleSave = () => {
    let tempFact = factService.mapEditFactToFact(fact);
    setFact(null);
    props.onSave(tempFact);
  };

  const dialogFooter = () => {
    let isDisabled =
      (fact != null &&
        props.fact != null &&
        factService.equals(fact, props.fact)) ||
      !isFormValid();
    return (
      <div className="start-from-right ">
        <PrimaryButton
          label="Zapisz"
          icon="pi pi-save"
          disabled={isDisabled}
          onClick={() => handleSave()}
        />
      </div>
    );
  };

  return (
    <Dialog
      header={`Edycja faktu`}
      footer={dialogFooter()}
      visible={props.visible}
      style={{
        width: "50vw",
        height: "200px",
      }}
      onHide={() => props.onHide()}
    >
      <div className="fact-edit-grid-container">
        <AttributeTypeTemplate
          option={fact && fact.type}
          short
          className="mx-auto"
        />
        <FactAttributeDropdown
          noHeader
          value={fact && fact.attributeName}
          className="w-full"
          errors={
            fact &&
            fact.errors.filter((e) => FACT_ATTRIBUTES_ERRORS.includes(e))
          }
          onChange={(e) => {
            updateFactAttribute(e);
          }}
        />
        <div className="m-auto"> = </div>
        <FactValueDropdown
          type={fact && fact.type}
          errors={
            fact && fact.errors.filter((e) => FACT_VALUE_ERRORS.includes(e))
          }
          noHeader
          value={fact && fact.value}
          className="w-full"
          attributeID={fact && fact.attributeID}
          onChange={(e) => updateFactValue(e)}
        />
      </div>
    </Dialog>
  );
};

export default FactEditDialog;
