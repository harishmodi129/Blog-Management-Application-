import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { deleteBlog } from "../store/slices/blogSlices";
import { ToastHandler } from "../utils/toastHandle";

const BlogDetails = () => {
  const { id } = useParams(); // Get blog ID from URL
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const blogs = useSelector((state) => state.blog?.blogs || []); // ✅ Fix Redux state access

  console.log("URL ID from useParams():", id); // ✅ Debugging log
  console.log("Redux Blogs:", blogs); // ✅ Ensure blogs exist in Redux

  // Ensure ID types match
  const blog = blogs.find((blog) => String(blog.id) === String(id));

  console.log("Matched Blog:", blog); // ✅ Debug: Check if blog is found

  if (!blog) {
    return <p className="text-center text-red-500">Blog not found</p>;
  }

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this blog?")) {
      dispatch(deleteBlog(blog.id));
      ToastHandler("success", "Blog deleted successfully");
      navigate("/"); // Redirect back to home after deletion
    }
  };

  return (
    <div className="container mx-auto max-w-2xl p-8 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold mb-4">{blog.title}</h1>
      {blog.coverImage && typeof blog.coverImage === "string" && (
        <img
          src={blog.coverImage}
          alt="Cover"
          className="w-full h-64 object-cover rounded mb-4"
        />
      )}
      <p className="text-gray-600 mb-2">{blog.description}</p>
      <p className="text-sm text-gray-500 mb-2">Category: {blog.category}</p>
      <p className="text-sm text-gray-500 mb-4">Tags: {blog.tags.join(", ")}</p>
      {blog.status === "Published" && (
        <p className="text-sm text-green-500 mb-4">
          Published Date: {blog.publishedDate}
        </p>
      )}
      <div className="flex gap-4">
        <button
          onClick={() => navigate("/")}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        >
          Back to Home
        </button>
        <button
          onClick={handleDelete}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
        >
          Delete Blog
        </button>
      </div>
    </div>
  );
};

export default BlogDetails;
