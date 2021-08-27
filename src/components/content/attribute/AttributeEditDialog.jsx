/* eslint-disable react-hooks/exhaustive-deps */
import { Column } from "primereact/column";
import { confirmDialog } from "primereact/confirmdialog";
import { DataTable } from "primereact/datatable";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { useEffect, useRef } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import AttributeService, {
  TEMPORARY_ELEMENT,
} from "../../../model/attribute/AttributeService";
import { attributeType } from "../../../model/attribute/AttributeType";
import DependencyService from "../../../services/dependency/DependencyService";
import { usePrevious } from "../../../services/hook";
import UpdateModelService from "../../../services/model/UpdateModelService";
import AttributeValidator, {
  DEPENDENT_COLLECTION_ELEMENT,
} from "../../../services/validators/AttributeValidator";
import {
  blockUiWithMessage,
  SAVE_CHANGES,
  unBlockUi,
} from "../../../slice/BlockSlice";
import ActionIconButton from "../../custom/ActionIconButton/ActionIconButton";
import ActionLabelButton from "../../custom/ActionLabelButton/ActionLabelButton";
import AttributeTypeTemplate from "../../custom/AttributeTypeTemplate/AttributeTypeTemplate";
import FloatInput from "../../custom/FloatInput/FloatInput";
import IconLikeButton from "../../custom/IconLikeButton/IconLikeButton";
import "./AttributeEditDialog.css";
import { Toast } from "primereact/toast";
import { Menu } from "primereact/menu";
import AttributeTypeDropdown from "../../custom/AttributeTypeDropdown/AttributeTypeDropdown";

