import { Card } from "primereact/card";
import { useHistory } from "react-router-dom";
import PrimaryButton from "../PrimaryButton/PrimaryButton";

const EmptyFunctionsList = (props) => {
  const history = useHistory();
  const footer = (
    <div className="flex justify-content-end">
      <PrimaryButton
        label="Przejdź do listy faktów"
        icon="pi pi-search"
        onClick={() => history.push("/facts")}
      />
    </div>
  );

  return (
    <Card
      className={props.className}
      title="Lista faktów jest pusta"
      style={{ width: "50vw", minWidth: "300px" }}
      footer={footer}
    >
      <p className="p-m-0" style={{ lineHeight: "1.5" }}>
        {`Do przeprowadzenie procesu wnioskowania niezbędna jest uzupełniona lista
        faktów. Aby uzupełnić listę przejdź do zakładki Dane > Fakty lub kliknij
        poniższy przycisk "Przejdź do listy faktów`}
      </p>
    </Card>
  );
};

export default EmptyFunctionsList;
