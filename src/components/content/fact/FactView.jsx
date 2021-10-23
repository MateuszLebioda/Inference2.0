/* eslint-disable react-hooks/exhaustive-deps */
import { Column } from "primereact/column";
import { confirmDialog } from "primereact/confirmdialog";
import { DataTable } from "primereact/datatable";
import { InputText } from "primereact/inputtext";
import { Menu } from "primereact/menu";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DependencyService from "../../../services/dependency/DependencyService";
import UpdateModelService from "../../../services/model/UpdateModelService";
import DimensionsService from "../../../services/tools/DimensionsService";
import { changeHistory } from "../../../slice/HistorySlice";
import ActionIconButton from "../../custom/ActionIconButton/ActionIconButton";
import AttributeTypeTemplate from "../../custom/AttributeTypeTemplate/AttributeTypeTemplate";
import FactEditDialog from "./FactEditDialog";

const FactView = (props) => {
  const dispatch = useDispatch();
  const updateModelService = new UpdateModelService();
  const menu = useRef(null);

  const facts = useSelector((state) => state.file.value.facts);
  const attributes = useSelector((state) => state.file.value.attributes);

  const [completeFacts, setCompleteFacts] = useState([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [editDialog, setEditDialog] = useState({
    fact: null,
    visible: false,
  });

  useEffect(() => {
    dispatch(changeHistory("Facts"));
  }, []);

  useEffect(() => {
    setCompleteFacts(DependencyService.getCompleteFacts(facts));
  }, [facts]);

  useEffect(() => {}, attributes);

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

  const getButtonSectionWidth = () => {
    return `calc(35px + ${buttons.length * 35}px)`;
  };

  const renderHeader = () => {
    return (
      <div className="space-between" style={{ fontSize: "17px" }}>
        <div style={{ margin: "auto" }}>Lista Faktów</div>
        <span className="p-input-icon-left">
          <i className="pi pi-search" />
          <InputText
            type="search"
            onInput={(e) => setGlobalFilter(e.target.value)}
            placeholder="Wyszukaj..."
          />
          <ActionIconButton
            tooltip="Więcej..."
            icon="pi-ellipsis-v"
            className="p-button-secondary"
            action={(event) => menu.current.toggle(event)}
          />
        </span>
      </div>
    );
  };

  const buttonsTemplates = (fact) => {
    let buttonsSection = buttons.map((b, i) => (
      <ActionIconButton
        key={`attribute-button-${i}`}
        icon={b.icon}
        className={b.className}
        tooltip={b.tooltip}
        tooltipPosition={b.tooltipPosition}
        action={() => b.action(fact)}
      />
    ));
    return (
      <div className="start-from-right" start-from-right>
        {buttonsSection}
      </div>
    );
  };

  const header = renderHeader();

  const getAttributeTemplate = (fact) => {
    return (
      <div style={{ paddingLeft: "10px", textAlign: "right" }}>
        {fact.attributeName}
      </div>
    );
  };

  return (
    <>
      <DataTable
        className="row-padding"
        paginator={facts.length > 0}
        rows={DimensionsService.getStandardRowCount()}
        value={completeFacts}
        header={header}
        globalFilter={globalFilter}
      >
        <Column
          style={{ width: "105px" }}
          field="type"
          header="Typ"
          body={(a) => <AttributeTypeTemplate option={a.type} />}
        />
        <Column
          style={{ width: "100%", textAlign: "right" }}
          field="attributeName"
          header="Atrybut"
          body={(e) => getAttributeTemplate(e)}
          bodyStyle={{ cursor: "default" }}
        />
        <Column
          style={{ width: "175px", textAlign: "center" }}
          field="operator"
          header="Operator"
          bodyStyle={{ cursor: "default", textAlign: "center" }}
        />
        <Column
          style={{ width: "100%" }}
          field="value"
          header="Wartość"
          bodyStyle={{ cursor: "default" }}
        />
        <Column
          style={{ width: getButtonSectionWidth() }}
          body={(f) => buttonsTemplates(f)}
        />
        <Column
          style={{ width: "0px" }}
          field="attributeName"
          body={() => null}
        />
      </DataTable>
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

          if (editDialog.newFact) {
            updateModelService.addNewFact(e);
          } else {
            updateModelService.updateFact(e);
          }

          setEditDialog({
            fact: null,
            visible: false,
            newFact: false,
          });
        }}
      />
      <Menu model={menuItems} popup ref={menu} id="popup_menu" />
    </>
  );
};

export default FactView;
