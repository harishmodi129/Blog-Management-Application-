import React from "react";
import { useDispatch } from "react-redux";
import { deleteBlog } from "../store/slices/blogSlices";

const BlogCard = ({ blog, onDelete, onReadMore }) => {
  const dispatch = useDispatch();

  return (
    <div className="bg-white p-4 shadow-lg rounded-lg transition hover:shadow-xl">
      <h2 className="text-xl font-semibold">{blog.title}</h2>
      <p className="text-gray-600">{blog.description}</p>
      <p className="text-sm text-blue-600">Category: {blog.category}</p>
      <div className="flex justify-between mt-4">
        <button className="text-blue-500" onClick={onReadMore}>
          Read More
        </button>
        <button className="text-red-500" onClick={onDelete}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default BlogCard;
