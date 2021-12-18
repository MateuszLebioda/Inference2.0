import DefaultValidator from "../../../services/validators/DefaultValidator";
import { InputNumber } from "primereact/inputnumber";
import "./FloatInputNumber.css";

const FloatInputNumber = (props) => {
  const defaultValidator = new DefaultValidator();

  const iconRequired = () => {
    return haveError();
  };

  const haveError = () => {
    return props.errors && props.errors.length > 0;
  };

  const getClassName = () => {
    let className = `${props.className} p-float-label ${
      iconRequired() ? "p-input-icon-left" : ""
    }`;

    if (haveError()) {
      className = `${className} error-icon-color`;
    }

    return className;
  };

  const getIcon = () => {
    if (haveError()) {
      return "pi-exclamation-triangle";
    }
    return "";
  };

  const getTooltipContent = () => {
    if (haveError()) {
      return defaultValidator.displayErrors(props.errors);
    }
    return null;
  };

  const inputClassName = () => {
    if (haveError()) {
      return "p-invalid";
    }
    return "";
  };

  return (
    <div
      className={`p-field p-col-12 p-md-4 ${props.className}`}
      style={props.style}
    >
      <span className={getClassName()} style={{ width: "100%" }}>
        {iconRequired() && <i className={`pi ${getIcon()}`} />}
        <InputNumber
          mode={props.mode}
          tooltip={getTooltipContent()}
          tooltipOptions={{ position: "left" }}
          className={`${inputClassName()} input-number-width`}
          id="inputtext"
          value={props.value}
          onChange={(e) => props.onChange(e.value)}
        />
        {props.label && <label htmlFor="inputtext">{props.label}</label>}
      </span>
    </div>
  );
};

FloatInputNumber.defaultProps = {
  mode: "decimal",
};

export default FloatInputNumber;
