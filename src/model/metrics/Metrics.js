import IdService from "../../services/IdService";
import { RandomRGBColor } from "../../services/tools/RandomRGBColor";
import store from "../../store";

export class Metrics {
  constructor(name, color) {
    this.id = IdService.getId([...store.getState().file.value.metrics]);
    this.name = name === "" ? `Wnioskowanie numer ${this.id + 1}` : name;
    this.color = color ? color : RandomRGBColor.getRandomColor();
  }

  id = null;
  name = null;
  date = null;
  timeStart = null;
  timeEnd = null;
  iterations = 0;
  checkedRules = 0;
  activatedRules = [];
  oldFacts = [];
  newFacts = [];
  getAllFacts = () => {
    return [...this.oldFacts, ...this.newFacts];
  };
  getTotalTime = () => {
    return this.timeStart && this.timeEnd ? this.timeEnd - this.timeStart : 0;
  };
  getTotalTimeSecond = () => {
    return Math.round((this.getTotalTime() / 1000) * 1000) / 1000;
  };
  setOldFacts = (facts) => {
    this.oldFacts = [...facts];
  };
  addNewFact = (fact) => {
    this.newFacts.push({ ...fact });
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

  toPojo = () => {
    return {
      id: this.id,
      name: this.name,
      date: this.date,
      totalTime: this.getTotalTime(),
      totalTimeSecond: this.getTotalTimeSecond(),
      iterations: this.iterations,
      checkedRules: this.checkedRules,
      activatedRules: this.activatedRules,
      oldFacts: this.oldFacts,
      newFacts: this.newFacts,
    };
  };
}
