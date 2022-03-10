import IdService from "../../services/IdService";
import { RandomRGBColor } from "../../services/tools/RandomRGBColor";
import store from "../../store";
import moment from "moment";
import ExplainModel from "./ExplainModel";
import MetricsHelper from "./MetricsHelper";

export class Metrics {
  metricsHelper = new MetricsHelper();

  constructor(name, color, facts, goal, matchingStrategy) {
    this.id = IdService.getId([...store.getState().file.value.metrics]);
    this.color = color ? color : RandomRGBColor.getRandomColor();
    this.goal = goal ? goal : null;
    this.matchingStrategy = matchingStrategy;
    this.startFacts = (
      facts ? facts : [...store.getState().file.value.facts]
    ).map((f) => new ExplainModel(f));
  }

  id = null;
  name = null;
  date = null;
  timeStart = null;
  timeEnd = null;
  checkedRules = 0;
  activatedRules = [];
  startFacts = [];
  newFacts = [];
  goal = null;

  getAllFactExplainModels = () => {
    return [...this.startFacts, ...this.newFacts];
  };

  getAllFacts = () => {
    return this.getAllFactExplainModels().map((f) => f.fact);
  };

  getTotalTime = () => {
    return this.timeStart && this.timeEnd ? this.timeEnd - this.timeStart : 0;
  };

  getTotalTimeSecond = () => {
    return Math.round((this.getTotalTime() / 1000) * 1000) / 1000;
  };

  addNewFactExplainModel = (rule, explainModels) => {
    if (!this.factAlreadyExist(rule.conclusion)) {
      this.newFacts.push(
        new ExplainModel(rule.conclusion, rule, explainModels)
      );
    }
  };

  factAlreadyExist = (fact) => {
    return this.metricsHelper.factAlreadyExist(this.getAllFacts(), fact);
  };

  addActivatedRule = (rule) => {
    this.activatedRules.push(this.metricsHelper.getCompleteMetricRule(rule));
  };

  incrementCheckedRules = () => {
    this.checkedRules = this.checkedRules + 1;
  };

  startCountingTime = () => {
    this.timeStart = performance.now();
    this.date = new Date();
  };

  endCountingTime = () => {
    this.timeEnd = performance.now();
  };

  parseDate = (format = null) => {
    return moment(this.date).format(format ? format : "YYYY-MM-DD HH:MM:SS");
  };

  isGoalFulFilled = () => {
    return this.goal ? this.factAlreadyExist(this.goal) : false;
  };

  toPojo() {
    return {
      id: this.id,
      name: this.name,
      color: this.color,
      date: this.parseDate(),
      totalTime: this.getTotalTime(),
      totalTimeSecond: this.getTotalTimeSecond(),
      checkedRules: this.checkedRules,
      activatedRules: this.activatedRules,
      startFacts: this.startFacts,
      newFacts: this.newFacts,
      type: this.type,
      goal: this.goal,
      matchingStrategy: this.matchingStrategy.name,
    };
  }
}
