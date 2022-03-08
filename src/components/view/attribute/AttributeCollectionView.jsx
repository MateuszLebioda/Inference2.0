import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";

const AttributeCollectionView = (props) => {
  return (
    props.elements && (
      <>
        <DataTable
          value={props.elements}
          className="disable-header"
          style={props.style}
        >
          <Column field="value" style={{ cursor: "default" }} />
        </DataTable>
      </>
    )
  );
};

export default AttributeCollectionView;
