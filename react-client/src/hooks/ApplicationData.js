import { useState } from "react";

let tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() + 1);

export default function useApplicationData(initial) {
  const [state, setState] = useState({
    location: "",
    fromDate: new Date(tomorrow),
    toDate: new Date(tomorrow),
  });

  const setLocation = function (location) {
    setState((prev) => {
      return { ...prev, location };
    });
  };

  const setFromDate = function (fromDate) {
    setState((prev) => {
      return { ...prev, fromDate };
    });
  };

  const setToDate = function (toDate) {
    setState((prev) => {
      return { ...prev, toDate };
    });
  };

  return {
    state,
    setState,
    setLocation,
    setFromDate,
    setToDate,
  };
}
