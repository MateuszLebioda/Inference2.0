import { Router, Route, Switch } from "react-router-dom";
import AttributeView from "./attribute/AttributeView";
import history from "../../services/history";
import FactView from "./fact/FactView";
import RuleView from "./rules/RuleView";

const Content = () => {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/attributes" component={AttributeView} />
        <Route path="/facts" component={FactView} />
        <Route path="/rules" component={RuleView} />
        <Route path="/" component={AttributeView} />
      </Switch>
    </Router>
  );
};

export default Content;
