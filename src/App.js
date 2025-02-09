import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import HomePage from "./pages/Home";
import BlogDetails from "./pages/BlogDetails";
import CreateBlog from "./pages/createBlog";
import "./styles/tailwind.css";

import { Toaster } from "react-hot-toast";

function App() {
  return (
    <Router>
      <Toaster position="top-right" reverseOrder={false} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/blog/:id" element={<BlogDetails />} />
        <Route path="/create-blog" element={<CreateBlog />} />
      </Routes>
    </Router>
  );
}

export default App;
