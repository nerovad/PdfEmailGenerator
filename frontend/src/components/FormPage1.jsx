const FormPage1 = ({ formData, setFormData }) => {
  return (
    <div className="form-page">
      <div className="form-header">
        <a href="/">
          <img src="/images/countyOfVentura_Logo_121924.svg" alt="Logo" />
        </a>
      </div>
      <h2>Launch Mobility New User Request</h2>
      <div className="form-row">
        <label>
          Employee ID:
          <input
            type="text"
            value={formData.employeeId}
            onChange={(e) => setFormData({ ...formData, employeeId: e.target.value })}
            required
          />
        </label>
        <label>
          Employee First Name:
          <input
            type="text"
            value={formData.employeeFirstName}
            onChange={(e) => setFormData({ ...formData, employeeFirstName: e.target.value })}
            required
          />
        </label>
        <label>
          Employee Last Name:
          <input
            type="text"
            value={formData.employeeLastName}
            onChange={(e) => setFormData({ ...formData, employeeLastName: e.target.value })}
            required
          />
        </label>
      </div>
      <div className="form-row">
        <label>
          Employee E-mail:
          <input
            type="email"
            value={formData.employeeEmail}
            onChange={(e) => setFormData({ ...formData, employeeEmail: e.target.value })}
            required
          />
        </label>
        <label>
          Employee Phone:
          <input
            type="tel"
            value={formData.employeePhone}
            onChange={(e) => setFormData({ ...formData, employeePhone: e.target.value })}
            required
          />
        </label>
      </div>
    </div>
  );
};

export default FormPage1;

