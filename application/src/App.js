import React, { useState, useEffect } from "react";
import ReactFilterChips from "react-filter-chips";

function App() {
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

  const onDeleteChip = (data) => {
    console.log("Updated state:", data);
    setFilterState(data);
    setFilterStateTem(data);
  };

  const onClear = () => {
    setFilterState(EMPTY_FILTER);
    setFilterStateTem(EMPTY_FILTER);
  };

  useEffect(() => {
    const initialData = {
      string: "example string",
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
    <div className="App">
      <ReactFilterChips
        filterData={filterState}
        tempState={filterStateTem}
        emptyFilter={EMPTY_FILTER}
        clearLabel="Clear All"
        filterLabel="Filter By"
        onDeleteChip={onDeleteChip}
        onClear={onClear}
      />
    </div>
  );
}

export default App;
