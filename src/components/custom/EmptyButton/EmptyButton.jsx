import ActionIconButton from "../ActionIconButton/ActionIconButton";

const EmptyButton = (props) => {
  return (
    <>
      <ActionIconButton
        icon=""
        disabled
        className="p-button-secondary py-0 cursor-default"
      />
    </>
  );
};

export default EmptyButton;
