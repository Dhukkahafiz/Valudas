import React from "react";
import { Route, Routes } from "react-router-dom";

import HOC from "../../pages/admin/layout/HOC";
import Portfolio from "../../pages/admin/portfolio/Portfolio";
import EditePortfolio from "../../pages/admin/portfolio/EditePortfolio";
import AddPortfolio from "../../pages/admin/portfolio/AddPortfolio";

const PortfolioRoute = () => {
  return (
    <Routes>
      <Route
        path="/dashboard/portfolio"
        element={
          <>
            <HOC />
            <Portfolio />
          </>
        }
      />

      <Route
        path="/dashboard/addportfolio"
        element={
          <>
            <HOC />
            <AddPortfolio />
          </>
        }
      />

      <Route
        path="/dashboard/editportfolio/:id"
        element={
          <>
            <HOC />
            <EditePortfolio />
          </>
        }
      />
    </Routes>
  );
};

export default PortfolioRoute;
