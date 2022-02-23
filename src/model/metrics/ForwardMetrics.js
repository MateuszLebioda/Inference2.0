import { inferenceType } from "./InferenceType";
import { Metrics } from "./Metrics";

export class ForwardMetrics extends Metrics {
  constructor(name, color, facts, goal) {
    super(name, color, facts, goal);
    this.type = inferenceType.FORWARD;
  }
}
