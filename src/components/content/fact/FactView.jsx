/* eslint-disable react-hooks/exhaustive-deps */
import { confirmDialog } from "primereact/confirmdialog";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import UpdateModelService from "../../../services/model/UpdateModelService";
import { changeHistory } from "../../../slice/HistorySlice";
import FactEditDialog from "./FactEditDialog";
import "./FactView.css";
import FactTable from "./FactTable";

const FactView = (props) => {
  const dispatch = useDispatch();
  const updateModelService = new UpdateModelService();

  const facts = useSelector((state) => state.file.value.facts);
  const attributes = useSelector((state) => state.file.value.attributes);

  const [editDialog, setEditDialog] = useState({
    fact: null,
    visible: false,
  });

  useEffect(() => {
    dispatch(changeHistory("Fakty"));
  }, []);

  useEffect(() => {}, [attributes]);

  const buttons = [
    {
      icon: "pi-trash",
      className: "p-button-danger",
      tooltip: "Usuń fakt",
      tooltipPosition: "left",
      action: (f) => {
        confirmDialog({
          position: "right",
          header: "Potwierdź usunięcie",
          message: "Czy na pewno chcesz usunąć fakt?",
          icon: "pi pi-trash",
          acceptClassName: "p-button-danger",
          acceptLabel: "Tak",
          rejectLabel: "Nie",
          style: { width: "400px" },
          accept: () => updateModelService.deleteFact(f),
          reject: () => {},
        });
      },
    },
    {
      icon: "pi-pencil",
      className: "p-button-success",
      tooltip: "Edytuj fakt",
      tooltipPosition: "left",
      action: (f) => {
        setEditDialog({
          fact: f,
          visible: true,
        });
      },
    },
  ];

  const menuItems = [
    {
      label: "Dodaj fakt",
      icon: "pi pi-plus",
      command: () => {
        setEditDialog({
          visible: true,
          fact: null,
          newFact: true,
        });
      },
    },
  ];

  return (
    <>
      <FactTable facts={facts} buttons={buttons} menuItems={menuItems} />
      <FactEditDialog
        visible={editDialog.visible}
        fact={editDialog.fact}
        newFact={editDialog.newFact}
        onHide={() =>
          setEditDialog({
            fact: null,
            visible: false,
          })
        }
        onSave={(e) => {
          delete e.attributeName;
          editDialog.newFact
            ? updateModelService.addNewFact(e)
            : updateModelService.updateFact(e);
          setEditDialog({
            fact: null,
            visible: false,
            newFact: false,
          });
        }}
      />
    </>
  );
};

export default FactView;
