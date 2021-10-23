import { Button } from "primereact/button";

const PrimaryButton = (props) => {
  return (
    <Button
      label={props.label}
      icon={props.icon}
      className={`${props.className} p-button-rounded p-button-outlined`}
      onClick={() => props.onClick()}
      disabled={props.disabled}
    />
  );
};

export default PrimaryButton;
