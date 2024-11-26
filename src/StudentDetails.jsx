import React, { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import "./details.css";

const validationRules = {
  name: { regex: /^[A-Za-z\s]+$/, message: "Only alphabets are allowed." },
  mothersName: { regex: /^[A-Za-z\s]+$/, message: "Only alphabets are allowed." },
  fathersName: { regex: /^[A-Za-z\s]+$/, message: "Only alphabets are allowed." },
  address: {
    regex: /^[A-Za-z0-9\s\-\/]+$/,
    message: "Only letters, numbers, spaces, hyphens (-), and slashes (/) are allowed.",
  },
  city: { regex: /^[A-Za-z\s]+$/, message: "Only alphabets are allowed." },
  phoneNumber: { regex: /^\d{10}$/, message: "Must be exactly 10 digits." },
  email: {
    regex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    message: "Must be a valid email address.",
  },
  postalCode: { regex: /^\d{5,6}$/, message: "Must be 5-6 digits." },
  dateOfBirth: { regex: /.+/, message: "This field cannot be empty." },
  salary: { regex: /^\d{4,}$/, message: "Must be at least 4 digits." },
};

const StudentDetails = () => {
  const [formData, setFormData] = useState({});
  const [validFields, setValidFields] = useState({});
  const [touchedFields, setTouchedFields] = useState({});
  const [errMsg, setErrMsg] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);
  const errRef = useRef();

  // Validate all fields whenever formData or validFields changes
  useEffect(() => {
    const allFieldsValid = Object.keys(validationRules).every(
      (key) => validFields[key] && formData[key]
    );
    setIsFormValid(allFieldsValid);
  }, [formData, validFields]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setValidFields({ ...validFields, [name]: validationRules[name].regex.test(value) });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check all fields for validity
    const invalidFields = Object.keys(validationRules).filter(
      (key) => !validFields[key] || !formData[key]
    );

    if (invalidFields.length > 0) {
      setErrMsg("Please fill out all fields correctly.");
      return;
    }

    // If all fields are valid
    setErrMsg("");
    alert("Form submitted successfully!");
  };

  return (
    <section>
      <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"}>
        {errMsg}
      </p>
      <h1>Student Details Form</h1>
      <form onSubmit={handleSubmit}>
        {Object.keys(validationRules).map((key) => (
          <InputField
            key={key}
            id={key}
            label={key.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase()) + " :"}
            value={formData[key] || ""}
            isValid={validFields[key]}
            touched={touchedFields[key]}
            onChange={handleChange}
            onFocus={() => setTouchedFields({ ...touchedFields, [key]: true })}
            validationMessage={
              touchedFields[key] && !validFields[key] ? validationRules[key].message : null
            }
            type={key === "dateOfBirth" ? "date" : key === "email" ? "email" : "text"}
          />
        ))}
        <button type="submit" disabled={!isFormValid}>
          Submit
        </button>
      </form>
    </section>
  );
};

const InputField = ({
  id,
  label,
  value,
  isValid,
  touched,
  onChange,
  onFocus,
  validationMessage,
  type,
}) => (
  <div className="form-group">
    <label htmlFor={id}>
      {label}
      <FontAwesomeIcon icon={faCheck} className={isValid ? "valid" : "hide"} />
      <FontAwesomeIcon
        icon={faTimes}
        className={!isValid && (value || touched) ? "invalid" : "hide"}
      />
    </label>
    <input
      type={type}
      id={id}
      name={id}
      value={value}
      onChange={onChange}
      onFocus={onFocus}
      aria-invalid={!isValid && touched ? "true" : "false"}
    />
    {validationMessage && <p className="instructions">{validationMessage}</p>}
  </div>
);

export default StudentDetails;
