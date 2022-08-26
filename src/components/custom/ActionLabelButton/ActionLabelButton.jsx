import { Button } from "primereact/button";

const ActionLabelButton = (props) => {
  return (
    <Button
      iconPos="right"
      label={props.label}
      icon={props.icon}
      className={`${props.className} p-button-rounded p-button-outlined`}
      onClick={() => props.onClick()}
      disabled={props.disabled}
    />
  );
};

export default ActionLabelButton;
