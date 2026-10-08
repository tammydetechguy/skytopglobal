import { useState } from 'react';
import {
  INITIAL_COURSES,
  INITIAL_CATEGORIES,
  INITIAL_SCHEDULES,
  INITIAL_REGISTRATIONS,
  INITIAL_CORPORATE_REQUESTS,
  INITIAL_INSTRUCTORS,
  INITIAL_BLOGS,
  INITIAL_FAQS,
  CourseItem,
  RegistrationRecord,
  CorporateRequestRecord,
  BlogPostItem,
} from './data/skytopData';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HeroSection } from './components/HeroSection';
import { CourseCatalog } from './components/CourseCatalog';
import { CourseDetailsModal } from './components/CourseDetailsModal';
import { RegistrationForm } from './components/RegistrationForm';
import { RegistrationSlip } from './components/RegistrationSlip';
import { CorporateSection } from './components/CorporateSection';
import { CalendarSection } from './components/CalendarSection';
import { DeploymentModal } from './components/DeploymentModal';
import { AdminPortal } from './components/AdminPortal';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [courses, setCourses] = useState<CourseItem[]>(INITIAL_COURSES);
  const [schedules] = useState(INITIAL_SCHEDULES);
  const [registrations, setRegistrations] = useState<RegistrationRecord[]>(INITIAL_REGISTRATIONS);
  const [corporateRequests, setCorporateRequests] = useState<CorporateRequestRecord[]>(INITIAL_CORPORATE_REQUESTS);

  // Modals & Active Selections
  const [selectedCourse, setSelectedCourse] = useState<CourseItem | null>(null);
  const [enrollingCourseId, setEnrollingCourseId] = useState<number | undefined>(undefined);
  const [activeSlip, setActiveSlip] = useState<RegistrationRecord | null>(null);
  const [showDownloadModal, setShowDownloadModal] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState<BlogPostItem | null>(null);

  // Contact form state
  const [contactSent, setContactSent] = useState(false);

  const handleOpenEnroll = (courseId?: number) => {
    setEnrollingCourseId(courseId);
    setActiveSlip(null);
    setActiveTab('register');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRegistrationSuccess = (newRecord: RegistrationRecord) => {
    setRegistrations([newRecord, ...registrations]);
    setActiveSlip(newRecord);
  };

  const handleCorporateSubmit = (req: CorporateRequestRecord) => {
    setCorporateRequests([req, ...corporateRequests]);
  };

  const handleAddCourse = (newCourse: CourseItem) => {
    setCourses([newCourse, ...courses]);
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      {/* Navbar (Hidden in Admin portal for focus) */}
      {activeTab !== 'admin' && (
        <Navbar
          activeTab={activeTab}
          setActiveTab={(tab) => {
            setActiveTab(tab);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onOpenEnroll={handleOpenEnroll}
          onOpenCorporate={() => {
            setActiveTab('corporate');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onOpenDownload={() => setShowDownloadModal(true)}
        />
      )}

      {/* Main Content Area */}
      <main className="flex-grow-1">
        {/* ===================== TAB: HOME ===================== */}
        {activeTab === 'home' && (
          <div>
            <HeroSection
              onExploreCourses={() => {
                setActiveTab('courses');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onEnrollNow={() => handleOpenEnroll()}
              onRequestCorporate={() => {
                setActiveTab('corporate');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />

            {/* Value / Trust Strip */}
            <section className="trust-strip">
              <div className="container">
                <div className="row g-0">
                  <div className="col-md-4 col-lg trust-item">
                    <div className="d-flex align-items-start gap-3">
                      <i className="bi bi-gear-wide-connected fs-2 text-primary"></i>
                      <div>
                        <h6 className="fw-bold mb-1 text-navy">Industry-Focused Training</h6>
                        <p className="small text-muted mb-0">Practical programs tailored around real workplace operations.</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4 col-lg trust-item">
                    <div className="d-flex align-items-start gap-3">
                      <i className="bi bi-person-badge fs-2 text-primary"></i>
                      <div>
                        <h6 className="fw-bold mb-1 text-navy">Experienced Instructors</h6>
                        <p className="small text-muted mb-0">Learn directly from seasoned energy & safety specialists.</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4 col-lg trust-item">
                    <div className="d-flex align-items-start gap-3">
                      <i className="bi bi-wrench-adjustable fs-2 text-primary"></i>
                      <div>
                        <h6 className="fw-bold mb-1 text-navy">Practical Learning</h6>
                        <p className="small text-muted mb-0">Competency-based drills and live operational scenarios.</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 col-lg trust-item">
                    <div className="d-flex align-items-start gap-3">
                      <i className="bi bi-graph-up-arrow fs-2 text-primary"></i>
                      <div>
                        <h6 className="fw-bold mb-1 text-navy">Career Advancement</h6>
                        <p className="small text-muted mb-0">Build job-ready capabilities to excel across upstream sectors.</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 col-lg trust-item">
                    <div className="d-flex align-items-start gap-3">
                      <i className="bi bi-building-check fs-2 text-primary"></i>
                      <div>
                        <h6 className="fw-bold mb-1 text-navy">Corporate Readiness</h6>
                        <p className="small text-muted mb-0">Customized workforce solutions for companies and teams.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* About Section */}
            <section className="py-5 bg-white">
              <div className="container py-lg-4">
                <div className="row align-items-center g-5">
                  <div className="col-lg-6">
                    <div className="position-relative">
                      <img
                        src="/assets/images/practical_hse_training.jpg"
                        alt="Practical HSE Training Session"
                        className="img-fluid rounded-3 shadow-sm border"
                        style={{ objectFit: 'cover', width: '100%', maxHeight: '440px' }}
                        onError={(e) => {
                          (e.currentTarget as HTMLImageElement).src =
                            'https://placehold.co/600x440/082B49/FFF?text=Skytop+HSE+Training';
                        }}
                      />
                      <div
                        className="position-absolute bottom-0 start-0 bg-navy text-white p-3 rounded-end shadow-lg"
                        style={{ maxWidth: '280px' }}
                      >
                        <span className="d-block fw-bold fs-5 text-warning">Port Harcourt</span>
                        <small className="text-white-50">
                          Strategic training hub serving Niger Delta and national energy corridors.
                        </small>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <span className="section-kicker">About Skytop Global Services</span>
                    <h2 className="section-heading">Advancing Workplace Safety & Operational Competence</h2>
                    <p className="text-muted mb-3">
                      <strong>Skytop Global Services Limited</strong> is an indigenous Nigerian professional training and technical skills development institute based in Port Harcourt, Rivers State. We are dedicated to bridging the critical competency gap across the energy, manufacturing, maritime, and construction sectors.
                    </p>
                    <p className="text-muted mb-4">
                      Our training programs are designed around recognized professional practices and applicable standards. From foundational HSE qualifications to high-pressure joint integrity, process safety management, and customized corporate workshops, we provide actionable competence that translates directly to zero-incident workplace performance.
                    </p>
                    <div className="row g-3 mb-4">
                      <div className="col-sm-6">
                        <div className="d-flex align-items-center gap-2">
                          <i className="bi bi-check-circle-fill text-warning fs-5"></i>
                          <span className="fw-semibold text-navy">Zero-Incident Philosophy</span>
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="d-flex align-items-center gap-2">
                          <i className="bi bi-check-circle-fill text-warning fs-5"></i>
                          <span className="fw-semibold text-navy">Practical Hands-On Simulators</span>
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="d-flex align-items-center gap-2">
                          <i className="bi bi-check-circle-fill text-warning fs-5"></i>
                          <span className="fw-semibold text-navy">Verifiable Registration IDs</span>
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="d-flex align-items-center gap-2">
                          <i className="bi bi-check-circle-fill text-warning fs-5"></i>
                          <span className="fw-semibold text-navy">Bespoke Corporate Tracks</span>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        setActiveTab('about');
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="btn btn-skytop-primary"
                    >
                      Learn More About Us <i className="bi bi-arrow-right"></i>
                    </button>
                  </div>
                </div>
              </div>
            </section>

            {/* Core Services Grid */}
            <section className="py-5 bg-skytop-light">
              <div className="container py-lg-4">
                <div className="text-center mb-5">
                  <span className="section-kicker">What We Do</span>
                  <h2 className="section-heading">Core Training & Consultancy Services</h2>
                  <p className="text-muted mx-auto" style={{ maxWidth: '650px' }}>
                    Comprehensive competency tracks engineered for individuals pursuing career growth and organizations upgrading workforce capabilities.
                  </p>
                </div>

                <div className="row g-4">
                  {[
                    {
                      icon: 'bi-shield-shaded',
                      title: 'HSE & Safety Training',
                      desc: 'Workplace safety governance, hazard identification, risk assessment, emergency preparedness, and HSE Level 1, 2, and 3 certifications.',
                      tab: 'courses',
                    },
                    {
                      icon: 'bi-droplet-half',
                      title: 'Oil & Gas Operations',
                      desc: 'Upstream drilling overview, offshore platform safety, process safety management (PSM), gas testing, and wellhead integrity.',
                      tab: 'courses',
                    },
                    {
                      icon: 'bi-tools',
                      title: 'Technical & Vocational Skills',
                      desc: 'Industrial flange bolting, pipe fitting, electrical isolations, mechanical maintenance, and non-destructive inspection fundamentals.',
                      tab: 'courses',
                    },
                    {
                      icon: 'bi-briefcase-fill',
                      title: 'Professional Development',
                      desc: 'ISO 45001, ISO 9001, and ISO 14001 auditing, safety leadership for managers, and contractor HSE performance oversight.',
                      tab: 'courses',
                    },
                    {
                      icon: 'bi-building-check',
                      title: 'Corporate Workforce Training',
                      desc: 'Customized on-site programs engineered to address site-specific hazards, regulatory compliance, and turnaround readiness.',
                      tab: 'corporate',
                    },
                    {
                      icon: 'bi-clipboard2-check-fill',
                      title: 'HSE & Systems Consultancy',
                      desc: 'Operational risk assessments, HSE manual drafting, facility safety inspections, and incident prevention advisory services.',
                      tab: 'services',
                    },
                  ].map((s, idx) => (
                    <div className="col-md-6 col-lg-4" key={idx}>
                      <div className="skytop-card service-card p-4 h-100 d-flex flex-column">
                        <div className="text-primary mb-3">
                          <i className={`bi ${s.icon} fs-1`}></i>
                        </div>
                        <h5 className="fw-bold text-navy mb-2">{s.title}</h5>
                        <p className="text-muted small mb-3 flex-grow-1">{s.desc}</p>
                        <button
                          onClick={() => {
                            setActiveTab(s.tab);
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                          }}
                          className="btn btn-link text-primary p-0 fw-semibold text-decoration-none align-self-start"
                        >
                          Learn More <i className="bi bi-chevron-right"></i>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Featured Courses Catalog Preview */}
            <section className="py-5 bg-white">
              <div className="container py-lg-4">
                <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-end mb-4">
                  <div>
                    <span className="section-kicker">Course Catalog</span>
                    <h2 className="section-heading mb-0">Featured Training Programs</h2>
                  </div>
                  <button
                    onClick={() => {
                      setActiveTab('courses');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="btn btn-skytop-navy-outline mt-3 mt-md-0"
                  >
                    View All Courses ({courses.length}) <i className="bi bi-arrow-right"></i>
                  </button>
                </div>

                <div className="row g-4">
                  {courses.slice(0, 6).map((c) => (
                    <div className="col-md-6 col-lg-4" key={c.id}>
                      <div className="card h-100 skytop-card border overflow-hidden">
                        <div className="card-body p-4 d-flex flex-column">
                          <div className="d-flex justify-content-between align-items-center mb-2">
                            <span className="text-muted small fw-semibold">
                              {c.category_name}
                            </span>
                            <span className="badge bg-light text-navy border fw-bold">
                              {c.level}
                            </span>
                          </div>
                          <h5 className="card-title fw-bold text-navy mb-2">{c.title}</h5>
                          <p className="card-text text-muted small flex-grow-1 mb-3">
                            {c.short_description}
                          </p>
                          <div className="pt-3 border-top d-flex justify-content-between align-items-center text-muted small mb-3">
                            <span>
                              <i className="bi bi-clock me-1 text-primary"></i> {c.duration}
                            </span>
                            <span>
                              <i className="bi bi-laptop me-1 text-primary"></i>{' '}
                              {c.training_mode}
                            </span>
                          </div>
                          <div className="d-flex justify-content-between align-items-center pt-2">
                            <span className="fs-5 fw-bold text-navy">
                              ₦{c.fee_ngn.toLocaleString()}
                            </span>
                            <div className="d-flex gap-2">
                              <button
                                onClick={() => setSelectedCourse(c)}
                                className="btn btn-sm btn-outline-secondary"
                              >
                                Details
                              </button>
                              <button
                                onClick={() => handleOpenEnroll(c.id)}
                                className="btn btn-sm btn-skytop-orange"
                              >
                                Enroll
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Training Delivery Modes */}
            <section className="py-5 bg-skytop-light">
              <div className="container py-lg-4">
                <div className="text-center mb-5">
                  <span className="section-kicker">Flexible Delivery</span>
                  <h2 className="section-heading">How We Deliver Training</h2>
                  <p className="text-muted mx-auto" style={{ maxWidth: '600px' }}>
                    Designed around operational schedules and workforce learning preferences.
                  </p>
                </div>

                <div className="row g-4">
                  {[
                    {
                      icon: 'bi-mortarboard',
                      title: 'Classroom Training',
                      desc: 'Interactive instructor-led sessions in our Port Harcourt technical learning suites with practical simulation kits.',
                    },
                    {
                      icon: 'bi-laptop',
                      title: 'Virtual / Online',
                      desc: 'Live interactive online classes for remote engineers, offshore shift personnel, and busy executives.',
                    },
                    {
                      icon: 'bi-building',
                      title: 'Corporate On-Site',
                      desc: 'Instructors mobilized to client operational bases, barges, fabrication yards, or offshore terminals nationwide.',
                    },
                    {
                      icon: 'bi-diagram-3',
                      title: 'Hybrid Model',
                      desc: 'Self-paced theoretical modules combined with intensive weekend practical workshop evaluations.',
                    },
                  ].map((m, idx) => (
                    <div className="col-md-6 col-lg-3" key={idx}>
                      <div className="skytop-card p-4 text-center h-100">
                        <div className="rounded-circle bg-navy text-white d-inline-flex p-3 mb-3">
                          <i className={`bi ${m.icon} fs-3 text-warning`}></i>
                        </div>
                        <h5 className="fw-bold text-navy">{m.title}</h5>
                        <p className="text-muted small mb-0">{m.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Industries We Serve */}
            <section className="py-5 bg-white">
              <div className="container py-lg-4">
                <div className="text-center mb-5">
                  <span className="section-kicker">Sector Coverage</span>
                  <h2 className="section-heading">Industries We Serve</h2>
                  <p className="text-muted mx-auto" style={{ maxWidth: '600px' }}>
                    Providing safety, technical skills, and compliance solutions across high-hazard operating sectors.
                  </p>
                </div>

                <div className="row g-3 row-cols-2 row-cols-md-3 row-cols-lg-6 text-center">
                  {[
                    { icon: 'bi-fuel-pump', name: 'Oil & Gas (Up/Down)' },
                    { icon: 'bi-tsunami', name: 'Maritime & Offshore' },
                    { icon: 'bi-hammer', name: 'Heavy Construction' },
                    { icon: 'bi-gear-fill', name: 'Manufacturing Plants' },
                    { icon: 'bi-lightning-charge-fill', name: 'Power & Energy' },
                    { icon: 'bi-truck', name: 'Logistics & Supply' },
                  ].map((ind, idx) => (
                    <div className="col" key={idx}>
                      <div className="p-3 border rounded h-100 d-flex flex-column align-items-center justify-content-center">
                        <i className={`bi ${ind.icon} fs-2 text-primary mb-2`}></i>
                        <span className="fw-bold text-navy small">{ind.name}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Upcoming Training Calendar Preview */}
            <section className="py-5 bg-skytop-light">
              <div className="container py-lg-4">
                <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-end mb-4">
                  <div>
                    <span className="section-kicker">Training Schedule</span>
                    <h2 className="section-heading mb-0">Upcoming Training Cohorts</h2>
                  </div>
                  <button
                    onClick={() => {
                      setActiveTab('calendar');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="btn btn-skytop-primary mt-3 mt-md-0"
                  >
                    Full Training Calendar <i className="bi bi-calendar3 ms-1"></i>
                  </button>
                </div>

                <div className="table-responsive bg-white rounded-3 shadow-sm border">
                  <table className="table table-hover align-middle mb-0">
                    <thead className="table-light">
                      <tr>
                        <th className="ps-3 py-3 text-navy">Course Title</th>
                        <th className="py-3 text-navy">Date</th>
                        <th className="py-3 text-navy">Location</th>
                        <th className="py-3 text-navy">Mode</th>
                        <th className="py-3 text-navy">Status</th>
                        <th className="pe-3 py-3 text-end text-navy">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {schedules.slice(0, 4).map((sch) => (
                        <tr key={sch.id}>
                          <td className="ps-3">
                            <span className="fw-bold text-navy d-block">
                              {sch.course_title}
                            </span>
                            <small className="text-muted">{sch.duration}</small>
                          </td>
                          <td>
                            <span className="fw-semibold text-dark">
                              {new Date(sch.start_date).toLocaleDateString('en-GB', {
                                day: '2-digit',
                                month: 'short',
                              })}
                            </span>
                            <small className="text-muted d-block">
                              to{' '}
                              {new Date(sch.end_date).toLocaleDateString('en-GB', {
                                day: '2-digit',
                                month: 'short',
                                year: 'numeric',
                              })}
                            </small>
                          </td>
                          <td>{sch.location_name}</td>
                          <td>
                            <span className="badge bg-light text-dark border">
                              {sch.training_mode}
                            </span>
                          </td>
                          <td>
                            {sch.status === 'OPEN' ? (
                              <span className="badge bg-success-subtle text-success fw-bold">
                                OPEN ({sch.slots_available} SLOTS)
                              </span>
                            ) : (
                              <span className="badge bg-warning-subtle text-dark fw-bold">
                                FEW SLOTS ({sch.slots_available})
                              </span>
                            )}
                          </td>
                          <td className="pe-3 text-end">
                            <button
                              onClick={() => handleOpenEnroll(sch.course_id)}
                              className="btn btn-sm btn-skytop-orange"
                            >
                              Register
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* ===================== TAB: ABOUT ===================== */}
        {activeTab === 'about' && (
          <div>
            <div className="bg-navy text-white py-5">
              <div className="container py-3">
                <span className="badge bg-warning text-dark fw-bold mb-2 text-uppercase">
                  Corporate Profile
                </span>
                <h1 className="fw-bold display-5 mb-2">About Skytop Global Services Limited</h1>
                <p className="lead text-white-50 mb-0" style={{ maxWidth: '720px' }}>
                  Building Competence. Empowering Professionals. Advancing Safety across the energy, manufacturing, and technical industries.
                </p>
              </div>
            </div>

            <div className="container py-5">
              <div className="row g-5 align-items-center mb-5">
                <div className="col-lg-6">
                  <span className="section-kicker">Who We Are</span>
                  <h2 className="section-heading mb-3">
                    A Dedicated Nigerian Energy & Safety Training Institute
                  </h2>
                  <p className="text-muted">
                    <strong>Skytop Global Services Limited</strong> is an indigenous Nigerian training and professional development institute headquartered in Port Harcourt, Rivers State. We are established to provide world-class, competency-focused learning solutions tailored to the operational demands of the Nigerian energy corridor, maritime operations, and heavy industrial sectors.
                  </p>
                  <p className="text-muted">
                    Our training programs are designed around recognized professional practices and applicable standards. From entry-level HSE qualifications to high-pressure joint integrity, process safety management, and customized corporate workshops, we provide actionable competence that translates directly to zero-incident workplace performance.
                  </p>

                  <div className="alert alert-light border small text-muted">
                    <i className="bi bi-shield-check text-primary me-2"></i>
                    <strong>Professional Standard Philosophy:</strong> All curricula are strictly structured around recognized industry practices, statutory workplace safety frameworks, and international occupational guidelines.
                  </div>
                </div>

                <div className="col-lg-6">
                  <div className="p-4 bg-light rounded-3 border">
                    <div className="mb-4">
                      <h5 className="fw-bold text-navy">
                        <i className="bi bi-compass-fill text-warning me-2"></i> Our Mission
                      </h5>
                      <p className="text-muted small mb-0">
                        To systematically build technical competence, instill uncompromising safety culture, and empower Nigerian and international professionals to operate with excellence in high-hazard environments.
                      </p>
                    </div>
                    <div className="mb-4">
                      <h5 className="fw-bold text-navy">
                        <i className="bi bi-eye-fill text-warning me-2"></i> Our Vision
                      </h5>
                      <p className="text-muted small mb-0">
                        To be the leading indigenous training and competency development benchmark in West Africa, recognized for practical mastery, operational integrity, and sustainable workplace safety advancement.
                      </p>
                    </div>
                    <div>
                      <h5 className="fw-bold text-navy">
                        <i className="bi bi-award-fill text-warning me-2"></i> Core Values
                      </h5>
                      <div className="d-flex flex-wrap gap-2 pt-2">
                        <span className="badge bg-white text-navy border p-2">Safety First</span>
                        <span className="badge bg-white text-navy border p-2">Technical Competence</span>
                        <span className="badge bg-white text-navy border p-2">Integrity & Transparency</span>
                        <span className="badge bg-white text-navy border p-2">Practical Mastery</span>
                        <span className="badge bg-white text-navy border p-2">Continuous Improvement</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Instructors preview */}
              <div className="pt-4 border-top">
                <div className="text-center mb-5">
                  <span className="section-kicker">Faculty & Facilitators</span>
                  <h2 className="section-heading">Our Certified Instructors</h2>
                </div>
                <div className="row g-4">
                  {INITIAL_INSTRUCTORS.map((inst) => (
                    <div className="col-md-4" key={inst.id}>
                      <div className="card h-100 skytop-card border p-4 text-center">
                        <div
                          className="mx-auto rounded-circle bg-navy text-warning p-4 mb-3 d-inline-flex align-items-center justify-content-center"
                          style={{ width: '84px', height: '84px' }}
                        >
                          <i className="bi bi-person-badge fs-2"></i>
                        </div>
                        <h5 className="fw-bold text-navy mb-1">{inst.full_name}</h5>
                        <span className="text-primary fw-semibold small d-block mb-2">
                          {inst.title}
                        </span>
                        <span className="badge bg-light text-muted border mb-3">
                          {inst.specialization}
                        </span>
                        <p className="text-muted small mb-0">{inst.bio}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ===================== TAB: COURSES ===================== */}
        {activeTab === 'courses' && (
          <div>
            <div className="bg-navy text-white py-5">
              <div className="container py-3">
                <span className="badge bg-warning text-dark fw-bold mb-2 text-uppercase">
                  Competency Catalog
                </span>
                <h1 className="fw-bold display-5 mb-2">Training Courses & Certifications</h1>
                <p className="lead text-white-50 mb-0" style={{ maxWidth: '700px' }}>
                  Industry-focused training designed around recognized professional practices and applicable standards.
                </p>
              </div>
            </div>

            <div className="container py-5">
              <CourseCatalog
                courses={courses}
                categories={INITIAL_CATEGORIES}
                onSelectCourse={(course) => setSelectedCourse(course)}
                onEnrollCourse={(id) => handleOpenEnroll(id)}
              />
            </div>
          </div>
        )}

        {/* ===================== TAB: SERVICES ===================== */}
        {activeTab === 'services' && (
          <div>
            <div className="bg-navy text-white py-5">
              <div className="container py-3">
                <span className="badge bg-warning text-dark fw-bold mb-2 text-uppercase">
                  Solutions Portfolio
                </span>
                <h1 className="fw-bold display-5 mb-2">Our Services & Core Pillars</h1>
                <p className="lead text-white-50 mb-0" style={{ maxWidth: '720px' }}>
                  Structured professional development and industrial consulting engineered for energy professionals and operating companies.
                </p>
              </div>
            </div>

            <div className="container py-5">
              <div className="row g-5">
                {[
                  {
                    title: '1. HSE & Safety Training',
                    sub: 'Workplace Health, Safety & Environmental Governance',
                    icon: 'bi-shield-shaded',
                    desc: 'Our safety curriculum covers statutory principles, practical hazard identification, risk assessment, and incident management designed to eliminate workplace accidents.',
                    bullets: [
                      'Basic Occupational Health & Safety (HSE Level 1)',
                      'Advanced HSE Management & Risk Assessment (HSE Level 2 & 3)',
                      'Permit to Work (PTW) & Lockout/Tagout (LOTO) Procedures',
                      'Working at Heights & Fall Protection Governance',
                      'Confined Space Entry & Atmospheric Testing',
                      'Fire Safety, Industrial First Aid & CPR Resuscitation',
                    ],
                  },
                  {
                    title: '2. Oil & Gas Operations',
                    sub: 'Upstream, Midstream & Downstream Processing',
                    icon: 'bi-droplet-half',
                    desc: 'Technical programs bridging theory and practical field execution across exploration, drilling, production facilities, and offshore environments.',
                    bullets: [
                      'Introduction to Offshore Oil & Gas Production Operations',
                      'Process Safety Management (PSM) & HAZOP Methodologies',
                      'Hazardous Area Classification (ATEX / IECEx Standards)',
                      'Wellhead Integrity & Blowout Prevention Fundamentals',
                      'Oil Spill Response & Environmental Remediation Strategy',
                    ],
                  },
                  {
                    title: '3. Technical & Vocational Skills',
                    sub: 'Hands-on Engineering & Mechanical Integrity',
                    icon: 'bi-tools',
                    desc: 'Equipping technicians with practical hands-on proficiency to maintain mechanical integrity, prevent leaks, and sustain plant uptime.',
                    bullets: [
                      'Industrial Flange Bolting, Torqueing & Joint Integrity',
                      'Pipe Fitting, Blueprint Reading & Isometric Drawing',
                      'Mechanical Valve Overhaul & Hydrostatic Pressure Testing',
                      'Electrical Isolations, Earthing & Safe Switching',
                    ],
                  },
                  {
                    title: '4. HSE & Systems Consultancy',
                    sub: 'Regulatory Compliance & Enterprise Audits',
                    icon: 'bi-clipboard2-check',
                    desc: 'Guiding energy organizations in establishing, verifying, and sustaining integrated management systems compliant with international best practices.',
                    bullets: [
                      'ISO 45001, 9001 & 14001 Audit Readiness & System Setup',
                      'Quantitative Facility Risk Assessment (QRA) & HAZID/HAZOP Facilitation',
                      'Contractor HSE Pre-Qualification Management',
                      'Corporate Incident Investigation & Root Cause Analysis',
                    ],
                  },
                ].map((srv, idx) => (
                  <div className="col-lg-6" key={idx}>
                    <div className="card h-100 p-4 border rounded-3 service-card">
                      <div className="d-flex align-items-center gap-3 mb-3">
                        <div className="bg-navy p-3 text-warning rounded">
                          <i className={`bi ${srv.icon} fs-3`}></i>
                        </div>
                        <div>
                          <h4 className="fw-bold text-navy mb-0">{srv.title}</h4>
                          <small className="text-muted">{srv.sub}</small>
                        </div>
                      </div>
                      <p className="text-muted small mb-3">{srv.desc}</p>
                      <ul className="text-muted small d-flex flex-column gap-1 mb-4">
                        {srv.bullets.map((b, bIdx) => (
                          <li key={bIdx}>• {b}</li>
                        ))}
                      </ul>
                      <button
                        onClick={() => {
                          setActiveTab('courses');
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        className="btn btn-sm btn-skytop-primary align-self-start"
                      >
                        Explore Programs <i className="bi bi-arrow-right ms-1"></i>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ===================== TAB: CORPORATE ===================== */}
        {activeTab === 'corporate' && (
          <div>
            <div className="bg-navy text-white py-5">
              <div className="container py-3">
                <span className="badge bg-warning text-dark fw-bold mb-2 text-uppercase">
                  Enterprise Workforce Solutions
                </span>
                <h1 className="fw-bold display-5 mb-2">Corporate Training Solutions</h1>
                <p className="lead text-white-50 mb-0" style={{ maxWidth: '720px' }}>
                  Customized workforce training designed around your operating facility, offshore platforms, and safety compliance needs.
                </p>
              </div>
            </div>

            <CorporateSection onSubmitCorporate={handleCorporateSubmit} />
          </div>
        )}

        {/* ===================== TAB: CALENDAR ===================== */}
        {activeTab === 'calendar' && (
          <div>
            <div className="bg-navy text-white py-5">
              <div className="container py-3">
                <span className="badge bg-warning text-dark fw-bold mb-2 text-uppercase">
                  Schedule Directory
                </span>
                <h1 className="fw-bold display-5 mb-2">Training Calendar</h1>
                <p className="lead text-white-50 mb-0" style={{ maxWidth: '700px' }}>
                  Plan your technical and safety certifications across upcoming cohorts in Port Harcourt and virtual learning sessions.
                </p>
              </div>
            </div>

            <CalendarSection
              schedules={schedules}
              onEnrollSchedule={(cId) => handleOpenEnroll(cId)}
              onRequestCorporate={() => {
                setActiveTab('corporate');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
          </div>
        )}

        {/* ===================== TAB: REGISTER / ENROLL ===================== */}
        {activeTab === 'register' && (
          <div>
            <div className="bg-navy text-white py-5 no-print">
              <div className="container py-3">
                <span className="badge bg-warning text-dark fw-bold mb-2 text-uppercase">
                  Admissions & Enrolment
                </span>
                <h1 className="fw-bold display-5 mb-2">Training Registration</h1>
                <p className="lead text-white-50 mb-0" style={{ maxWidth: '720px' }}>
                  Secure your slot in upcoming cohorts or submit enrolment details for corporate invoicing.
                </p>
              </div>
            </div>

            <div className="container py-5">
              {activeSlip ? (
                <RegistrationSlip
                  registration={activeSlip}
                  onNewRegistration={() => {
                    setActiveSlip(null);
                    setEnrollingCourseId(undefined);
                  }}
                  onReturnHome={() => {
                    setActiveTab('home');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                />
              ) : (
                <RegistrationForm
                  courses={courses}
                  preselectedCourseId={enrollingCourseId}
                  onSuccess={handleRegistrationSuccess}
                />
              )}
            </div>
          </div>
        )}

        {/* ===================== TAB: BLOG / INSIGHTS ===================== */}
        {activeTab === 'blog' && (
          <div>
            <div className="bg-navy text-white py-5">
              <div className="container py-3">
                <span className="badge bg-warning text-dark fw-bold mb-2 text-uppercase">
                  Knowledge Hub
                </span>
                <h1 className="fw-bold display-5 mb-2">Technical Insights & Articles</h1>
                <p className="lead text-white-50 mb-0" style={{ maxWidth: '700px' }}>
                  Expert analysis on process safety, hazard prevention, and technical workforce development.
                </p>
              </div>
            </div>

            <div className="container py-5">
              {selectedBlog ? (
                <div className="max-w-3xl mx-auto" style={{ maxWidth: '800px' }}>
                  <button
                    onClick={() => setSelectedBlog(null)}
                    className="btn btn-sm btn-outline-secondary mb-4"
                  >
                    ← Back to All Articles
                  </button>
                  <span className="badge bg-warning text-dark fw-bold mb-2">
                    {selectedBlog.category_name}
                  </span>
                  <h2 className="fw-bold text-navy mb-3">{selectedBlog.title}</h2>
                  <p className="text-muted small mb-4">
                    By <strong>{selectedBlog.author}</strong> · Published{' '}
                    {new Date(selectedBlog.published_at).toLocaleDateString('en-GB')}
                  </p>
                  <p className="lead text-dark fw-semibold mb-4">{selectedBlog.excerpt}</p>
                  <div className="text-muted lh-lg mb-5" style={{ fontSize: '1.05rem' }}>
                    <p>{selectedBlog.content}</p>
                    <p>
                      In high-hazard environments like Port Harcourt and the wider Gulf of Guinea operating corridors, adherence to formal operating envelopes and verified safety standards is non-negotiable. Continuous workforce drilling and practical scenario assessment ensure teams execute with confidence.
                    </p>
                  </div>
                  <div className="p-4 bg-light rounded-3 border d-flex justify-content-between align-items-center">
                    <div>
                      <h6 className="fw-bold text-navy mb-1">
                        Looking to train your workforce on this subject?
                      </h6>
                      <small className="text-muted">
                        Speak with our technical advisors today.
                      </small>
                    </div>
                    <button
                      onClick={() => {
                        setActiveTab('corporate');
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="btn btn-skytop-orange btn-sm text-uppercase fw-bold"
                    >
                      Corporate Quote
                    </button>
                  </div>
                </div>
              ) : (
                <div className="row g-4">
                  {INITIAL_BLOGS.map((post) => (
                    <div className="col-md-6 col-lg-4" key={post.id}>
                      <div className="card h-100 skytop-card border overflow-hidden">
                        <div className="card-body p-4 d-flex flex-column">
                          <div className="d-flex justify-content-between align-items-center mb-2">
                            <span className="text-primary small fw-semibold">
                              {post.category_name}
                            </span>
                            <small className="text-muted">
                              {new Date(post.published_at).toLocaleDateString('en-GB')}
                            </small>
                          </div>
                          <h5 className="fw-bold text-navy mb-2">{post.title}</h5>
                          <p className="text-muted small flex-grow-1 mb-3">
                            {post.excerpt}
                          </p>
                          <div className="d-flex justify-content-between align-items-center border-top pt-3">
                            <small className="text-muted">
                              <i className="bi bi-person me-1"></i> {post.author}
                            </small>
                            <button
                              onClick={() => setSelectedBlog(post)}
                              className="btn btn-sm btn-link text-primary text-decoration-none fw-bold p-0"
                            >
                              Read Article <i className="bi bi-arrow-right"></i>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* ===================== TAB: FAQ ===================== */}
        {activeTab === 'faq' && (
          <div>
            <div className="bg-navy text-white py-5">
              <div className="container py-3">
                <span className="badge bg-warning text-dark fw-bold mb-2 text-uppercase">
                  Learner Assistance
                </span>
                <h1 className="fw-bold display-5 mb-2">Frequently Asked Questions</h1>
                <p className="lead text-white-50 mb-0" style={{ maxWidth: '700px' }}>
                  Answers to key questions regarding course enrolment, schedules, venue details, and corporate arrangements.
                </p>
              </div>
            </div>

            <div className="container py-5">
              <div className="row">
                <div className="col-lg-9 mx-auto">
                  <div className="accordion" id="appFaqAccordion">
                    {INITIAL_FAQS.map((faq, idx) => (
                      <div className="accordion-item border mb-3 rounded overflow-hidden" key={faq.id}>
                        <h2 className="accordion-header" id={`faqHeading${idx}`}>
                          <button
                            className={`accordion-button fw-bold text-navy ${
                              idx !== 0 ? 'collapsed' : ''
                            }`}
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target={`#faqCollapse${idx}`}
                            aria-expanded={idx === 0 ? 'true' : 'false'}
                          >
                            {faq.question}
                          </button>
                        </h2>
                        <div
                          id={`faqCollapse${idx}`}
                          className={`accordion-collapse collapse ${idx === 0 ? 'show' : ''}`}
                          data-bs-parent="#appFaqAccordion"
                        >
                          <div className="accordion-body text-muted small lh-lg">
                            {faq.answer}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="text-center mt-5 p-4 bg-light rounded-3 border">
                    <h5 className="fw-bold text-navy mb-1">Have a question not covered here?</h5>
                    <p className="text-muted small mb-3">
                      Our training advisors in Port Harcourt are ready to assist you.
                    </p>
                    <button
                      onClick={() => {
                        setActiveTab('contact');
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="btn btn-skytop-primary"
                    >
                      <i className="bi bi-chat-dots-fill me-1"></i> Contact Admissions Team
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ===================== TAB: CONTACT ===================== */}
        {activeTab === 'contact' && (
          <div>
            <div className="bg-navy text-white py-5">
              <div className="container py-3">
                <span className="badge bg-warning text-dark fw-bold mb-2 text-uppercase">
                  Admissions & Inquiries
                </span>
                <h1 className="fw-bold display-5 mb-2">Contact Us</h1>
                <p className="lead text-white-50 mb-0" style={{ maxWidth: '700px' }}>
                  Visit our corporate learning centre in Port Harcourt or reach out for custom corporate proposals.
                </p>
              </div>
            </div>

            <div className="container py-5">
              <div className="row g-5">
                <div className="col-lg-5">
                  <span className="section-kicker">Get in Touch</span>
                  <h3 className="fw-bold text-navy mb-4">Training Centre & Head Office</h3>

                  <div className="card p-4 border rounded-3 bg-light mb-4">
                    <div className="d-flex align-items-start gap-3 mb-3">
                      <i className="bi bi-geo-alt-fill text-warning fs-3"></i>
                      <div>
                        <h6 className="fw-bold text-navy mb-1">Port Harcourt Training Hub</h6>
                        <p className="text-muted small mb-0">
                          Trans-Amadi Industrial Layout, Port Harcourt, Rivers State, Nigeria
                        </p>
                      </div>
                    </div>

                    <div className="d-flex align-items-start gap-3 mb-3">
                      <i className="bi bi-telephone-fill text-warning fs-3"></i>
                      <div>
                        <h6 className="fw-bold text-navy mb-1">Telephone</h6>
                        <p className="text-muted small mb-0">+234 803 000 7890</p>
                      </div>
                    </div>

                    <div className="d-flex align-items-start gap-3 mb-3">
                      <i className="bi bi-whatsapp text-warning fs-3"></i>
                      <div>
                        <h6 className="fw-bold text-navy mb-1">WhatsApp Direct</h6>
                        <p className="text-muted small mb-0">+234 803 000 7890</p>
                      </div>
                    </div>

                    <div className="d-flex align-items-start gap-3">
                      <i className="bi bi-envelope-fill text-warning fs-3"></i>
                      <div>
                        <h6 className="fw-bold text-navy mb-1">Email Inquiries</h6>
                        <p className="text-muted small mb-0">training@skytop.ng</p>
                      </div>
                    </div>
                  </div>

                  <div className="card p-4 border rounded-3">
                    <h6 className="fw-bold text-navy mb-2">
                      <i className="bi bi-clock-history text-primary me-2"></i> Business & Training Hours
                    </h6>
                    <p className="small text-muted mb-1">Monday – Friday: 8:00 AM – 5:00 PM</p>
                    <p className="small text-muted mb-0">Saturday (Weekend Cohorts): 9:00 AM – 2:00 PM</p>
                  </div>
                </div>

                <div className="col-lg-7">
                  <div className="card border-0 shadow-sm border rounded-3 p-4 p-md-5">
                    {contactSent ? (
                      <div className="text-center py-5">
                        <i className="bi bi-check-circle-fill text-success fs-1 mb-3 d-block"></i>
                        <h4 className="fw-bold text-navy mb-2">Message Sent Successfully!</h4>
                        <p className="text-muted small mb-4">
                          Thank you for contacting Skytop Global Services Limited. Our client advisory team in Port Harcourt will respond promptly.
                        </p>
                        <button
                          onClick={() => setContactSent(false)}
                          className="btn btn-sm btn-outline-primary"
                        >
                          Send Another Message
                        </button>
                      </div>
                    ) : (
                      <>
                        <h4 className="fw-bold text-navy mb-2">Send an Inquiry</h4>
                        <p className="text-muted small mb-4">
                          Our client advisory team will respond promptly.
                        </p>

                        <form
                          onSubmit={(e) => {
                            e.preventDefault();
                            setContactSent(true);
                          }}
                        >
                          <div className="row g-3 mb-3">
                            <div className="col-md-6">
                              <label className="form-label small fw-bold text-navy">
                                Full Name *
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                required
                                placeholder="Your Full Name"
                              />
                            </div>
                            <div className="col-md-6">
                              <label className="form-label small fw-bold text-navy">
                                Email Address *
                              </label>
                              <input
                                type="email"
                                className="form-control"
                                required
                                placeholder="name@domain.com"
                              />
                            </div>
                          </div>

                          <div className="row g-3 mb-3">
                            <div className="col-md-6">
                              <label className="form-label small fw-bold text-navy">
                                Phone Number
                              </label>
                              <input
                                type="tel"
                                className="form-control"
                                placeholder="+234 800 000 0000"
                              />
                            </div>
                            <div className="col-md-6">
                              <label className="form-label small fw-bold text-navy">
                                Subject *
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                required
                                placeholder="Course Inquiry / Corporate Training"
                              />
                            </div>
                          </div>

                          <div className="mb-4">
                            <label className="form-label small fw-bold text-navy">
                              Your Message *
                            </label>
                            <textarea
                              className="form-control"
                              rows={4}
                              required
                              placeholder="How can our technical training team assist you?"
                            ></textarea>
                          </div>

                          <button
                            type="submit"
                            className="btn btn-skytop-orange w-100 py-2 fw-bold text-uppercase"
                          >
                            <i className="bi bi-send-fill me-1"></i> Send Message
                          </button>
                        </form>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ===================== TAB: ADMIN ===================== */}
        {activeTab === 'admin' && (
          <AdminPortal
            courses={courses}
            registrations={registrations}
            corporateRequests={corporateRequests}
            schedules={schedules}
            onAddCourse={handleAddCourse}
            onViewSlip={(rec) => {
              setActiveSlip(rec);
              setActiveTab('register');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onExit={() => {
              setActiveTab('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}
      </main>

      {/* Global Modals */}
      <CourseDetailsModal
        course={selectedCourse}
        onClose={() => setSelectedCourse(null)}
        onEnroll={(cId) => handleOpenEnroll(cId)}
        onRequestCorporate={() => {
          setActiveTab('corporate');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {showDownloadModal && (
        <DeploymentModal onClose={() => setShowDownloadModal(false)} />
      )}

      {/* Footer (Hidden in Admin portal) */}
      {activeTab !== 'admin' && (
        <Footer
          setActiveTab={(tab) => {
            setActiveTab(tab);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onOpenEnroll={() => handleOpenEnroll()}
          onOpenCorporate={() => {
            setActiveTab('corporate');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onOpenDownload={() => setShowDownloadModal(true)}
        />
      )}
    </div>
  );
}
