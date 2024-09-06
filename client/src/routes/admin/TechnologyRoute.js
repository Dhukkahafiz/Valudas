import React from "react";
import { Route, Routes } from "react-router-dom";
import HOC from "../../pages/admin/layout/HOC";
// import Technologies from "../../pages/admin/Technology/Technologies";
import AddTechnologies from "../../pages/admin/technology/AddTechnologies";
import EditeTechnologies from "../../pages/admin/technology/EditeTechnologies";
import Technologies from "../../pages/admin/technology/Technologies";

const TechnologyRoute = () => {
  return (
    <Routes>
      <Route
        path="/dashboard/technologies"
        element={
          <>
            <HOC />
            <Technologies />
          </>
        }
      />

      <Route
        path="/dashboard/addtechnologies"
        element={
          <>
            <HOC />
            <AddTechnologies />
          </>
        }
      />

      <Route
        path="/dashboard/editechnologies"
        element={
          <>
            <HOC />
            <EditeTechnologies />
          </>
        }
      />
    </Routes>
  );
};

export default TechnologyRoute;
