import { useState, useEffect } from "react";
const axios = require("axios");

let tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() + 1);

export default function useApplicationData(initial) {
  const [search, setSearch] = useState({
    location: "",
    fromDate: new Date(tomorrow),
    toDate: new Date(tomorrow),
  });

  const setLocation = function (location) {
    setSearch((prev) => {
      return { ...prev, location };
    });
  };

  const setFromDate = function (fromDate) {
    setSearch((prev) => {
      return { ...prev, fromDate };
    });
  };

  const setToDate = function (toDate) {
    setSearch((prev) => {
      return { ...prev, toDate };
    });
  };

  useEffect(() => {
    axios
      .get("/api/cars")
      .then(function (response) {
        // handle success
        console.log(response);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  }, [search]);

  return {
    search,
    setSearch,
    setLocation,
    setFromDate,
    setToDate,
  };
}
