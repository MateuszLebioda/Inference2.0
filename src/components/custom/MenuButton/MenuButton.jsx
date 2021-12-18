import { Menu } from "primereact/menu";
import { useRef } from "react";
import ActionIconButton from "../ActionIconButton/ActionIconButton";

const MenuButton = (props) => {
  const menu = useRef(null);

  return (
    <>
      <ActionIconButton
        tooltip="Więcej..."
        icon="pi-ellipsis-v"
        className="p-button-secondary py-0"
        action={(event) => menu.current.toggle(event)}
      />
      <Menu model={props.menuItems} popup ref={menu} id="popup_menu" />
    </>
  );
};

export default MenuButton;
