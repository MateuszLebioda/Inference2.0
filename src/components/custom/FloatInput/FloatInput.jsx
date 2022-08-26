import { InputText } from "primereact/inputtext";
import DefaultValidator from "../../../services/validators/DefaultValidator";

const FloatInput = (props) => {
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
    <div className={`${props.className}`} style={props.style}>
      <span className={getClassName()} style={{ width: "100%" }}>
        {iconRequired() && <i className={`pi ${getIcon()}`} />}
        <InputText
          tooltip={getTooltipContent()}
          tooltipOptions={{ position: "left" }}
          className={inputClassName()}
          style={{ width: "100%" }}
          id="inputtext"
          value={props.value}
          onChange={(e) => props.onChange(e.target.value)}
        />
        {props.label && <label htmlFor="inputtext">{props.label}</label>}
      </span>
    </div>
  );
};

export default FloatInput;
