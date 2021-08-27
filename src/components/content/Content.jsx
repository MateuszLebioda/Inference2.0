import { TabView, TabPanel } from "primereact/tabview";
import AttributeView from "./attribute/AttributeView";

const Content = () => {
  //   const file = useSelector((state) => state.file);

  return (
    <TabView>
      <TabPanel header={"Atrybuty"}>
        <AttributeView />
      </TabPanel>
      <TabPanel header={"Fakty"}></TabPanel>
      <TabPanel header={"Reguły"}></TabPanel>
    </TabView>
  );
};

export default Content;
