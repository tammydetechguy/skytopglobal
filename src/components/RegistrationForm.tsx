import React, { useState } from 'react';
import { CourseItem, RegistrationRecord } from '../data/skytopData';

interface RegistrationFormProps {
  courses: CourseItem[];
  preselectedCourseId?: number;
  onSuccess: (record: RegistrationRecord) => void;
}

export const RegistrationForm: React.FC<RegistrationFormProps> = ({
  courses,
  preselectedCourseId,
  onSuccess,
}) => {
  const [courseId, setCourseId] = useState<number>(
    preselectedCourseId || (courses.length > 0 ? courses[0].id : 1)
  );
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [gender, setGender] = useState('Male');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [trainingMode, setTrainingMode] = useState('Classroom');
  const [preferredDate, setPreferredDate] = useState('');
  const [address, setAddress] = useState('');
  const [state, setState] = useState('Rivers State');
  const [country, setCountry] = useState('Nigeria');
  const [notes, setNotes] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!firstName.trim() || !lastName.trim() || !email.trim() || !phone.trim()) {
      setErrorMsg('Please complete all required fields.');
      return;
    }
    if (!agreed) {
      setErrorMsg('You must accept the training participation terms.');
      return;
    }

    const selectedCourse = courses.find((c) => c.id === Number(courseId)) || courses[0];
    const year = new Date().getFullYear();
    const randomHex = Math.floor(1000 + Math.random() * 9000);
    const regId = `SGS-${year}-${randomHex}`;

    const newRecord: RegistrationRecord = {
      id: Date.now(),
      registration_id: regId,
      course_id: selectedCourse.id,
      course_title: selectedCourse.title,
      category_name: selectedCourse.category_name,
      fee_ngn: selectedCourse.fee_ngn,
      duration: selectedCourse.duration,
      first_name: firstName.trim(),
      last_name: lastName.trim(),
      gender,
      email: email.trim(),
      phone: phone.trim(),
      company_name: companyName.trim(),
      job_title: jobTitle.trim(),
      training_mode: trainingMode,
      preferred_date: preferredDate,
      address: address.trim(),
      state,
      country,
      notes: notes.trim(),
      payment_status: 'Pending',
      status: 'New',
      created_at: new Date().toISOString(),
    };

    onSuccess(newRecord);
  };

  return (
    <div className="card border-0 shadow-sm border rounded-3 p-4 p-md-5 max-w-3xl mx-auto" style={{ maxWidth: '820px' }}>
      <h4 className="fw-bold text-navy mb-2">Participant Enrolment Form</h4>
      <p className="text-muted small mb-4">
        Please provide accurate contact information. A formal registration slip with your unique reference ID will be generated upon submission.
      </p>

      {errorMsg && (
        <div className="alert alert-danger py-2 small mb-4">
          <i className="bi bi-exclamation-triangle-fill me-2"></i> {errorMsg}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="form-label small fw-bold text-navy">
            Select Training Program *
          </label>
          <select
            className="form-select form-select-lg fs-6"
            value={courseId}
            onChange={(e) => setCourseId(Number(e.target.value))}
            required
          >
            {courses.map((c) => (
              <option key={c.id} value={c.id}>
                {c.title} (₦{c.fee_ngn.toLocaleString()} - {c.duration})
              </option>
            ))}
          </select>
        </div>

        <div className="row g-3 mb-3">
          <div className="col-md-6">
            <label className="form-label small fw-bold text-navy">First Name *</label>
            <input
              type="text"
              className="form-control"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
              placeholder="e.g. Chukwuma"
            />
          </div>
          <div className="col-md-6">
            <label className="form-label small fw-bold text-navy">Last Name *</label>
            <input
              type="text"
              className="form-control"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
              placeholder="e.g. Briggs"
            />
          </div>
        </div>

        <div className="row g-3 mb-3">
          <div className="col-md-4">
            <label className="form-label small fw-bold text-navy">Gender *</label>
            <select
              className="form-select"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
          <div className="col-md-4">
            <label className="form-label small fw-bold text-navy">Email Address *</label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="name@domain.com"
            />
          </div>
          <div className="col-md-4">
            <label className="form-label small fw-bold text-navy">Phone Number *</label>
            <input
              type="tel"
              className="form-control"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              placeholder="+234 800 000 0000"
            />
          </div>
        </div>

        <div className="row g-3 mb-3">
          <div className="col-md-6">
            <label className="form-label small fw-bold text-navy">
              Company / Sponsoring Organization
            </label>
            <input
              type="text"
              className="form-control"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              placeholder="Leave blank if self-sponsored"
            />
          </div>
          <div className="col-md-6">
            <label className="form-label small fw-bold text-navy">
              Job Title / Designation
            </label>
            <input
              type="text"
              className="form-control"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
              placeholder="e.g. HSE Officer, Graduate Trainee"
            />
          </div>
        </div>

        <div className="row g-3 mb-3">
          <div className="col-md-6">
            <label className="form-label small fw-bold text-navy">
              Preferred Training Mode *
            </label>
            <select
              className="form-select"
              value={trainingMode}
              onChange={(e) => setTrainingMode(e.target.value)}
            >
              <option value="Classroom">Classroom (Port Harcourt Centre)</option>
              <option value="Online">Virtual / Online Interactive</option>
              <option value="Hybrid">Hybrid (Classroom + Virtual)</option>
              <option value="Corporate On-site">Corporate On-site Facility</option>
            </select>
          </div>
          <div className="col-md-6">
            <label className="form-label small fw-bold text-navy">Preferred Date</label>
            <input
              type="date"
              className="form-control"
              value={preferredDate}
              onChange={(e) => setPreferredDate(e.target.value)}
            />
          </div>
        </div>

        <div className="row g-3 mb-3">
          <div className="col-md-6">
            <label className="form-label small fw-bold text-navy">State / Location</label>
            <input
              type="text"
              className="form-control"
              value={state}
              onChange={(e) => setState(e.target.value)}
            />
          </div>
          <div className="col-md-6">
            <label className="form-label small fw-bold text-navy">Country</label>
            <input
              type="text"
              className="form-control"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            />
          </div>
        </div>

        <div className="mb-3">
          <label className="form-label small fw-bold text-navy">
            Residential or Office Address
          </label>
          <input
            type="text"
            className="form-control"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Street address, City"
          />
        </div>

        <div className="mb-4">
          <label className="form-label small fw-bold text-navy">
            Additional Notes / Dietary or Access Requirements
          </label>
          <textarea
            className="form-control"
            rows={2}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Any special accommodations or requirements..."
          ></textarea>
        </div>

        <div className="form-check mb-4">
          <input
            className="form-check-input"
            type="checkbox"
            id="termsCheckbox"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
            required
          />
          <label className="form-check-label small text-muted" htmlFor="termsCheckbox">
            I confirm that the information provided is accurate and agree to Skytop Global Services Limited&apos;s training participation guidelines.
          </label>
        </div>

        <button
          type="submit"
          className="btn btn-skytop-orange w-100 py-3 fw-bold text-uppercase fs-6 shadow-sm"
        >
          <i className="bi bi-person-check-fill me-1"></i> Complete Enrolment & Generate Slip
        </button>
      </form>
    </div>
  );
};
