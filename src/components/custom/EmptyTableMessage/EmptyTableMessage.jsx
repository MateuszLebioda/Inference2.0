import { Card } from "primereact/card";

const EmptyTableMessage = (props) => {
  return (
    <Card
      style={{ minWidth: props.minWidth }}
      title={`Lista ${props.value}`}
      className={`text-center mx-auto mt-2 ${props.className}`}
    >
      Lista {props.value} jest pusta
    </Card>
  );
};

EmptyTableMessage.defaultProps = {
  minWidth: "40vw",
};

export default EmptyTableMessage;