const AttributeEditDialog = (props) => {
  const attributeService = new AttributeService();
  const attributeValidator = new AttributeValidator();
  const updateModelService = new UpdateModelService();

  const dispatch = useDispatch();

  const toast = useRef(null);
  const menu = useRef(null);

  const menuItems = [
    {
      label: "Cofnij wszystkie zmiany",
      icon: "pi pi-refresh",
      command: () => {
        resetTempAttributes();
      },
    },
    {
      label: "Dodaj wartość",
      icon: "pi pi-plus",
      command: () => {
        addEmptyCollectionElement();
      },
    },
  ];

  const [tempAttribute, setTempAttribute] = useState(
    props.element && props.element
      ? attributeService.getAttributeToEdit(props.element)
      : null
  );

  const [globalFilter, setGlobalFilter] = useState("");
  const [dependencies, setDependencies] = useState(
    tempAttribute
      ? DependencyService.findDependencyToAttribute(tempAttribute)
      : null
  );

  const previousAttribute = usePrevious(tempAttribute);

  useEffect(() => {
    if (
      (tempAttribute &&
        previousAttribute &&
        tempAttribute.id !== previousAttribute.id) ||
      (tempAttribute && !previousAttribute)
    ) {
      setDependencies(
        DependencyService.findDependencyToAttribute(tempAttribute)
      );
    }
  }, [tempAttribute]);

  useEffect(() => {
    if (tempAttribute && !tempAttribute.type) {
      setTempAttribute({ ...tempAttribute, type: attributeType.CONTINOUS });
    }
  }, [tempAttribute]);

  useEffect(() => {
    if (props.visible) {
      setTempAttribute(attributeService.getAttributeToEdit(props.element));
    }
  }, [props.visible]);

  useEffect(() => {
    if (dependencies && tempAttribute) {
      let tempAttributes = { ...tempAttribute };
      tempAttributes.collections =
        attributeValidator.validateCollectionsDependency(
          tempAttribute.collections,
          dependencies
        );
      setTempAttribute(tempAttributes);
    }
  }, [dependencies]);

  useEffect(() => {
    if (props.element) {
      resetTempAttributes();
    }
  }, [props.element]);

  const resetTempAttributes = () => {
    setTempAttribute(attributeService.getAttributeToEdit(props.element));
    setDependencies(DependencyService.findDependencyToAttribute(props.element));
  };

  const handleDeleteAttributeCollectionElement = (element) => {
    if (attributeValidator.isElementDependent(element)) {
      confirmDialog({
        position: "right",
        header: "Wartość jest powiązany z faktami lub regułami",
        message: "Czy mimo to chcesz usunąć element?",
        icon: "pi pi-trash",
        acceptClassName: "p-button-danger",
        acceptLabel: "Tak",
        rejectLabel: "Nie",
        style: { width: "400px" },
        accept: () => deleteAttributeCollectionElement(element),
        reject: () => {},
      });
    } else {
      deleteAttributeCollectionElement(element);
    }
  };

  const deleteAttributeCollectionElement = (element) => {
    setTempAttribute(
      attributeService.deleteAttributeCollectionElement(tempAttribute, element)
    );
  };

  const changeElementCollectionValue = (element, value) => {
    setTempAttribute(
      attributeService.changeElementCollectionValue(
        tempAttribute,
        element,
        value
      )
    );
  };

  const changeAttributeValue = (value, name) => {
    setTempAttribute(
      attributeService.changeAttributeValue(tempAttribute, value, name)
    );
  };

  const addEmptyCollectionElement = () => {
    setTempAttribute(attributeService.addEmptyCollectionElement(tempAttribute));
  };

  const handleSave = () => {
    if (props.insertMode) {
      updateModelService.addAttribute(tempAttribute);
      props.onHide();
    } else {
      dispatch(blockUiWithMessage(SAVE_CHANGES));
      updateModelService.updateAttribute(tempAttribute).then((r) => {
        dispatch(unBlockUi());
        showBottomRight();
        props.onHide();
      });
    }
  };

  const showBottomRight = () => {
    toast.current.show({
      severity: "success",
      summary: "Zapisz",
      detail: "Pomyślnie zapisano element",
      life: 3000,
    });
  };

  const isFormValid = () => {
    return tempAttribute
      ? attributeValidator.isElementValid(tempAttribute)
      : false;
  };

  const dialogFooter = () => {
    return (
      <div className="start-from-right ">
        <ActionLabelButton
          label="Zapisz"
          icon="pi pi-save"
          disabled={
            attributeService.areEquals(tempAttribute, props.element) ||
            !isFormValid()
          }
          onClick={() => handleSave()}
        />
        {tempAttribute && tempAttribute.type === attributeType.SYMBOLIC && (
          <ActionLabelButton
            label="Dodaj wartość"
            icon="pi pi-plus"
            className="p-button-secondary"
            onClick={() => addEmptyCollectionElement()}
          />
        )}
      </div>
    );
  };

  const renderHeader = () => {
    return (
      <div className="space-between" style={{ fontSize: "15px" }}>
        <div
          style={{
            marginTop: "auto",
            marginBottom: "auto",
            marginLeft: "5px",
            cursor: "default",
          }}
        >
          Lista wartości
        </div>
        <div>
          <span className="p-input-icon-left">
            <i className="pi pi-search" />
            <InputText
              type="search"
              onInput={(e) => setGlobalFilter(e.target.value)}
              placeholder="Wyszukaj..."
            />
          </span>
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

  console.log(tempAttribute ? tempAttribute.type : null);

  return (
    <Dialog
      header={`Edycja atrybutu`}
      footer={dialogFooter()}
      visible={props.visible}
      style={{
        width: "50vw",
        height: `${
          tempAttribute && tempAttribute.type === attributeType.SYMBOLIC
            ? "80vh"
            : "200px"
        }`,
      }}
      onHide={() => props.onHide()}
    >
      {props.visible && tempAttribute && (
        <div className="space-between" style={{ paddingTop: "15px" }}>
          <FloatInput
            errors={tempAttribute && tempAttribute.errors}
            label="Nazwa"
            style={{ width: "100%", paddingRight: "5px" }}
            value={tempAttribute && tempAttribute.value}
            onChange={(e) => changeAttributeValue(e, "value")}
          />
          {tempAttribute.value !== tempAttribute.defaultValue && (
            <ActionIconButton
              style={{ width: "40px", marginRight: "5px" }}
              icon="pi-refresh"
              tooltip="Przywróć nazwę"
              action={() =>
                changeAttributeValue(tempAttribute.defaultValue, "value")
              }
            />
          )}

          {props.insertMode ? (
            <AttributeTypeDropdown
              selected={
                tempAttribute && tempAttribute.type
                  ? tempAttribute.type
                  : attributeType.CONTINOUS
              }
              changeType={(e) => changeAttributeValue(e, "type")}
            />
          ) : (
            <AttributeTypeTemplate
              option={tempAttribute && tempAttribute.type}
              style={{ width: "130px" }}
            />
          )}
        </div>
      )}
      {props.visible &&
        tempAttribute &&
        tempAttribute.type === attributeType.SYMBOLIC && (
          <div>
            <DataTable
              globalFilter={globalFilter}
              style={{ marginTop: "15px" }}
              value={[...tempAttribute.collections]}
              header={renderHeader()}
              headerStyle={{ padding: "5px" }}
              className="disable-header padding-header"
            >
              <Column
                field="value"
                style={{ paddingLeft: "20px" }}
                body={(element) => (
                  <FloatInput
                    value={element.value}
                    errors={element.errors}
                    onChange={(e) => changeElementCollectionValue(element, e)}
                  />
                )}
              />
              <Column
                style={{ width: "100px" }}
                body={(element) => (
                  <div className="start-from-right">
                    <ActionIconButton
                      icon="pi-trash"
                      className="p-button-danger"
                      tooltip="Usuń elementy"
                      action={() => {
                        handleDeleteAttributeCollectionElement(element);
                      }}
                    />
                    {!element.tempElement &&
                      element.value !== element.defaultValue && (
                        <ActionIconButton
                          icon="pi-refresh"
                          tooltip="Przywróć wartość"
                          action={() => {
                            changeElementCollectionValue(
                              element,
                              element.defaultValue
                            );
                          }}
                        />
                      )}
                    {element.tempElement && (
                      <IconLikeButton
                        icon="pi-plus"
                        className="temp-element-icon"
                        tooltip={TEMPORARY_ELEMENT}
                      />
                    )}
                    {attributeValidator.isElementDependent(element) && (
                      <IconLikeButton
                        icon="pi-lock"
                        tooltip={DEPENDENT_COLLECTION_ELEMENT.value}
                      />
                    )}
                  </div>
                )}
              />
            </DataTable>
          </div>
        )}
      <Toast ref={toast} position="bottom-right" />
      <Menu model={menuItems} popup ref={menu} id="popup_menu" />
    </Dialog>
  );
};

AttributeEditDialog.defaultProps = {
  insertMode: false,
};

export default AttributeEditDialog;
