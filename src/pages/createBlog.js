import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addBlog } from "../store/slices/blogSlices";
import { ToastHandler } from "../utils/toastHandle";
import FormInput from "../component/FormInput";
import FormSelect from "../component/FormSelect";
import FormRadio from "../component/FormRadio";
import "../styles/tailwind.css";
import { FormFileInput } from "../component/FormFileInput";
import Select from "react-select";
const CreateBlog = () => {
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "",
    tags: [],
    coverImage: null,
    status: "",
    publishedDate: "",
  });

  const [errors, setErrors] = useState({});
  const [preview, setPreview] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file); // ✅ Convert File to URL
      setForm((prevForm) => ({ ...prevForm, coverImage: imageUrl }));
    }
  };

  const handleTagsChange = (selectedOptions) => {
    setForm((prevForm) => ({
      ...prevForm,
      tags: selectedOptions.map((option) => option.value),
    }));
  };

  const tagOptions = [
    { value: "React", label: "React" },
    { value: "JavaScript", label: "JavaScript" },
    { value: "CSS", label: "CSS" },
    { value: "Node.js", label: "Node.js" },
  ];

  const validateForm = () => {
    let tempErrors = {};
    if (form.title.length < 5)
      tempErrors.title = "Title must be at least 5 characters";
    if (form.description.length < 10)
      tempErrors.description = "Description must be at least 10 characters";
    if (!form.category) tempErrors.category = "Category is required";
    if (form.status === "Published" && !form.publishedDate)
      tempErrors.publishedDate = "Published Date is required";
    if (form.tags.length === 0)
      tempErrors.tags = "At least one tag must be selected";
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) {
      ToastHandler("error", "Please fill all required fields correctly");
      return;
    }

    dispatch(addBlog({ ...form, id: Date.now() }));
    ToastHandler("success", "Blog created successfully");
    setForm({
      title: "",
      description: "",
      category: "",
      tags: [],
      coverImage: null,
      status: "Draft",
      publishedDate: "",
    });
    setPreview(null);
    document.querySelector("input[type='file']").value = "";
  };

  return (
    <div className="container mx-auto max-w-2xl bg-white p-8 shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold mb-6 text-center">Create New Blog</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <FormInput
          label="Title"
          name="title"
          value={form.title}
          onChange={handleChange}
          error={errors.title}
          required
        />
        <FormInput
          label="Description"
          name="description"
          value={form.description}
          onChange={handleChange}
          error={errors.description}
          textarea
          required
        />
        <FormSelect
          label="Category"
          name="category"
          options={["Tech", "Lifestyle", "Health"]}
          value={form.category}
          onChange={handleChange}
          error={errors.category}
          required
        />
        <div>
          <label className="block text-sm font-semibold mb-1">
            Tags (Select Multiple)
          </label>
          <Select
            isMulti
            options={tagOptions}
            value={tagOptions.filter((option) =>
              form.tags.includes(option.value)
            )}
            onChange={handleTagsChange}
            className="w-full"
          />
        </div>
        <FormFileInput
          label="Cover Image"
          name="coverImage"
          onChange={handleFileChange}
          preview={preview}
        />
        <FormRadio
          label="Status"
          name="status"
          options={["Draft", "Published"]}
          value={form.status}
          onChange={handleChange}
          required
        />
        {form.status === "Published" && (
          <FormInput
            label="Published Date"
            name="publishedDate"
            type="date"
            value={form.publishedDate}
            onChange={handleChange}
            error={errors.publishedDate}
            required
          />
        )}
        <button
          type="submit"
          className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded w-full text-lg"
        >
          Submit
        </button>
      </form>
      <div id="toast-container"></div>
    </div>
  );
};

export default CreateBlog;
