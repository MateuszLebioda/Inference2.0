import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { useEffect, useState } from "react";

const GlobalFilter = (props) => {
  const [value, setValue] = useState();

  useEffect(() => {
    setValue(props.value);
  }, [props.value]);

  return (
    <div>
      <div className="p-inputgroup">
        <InputText
          placeholder="Słowo klucz"
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            e.target.value === "" && props.changeValue("");
          }}
          onKeyDown={(e) => e.key === "Enter" && props.changeValue(value)}
        />
        <Button icon="pi pi-search" onClick={() => props.changeValue(value)} />
      </div>
    </div>
  );
};

export default GlobalFilter;
