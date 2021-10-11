import { Button } from "primereact/button";
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

export default ActionIconButton;
