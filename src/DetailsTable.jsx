import React from "react";
import "./StudentDetailsTable.css"; // Ensure this file exists and is properly imported

const DetailsTable = ({ studentDetails }) => {
  const renderValue = (value) => {
    // If the value is an object or array, handle it accordingly
    if (typeof value === "object" && value !== null) {
      return JSON.stringify(value); // Render the object as a string (for now)
    }
    return value;
  };

  return (
    <div className="student-details-table-container">
      <h2>Student Details</h2>
      <div className="table-wrapper">
        <table className="details-table">
          <thead>
            <tr>
              <th>Field</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody>
            {studentDetails &&
              Object.keys(studentDetails).map((key) => (
                <tr key={key}>
                  <td>{key.replace(/([A-Z])/g, " $1").toUpperCase()}</td>
                  <td>{renderValue(studentDetails[key])}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DetailsTable;
