/* eslint-disable react-hooks/exhaustive-deps */
import { useDispatch, useSelector } from "react-redux";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { useEffect, useRef, useState } from "react";
import AttributeTypeTemplate from "../../custom/AttributeTypeTemplate/AttributeTypeTemplate";
import ActionIconButton from "../../custom/ActionIconButton/ActionIconButton";
import { removeAttribute } from "../../../slice/FileSlice";
import { Dialog } from "primereact/dialog";
import { attributeType } from "../../../model/attribute/AttributeType";
import AttributeCollectionView from "./AttributeCollectionView";
import "./AttributeView.css";
import { confirmDialog } from "primereact/confirmdialog";
import DependencyService from "../../../services/dependency/DependencyService";
import DimensionsService from "../../../services/tools/DimensionsService";
import AttributeEditDialog from "./AttributeEditDialog";
import IconLikeButton from "../../custom/IconLikeButton/IconLikeButton";
import { DEPENDENT_ATTRIBUTE } from "../../../services/validators/AttributeValidator";
import { Menu } from "primereact/menu";
import AttributeService from "../../../model/attribute/AttributeService";
import IdService from "../../../services/IdService";
import UpdateModelService from "../../../services/model/UpdateModelService";
import { changeHistory } from "../../../slice/HistorySlice";

const AttributeView = () => {
  const updateModelService = new UpdateModelService();
  const menu = useRef(null);
  const attributeService = new AttributeService();

  useEffect(() => {
    dispatch(changeHistory("Attributes"));
  }, []);

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

  const [globalFilter, setGlobalFilter] = useState("");
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
        <div style={{ marginTop: "auto", marginBottom: "auto" }}>
          Lista Atrybutów
        </div>
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

  const getButtonSectionWidth = () => {
    return `calc(35px + ${buttons.length * 35}px)`;
  };

  const header = renderHeader();

  return (
    <>
      <DataTable
        className="row-padding"
        paginator={attributes.length > 0}
        rows={DimensionsService.getStandardRowCount()}
        value={attributes}
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
          style={{ width: "100%" }}
          field="value"
          header="Nazwa"
          bodyStyle={{ cursor: "default" }}
        />
        <Column
          style={{ width: getButtonSectionWidth() }}
          body={(e) => (
            <div className="start-from-right" start-from-right>
              {renderButtonSection(e)}
            </div>
          )}
        />
        <Column style={{ width: "0px" }} body={() => null} />
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
      <Menu model={menuItems} popup ref={menu} id="popup_menu" />
    </>
  );
};

export default AttributeView;
