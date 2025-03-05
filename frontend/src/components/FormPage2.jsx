const FormPage2 = ({ formData, setFormData }) => {
  return (
    <div className="form-page">
      <h2>Launch Mobility New User Request</h2>
      <div className="form-row">
        <label>
          Supervisor Name:
          <input
            type="text"
            value={formData.supervisorName}
            onChange={(e) => setFormData({ ...formData, supervisorName: e.target.value })}
            required
          />
        </label>
        <label>
          Supervisor Phone:
          <input
            type="tel"
            value={formData.supervisorPhone}
            onChange={(e) => setFormData({ ...formData, supervisorPhone: e.target.value })}
            required
          />
        </label>
      </div>
      <div className="form-row">
        <label>
          Budget Unit Number:
          <input
            type="text"
            value={formData.unitNumber}
            onChange={(e) => setFormData({ ...formData, unitNumber: e.target.value })}
            required
          />
        </label>
        <label>
          Motor Pool Access Requested:
          <select
            value={formData.yesNoDropdown}
            onChange={(e) => setFormData({ ...formData, yesNoDropdown: e.target.value })}
            required
          >
            <option value="">Select...</option>
            <option value="yes">Central Motor Pool - CMP</option>
            <option value="no">Remote Motor Pool - RMP</option>
            <option value="no">HSA Dept Assigned</option>
          </select>
        </label>
      </div>
    </div>
  );
};

export default FormPage2;

