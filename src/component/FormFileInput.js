export const FormFileInput = ({ label, onChange }) => (
  <div className="mb-4 transition-all duration-300">
    <label className="block text-sm font-semibold mb-1">{label}</label>
    <input
      type="file"
      accept="image/*"
      className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-400 transition"
      onChange={onChange}
    />
  </div>
);
