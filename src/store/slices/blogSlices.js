import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  blogs: [],
};

console.log("intialstate", initialState);

const blogSlice = createSlice({
  name: "blogs",
  initialState,
  reducers: {
    addBlog: (state, action) => {
      state.blogs = [...state.blogs, action.payload]; // ✅ Correctly updating state
    },

    deleteBlog: (state, action) => {
      state.blogs = state.blogs.filter((blog) => blog.id !== action.payload);
    },
  },
});

export const { addBlog, deleteBlog } = blogSlice.actions;
export default blogSlice.reducer;
