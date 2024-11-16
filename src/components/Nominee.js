import React, { useState } from "react";

const NomineePage = () => {
  const [nomineeDetails, setNomineeDetails] = useState({
    name: "",
    aadharNumber: "",
    phoneNumber: "",
    relation: "",
    signature: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNomineeDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleSignatureChange = (e) => {
    setNomineeDetails((prevDetails) => ({
      ...prevDetails,
      signature: e.target.files[0],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Nominee details submitted successfully!");
  };

  return (
    <div style={styles.pageContainer}>
      <div style={styles.card}>
        <h1 style={styles.header}>Add a Nominee</h1>
        <p style={styles.description}>
          Please provide the nominee's details to proceed. This information will remain confidential.
        </p>
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Name of the Nominee</label>
            <input
              type="text"
              name="name"
              value={nomineeDetails.name}
              onChange={handleChange}
              placeholder="Enter nominee's name"
              style={styles.input}
              required
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Aadhar Number</label>
            <input
              type="text"
              name="aadharNumber"
              value={nomineeDetails.aadharNumber}
              onChange={handleChange}
              placeholder="Enter Aadhar number"
              style={styles.input}
              required
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Phone Number</label>
            <input
              type="tel"
              name="phoneNumber"
              value={nomineeDetails.phoneNumber}
              onChange={handleChange}
              placeholder="Enter phone number"
              style={styles.input}
              required
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Relation to the Patient</label>
            <select
              name="relation"
              value={nomineeDetails.relation}
              onChange={handleChange}
              style={styles.select}
              required
            >
              <option value="">Select relation</option>
              <option value="Spouse">Spouse</option>
              <option value="Parent">Parent</option>
              <option value="Child">Child</option>
              <option value="Sibling">Sibling</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Patient's Electronic Signature</label>
            <input
              type="file"
              name="signature"
              accept="image/*"
              onChange={handleSignatureChange}
              style={styles.fileInput}
              required
            />
          </div>

          <button type="submit" style={styles.submitButton}>
            Submit Details
          </button>
        </form>
      </div>
    </div>
  );
};

// Enhanced CSS styles
const styles = {
  pageContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    backgroundColor: "#f4f6f9",
    padding: "20px",
  },
  card: {
    backgroundColor: "#ffffff",
    padding: "30px",
    borderRadius: "12px",
    boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
    maxWidth: "500px",
    width: "100%",
    textAlign: "center",
  },
  header: {
    fontSize: "28px",
    color: "#333333",
    marginBottom: "15px",
    fontWeight: "600",
  },
  description: {
    fontSize: "14px",
    color: "#666666",
    marginBottom: "20px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  formGroup: {
    textAlign: "left",
  },
  label: {
    fontSize: "16px",
    color: "#333333",
    marginBottom: "5px",
    fontWeight: "500",
    display: "block",
  },
  input: {
    padding: "10px",
    fontSize: "14px",
    border: "1px solid #ddd",
    borderRadius: "6px",
    width: "100%",
    backgroundColor: "#f9f9f9",
  },
  select: {
    padding: "10px",
    fontSize: "14px",
    border: "1px solid #ddd",
    borderRadius: "6px",
    width: "100%",
    backgroundColor: "#f9f9f9",
  },
  fileInput: {
    fontSize: "14px",
    color: "#666666",
  },
  submitButton: {
    padding: "12px 20px",
    fontSize: "16px",
    color: "#ffffff",
    backgroundColor: "#007BFF",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "bold",
    textTransform: "uppercase",
    transition: "background-color 0.3s ease",
  },
  submitButtonHover: {
    backgroundColor: "#0056b3",
  },
};

export default NomineePage;
