const RuleDisplay = (props) => {
  return (
    <div
      className={props.className}
      style={{ ...props.style, paddingTop: "6px", cursor: "default" }}
    >
      {props.rule.attributeName} {props.rule.operator} {props.rule.value}
    </div>
  );
};

export default RuleDisplay;
