import { createBrowserHistory } from "history";
export default createBrowserHistory();

export const getHistoryValue = () => {
  return (
    createBrowserHistory()
      .location.pathname.replace("/", "")
      .charAt(0)
      .toUpperCase() +
    createBrowserHistory(0).location.pathname.replace("/", "").slice(1)
  );
};
