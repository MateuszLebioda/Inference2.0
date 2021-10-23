import "./AttributeTypeTemplate.css";

const AttributeTypeTemplate = (props) => {
  return (
    <span
      className={"attribute-type-template-" + props.option}
      style={{
        marginTop: "auto",
        marginBottom: "auto",
        cursor: "default",
        ...props.style,
      }}
    >
      {props.option}
    </span>
  );
};

export default AttributeTypeTemplate;
