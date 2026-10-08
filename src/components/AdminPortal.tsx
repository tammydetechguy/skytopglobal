import React, { useState } from 'react';
import {
  CourseItem,
  RegistrationRecord,
  CorporateRequestRecord,
  TrainingScheduleItem,
} from '../data/skytopData';

interface AdminPortalProps {
  courses: CourseItem[];
  registrations: RegistrationRecord[];
  corporateRequests: CorporateRequestRecord[];
  schedules: TrainingScheduleItem[];
  onAddCourse: (course: CourseItem) => void;
  onViewSlip: (record: RegistrationRecord) => void;
  onExit: () => void;
}

export const AdminPortal: React.FC<AdminPortalProps> = ({
  courses,
  registrations,
  corporateRequests,
  schedules,
  onAddCourse,
  onViewSlip,
  onExit,
}) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState('admin@skytop.ng');
  const [password, setPassword] = useState('Admin@Skytop2026!');
  const [activeTab, setActiveTab] = useState<'overview' | 'courses' | 'registrations' | 'corporate'>('overview');
  const [showAddCourse, setShowAddCourse] = useState(false);

  // Form states for new course
  const [newTitle, setNewTitle] = useState('');
  const [newCatId, setNewCatId] = useState(1);
  const [newLevel, setNewLevel] = useState<'Beginner' | 'Intermediate' | 'Advanced' | 'All Levels'>('Beginner');
  const [newDuration, setNewDuration] = useState('3 Days');
  const [newMode, setNewMode] = useState<'Classroom' | 'Online' | 'Hybrid' | 'Corporate On-site'>('Classroom');
  const [newFee, setNewFee] = useState(85000);
  const [newShortDesc, setNewShortDesc] = useState('');
  const [newOverview, setNewOverview] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim() && password.trim()) {
      setIsLoggedIn(true);
    }
  };

  const handleCreateCourse = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const course: CourseItem = {
      id: Date.now(),
      category_id: newCatId,
      category_name: newCatId === 1 ? 'HSE & Safety' : newCatId === 2 ? 'Oil & Gas Operations' : 'Technical & Vocational Skills',
      category_slug: newCatId === 1 ? 'hse-safety' : newCatId === 2 ? 'oil-and-gas' : 'technical-skills',
      title: newTitle.trim(),
      slug: newTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      short_description: newShortDesc.trim() || 'Professional competency training course.',
      overview: newOverview.trim() || newShortDesc.trim(),
      learning_outcomes: ['Understand key workplace standards', 'Execute standard operating procedures', 'Maintain zero-incident safety culture'],
      target_audience: 'Technical personnel and corporate teams.',
      level: newLevel,
      duration: newDuration,
      training_mode: newMode,
      fee_ngn: Number(newFee),
      is_featured: false,
    };

    onAddCourse(course);
    setShowAddCourse(false);
    setNewTitle('');
    setNewShortDesc('');
    setNewOverview('');
  };

  if (!isLoggedIn) {
    return (
      <div className="container py-5" style={{ maxWidth: '440px' }}>
        <div className="card border-0 shadow-lg rounded-3 overflow-hidden">
          <div className="bg-navy p-4 text-center text-white">
            <img
              src="/assets/images/logo.png"
              alt="Skytop Global Services Limited"
              style={{ height: '70px', width: 'auto', objectFit: 'contain' }}
              className="bg-white p-2 rounded shadow-sm mb-2 d-inline-block"
            />
            <small className="text-white-50 text-uppercase fw-semibold d-block" style={{ letterSpacing: '0.1em' }}>
              Administrative Portal
            </small>
          </div>
          <div className="p-4 p-md-5 bg-white">
            <form onSubmit={handleLogin}>
              <div className="mb-3">
                <label className="form-label small fw-bold text-navy">Admin Email</label>
                <input
                  type="email"
                  className="form-control"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="mb-4">
                <label className="form-label small fw-bold text-navy">Password</label>
                <input
                  type="password"
                  className="form-control"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <small className="text-muted d-block mt-1">
                  Default credentials: <code>Admin@Skytop2026!</code>
                </small>
              </div>

              <button
                type="submit"
                className="btn btn-skytop-orange w-100 py-2 fw-bold text-uppercase"
              >
                <i className="bi bi-box-arrow-in-right me-1"></i> Sign In to Portal
              </button>

              <div className="text-center mt-3">
                <button
                  type="button"
                  onClick={onExit}
                  className="btn btn-link text-muted small text-decoration-none p-0"
                >
                  ← Return to Public Website
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container-fluid py-4 bg-light min-vh-100">
      {/* Admin Top Header */}
      <div className="d-flex justify-content-between align-items-center mb-4 px-3">
        <div className="d-flex align-items-center gap-3">
          <img
            src="/assets/images/logo.png"
            alt="Skytop Logo"
            style={{ height: '42px', width: 'auto', objectFit: 'contain' }}
            className="d-inline-block"
          />
          <div>
            <h4 className="fw-bold text-navy mb-0">Skytop Administration</h4>
            <small className="text-muted">Port Harcourt Centre • Live Management Console</small>
          </div>
        </div>
        <div className="d-flex gap-2">
          <button onClick={onExit} className="btn btn-outline-secondary btn-sm">
            Public Website
          </button>
          <button onClick={() => setIsLoggedIn(false)} className="btn btn-danger btn-sm">
            Sign Out
          </button>
        </div>
      </div>

      <div className="row g-4 px-3">
        {/* Navigation Sidebar */}
        <div className="col-lg-2">
          <div className="list-group shadow-sm border-0">
            <button
              onClick={() => setActiveTab('overview')}
              className={`list-group-item list-group-item-action ${
                activeTab === 'overview' ? 'active bg-navy border-0' : ''
              }`}
            >
              <i className="bi bi-speedometer2 me-2 text-warning"></i> Dashboard
            </button>
            <button
              onClick={() => setActiveTab('courses')}
              className={`list-group-item list-group-item-action ${
                activeTab === 'courses' ? 'active bg-navy border-0' : ''
              }`}
            >
              <i className="bi bi-journal-bookmark me-2 text-primary"></i> Courses ({courses.length})
            </button>
            <button
              onClick={() => setActiveTab('registrations')}
              className={`list-group-item list-group-item-action ${
                activeTab === 'registrations' ? 'active bg-navy border-0' : ''
              }`}
            >
              <i className="bi bi-people me-2 text-success"></i> Registrations ({registrations.length})
            </button>
            <button
              onClick={() => setActiveTab('corporate')}
              className={`list-group-item list-group-item-action ${
                activeTab === 'corporate' ? 'active bg-navy border-0' : ''
              }`}
            >
              <i className="bi bi-building me-2 text-warning"></i> Corporate ({corporateRequests.length})
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="col-lg-10">
          {activeTab === 'overview' && (
            <>
              {/* Stat Cards */}
              <div className="row g-3 mb-4">
                <div className="col-sm-6 col-xl-3">
                  <div className="card border-0 shadow-sm p-3 border-start border-4 border-primary">
                    <small className="text-muted fw-bold text-uppercase">Active Courses</small>
                    <h2 className="fw-bold text-navy mb-0">{courses.length}</h2>
                  </div>
                </div>
                <div className="col-sm-6 col-xl-3">
                  <div className="card border-0 shadow-sm p-3 border-start border-4 border-warning">
                    <small className="text-muted fw-bold text-uppercase">Upcoming Cohorts</small>
                    <h2 className="fw-bold text-navy mb-0">{schedules.length}</h2>
                  </div>
                </div>
                <div className="col-sm-6 col-xl-3">
                  <div className="card border-0 shadow-sm p-3 border-start border-4 border-success">
                    <small className="text-muted fw-bold text-uppercase">Candidate Registrations</small>
                    <h2 className="fw-bold text-navy mb-0">{registrations.length}</h2>
                  </div>
                </div>
                <div className="col-sm-6 col-xl-3">
                  <div className="card border-0 shadow-sm p-3 border-start border-4 border-info">
                    <small className="text-muted fw-bold text-uppercase">Corporate Requests</small>
                    <h2 className="fw-bold text-navy mb-0">{corporateRequests.length}</h2>
                  </div>
                </div>
              </div>

              {/* Recent Candidate Registrations */}
              <div className="card border-0 shadow-sm mb-4">
                <div className="card-header bg-white py-3 d-flex justify-content-between align-items-center">
                  <h6 className="fw-bold text-navy mb-0">Recent Candidate Registrations</h6>
                  <button
                    onClick={() => setActiveTab('registrations')}
                    className="btn btn-sm btn-link text-decoration-none"
                  >
                    View All
                  </button>
                </div>
                <div className="table-responsive">
                  <table className="table table-hover align-middle mb-0">
                    <thead className="table-light small">
                      <tr>
                        <th>ID</th>
                        <th>Candidate</th>
                        <th>Course</th>
                        <th>Mode</th>
                        <th>Phone</th>
                        <th className="text-end">Slip</th>
                      </tr>
                    </thead>
                    <tbody>
                      {registrations.slice(0, 5).map((r) => (
                        <tr key={r.id}>
                          <td>
                            <span className="badge bg-light text-navy border font-monospace">
                              {r.registration_id}
                            </span>
                          </td>
                          <td className="fw-bold text-dark">
                            {r.first_name} {r.last_name}
                          </td>
                          <td className="small">{r.course_title}</td>
                          <td>
                            <span className="badge bg-light text-muted border">
                              {r.training_mode}
                            </span>
                          </td>
                          <td className="small">{r.phone}</td>
                          <td className="text-end">
                            <button
                              onClick={() => onViewSlip(r)}
                              className="btn btn-sm btn-outline-primary"
                            >
                              <i className="bi bi-printer"></i>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}

          {activeTab === 'courses' && (
            <div className="card border-0 shadow-sm p-4">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 className="fw-bold text-navy mb-0">Courses Directory</h5>
                <button
                  onClick={() => setShowAddCourse(true)}
                  className="btn btn-skytop-orange btn-sm fw-bold"
                >
                  <i className="bi bi-plus-circle me-1"></i> Add New Course
                </button>
              </div>

              <div className="table-responsive">
                <table className="table table-hover align-middle mb-0">
                  <thead className="table-light small">
                    <tr>
                      <th>Title</th>
                      <th>Category</th>
                      <th>Level</th>
                      <th>Duration</th>
                      <th>Fee</th>
                      <th>Mode</th>
                    </tr>
                  </thead>
                  <tbody>
                    {courses.map((c) => (
                      <tr key={c.id}>
                        <td>
                          <strong className="text-navy">{c.title}</strong>
                        </td>
                        <td>
                          <span className="badge bg-light text-navy border">
                            {c.category_name}
                          </span>
                        </td>
                        <td>{c.level}</td>
                        <td>{c.duration}</td>
                        <td className="fw-bold text-navy">
                          ₦{c.fee_ngn.toLocaleString()}
                        </td>
                        <td>{c.training_mode}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'registrations' && (
            <div className="card border-0 shadow-sm p-4">
              <h5 className="fw-bold text-navy mb-3">All Candidate Registrations</h5>
              <div className="table-responsive">
                <table className="table table-hover align-middle mb-0">
                  <thead className="table-light small">
                    <tr>
                      <th>Ref Number</th>
                      <th>Candidate</th>
                      <th>Course Enrolled</th>
                      <th>Tuition</th>
                      <th>Contact</th>
                      <th>Company</th>
                      <th className="text-end">Print Slip</th>
                    </tr>
                  </thead>
                  <tbody>
                    {registrations.map((r) => (
                      <tr key={r.id}>
                        <td>
                          <span className="badge bg-light text-navy border font-monospace">
                            {r.registration_id}
                          </span>
                        </td>
                        <td>
                          <strong>{r.first_name} {r.last_name}</strong>
                          <small className="d-block text-muted">{r.gender}</small>
                        </td>
                        <td>{r.course_title}</td>
                        <td className="fw-bold">₦{r.fee_ngn.toLocaleString()}</td>
                        <td>
                          <small className="d-block">{r.email}</small>
                          <small className="text-muted">{r.phone}</small>
                        </td>
                        <td><small>{r.company_name || 'Self'}</small></td>
                        <td className="text-end">
                          <button
                            onClick={() => onViewSlip(r)}
                            className="btn btn-sm btn-outline-primary"
                          >
                            <i className="bi bi-printer me-1"></i> Slip
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'corporate' && (
            <div className="card border-0 shadow-sm p-4">
              <h5 className="fw-bold text-navy mb-3">Corporate Training Inquiries</h5>
              <div className="table-responsive">
                <table className="table table-hover align-middle mb-0">
                  <thead className="table-light small">
                    <tr>
                      <th>Reference</th>
                      <th>Company</th>
                      <th>Contact Person</th>
                      <th>Industry</th>
                      <th>Pax</th>
                      <th>Location</th>
                      <th>Requirement</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {corporateRequests.map((c) => (
                      <tr key={c.id}>
                        <td>
                          <span className="badge bg-light text-navy border font-monospace">
                            {c.reference_no}
                          </span>
                        </td>
                        <td><strong>{c.company_name}</strong></td>
                        <td>
                          <span>{c.contact_person}</span>
                          <small className="d-block text-muted">{c.phone}</small>
                        </td>
                        <td><small>{c.industry}</small></td>
                        <td className="fw-bold">{c.num_participants}</td>
                        <td><small>{c.training_location}</small></td>
                        <td>
                          <small className="text-muted text-truncate d-inline-block" style={{ maxWidth: '240px' }}>
                            {c.training_requirement}
                          </small>
                        </td>
                        <td>
                          <span className="badge bg-warning-subtle text-dark">
                            {c.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Add Course Modal */}
      {showAddCourse && (
        <div className="modal fade show d-block" tabIndex={-1} style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-lg">
            <form onSubmit={handleCreateCourse} className="modal-content">
              <div className="modal-header bg-navy text-white">
                <h5 className="modal-title fw-bold">Add New Course</h5>
                <button type="button" className="btn-close btn-close-white" onClick={() => setShowAddCourse(false)}></button>
              </div>
              <div className="modal-body p-4">
                <div className="mb-3">
                  <label className="form-label small fw-bold text-navy">Course Title *</label>
                  <input
                    type="text"
                    className="form-control"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    required
                    placeholder="e.g. Scaffolding Erection & Inspection"
                  />
                </div>
                <div className="row g-3 mb-3">
                  <div className="col-md-6">
                    <label className="form-label small fw-bold text-navy">Category</label>
                    <select
                      className="form-select"
                      value={newCatId}
                      onChange={(e) => setNewCatId(Number(e.target.value))}
                    >
                      <option value={1}>HSE & Safety</option>
                      <option value={2}>Oil & Gas Operations</option>
                      <option value={3}>Technical & Vocational Skills</option>
                    </select>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label small fw-bold text-navy">Level</label>
                    <select
                      className="form-select"
                      value={newLevel}
                      onChange={(e) => setNewLevel(e.target.value as any)}
                    >
                      <option value="Beginner">Beginner</option>
                      <option value="Intermediate">Intermediate</option>
                      <option value="Advanced">Advanced</option>
                      <option value="All Levels">All Levels</option>
                    </select>
                  </div>
                </div>
                <div className="row g-3 mb-3">
                  <div className="col-md-4">
                    <label className="form-label small fw-bold text-navy">Duration</label>
                    <input
                      type="text"
                      className="form-control"
                      value={newDuration}
                      onChange={(e) => setNewDuration(e.target.value)}
                      required
                    />
                  </div>
                  <div className="col-md-4">
                    <label className="form-label small fw-bold text-navy">Mode</label>
                    <select
                      className="form-select"
                      value={newMode}
                      onChange={(e) => setNewMode(e.target.value as any)}
                    >
                      <option value="Classroom">Classroom</option>
                      <option value="Online">Online</option>
                      <option value="Hybrid">Hybrid</option>
                      <option value="Corporate On-site">Corporate On-site</option>
                    </select>
                  </div>
                  <div className="col-md-4">
                    <label className="form-label small fw-bold text-navy">Fee (NGN)</label>
                    <input
                      type="number"
                      className="form-control"
                      value={newFee}
                      onChange={(e) => setNewFee(Number(e.target.value))}
                      required
                    />
                  </div>
                </div>
                <div className="mb-3">
                  <label className="form-label small fw-bold text-navy">Short Description</label>
                  <textarea
                    className="form-control"
                    rows={2}
                    value={newShortDesc}
                    onChange={(e) => setNewShortDesc(e.target.value)}
                    required
                  ></textarea>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowAddCourse(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-skytop-orange">
                  Save Course
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
