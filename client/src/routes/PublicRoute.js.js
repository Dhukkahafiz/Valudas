import { Routes, Route } from "react-router-dom";
import Home from "../pages/public/home/Index";
import About from "../pages/public/about";
import Header from "../pages/public/layouts/Header";

const PublicRoute = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<><Header/><About /></>} />

    </Routes>
  );
};

export default PublicRoute;
