import React from "react";

const FormSelect = ({
  label,
  name,
  options = [],
  value,
  onChange,
  required,
  error,
}) => {
  return (
    <div className="mb-4">
      <label className="block text-sm font-semibold mb-2">{label}</label>
      <select
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className="w-full p-2 border rounded"
      >
        <option value="">Select an option</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FormSelect;
