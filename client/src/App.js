import React from "react";
import { BrowserRouter } from "react-router-dom";
import PublicRoute from "./routes/PublicRoute.js";
import AdminRoute from "./routes/admin/AdminRoute.js";
import Service_pagesRoute from "./routes/admin/Service_pagesRoute.js";
import Service_Routes from "./routes/admin/Service_Routes.js";
import PortfolioRoute from "./routes/admin/PortfolioRoute.js";
import ReviewRoute from "./routes/admin/ReviewRoute.js";
import TechnologyRoute from "./routes/admin/TechnologyRoute.js";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <PublicRoute />
        <AdminRoute />
        <Service_pagesRoute />
        <PortfolioRoute />
        <Service_Routes />
        <ReviewRoute />
        <TechnologyRoute />
      </BrowserRouter>
    </>
  );
};

export default App;
