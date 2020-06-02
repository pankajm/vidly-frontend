import React from "react";

const SelectInput = ({ name, label, error, options, value, ...rest }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <select
        name={name}
        id={name}
        value={value}
        {...rest}
        className="form-control"
      >
        <option value=""></option>
        {options.map((item) => (
          <option value={item._id} key={item._id}>
            {item.name}
          </option>
        ))}
      </select>
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}
    </div>
  );
};

export default SelectInput;
