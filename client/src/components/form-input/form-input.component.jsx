import React from "react";
const FormInput = ({ handleChange, label, ...otherProps }) => (
  <div className="form-group row mt-2">
    <div className={"col-lg-6 mx-auto"}>
      {label ? (
        <label className={`form-input-label`} htmlFor={label}>
          {label}
        </label>
      ) : null}
      <input
        className="form-control"
        style={{ textAlign: "center" }}
        onChange={handleChange}
        {...otherProps}
      />
    </div>
  </div>
);

export default FormInput;
