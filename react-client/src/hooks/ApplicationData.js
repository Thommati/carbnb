import { useState, useEffect } from "react";
const axios = require("axios");

let tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() + 1);

export default function useApplicationData(initial) {
  ////////////////// Search state ///////////////////////

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

  ////////////////// Cars state ///////////////////////

  const [cars, setCars] = useState({
    rows: [],
    selected: null,
  });

  const setSelected = function (selected) {
    setCars((prev) => {
      return { ...prev, selected };
    });
  };

  const clearSelected = function () {
    setSelected(null);
  };

  useEffect(() => {
    if (search.location !== "") {
      axios
        .get("/api/cars")
        .then(function (response) {
          // handle success
          setCars((prev) => {
            return { ...prev, rows: response.data };
          });
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        });
    }
  }, [search]);

  return {
    search,
    setSearch,
    setLocation,
    setFromDate,
    setToDate,
    cars,
  };
}
