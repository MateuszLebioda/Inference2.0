import { Tooltip } from "primereact/tooltip";

const IconLikeButton = (props) => {
  return (
    <div className={`${props.className} p-d-flex p-ai-center icon-tooltip`}>
      <Tooltip target=".icon-tooltip" content={props.tooltip} />
      <i
        className={`pi ${props.icon}`}
        style={{ padding: "8.5px", paddingBottom: 0 }}
      ></i>
    </div>
  );
};

export default IconLikeButton;
