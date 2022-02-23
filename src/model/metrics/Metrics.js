import IdService from "../../services/IdService";
import { RandomRGBColor } from "../../services/tools/RandomRGBColor";
import store from "../../store";
import moment from "moment";
import ExplainModel from "../../services/inference/forward/ExplainModel";

export class Metrics {
  constructor(name, color, facts, goal) {
    this.id = IdService.getId([...store.getState().file.value.metrics]);
    this.name = name === "" ? `Wnioskowanie numer ${this.id + 1}` : name;
    this.color = color ? color : RandomRGBColor.getRandomColor();
    this.goal = goal ? goal : null;
    this.startFacts = (
      facts ? facts : [...store.getState().file.value.facts]
    ).map((f) => new ExplainModel(f));
  }

  id = null;
  name = null;
  date = null;
  timeStart = null;
  timeEnd = null;
  iterations = 0;
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
    this.newFacts.push(new ExplainModel(rule.conclusion, rule, explainModels));
  };

  addActivatedRule = (rule) => {
    this.activatedRules.push({ ...rule });
  };

  incrementIterations = () => {
    this.iterations = this.iterations + 1;
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

  toPojo() {
    return {
      id: this.id,
      name: this.name,
      color: this.color,
      date: this.parseDate(),
      totalTime: this.getTotalTime(),
      totalTimeSecond: this.getTotalTimeSecond(),
      iterations: this.iterations,
      checkedRules: this.checkedRules,
      activatedRules: this.activatedRules,
      startFacts: this.startFacts,
      newFacts: this.newFacts,
      type: this.type,
      goa: this.goal,
    };
  }
}
