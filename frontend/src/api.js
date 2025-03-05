export const submitForm = async (formData) => {
  try {
    const response = await fetch("http://localhost:4000/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    return response.ok;
  } catch (error) {
    console.error("Error submitting form:", error);
    return false;
  }
};

