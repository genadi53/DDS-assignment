import React from "react";
const FormInput = ({ handleChange, label, ...otherProps }) => (
  <div className="group">
    <div>
      {label ? <label className={`form-input-label`}>{label}</label> : null}
    </div>
    <div>
      <input className="form-input" onChange={handleChange} {...otherProps} />
    </div>
  </div>
);

export default FormInput;
