import React from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "../../pages/admin/Dashboard";
import Users from "../../pages/admin/user/Users";
import Industries from "../../pages/admin/industry/Industries";
import Portfolio from "../../pages/admin/portfolio/Portfolio";
import Services from "../../pages/admin/service/Services";
import Technologies from "../../pages/admin/technology/Technologies";

import Slider from "../../pages/admin/slider/Slider";

const AdminRoute = () => {
  return (
    <>
      <Routes>
        <Route path="/dashboard">
          <Route index element={<Dashboard />} />
          <Route path="users" element={<Users />} />
          <Route path="industries" element={<Industries />} />
        
          <Route path="slider" element={<Slider />} />
        </Route>
      </Routes>
    </>
  );
};

export default AdminRoute;
