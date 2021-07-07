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

  ////////////////// Filters state //////////////////

  const [filters, setFilters] = useState({
    pets: false,
    rv: false,
    sport: false,
  });

  const setPets = function (pets) {
    setFilters((prev) => {
      return { ...prev, pets };
    });
  };

  const setRv = function (rv) {
    setFilters((prev) => {
      return { ...prev, rv };
    });
  };

  const setSport = function (sport) {
    setFilters((prev) => {
      return { ...prev, sport };
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

  // get all the cars for the search results
  useEffect(() => {
    if (search.location !== "") {
      axios
        .get("/api/cars", {
          params: {
            city: search.location,
          },
        })
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

  // get a selected car for details page
  useEffect(() => {
    if (cars.selected !== null) {
      axios
        .get("/api/cars/{car.id}")
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
  }, [cars.selected]);

  return {
    search,
    setSearch,
    setLocation,
    setFromDate,
    setToDate,
    filters,
    setFilters,
    setPets,
    setRv,
    setSport,
    cars,
    setSelected,
    clearSelected,
  };
}
