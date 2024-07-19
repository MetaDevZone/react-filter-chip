# ReactFilterChips

## Overview

The `ReactFilterChips` component provides an interactive way to display and manage filter chips in your React application. It allows users to see the applied filters and remove them individually or clear all filters at once. This component is highly customizable and supports various data types including strings, numbers, arrays, objects, booleans, and dates.

## Installation

To install the `ReactFilterChips` component, you can use npm:

```bash
npm install react-filter-chips
```

Or using yarn

```bash
yarn add react-filter-chips
```

## Simple Usage

```tsx
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
```

## Props

| Prop               | Type        | Description                                                                                                                             | Default |
| ------------------ | ----------- | --------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| `filterData`       | `Object`    | The main filter data that is displayed as chips. This should be an object with various key-value pairs representing the filters.        |         |
| `tempState`        | `Object`    | A temporary state object to keep track of the current state of filters.                                                                 |         |
| `emptyFilter`      | `Object`    | An object representing the empty state of filters. Used to reset the filters.                                                           |         |
| `alterFilter`      | `Object`    | (Optional) An object representing the altered state of filters. This can be used to change the state of filters when a chip is removed. |         |
| `removeItems`      | `Array`     | (Optional) An array of keys that should be excluded from being displayed as chips.                                                      |         |
| `onDeleteChip`     | `Function`  | A callback function that is called when a chip is deleted. It receives the updated filter state as an argument.                         |         |
| `onClear`          | `Function`  | A callback function that is called when the "Clear All" button is clicked. It resets the filter state.                                  |         |
| `clearLabel`       | `String`    | (Optional) The label for the "Clear All" button. Defaults to an empty string.                                                           | `""`    |
| `filterLabel`      | `String`    | (Optional) The label that appears before the filter chips. Defaults to an empty string.                                                 | `""`    |
| `chipstyle`        | `Object`    | (Optional) A style object to customize the appearance of the chips.                                                                     |         |
| `iconStyle`        | `Object`    | (Optional) A style object to customize the appearance of the close icon on the chips.                                                   |         |
| `isShowCloseStart` | `Boolean`   | (Optional) A boolean to determine if the close icon should be shown at the start of the chip. Defaults to `false`.                      | `false` |
| `isShowClose`      | `Boolean`   | (Optional) A boolean to determine if the close icon should be shown on the chips. Defaults to `true`.                                   | `true`  |
| `customIcon`       | `ReactNode` | (Optional) A custom icon to replace the default close icon.                                                                             |         |

Meta Dev Zone – [@meta-dev-zone](https://www.npmjs.com/~meta-dev-zone)
