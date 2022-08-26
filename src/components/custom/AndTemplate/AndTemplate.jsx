const AndTemplate = (props) => {
  return (
    <span
      className={`template-style ${props.className}`}
      style={{
        marginTop: "auto",
        marginBottom: "auto",
        cursor: "default",
        backgroundColor: "#eccfff",
        color: "#694382",
        ...props.style,
      }}
    >
      AND
    </span>
  );
};

export default AndTemplate;
