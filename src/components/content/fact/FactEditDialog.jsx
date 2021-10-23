/* eslint-disable react-hooks/exhaustive-deps */
import { Dialog } from "primereact/dialog";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { attributeType } from "../../../model/attribute/AttributeType";
import FactService from "../../../model/fact/FactService";
import FactValidator, {
  FACT_VALUE_ERRORS,
} from "../../../services/validators/FactValidator";
import ActionIconButton from "../../custom/ActionIconButton/ActionIconButton";
import AttributeTypeTemplate from "../../custom/AttributeTypeTemplate/AttributeTypeTemplate";
import FloatDropdown from "../../custom/FloatDropdown/FloatDropdown";
import FloatInputNumber from "../../custom/FloatInputNumber/FloatInputNumber";
import PrimaryButton from "../../custom/PrimaryButton/PrimaryButton";

const FactEditDialog = (props) => {
  const factService = new FactService();
  const validator = new FactValidator();

  const attributes = useSelector((state) => state.file.value.attributes);

  const [fact, setFact] = useState(null);

  useEffect(() => {
    if (props.fact) {
      setFact(factService.getFactToEdit(props.fact));
    }
  }, [props.fact]);

  const getNameOptions = () => {
    if (props.fact) {
      return attributes.filter((a) => a.type === props.fact.type);
    }
    return [];
  };

  const getValueOptions = () => {
    if (fact) {
      let attribute = attributes.find((a) => a.id === fact.attributeID);
      if (attribute) {
        return attribute.collections;
      }
    }
    return [];
  };

  const updateFactAttribute = (value) => {
    let originalAttribute = getNameOptions().find((a) => a.value === value);
    let tempFact = {
      ...fact,
      value: null,
      attributeName: originalAttribute.value,
      attributeID: originalAttribute.id,
    };
    let errors = validator.validateEmptyValue(tempFact);
    setFact({
      ...tempFact,
      errors: errors,
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
      errors: [],
    });
  };

  const isFormValid = () => {
    return fact.errors.length === 0;
  };

  const handleSave = () => {
    let tempFact = { ...fact };
    delete tempFact.errors;
    delete tempFact.defaultAttributeID;
    delete tempFact.defaultValue;
    setFact(null);
    props.onSave(tempFact);
  };

  const dialogFooter = () => {
    return (
      <div className="start-from-right ">
        <PrimaryButton
          label="Zapisz"
          icon="pi pi-save"
          disabled={
            fact &&
            props.fact &&
            (factService.equals(fact, props.fact) || !isFormValid())
          }
          onClick={() => handleSave()}
        />
      </div>
    );
  };

  const getValueTemplate = () => {
    if (!fact) {
      return null;
    }
    if (fact.type === attributeType.SYMBOLIC) {
      return (
        <FloatDropdown
          errors={
            fact ? fact.errors.filter((e) => FACT_VALUE_ERRORS.includes(e)) : []
          }
          label="Wartość"
          style={{ width: "100%", marginRight: "15px" }}
          value={fact ? fact.value : ""}
          options={getValueOptions()}
          filter
          optionLabel="value"
          onChange={(e) => updateFactValue(e)}
        />
      );
    } else {
      return (
        <FloatInputNumber
          errors={
            fact ? fact.errors.filter((e) => FACT_VALUE_ERRORS.includes(e)) : []
          }
          label="Wartość"
          style={{ width: "100%", marginRight: "15px" }}
          value={fact ? fact.value : ""}
          onChange={(e) => updateFactValue(e)}
        />
      );
    }
  };

  const getButtonTemplate = () => {
    if (props.fact && fact && !factService.equals(fact, props.fact)) {
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
        <FloatDropdown
          label="Nazwa atrybutu"
          style={{ width: "100%" }}
          value={fact ? fact.attributeName : ""}
          options={getNameOptions()}
          filter
          optionLabel="value"
          onChange={(e) => updateFactAttribute(e)}
        />
        <div
          style={{ margin: "auto", paddingRight: "15px", paddingLeft: "15px" }}
        >
          =
        </div>
        {getValueTemplate()}
        {getButtonTemplate()}
        <AttributeTypeTemplate option={fact && fact.type} />
      </div>
    </Dialog>
  );
};

export default FactEditDialog;
