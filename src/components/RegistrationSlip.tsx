import React from 'react';
import { RegistrationRecord } from '../data/skytopData';

interface RegistrationSlipProps {
  registration: RegistrationRecord;
  onNewRegistration: () => void;
  onReturnHome: () => void;
}

export const RegistrationSlip: React.FC<RegistrationSlipProps> = ({
  registration,
  onNewRegistration,
  onReturnHome,
}) => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-3xl mx-auto" style={{ maxWidth: '820px' }}>
      {/* Alert bar with Print button */}
      <div className="alert alert-success d-flex align-items-center justify-content-between p-3 mb-4 no-print shadow-sm">
        <div className="d-flex align-items-center gap-2">
          <i className="bi bi-check-circle-fill fs-3 text-success"></i>
          <div>
            <h6 className="fw-bold mb-0">Registration Successfully Submitted!</h6>
            <small>
              Your candidate registration number is{' '}
              <strong>{registration.registration_id}</strong>.
            </small>
          </div>
        </div>
        <div className="d-flex gap-2">
          <button
            type="button"
            onClick={handlePrint}
            className="btn btn-outline-success btn-sm fw-bold"
          >
            <i className="bi bi-printer-fill me-1"></i> Print / Save PDF
          </button>
        </div>
      </div>

      {/* Official Registration Slip Card */}
      <div
        id="printable-slip"
        className="card border rounded-3 p-4 p-md-5 bg-white shadow-sm"
      >
        {/* Header */}
        <div className="d-flex justify-content-between align-items-start border-bottom pb-4 mb-4">
          <div className="d-flex align-items-center gap-3">
            <img
              src="/assets/images/logo.png"
              alt="Skytop Global Services Limited"
              style={{ height: '64px', width: 'auto', objectFit: 'contain' }}
              className="d-inline-block"
            />
            <div>
              <small
                className="text-muted d-block text-uppercase fw-semibold"
                style={{ letterSpacing: '0.08em' }}
              >
                Official Training Registration Slip
              </small>
              <small className="text-muted">
                Trans-Amadi Industrial Layout, Port Harcourt, Rivers State, Nigeria
              </small>
            </div>
          </div>
          <div className="text-end">
            <span className="badge bg-navy text-warning p-2 fs-6 font-monospace">
              {registration.registration_id}
            </span>
            <small className="text-muted d-block mt-1">
              Date: {new Date().toLocaleDateString('en-GB')}
            </small>
          </div>
        </div>

        {/* Candidate Profile */}
        <h5 className="fw-bold text-navy mb-3">
          <i className="bi bi-person-lines-fill me-2 text-primary"></i> Participant Profile
        </h5>
        <div className="row g-3 mb-4">
          <div className="col-sm-6">
            <span className="text-muted small d-block">Full Name:</span>
            <span className="fw-bold text-dark">
              {registration.first_name} {registration.last_name}
            </span>
          </div>
          <div className="col-sm-6">
            <span className="text-muted small d-block">Gender:</span>
            <span className="fw-bold text-dark">{registration.gender}</span>
          </div>
          <div className="col-sm-6">
            <span className="text-muted small d-block">Email Address:</span>
            <span className="fw-bold text-dark">{registration.email}</span>
          </div>
          <div className="col-sm-6">
            <span className="text-muted small d-block">Phone Number:</span>
            <span className="fw-bold text-dark">{registration.phone}</span>
          </div>
          <div className="col-sm-6">
            <span className="text-muted small d-block">Organization / Company:</span>
            <span className="fw-bold text-dark">
              {registration.company_name || 'Individual / Self-Sponsored'}
            </span>
          </div>
          <div className="col-sm-6">
            <span className="text-muted small d-block">Job Title:</span>
            <span className="fw-bold text-dark">
              {registration.job_title || 'Candidate'}
            </span>
          </div>
        </div>

        {/* Program Enrolment */}
        <h5 className="fw-bold text-navy mb-3 border-top pt-3">
          <i className="bi bi-journal-check me-2 text-primary"></i> Program Enrolment
        </h5>
        <div className="row g-3 mb-4">
          <div className="col-sm-8">
            <span className="text-muted small d-block">Course Title:</span>
            <span className="fw-bold text-navy fs-6">
              {registration.course_title}
            </span>
            <small className="text-muted d-block">
              {registration.category_name} ({registration.duration})
            </small>
          </div>
          <div className="col-sm-4 text-sm-end">
            <span className="text-muted small d-block">Tuition Fee:</span>
            <span className="fw-bold text-navy fs-5">
              ₦{registration.fee_ngn.toLocaleString()}
            </span>
          </div>
          <div className="col-sm-6">
            <span className="text-muted small d-block">Selected Training Mode:</span>
            <span className="badge bg-light text-dark border">
              {registration.training_mode}
            </span>
          </div>
          <div className="col-sm-6">
            <span className="text-muted small d-block">Training Venue:</span>
            <span className="fw-semibold text-dark">
              Skytop Corporate Learning Hub, Trans-Amadi, Port Harcourt
            </span>
          </div>
        </div>

        {/* Venue & Payment Instructions */}
        <div className="bg-light p-3 rounded border mb-4">
          <h6 className="fw-bold text-navy mb-2">
            <i className="bi bi-info-circle-fill text-warning me-1"></i> Reporting & Payment Instructions
          </h6>
          <p className="small text-muted mb-1">
            1. Present this registration slip at the reception on your training start date for badge issuing and course pack collection.
          </p>
          <p className="small text-muted mb-1">
            2. For bank transfer or corporate invoicing, reference your Registration ID{' '}
            <strong>{registration.registration_id}</strong> in the transaction remarks.
          </p>
          <p className="small text-muted mb-0">
            3. For questions, call our Admissions Desk at <strong>+234 803 000 7890</strong> or email <strong>training@skytop.ng</strong>.
          </p>
        </div>

        {/* Footer */}
        <div className="d-flex justify-content-between align-items-center text-muted small border-top pt-3">
          <span>Skytop Global Services Limited • Port Harcourt, Nigeria</span>
          <span className="fw-semibold font-monospace">STATUS: REGISTRATION RECORDED</span>
        </div>
      </div>

      {/* Buttons */}
      <div className="text-center mt-4 no-print d-flex justify-content-center gap-3">
        <button onClick={onNewRegistration} className="btn btn-outline-secondary">
          Register Another Candidate
        </button>
        <button onClick={onReturnHome} className="btn btn-skytop-primary">
          Return to Homepage
        </button>
      </div>
    </div>
  );
};
