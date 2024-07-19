import React, { useEffect, useState } from "react";
import ReactFilterChips from "./ReactFilterChips";
// import ReactFilterChips from "react-filter-chips";

export default function App() {
  const EMPTY_FILTER = {
    string: "",
    number: null,
    array: [],
    Object: null,
    boolean: false,
    date: null,
  };

  const [filterState, setFilterState] = useState(EMPTY_FILTER);
  const [filterStateTem, setFilterStateTem] = useState(EMPTY_FILTER);

  const ALTER_FILTER = {
    string: "altered string",
    number: 12345,
    array: [
      { chip_value: "array-data-1", chip_label: "altered array 1" },
      { chip_value: "array-data-2", chip_label: "altered array 2" },
    ],
    Object: {
      chip_value: "object-data-1",
      chip_label: "altered object 1",
    },
    boolean: true,
    date: new Date(),
  };

  const REMOVE_ITEMS = ["date"];

  const onDeleteChip = (data) => {
    console.log("Updated state:", data);
    setFilterState(data); // Update state
    setFilterStateTem(data); // Also update temp state to keep them in sync
  };

  const onClear = () => {
    setFilterState(EMPTY_FILTER); // Clear all filters
    setFilterStateTem(EMPTY_FILTER); // Clear temp state as well
  };

  useEffect(() => {
    const initialData = {
      string: "string",
      number: 12345,
      array: [
        { chip_value: "array-data-1", chip_label: "Array 1" },
        { chip_value: "array-data-2", chip_label: "Array 2" },
      ],
      Object: {
        chip_value: "object-data-1",
        chip_label: "Object 1",
      },
      boolean: true,
      date: new Date(),
    };
    setFilterState(initialData);
    setFilterStateTem(initialData);
  }, []);

  return (
    <>
      <ReactFilterChips
        filterData={filterState}
        tempState={filterStateTem}
        emptyFilter={EMPTY_FILTER}
        clearLabel="Clear All"
        filterLabel="Filter By"
      />
    </>
  );
}
