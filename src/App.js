import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import Navbar from "./components/navbar/Navbar";
import { BlockUI } from "primereact/blockui";
import { useSelector } from "react-redux";
import Content from "./components/content/Content";
import "./global-style.css";
import "./templateStyle.css";
import "./own-flex-style.css";
import "primereact/resources/themes/bootstrap4-light-blue/theme.css";
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
      {/* <TabView>
        <TabPanel header={file.value.name}> */}
      <Content />
      {/* </TabPanel>
      </TabView> */}
    </>
  );
};

export default App;
