/* eslint-disable react-hooks/exhaustive-deps */
import { Column } from "primereact/column";
import { confirmDialog } from "primereact/confirmdialog";
import { DataTable } from "primereact/datatable";
import { Menu } from "primereact/menu";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DependencyService from "../../../services/dependency/DependencyService";
import UpdateModelService from "../../../services/model/UpdateModelService";
import { changeHistory } from "../../../slice/HistorySlice";
import ActionIconButton, {
  getButtonSectionWidth,
} from "../../custom/ActionIconButton/ActionIconButton";
import AttributeTypeTemplate from "../../custom/AttributeTypeTemplate/AttributeTypeTemplate";
import FactEditDialog from "./FactEditDialog";
import "./FactView.css";
import { FilterMatchMode, FilterOperator } from "primereact/api";
import AttributeTypeDropdown from "../../custom/AttributeTypeDropdown/AttributeTypeDropdown";
import GlobalFilter from "../../custom/GlobalFilter/GlobalFIlter";

const FactView = (props) => {
  const dispatch = useDispatch();
  const updateModelService = new UpdateModelService();
  const menu = useRef(null);

  const facts = useSelector((state) => state.file.value.facts);
  const attributes = useSelector((state) => state.file.value.attributes);

  const [completeFacts, setCompleteFacts] = useState([]);
  const [editDialog, setEditDialog] = useState({
    fact: null,
    visible: false,
  });

  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    type: { value: null, matchMode: FilterMatchMode.CONTAINS },
    attributeName: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }],
    },
    value: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }],
    },
  });

  useEffect(() => {
    dispatch(changeHistory("Fakty"));
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

  const renderHeader = () => {
    return (
      <div className="space-between" style={{ fontSize: "17px" }}>
        <div style={{ margin: "auto" }}>Lista Faktów</div>
        <div className="flex">
          <GlobalFilter
            value={filters.global.value}
            changeValue={(e) =>
              setFilters((prev) => ({
                ...prev,
                global: { ...prev.global, value: e },
              }))
            }
          />
          <ActionIconButton
            tooltip="Więcej..."
            icon="pi-ellipsis-v"
            className="p-button-secondary"
            action={(event) => menu.current.toggle(event)}
          />
        </div>
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

  const getAttributeTemplate = (fact) => {
    return <div className="pl-1 w-full text-right">{fact.attributeName}</div>;
  };

  const typeFilter = (options) => {
    return (
      <AttributeTypeDropdown
        placeholder="Wybierz typ"
        selected={options.value}
        changeType={(e) => options.filterCallback(e)}
      />
    );
  };

  return (
    <>
      <DataTable
        className="row-padding"
        paginator={facts.length > 0}
        rows={25}
        value={completeFacts}
        header={renderHeader()}
        filters={filters}
        scrollable
        scrollHeight="calc(100vh - 170px)"
      >
        <Column
          bodyClassName="fact-view-type-column"
          headerClassName="fact-view-type-column"
          field="type"
          header="Typ"
          filter
          filterElement={typeFilter}
          showFilterMatchModes={false}
          body={(a) => <AttributeTypeTemplate option={a.type} />}
        />
        <Column
          bodyClassName="fact-view-attribute- cursor-default"
          headerClassName="fact-view-attribute-column"
          field="attributeName"
          header={() => <div className="w-full text-right">Atrybut</div>}
          filter
          body={(e) => getAttributeTemplate(e)}
        />
        <Column
          bodyClassName="fact-view-operator-column cursor-default"
          headerClassName="fact-view-operator-column"
          field="operator"
          header="Operator"
          body={(e) => <div className="mx-auto">{e.operator}</div>}
        />
        <Column
          bodyClassName="fact-view-value-column cursor-default"
          headerClassName="fact-view-value-column"
          field="value"
          header="Wartość"
          filter
        />
        <Column
          bodyClassName="fact-view-value-column"
          headerClassName="fact-view-value-column"
          bodyStyle={{ flex: `0 0 ${getButtonSectionWidth(buttons)}` }}
          headerStyle={{ flex: `0 0 ${getButtonSectionWidth(buttons)}` }}
          body={(f) => buttonsTemplates(f)}
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
