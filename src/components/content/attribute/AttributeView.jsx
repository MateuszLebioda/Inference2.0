/* eslint-disable react-hooks/exhaustive-deps */
import { useDispatch, useSelector } from "react-redux";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { useEffect, useState } from "react";
import AttributeTypeTemplate from "../../custom/AttributeTypeTemplate/AttributeTypeTemplate";
import ActionIconButton, {
  getButtonSectionWidth,
} from "../../custom/ActionIconButton/ActionIconButton";
import { removeAttribute } from "../../../slice/FileSlice";
import { Dialog } from "primereact/dialog";
import { attributeType } from "../../../model/attribute/AttributeType";
import AttributeCollectionView from "./AttributeCollectionView";
import "./AttributeView.css";
import { confirmDialog } from "primereact/confirmdialog";
import DependencyService from "../../../services/dependency/DependencyService";
import AttributeEditDialog from "./AttributeEditDialog";
import IconLikeButton from "../../custom/IconLikeButton/IconLikeButton";
import { DEPENDENT_ATTRIBUTE } from "../../../services/validators/AttributeValidator";
import AttributeService from "../../../model/attribute/AttributeService";
import IdService from "../../../services/IdService";
import { changeHistory } from "../../../slice/HistorySlice";
import UpdateModelService from "../../../services/model/UpdateModelService";
import { FilterMatchMode, FilterOperator } from "primereact/api";
import AttributeTypeDropdown from "../../custom/AttributeTypeDropdown/AttributeTypeDropdown";
import GlobalFilter from "../../custom/GlobalFilter/GlobalFIlter";
import MenuButton from "../../custom/MenuButton/MenuButton";

const AttributeView = () => {
  const updateModelService = new UpdateModelService();
  const attributeService = new AttributeService();

  useEffect(() => {
    dispatch(changeHistory("Atrybuty"));
  }, []);

  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    type: { value: null, matchMode: FilterMatchMode.CONTAINS },
    value: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }],
    },
  });

  const menuItems = [
    {
      label: "Dodaj atrybut",
      icon: "pi pi-plus",
      command: () => {
        setEditDialog({
          visible: true,
          attribute: attributeService.createEmptyAttribute(
            IdService.getId(attributes)
          ),
          newAttribute: true,
        });
      },
    },
  ];

  const getDefaultDialogValue = () => {
    return {
      visible: false,
      attribute: null,
      newAttribute: false,
    };
  };

  const [collectionDialog, setCollectionDialog] = useState(
    getDefaultDialogValue()
  );

  const [editDialog, setEditDialog] = useState(getDefaultDialogValue());

  const dispatch = useDispatch();

  const attributes = useSelector((state) => state.file.value.attributes);

  useEffect(() => {
    if (editDialog.attribute) {
      setEditDialog({
        ...editDialog,
        attribute: attributes.find((a) => a.id === editDialog.attribute.id),
      });
    }
  }, [attributes]);

  const buttons = [
    {
      icon: "pi-trash",
      className: "p-button-danger",
      tooltip: "Usuń atrybut",
      tooltipPosition: "left",
      action: (a) => {
        let dependencies = DependencyService.findDependencyToAttribute(a);
        if (
          dependencies.dependentRules.length > 0 ||
          dependencies.dependentFacts.length
        ) {
          confirmDialog({
            position: "right",
            message: "Czy mimo to chcesz usunąć element?",
            header: "Atrybut jest powiązany z faktami lub regułami",
            icon: "pi pi-trash",
            acceptClassName: "p-button-danger",
            acceptLabel: "Tak",
            rejectLabel: "Nie",
            style: { width: "400px" },
            accept: () =>
              updateModelService.deleteAttributes(a).then((r) => {}),
            reject: () => {},
          });
        } else {
          dispatch(removeAttribute(a));
        }
      },
    },
    {
      icon: "pi-pencil",
      className: "p-button-success",
      tooltip: "Edytuj atrybut",
      tooltipPosition: "left",
      action: (a) => {
        setEditDialog({
          visible: true,
          attribute: a,
        });
      },
    },
    {
      icon: "pi-sitemap",
      tooltip: "Podgląd elementów",
      tooltipPosition: "left",
      type: attributeType.SYMBOLIC,
      action: (a) =>
        setCollectionDialog({
          visible: true,
          attribute: a,
          newAttribute: false,
        }),
    },
  ];

  const renderHeader = () => {
    return (
      <div className="space-between" style={{ fontSize: "17px" }}>
        <div
          style={{
            margin: "auto",
          }}
        >
          Lista Atrybutów
        </div>
        <span className="flex">
          <GlobalFilter
            value={filters.global.value}
            changeValue={(e) =>
              setFilters((prev) => ({
                ...prev,
                global: { ...prev.global, value: e },
              }))
            }
          />
          <MenuButton menuItems={menuItems} />
        </span>
      </div>
    );
  };

  const renderButtonSection = (attribute) => {
    let tempButtons = buttons.map((b, i) =>
      !b.type || b.type === attribute.type ? (
        <ActionIconButton
          key={`attribute-button-${i}`}
          icon={b.icon}
          className={b.className}
          tooltip={b.tooltip}
          tooltipPosition={b.tooltipPosition}
          action={() => b.action(attribute)}
        />
      ) : null
    );

    if (DependencyService.isAttributeDependent(attribute)) {
      tempButtons.push(
        <IconLikeButton icon="pi-lock" tooltip={DEPENDENT_ATTRIBUTE.value} />
      );
    }

    return tempButtons;
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
        paginator={attributes.length > 0}
        rows={25}
        value={attributes}
        header={renderHeader()}
        scrollable
        scrollHeight="calc(100vh - 170px)"
        filters={filters}
      >
        <Column
          bodyClassName="attribute-view-type-column"
          headerClassName="attribute-view-type-column"
          field="type"
          header="Typ"
          filter
          filterElement={typeFilter}
          showFilterMatchModes={false}
          body={(a) => <AttributeTypeTemplate option={a.type} />}
        />
        <Column
          bodyClassName="attribute-view-name-column"
          headerClassName="attribute-view-name-column"
          field="value"
          header="Nazwa"
          filter
          bodyStyle={{ cursor: "default" }}
        />
        <Column
          bodyClassName="attribute-view-name-column"
          headerClassName="attribute-view-name-column"
          bodyStyle={{ flex: `0 0 ${getButtonSectionWidth(buttons)}` }}
          headerStyle={{ flex: `0 0 ${getButtonSectionWidth(buttons)}` }}
          body={(e) => (
            <div className="start-from-right" start-from-right>
              {renderButtonSection(e)}
            </div>
          )}
        />
      </DataTable>
      <Dialog
        header={`${
          collectionDialog.attribute && collectionDialog.attribute.value
        }`}
        contentStyle={{ paddingTop: "0px" }}
        visible={collectionDialog.visible}
        style={{ width: "30vw", height: "60vh" }}
        onHide={() => setCollectionDialog(getDefaultDialogValue())}
      >
        <AttributeCollectionView
          style={{ paddingTop: "-5px" }}
          elements={
            collectionDialog.attribute && collectionDialog.attribute.collections
          }
        />
      </Dialog>

      <AttributeEditDialog
        element={editDialog.attribute}
        visible={editDialog.visible}
        onHide={() => setEditDialog(getDefaultDialogValue())}
        insertMode={editDialog.newAttribute}
      />
    </>
  );
};

export default AttributeView;
