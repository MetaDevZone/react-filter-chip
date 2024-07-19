import React from "react";
import "./css/style.css";

export const show_proper_words = (text) => {
  let replace_string = "";
  if (text) {
    replace_string = text.replace(/[-_]/g, " ");
    replace_string = replace_string
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }
  return replace_string;
};

const handle_format_date = (date) => {
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const year = date.getFullYear();
  const formattedDateString = `${day}-${month}-${year} ${hours}:${minutes}`;
  return formattedDateString;
};

function isDateObject(obj) {
  return Object.prototype.toString.call(obj) === "[object Date]";
}

export default function ReactFilterChips(props) {
  const {
    filterData,
    tempState,
    emptyFilter,
    alterFilter,
    removeItems,
    onDeleteChip,
    onClear,
    clearLabel = "",
    filterLabel = "",
    chipstyle,
    iconStyle,
    isShowCloseStart,
    isShowClose = true,
    customIcon,
  } = props;

  const hanlde_delete = (item) => {
    if (onDeleteChip) {
      let value = item.value;
      let key = item.key;
      let item_type = typeof filterData[key];

      let temp_state = { ...tempState };
      if (item_type === "object" && Array.isArray(filterData[key])) {
        let new_array = filterData[key].filter(
          (array) => array.chip_value !== value
        );
        temp_state[key] = new_array;
      } else {
        if (alterFilter) {
          let alter_value = alterFilter[key];
          if (alter_value !== undefined) {
            temp_state[key] = alterFilter[key];
          } else {
            temp_state[key] = emptyFilter[key];
          }
        } else {
          temp_state[key] = emptyFilter[key];
        }
      }
      onDeleteChip(temp_state, item);
    }
  };

  let chips_array = [];
  Object.keys(filterData).map((keyName, i) => {
    let find_remove = removeItems?.find((item) => item === keyName);
    if (!find_remove) {
      let key_value = filterData[keyName];
      let key_type = typeof key_value;

      const push_date = () => {
        chips_array.push({
          value: key_value,
          key: keyName,
          label: show_proper_words(keyName),
        });
      };
      if (key_value && key_value !== "0") {
        switch (key_type) {
          case "string":
            if (isDateObject(key_value)) {
              push_date();
            } else {
              chips_array.push({
                key: keyName,
                value: key_value,
                label: show_proper_words(key_value),
              });
            }
            break;
          case "number":
            chips_array.push({
              key: keyName,
              value: key_value,
              label: key_value,
            });
            break;
          case "boolean":
            chips_array.push({
              key: keyName,
              value: key_value,
              label: key_value ? "Active" : "Inactive",
            });
            break;
          case "object":
            if (key_value) {
              if (Array.isArray(key_value)) {
                key_value.map((item) => {
                  chips_array.push({
                    key: keyName,
                    value: item.chip_value,
                    label: item.chip_label,
                  });
                });
              } else if (isDateObject(key_value)) {
                chips_array.push({
                  key: keyName,
                  value: key_value,
                  label: handle_format_date(key_value),
                });
              } else {
                chips_array.push({
                  key: keyName,
                  value: key_value.chip_value,
                  label: key_value.chip_label,
                });
              }
            }
            break;
          default:
        }
      }
    }
  });

  return (
    <>
      {chips_array.length > 0 && (
        <div className="filter-chips-box">
          <span className="filtered-by-text">{filterLabel}</span>
          {chips_array.map((item, index) => {
            return (
              <div key={index}>
                {item.label && (
                  <div
                    className={`filter-chip ${
                      isShowClose ? "" : "hidden_icon"
                    }`}
                    style={chipstyle}
                  >
                    {isShowCloseStart ? (
                      <>
                        {isShowClose && (
                          <div
                            className="filter-cross-icon"
                            onClick={() => hanlde_delete(item)}
                          >
                            {customIcon ? (
                              customIcon
                            ) : (
                              <>
                                {typeof document !== "undefined" && (
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 384 512"
                                    style={{
                                      fill: "white",
                                      borderRadius: "50px",
                                      backgroundColor: "#0000006e",
                                      padding: "3px",
                                      height: "11px",
                                      width: "11px",
                                      marginRight: "5px",
                                      ...iconStyle,
                                    }}
                                  >
                                    <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
                                  </svg>
                                )}
                              </>
                            )}
                          </div>
                        )}
                        <div className="filter-chip-label">{item.label}</div>
                      </>
                    ) : (
                      <>
                        <div className="filter-chip-label">{item.label}</div>
                        {isShowClose && (
                          <div
                            className="filter-cross-icon"
                            onClick={() => hanlde_delete(item)}
                          >
                            {customIcon ? (
                              customIcon
                            ) : (
                              <>
                                {typeof document !== "undefined" && (
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 384 512"
                                    style={{
                                      fill: "white",
                                      borderRadius: "50px",
                                      backgroundColor: "#0000006e",
                                      padding: "3px",
                                      height: "11px",
                                      width: "11px",
                                      marginLeft: "5px",
                                      ...iconStyle,
                                    }}
                                  >
                                    <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
                                  </svg>
                                )}
                              </>
                            )}
                          </div>
                        )}
                      </>
                    )}
                  </div>
                )}
              </div>
            );
          })}
          <span
            className="clear-all-button"
            onClick={() => {
              if (onClear) {
                onClear();
              }
            }}
          >
            {clearLabel}
          </span>
        </div>
      )}
    </>
  );
}
