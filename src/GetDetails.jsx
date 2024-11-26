import React, { useState, useEffect } from "react";
import axios from "./api/axios"; // Make sure axios is correctly set up
import DetailsTable from "./DetailsTable";

const STUDENT_URL = "/student-details";

const GetDetails = () => {
  const [studentDetails, setStudentDetails] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchStudentDetails = async () => {
      try {
        const response = await axios.get(STUDENT_URL); // No authorization here
        setStudentDetails(response.data);
      } catch (err) {
        setError("Failed to fetch student details.");
        console.error(err);
      }
    };

    fetchStudentDetails(); // Fetch data when component mounts
  }, []);

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div>
      {studentDetails ? (
        <DetailsTable studentDetails={studentDetails} />
      ) : (
        <p>Loading student details...</p>
      )}
    </div>
  );
};

export default GetDetails;
