import { ConfirmDialog } from "primereact/confirmdialog";
import { SelectButton } from "primereact/selectbutton";
import { useEffect, useState } from "react";
import UpdateModelService from "../../services/model/UpdateModelService";
import "./Navbar.css";

const ConfirmRemoveKnowledgeBase = (props) => {
  const [removeMetrics, setRemoveMetrics] = useState("Nie");

  useEffect(() => {
    setRemoveMetrics("Nie");
  }, [props.visible]);

  return (
    <ConfirmDialog
      visible={props.visible}
      onHide={() => props.setVisible(false)}
      message={
        <div>
          <div className="m-1">
            <strong>Czy na pewno chcesz wyczyścić bazę wiedzy?</strong>
          </div>
          <div className="m-1 flex justify-content-around">
            <div className="my-auto">Usunąć także metryki?</div>
            <SelectButton
              className={`${
                removeMetrics === "Tak"
                  ? "confirm-remove-base-select-no"
                  : "confirm-remove-base-select-yes"
              } mt-1`}
              value={removeMetrics}
              options={["Tak", "Nie"]}
              onChange={(e) =>
                setRemoveMetrics((prev) => (e.value !== null ? e.value : prev))
              }
            />
          </div>
        </div>
      }
      header="Czyszczenie bazy wiedzy"
      icon="pi pi-trash"
      acceptClassName="p-button-danger"
      acceptLabel="Tak"
      rejectLabel="Nie"
      accept={() =>
        removeMetrics === "Tak"
          ? new UpdateModelService().clearKnowledgeBaseAndMetrics()
          : new UpdateModelService().clearKnowledgeBase()
      }
      reject={() => props.setVisible(false)}
    />
  );
};

export default ConfirmRemoveKnowledgeBase;
