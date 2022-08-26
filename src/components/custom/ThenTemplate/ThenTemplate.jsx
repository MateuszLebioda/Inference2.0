const ThenTemplate = (props) => {
  return (
    <span
      className={`template-style ${props.className}`}
      style={{
        marginTop: "auto",
        marginBottom: "auto",
        cursor: "default",
        backgroundColor: "#ffd8b2",
        color: "#805b36",
        ...props.style,
      }}
    >
      THEN
    </span>
  );
};

export default ThenTemplate;
