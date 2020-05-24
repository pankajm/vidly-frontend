import React from "react";

const Filter = (props) => {
  const {
    onFilterApply,
    activeFilter,
    listItems,
    valueProperty,
    textProperty,
  } = props;

  return (
    <ul className="list-group">
      {listItems.map((item) => (
        <li
          style={{ cursor: "pointer" }}
          key={item[valueProperty]}
          onClick={() => onFilterApply(item)}
          className={
            item[valueProperty] === activeFilter[valueProperty]
              ? "list-group-item active"
              : "list-group-item"
          }
        >
          {item[textProperty]}
        </li>
      ))}
    </ul>
  );
};

Filter.defaultProps = {
  textProperty: "name",
  valueProperty: "_id",
};

export default Filter;
