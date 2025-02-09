import React from "react";

const FormInput = ({
  label,
  name,
  value,
  onChange,
  error,
  textarea,
  ...rest
}) => {
  return (
    <div className="mb-4">
      <label className="block text-sm font-semibold mb-1">{label}</label>
      {textarea ? (
        <textarea
          name={name}
          value={value || ""}
          onChange={onChange}
          className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-400 transition"
          {...rest}
        />
      ) : (
        <input
          type="text"
          name={name}
          value={value || ""}
          onChange={onChange}
          className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-400 transition"
          {...rest}
        />
      )}
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default FormInput;
