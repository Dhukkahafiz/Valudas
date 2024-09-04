import React from "react";
import Review from "../../pages/admin/Review/Review";
import HOC from "../../pages/admin/layout/HOC";
import { Route, Router, Routes } from "react-router-dom";
import AddReview from "../../pages/admin/Review/AddReview";
import EditReview from "../../pages/admin/Review/EditReview";

const ReviewRoute = () => {
  return (
    <Routes>
      <Route
        path="/dashboard/review"
        element={
          <>
            <HOC />
            <Review />
          </>
        }
      />

      <Route
        path="/dashboard/addreview"
        element={
          <>
            <HOC />
            <AddReview />
          </>
        }
      />

      <Route
        path="/dashboard/editreview"
        element={
          <>
            <HOC />
            <EditReview />
          </>
        }
      />
    </Routes>
  );
};

export default ReviewRoute;
