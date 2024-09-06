import React from "react";
import { Route, Routes } from "react-router-dom";
import HOC from "../../pages/admin/layout/HOC";
import Service_pages from "../../pages/admin/Service_pages/Service_pages";
import AddService_page from "../../pages/admin/Service_pages/AddService_page";
import EditService_Pages from "../../pages/admin/Service_pages/Editservice_Pages";
import Login from "../../pages/admin/layout/Login";
import Signup from "../../pages/admin/layout/Signup";
// import HOC from "";

function Service_pagesRoute() {
  return (
    <>
      <Routes>
      <Route
          path="/login"
          element={
            <>
         <Login />
            </>
          }
        />
         <Route
          path="/signup"
          element={
            <>
         <Signup />
            </>
          }
        />
        <Route
          path="/dashboard/Service_pages"
          element={
            <>
              <HOC /> <Service_pages />
            </>
          }
        />
        <Route
          path="/dashboard/addService_pages"
          element={
            <>
              <HOC />
              <AddService_page/>
            </>
          }
        />
        <Route
          path="/dashboard/EditService_pages/:id"
          element={
            <>
              <HOC />
              <EditService_Pages/>
            </>
          }
        />
      </Routes>
    </>
  );
}

export default Service_pagesRoute;
