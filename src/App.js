import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import Navbar from "./components/navbar/Navbar";
import { BlockUI } from "primereact/blockui";
import { useSelector } from "react-redux";
import "./global-style.css";
import "./templateStyle.css";
import "./own-flex-style.css";
import "primereact/resources/themes/bootstrap4-light-blue/theme.css";
import { addLocale, locale } from "primereact/api";
import { PL_LOCALE } from "./locale";
import Content from "./components/view/Content";
import ErrorBoundary from "./components/view/errorBoundary/ErrorBoundary";
const App = () => {
  const blockUI = useSelector((state) => state.block);
  addLocale("pl", PL_LOCALE);
  locale("pl");
  return (
    <>
      <BlockUI
        blocked={blockUI.value}
        // blocked={true}
        fullScreen
        template={
          <div>
            <i className="pi pi-spin pi-spinner" style={{ fontSize: "3em" }} />
            {blockUI.template && `${blockUI.template}`}
          </div>
        }
      />
      <Navbar />
      <ErrorBoundary>
        <Content />
      </ErrorBoundary>
    </>
  );
};

export default App;
