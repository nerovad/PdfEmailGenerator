import { useState } from "react";
import FormPage1 from "./FormPage1";
import FormPage2 from "./FormPage2";
import { submitForm } from "../api";

const MultiPageForm = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [formData, setFormData] = useState({
    employeeId: "",
    employeeFirstName: "",
    employeeLastName: "",
    employeeEmail: "",
    employeePhone: "",
    supervisorName: "",
    supervisorPhone: "",
    unitNumber: "",
    yesNoDropdown: "",
  });

  const pages = [
    <FormPage1 formData={formData} setFormData={setFormData} />,
    <FormPage2 formData={formData} setFormData={setFormData} />,
  ];

  const nextPage = () => setCurrentPage((prev) => Math.min(prev + 1, pages.length - 1));
  const prevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 0));

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await submitForm(formData);
    if (success) alert("Form submitted and email sent!");
    else alert("Failed to submit form.");
  };

  return (
    <form onSubmit={handleSubmit}>
      {pages[currentPage]}
      <div className="navigation-buttons">
        <button type="button" onClick={prevPage} disabled={currentPage === 0}>Previous</button>
        {currentPage < pages.length - 1 ? (
          <button type="button" onClick={nextPage}>Next</button>
        ) : (
          <button type="submit">Submit</button>
        )}
      </div>
    </form>
  );
};

export default MultiPageForm;

