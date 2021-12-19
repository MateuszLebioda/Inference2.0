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
import ActionIconButton from "../../custom/ActionIconButton/ActionIconButton";
import AttributeTypeTemplate from "../../custom/AttributeTypeTemplate/AttributeTypeTemplate";
import PrimaryButton from "../../custom/PrimaryButton/PrimaryButton";
import RuleAttributeDropdown from "../../custom/RuleAttributeDropdown/RuleAttributeDropdown";
import RuleValueDropdown from "../../custom/RuleValueDropdown/RuleValueDropdown";

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

  const restoreDefaultValues = () => {
    let originalAttribute = getNameOptions().find(
      (a) => a.id === fact.defaultAttributeID
    );
    setFact({
      ...fact,
      value: fact.defaultValue,
      attributeName: originalAttribute.value,
      attributeID: fact.defaultAttributeID,
      type: fact.defaultType,
      errors: [],
    });
  };

  const isFormValid = () => {
    return fact && fact.errors.length === 0;
  };

  const handleSave = () => {
    let tempFact = { ...fact };
    delete tempFact.errors;
    delete tempFact.warnings;
    delete tempFact.defaultAttributeID;
    delete tempFact.defaultValue;
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

  const getButtonTemplate = () => {
    if (
      props.fact &&
      fact &&
      !factService.equals(fact, props.fact) &&
      !props.newFact
    ) {
      return (
        <ActionIconButton
          style={{ width: "80px", marginRight: "15px" }}
          icon="pi-refresh"
          tooltip="Przywróć pierwotne wartości"
          action={() => restoreDefaultValues()}
        />
      );
    }
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
      <div className="space-between" style={{ marginTop: "20px" }}>
        {fact && fact.attributeID && (
          <AttributeTypeTemplate
            option={fact && fact.type}
            short
            className="mr-2"
          />
        )}
        <RuleAttributeDropdown
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
        <div
          style={{ margin: "auto", paddingRight: "15px", paddingLeft: "15px" }}
        >
          =
        </div>
        <RuleValueDropdown
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
        {getButtonTemplate()}
      </div>
    </Dialog>
  );
};

export default FactEditDialog;
