import React from "react";
import ContentLoader from "react-content-loader";

const AttendncLoader = (props) => (
  <div className="flex justify-center items-center w-full">
 
    <ContentLoader
      speed={2}
      width="100%"              // make it responsive to viewport width
      height={500}
      viewBox="0 0 400 500"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
      style={{ maxWidth: "600px" }} // prevent it from stretching too much
      {...props}
    >
      {/* First big header box */}
      <rect x="20" y="15" rx="6" ry="6" width="360" height="100" />

      {/* Info boxes row */}
      <rect x="20" y="125" rx="6" ry="6" width="100" height="50" />
      <rect x="150" y="125" rx="6" ry="6" width="100" height="50" />
      <rect x="280" y="125" rx="6" ry="6" width="100" height="50" />

      {/* Rows of students */}
      <rect x="20" y="195" rx="6" ry="6" width="360" height="50" />
      <rect x="20" y="255" rx="6" ry="6" width="360" height="50" />
      <rect x="20" y="315" rx="6" ry="6" width="360" height="50" />
      <rect x="20" y="375" rx="6" ry="6" width="360" height="50" />

      {/* Submit button placeholder */}
      <rect x="120" y="455" rx="8" ry="8" width="160" height="45" />
    </ContentLoader>
  </div>
);

export default AttendncLoader;
