const RuleDisplay = (props) => {
  return (
    <div style={{ ...props.style, paddingTop: "6px", cursor: "default" }}>
      {props.rule.attributeName} = {props.rule.value}
    </div>
  );
};

export default RuleDisplay;
