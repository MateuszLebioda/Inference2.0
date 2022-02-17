import { Button } from "primereact/button";

const SecondaryActionButton = (props) => {
  return (
    <Button
      label={props.label}
      icon={props.icon}
      className={`${props.className} p-button-rounded p-button-outlined p-button-secondary`}
      onClick={() => props.onClick()}
      disabled={props.disabled}
    />
  );
};

export default SecondaryActionButton;
