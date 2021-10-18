/* eslint-disable react-hooks/exhaustive-deps */
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { InputText } from "primereact/inputtext";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DependencyService from "../../../services/dependency/DependencyService";
import DimensionsService from "../../../services/tools/DimensionsService";
import { changeHistory } from "../../../slice/HistorySlice";
import AttributeTypeTemplate from "../../custom/AttributeTypeTemplate/AttributeTypeTemplate";

const FactView = (props) => {
  const dispatch = useDispatch();

  const facts = useSelector((state) => state.file.value.facts);
  const [completeFacts, setCompleteFacts] = useState([]);

  const [globalFilter, setGlobalFilter] = useState("");

  useEffect(() => {
    dispatch(changeHistory("Facts"));
  }, []);

  useEffect(() => {
    setCompleteFacts(DependencyService.getCompleteFacts(facts));
  }, [facts]);

  const renderHeader = () => {
    return (
      <div className="space-between" style={{ fontSize: "17px" }}>
        <div style={{ marginTop: "auto", marginBottom: "auto" }}>
          Lista Faktów
        </div>
        <span className="p-input-icon-left">
          <i className="pi pi-search" />
          <InputText
            type="search"
            onInput={(e) => setGlobalFilter(e.target.value)}
            placeholder="Wyszukaj..."
          />
        </span>
      </div>
    );
  };

  const header = renderHeader();

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
          style={{ width: "100%" }}
          field="attributeName"
          header="Atrubut"
          bodyStyle={{ cursor: "default" }}
        />
        <Column
          style={{ width: "50%" }}
          field="operator"
          header="Operator"
          bodyStyle={{ cursor: "default" }}
        />
        <Column
          style={{ width: "100%" }}
          field="value"
          header="Wartość"
          bodyStyle={{ cursor: "default" }}
        />
        <Column
          style={{ width: "0px" }}
          field="attributeName"
          body={() => null}
        />
      </DataTable>
    </>
  );
};

export default FactView;
