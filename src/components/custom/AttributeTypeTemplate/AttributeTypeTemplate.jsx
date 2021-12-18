import "./AttributeTypeTemplate.css";

const AttributeTypeTemplate = (props) => {
  return (
    <span
      className={props.className + " attribute-type-template-" + props.option}
      style={{
        marginTop: "auto",
        marginBottom: "auto",
        cursor: "default",
        ...props.style,
      }}
    >
      {props.short && props.option ? props.option.slice(0, 1) : props.option}
    </span>
  );
};

AttributeTypeTemplate.defaultProps = {
  option: "",
};

export default AttributeTypeTemplate;
