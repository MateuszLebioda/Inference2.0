import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import Navbar from "./components/navbar/Navbar";
import { BlockUI } from "primereact/blockui";
import { useSelector } from "react-redux";

const App = () => {
  const blockUI = useSelector((state) => state.block);

  return (
    <>
      <BlockUI
        blocked={blockUI.value}
        fullScreen
        template={
          <div>
            <i className="pi pi-spin pi-spinner" style={{ fontSize: "3em" }} />
            {blockUI.template && `${blockUI.template}`}
          </div>
        }
      />
      <Navbar />
    </>
  );
};

export default App;
