import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import ActionIconButton from "../ActionIconButton/ActionIconButton";
import AttributeTypeTemplate from "../AttributeTypeTemplate/AttributeTypeTemplate";
import EmptyButton from "../EmptyButton/EmptyButton";
import MenuButton from "../MenuButton/MenuButton";
import OperatorDropdown from "../OperatorDropdown/OperatorDropdown";
import RuleAttributeDropdown from "../RuleAttributeDropdown/RuleAttributeDropdown";
import RuleValueDropdown from "../RuleValueDropdown/RuleValueDropdown";

const ConditionsTable = (props) => {
  const conditionNameTemplate = (e) => {
    return (
      <RuleAttributeDropdown
        noHeader
        value={e && e.attributeName}
        className="w-full"
        onChange={(newAttribute) => {
          props.changeName(newAttribute, e);
        }}
      />
    );
  };

  const conditionValueTemplate = (e) => {
    return (
      <RuleValueDropdown
        type={e.type}
        noHeader
        value={e && e.value}
        className="w-full"
        attributeID={e && e.attributeID}
        onChange={(newValue) => props.changeValue(newValue, e)}
      />
    );
  };

  const getButtonSectionWidth = () => {
    return `calc(13px + ${props.buttons.length * 31}px)`;
  };

  const renderButtonSection = (condition) => {
    return props.buttons.map((b, i) =>
      !b.type || b.type === condition.type ? (
        <ActionIconButton
          key={`attribute-button-${i}`}
          icon={b.icon}
          className={b.className}
          tooltip={b.tooltip}
          tooltipPosition={b.tooltipPosition}
          action={() => b.action(condition)}
        />
      ) : null
    );
  };

  return (
    <DataTable
      id="table"
      scrollable={props.scrollHeight}
      scrollHeight={props.scrollHeight}
      header={props.header}
      value={props.conditions ? props.conditions : []}
      style={{ minWidth: "500px" }}
    >
      <Column
        className="w-2rem px-2"
        body={(e) => <AttributeTypeTemplate short option={e.type} />}
      />
      <Column
        header="Nazwa atrybutu"
        className="w-5p px-2"
        body={(e) => conditionNameTemplate(e)}
      />
      <Column
        className={`text-center ${
          props.disableOperationChange ? "w-3rem" : "w-7rem"
        } px-2`}
        body={(e) =>
          props.disableOperationChange ? (
            e.operator
          ) : (
            <OperatorDropdown
              value={e.operator}
              className="w-full"
              onChange={(operator) =>
                props.changeOperator && props.changeOperator(operator, e)
              }
              type={e.type}
            />
          )
        }
      />
      <Column
        header="Wartość"
        className="w-5p px-2"
        body={(e) => conditionValueTemplate(e)}
      />
      <Column
        className="px-2"
        headerClassName="py-1"
        header={
          <div className="flex justify-content-end">
            {props.menuItems ? (
              <MenuButton menuItems={props.menuItems} />
            ) : (
              <EmptyButton />
            )}
          </div>
        }
        style={{ width: getButtonSectionWidth() }}
        body={(c) => renderButtonSection(c)}
      />
    </DataTable>
  );
};

ConditionsTable.defaultProps = {
  buttons: [],
  menuItems: null,
  conditions: null,
  header: null,
  disableOperationChange: false,
  scrollHeight: null,
};

export default ConditionsTable;
