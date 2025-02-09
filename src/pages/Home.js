import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteBlog } from "../store/slices/blogSlices";
import BlogCard from "../component/BlogCard";
import { ToastHandler } from "../utils/toastHandle";

const HomePage = () => {
  const blogs = useSelector((state) => state.blog?.blogs || []);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this blog?"
    );
    if (confirmDelete) {
      dispatch(deleteBlog(id));
      ToastHandler("success", "Blog deleted successfully");
    }
  };

  const handleReadMore = (id) => {
    const blogExists = blogs.some((blog) => blog.id === id);
    if (blogExists) {
      navigate(`/blog/${id}`);
    } else {
      ToastHandler("error", "Blog not found");
    }
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Blog Posts</h1>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
        onClick={() => navigate("/create-blog")}
      >
        Create New Post
      </button>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogs.length > 0 ? (
          blogs.map((blog) => (
            <BlogCard
              key={blog.id}
              blog={blog}
              onDelete={() => handleDelete(blog.id)}
              onReadMore={() => handleReadMore(blog.id)}
            />
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-3">
            No blogs available. Create one!
          </p>
        )}
      </div>
    </div>
  );
};

export default HomePage;
