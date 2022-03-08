import { Button } from "primereact/button";
import { v4 } from "uuid";
const ActionIconButton = (props) => {
  return (
    <Button
      style={props.style}
      icon={`pi ${props.icon}`}
      className={`p-button-rounded p-button-text ${props.className}`}
      onClick={props.action}
      tooltip={props.tooltip}
      tooltipOptions={{ position: props.tooltipPosition }}
      disabled={props.disabled}
    />
  );
};

ActionIconButton.defaultProps = {
  tooltipPosition: "right",
  disabled: false,
};

export const getButtonSectionWidth = (buttons) => {
  return `calc(35px + ${buttons.length * 35}px)`;
};

export const renderButtons = (button, element, key = null) => {
  return button.map((b, i) => renderButton(b, element, b.id ? b.id : i, key));
};

export const renderButton = (button, element, id, key = null) => {
  return (
    <ActionIconButton
      key={`${key ? `${key}-` : "attribute-button-"}${id ? id : v4()}`}
      icon={button.icon}
      style={button.style}
      className={button.className}
      tooltip={button.tooltip}
      tooltipPosition={button.tooltipPosition}
      disabled={button.disabled}
      action={(e) => button.action(element, e)}
    />
  );
};

export const buttonTemplate = {
  id: null,
  icon: null,
  style: null,
  className: null,
  tooltip: null,
  tooltipPosition: "left",
  disabled: false,
  action: () => {},
};

export const deleteButton = (action) => {
  return {
    ...buttonTemplate,
    className: "p-button-danger",
    icon: "pi-trash",
    action: action,
  };
};

export default ActionIconButton;
