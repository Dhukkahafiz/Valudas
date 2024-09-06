import { Routes, Route } from "react-router-dom";
import Home from "../pages/public/home/Index";
import About from "../pages/public/about";
import Header from "../pages/public/layouts/Header";
<<<<<<< HEAD
import Index from "../pages/public/adilhome/Index"
=======
>>>>>>> 7f0bd4d54ae5eacb9abb139c7f27365c3f6c7442

const PublicRoute = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
<<<<<<< HEAD
      <Route path="/home" element={<Index />} />

      <Route path="/about" element={<><Header /><About /></>} />
=======
      <Route path="/about" element={<><Header/><About /></>} />
>>>>>>> 7f0bd4d54ae5eacb9abb139c7f27365c3f6c7442

    </Routes>
  );
};

export default PublicRoute;
