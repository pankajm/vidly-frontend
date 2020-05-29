import React from "react";

const Input = ({ value, name, onChange, label }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <input
        value={value}
        name={name}
        onChange={onChange}
        id={name}
        type="text"
        className="form-control"
      />
    </div>
  );
};

export default Input;
