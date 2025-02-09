import React from "react";

const FormRadio = ({ label, name, options, value, onChange, required }) => {
  return (
    <div className="mb-4">
      <label className="block text-sm font-semibold mb-2">{label}</label>
      <div className="flex space-x-4">
        {options.map((option) => (
          <label key={option} className="flex items-center">
            <input
              type="radio"
              name={name}
              value={option}
              checked={value === option}
              onChange={onChange}
              required={required}
              className="mr-2"
            />
            {option}
          </label>
        ))}
      </div>
    </div>
  );
};

export default FormRadio;
