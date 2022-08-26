import { Menu } from "primereact/menu";
import { useRef } from "react";
import {
  buttonTemplate,
  renderButton,
} from "../ActionIconButton/ActionIconButton";

const MenuButton = (props) => {
  const menu = useRef(null);

  const button = {
    ...buttonTemplate,
    tooltip: "Więcej...",
    tooltipPosition: props.tooltipPosition ? props.tooltipPosition : "left",
    icon: "pi-ellipsis-v",
    className: "p-button-secondary py-0",
    action: (x, event) => {
      menu.current.toggle(event);
    },
  };

  return (
    <>
      {renderButton(button)}
      <Menu model={props.menuItems} popup ref={menu} id="popup_menu" />
    </>
  );
};

MenuButton.defaultProps = {
  menuItems: [],
};

export default MenuButton;
