import React from 'react';
import { Navigate } from 'react-router-dom';

const TriangleAreaCalculator = () => {
  // This component is for handling an old, potentially bookmarked path.
  // It redirects to the correct, current path for the calculator.
  return <Navigate to="/math/triangle-calculator" replace />;
};

export default TriangleAreaCalculator;