
import React from "react";
import "../styles/InputField.css";

const InputField = ({
  id,
  label,
  type = "text",
  value,
  onChange,
  error,
  placeholder,
  required = false,
  autoComplete,
}) => {
  return (
    <div className="input-field">
      <label 
        htmlFor={id} 
        className="input-label"
      >
        {label} {required && <span className="required-mark">*</span>}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        autoComplete={autoComplete}
        required={required}
        aria-invalid={error ? "true" : "false"}
        aria-describedby={error ? `${id}-error` : undefined}
        className={`input ${error ? "input-error" : ""}`}
      />
      {error && (
        <p id={`${id}-error`} className="error-message">
          {error}
        </p>
      )}
    </div>
  );
};

export default InputField;
