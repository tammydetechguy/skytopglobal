import React, { useState } from 'react';
import { CorporateRequestRecord } from '../data/skytopData';

interface CorporateSectionProps {
  onSubmitCorporate: (req: CorporateRequestRecord) => void;
}

export const CorporateSection: React.FC<CorporateSectionProps> = ({
  onSubmitCorporate,
}) => {
  const [companyName, setCompanyName] = useState('');
  const [contactPerson, setContactPerson] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [industry, setIndustry] = useState('Oil & Gas Upstream');
  const [participants, setParticipants] = useState(10);
  const [preferredDate, setPreferredDate] = useState('');
  const [location, setLocation] = useState('Skytop Port Harcourt Centre');
  const [requirement, setRequirement] = useState('');
  const [message, setMessage] = useState('');
  const [submittedRef, setSubmittedRef] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!companyName || !contactPerson || !email || !phone || !requirement) return;

    const refNo = `CORP-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    const record: CorporateRequestRecord = {
      id: Date.now(),
      reference_no: refNo,
      company_name: companyName,
      contact_person: contactPerson,
      email,
      phone,
      industry,
      num_participants: participants,
      training_requirement: requirement,
      preferred_date: preferredDate,
      training_location: location,
      message,
      status: 'Pending',
      created_at: new Date().toISOString(),
    };

    onSubmitCorporate(record);
    setSubmittedRef(refNo);
  };

  return (
    <div className="container py-5">
      <div className="row g-5">
        <div className="col-lg-6">
          <span className="section-kicker">Enterprise Workforce Solutions</span>
          <h2 className="section-heading mb-3">EMPOWER YOUR WORKFORCE</h2>
          <p className="text-muted mb-4">
            Offer organizations customized training solutions designed around their workforce, operational environment, hazard profiles, and statutory competency requirements.
          </p>

          <div className="row g-3 mb-4">
            <div className="col-12">
              <div className="p-3 border rounded-3 bg-light d-flex align-items-start gap-3">
                <i className="bi bi-shield-check text-primary fs-3 mt-1"></i>
                <div>
                  <h6 className="fw-bold text-navy mb-1">HSE & Safety Leadership</h6>
                  <p className="small text-muted mb-0">
                    Permit to Work compliance, Job Safety Analysis (JSA), hazard identification, and supervisory safety accountability.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-12">
              <div className="p-3 border rounded-3 bg-light d-flex align-items-start gap-3">
                <i className="bi bi-tools text-primary fs-3 mt-1"></i>
                <div>
                  <h6 className="fw-bold text-navy mb-1">Technical & Mechanical Skills</h6>
                  <p className="small text-muted mb-0">
                    Flange bolting, pressure joint integrity, mechanical valves, scaffolding inspection, and rigging safety.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-12">
              <div className="p-3 border rounded-3 bg-light d-flex align-items-start gap-3">
                <i className="bi bi-geo-alt-fill text-primary fs-3 mt-1"></i>
                <div>
                  <h6 className="fw-bold text-navy mb-1">On-Site Client Mobilization</h6>
                  <p className="small text-muted mb-0">
                    Our certified facilitators deploy directly to your facility, fabrication yard, barge, or operating terminal nationwide.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="p-3 border-start border-4 border-warning bg-light">
            <h6 className="fw-bold text-navy mb-1">Preferential Corporate Rates</h6>
            <p className="small text-muted mb-0">
              Discounts available for cohorts of 5 or more personnel with customized scheduling and modular shifts.
            </p>
          </div>
        </div>

        <div className="col-lg-6">
          <div className="card border-0 shadow-sm border rounded-3 p-4 p-md-5">
            {submittedRef ? (
              <div className="text-center py-5">
                <i className="bi bi-check-circle-fill text-success fs-1 mb-3 d-block"></i>
                <h4 className="fw-bold text-navy mb-2">Request Submitted Successfully</h4>
                <p className="text-muted small mb-3">
                  Thank you! Your tracking reference number is{' '}
                  <strong className="text-navy">{submittedRef}</strong>.
                </p>
                <p className="small text-muted mb-4">
                  Our Corporate Workforce Solutions Manager will review your requirements and reach out within 24 business hours with a formal curriculum proposal and commercial quotation.
                </p>
                <button
                  onClick={() => {
                    setSubmittedRef(null);
                    setCompanyName('');
                    setRequirement('');
                  }}
                  className="btn btn-sm btn-outline-primary"
                >
                  Submit Another Request
                </button>
              </div>
            ) : (
              <>
                <h4 className="fw-bold text-navy mb-2">Request Corporate Training</h4>
                <p className="small text-muted mb-4">
                  Complete the form below to receive a formal curriculum proposal and commercial quotation.
                </p>

                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label className="form-label small fw-bold text-navy">
                      Company Name *
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      required
                      placeholder="e.g. Apex Marine Logistics Ltd"
                    />
                  </div>

                  <div className="row g-3 mb-3">
                    <div className="col-md-6">
                      <label className="form-label small fw-bold text-navy">
                        Contact Person *
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        value={contactPerson}
                        onChange={(e) => setContactPerson(e.target.value)}
                        required
                        placeholder="Full Name"
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label small fw-bold text-navy">
                        Official Email *
                      </label>
                      <input
                        type="email"
                        className="form-control"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        placeholder="name@company.com"
                      />
                    </div>
                  </div>

                  <div className="row g-3 mb-3">
                    <div className="col-md-6">
                      <label className="form-label small fw-bold text-navy">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        className="form-control"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                        placeholder="+234 800 000 0000"
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label small fw-bold text-navy">
                        Industry Sector *
                      </label>
                      <select
                        className="form-select"
                        value={industry}
                        onChange={(e) => setIndustry(e.target.value)}
                      >
                        <option value="Oil & Gas Upstream">Oil & Gas (Upstream)</option>
                        <option value="Oil & Gas Downstream">Oil & Gas (Downstream / Refining)</option>
                        <option value="Maritime & Offshore">Maritime & Offshore Operations</option>
                        <option value="Construction & Engineering">Construction & EPC</option>
                        <option value="Manufacturing & Industrial">Manufacturing Plants</option>
                        <option value="Power & Energy">Power & Energy Utilities</option>
                        <option value="Other">Other Industrial</option>
                      </select>
                    </div>
                  </div>

                  <div className="row g-3 mb-3">
                    <div className="col-md-6">
                      <label className="form-label small fw-bold text-navy">
                        Number of Participants *
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        min={1}
                        max={500}
                        value={participants}
                        onChange={(e) => setParticipants(Number(e.target.value))}
                        required
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label small fw-bold text-navy">
                        Preferred Training Date
                      </label>
                      <input
                        type="date"
                        className="form-control"
                        value={preferredDate}
                        onChange={(e) => setPreferredDate(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="mb-3">
                    <label className="form-label small fw-bold text-navy">
                      Training Location / Venue *
                    </label>
                    <select
                      className="form-select"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                    >
                      <option value="Skytop Port Harcourt Centre">Skytop Port Harcourt Training Centre</option>
                      <option value="On-site Client Facility (Port Harcourt)">Client Facility in Port Harcourt</option>
                      <option value="On-site Client Facility (Lagos / Nationwide)">Client Facility Nationwide</option>
                      <option value="Online Virtual Classroom">Virtual Online Delivery</option>
                    </select>
                  </div>

                  <div className="mb-3">
                    <label className="form-label small fw-bold text-navy">
                      Training Requirement / Program Topics *
                    </label>
                    <textarea
                      className="form-control"
                      rows={3}
                      value={requirement}
                      onChange={(e) => setRequirement(e.target.value)}
                      required
                      placeholder="Specify your desired course topics, specific hazards, or learning objectives..."
                    ></textarea>
                  </div>

                  <div className="mb-4">
                    <label className="form-label small fw-bold text-navy">
                      Additional Notes
                    </label>
                    <textarea
                      className="form-control"
                      rows={2}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Any special scheduling constraints or requirements..."
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="btn btn-skytop-orange w-100 py-2 fw-bold text-uppercase"
                  >
                    <i className="bi bi-send-fill me-1"></i> Submit Request
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
