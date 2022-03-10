import { FreshMatchingStrategy } from "./FreshMatchingStrategy";
import { OrderMatchingStrategy } from "./OrderMatchingStrategy";
import { RandomMatchingStrategy } from "./RandomMatchingStrategy";
import { SpecificityMatchingStrategy } from "./SpecificityMatchingStrategy";

let id = 0;

export const ORDER_MATCH_STRATEGY = {
  id: id++,
  name: "Kolejności",
  desc: "Strategia kolejności zakłada wybór reguł zgodnie z kolejnością ich występowania w bazie wiedzy.",
  implementation: new OrderMatchingStrategy(),
};

export const FRESH_MATCH_STRATEGY = {
  id: id++,
  name: "Świeżości",
  desc: "Strategia świeżości zakłada w pierwszej kolejności wybór reguł najpóźniej dodanych do bazy wiedzy.",
  implementation: new FreshMatchingStrategy(),
};

export const RANDOM_MATCH_STRATEGY = {
  id: id++,
  name: "Przypadkowości",
  desc: "Strategia przypadkowości dobiera reguł w sposób losowy.",
  implementation: new RandomMatchingStrategy(),
};

export const SPECIFICITY_MATCH_STRATEGY = {
  id: id++,
  name: "Specyficzności",
  desc: "Strategia specyficzności zakłada wybór reguły według ilości warunków reguły. Reguła o większej liczbie warunków zyskuje większy priorytet",
  implementation: new SpecificityMatchingStrategy(),
};

export const RuleMatchingStrategies = [
  ORDER_MATCH_STRATEGY,
  FRESH_MATCH_STRATEGY,
  RANDOM_MATCH_STRATEGY,
  SPECIFICITY_MATCH_STRATEGY,
];
