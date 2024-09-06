import React from "react";
import Services from "../../pages/admin/service/Services";
import Addservice from "../../pages/admin/service/Addservice";
import Editservice from "../../pages/admin/service/Editservice";
import HOC from "../../pages/admin/layout/HOC";
import { Route, Routes } from "react-router-dom";

function Service_Routes() {
  return (
    <>
      <Routes>
        <Route
          path="/dashboard/services"
          element={
            <>
              <HOC />
              <Services />
            </>
          }
        />
        <Route
          path="/dashboard/addservice"
          element={
            <>
              <HOC />
              <Addservice />
            </>
          }
        />
        <Route
          path="/dashboard/editservice/:id"
          element={
            <>
              <HOC />
              <Editservice />
            </>
          }
        />
      </Routes>
    </>
  );
}

export default Service_Routes;
