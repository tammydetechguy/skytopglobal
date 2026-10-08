import React from 'react';

interface FooterProps {
  setActiveTab: (tab: string) => void;
  onOpenEnroll: () => void;
  onOpenCorporate: () => void;
  onOpenDownload: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  setActiveTab,
  onOpenEnroll,
  onOpenCorporate,
  onOpenDownload,
}) => {
  return (
    <>
      {/* Master CTA Banner */}
      <section className="py-5 bg-navy text-white text-center position-relative overflow-hidden">
        <div className="container position-relative z-2">
          <h2 className="display-6 fw-bold mb-3">
            START YOUR PROFESSIONAL DEVELOPMENT JOURNEY
          </h2>
          <p
            className="lead text-white-50 mx-auto mb-4"
            style={{ maxWidth: '720px' }}
          >
            Equip yourself and your team with recognized competencies in Oil & Gas, Health, Safety & Environment, and Technical Engineering operations.
          </p>
          <div className="d-flex flex-wrap justify-content-center gap-3">
            <button
              onClick={() => setActiveTab('courses')}
              className="btn btn-skytop-outline px-4 py-2"
            >
              <i className="bi bi-grid-fill me-1"></i> EXPLORE COURSES
            </button>
            <button
              onClick={onOpenEnroll}
              className="btn btn-skytop-orange px-4 py-2"
            >
              <i className="bi bi-person-check-fill me-1"></i> ENROLL NOW
            </button>
            <button
              onClick={onOpenCorporate}
              className="btn btn-skytop-outline px-4 py-2"
            >
              <i className="bi bi-building-check me-1"></i> REQUEST CORPORATE TRAINING
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-navy-dark text-white pt-5 pb-4 border-top border-secondary border-opacity-25">
        <div className="container">
          <div className="row g-4 mb-4">
            <div className="col-lg-4 col-md-6">
              <div className="mb-3">
                <img
                  src="/assets/images/logo.png"
                  alt="Skytop Global Services Limited"
                  style={{ height: '52px', width: 'auto', objectFit: 'contain' }}
                  className="bg-white p-1 rounded shadow-sm d-inline-block"
                />
              </div>
              <p className="text-white-50 small mb-3">
                Skytop Global Services Limited is a premier Nigerian technical training and professional development institute in Port Harcourt. We equip individuals, contractors, and energy organizations with critical skills in Oil & Gas, HSE, and engineering competence.
              </p>
              <div className="d-flex gap-2">
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-sm btn-outline-light rounded-circle"
                  style={{ width: '34px', height: '34px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}
                >
                  <i className="bi bi-linkedin"></i>
                </a>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-sm btn-outline-light rounded-circle"
                  style={{ width: '34px', height: '34px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}
                >
                  <i className="bi bi-facebook"></i>
                </a>
                <a
                  href="https://wa.me/2348030007890"
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-sm btn-outline-light rounded-circle"
                  style={{ width: '34px', height: '34px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}
                >
                  <i className="bi bi-whatsapp"></i>
                </a>
              </div>
            </div>

            <div className="col-lg-2 col-md-6 col-6">
              <h6 className="text-uppercase fw-bold text-warning mb-3 small tracking-wider">
                Quick Links
              </h6>
              <ul className="list-unstyled small mb-0 d-flex flex-column gap-2 text-white-50">
                <li>
                  <button
                    onClick={() => setActiveTab('home')}
                    className="btn btn-link p-0 text-white-50 text-decoration-none hover-white"
                  >
                    Home
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveTab('about')}
                    className="btn btn-link p-0 text-white-50 text-decoration-none hover-white"
                  >
                    About Us
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveTab('courses')}
                    className="btn btn-link p-0 text-white-50 text-decoration-none hover-white"
                  >
                    Course Catalog
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveTab('calendar')}
                    className="btn btn-link p-0 text-white-50 text-decoration-none hover-white"
                  >
                    Training Calendar
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveTab('corporate')}
                    className="btn btn-link p-0 text-white-50 text-decoration-none hover-white"
                  >
                    Corporate Training
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveTab('faq')}
                    className="btn btn-link p-0 text-white-50 text-decoration-none hover-white"
                  >
                    FAQ
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveTab('contact')}
                    className="btn btn-link p-0 text-white-50 text-decoration-none hover-white"
                  >
                    Contact Us
                  </button>
                </li>
              </ul>
            </div>

            <div className="col-lg-3 col-md-6 col-6">
              <h6 className="text-uppercase fw-bold text-warning mb-3 small tracking-wider">
                Training Tracks
              </h6>
              <ul className="list-unstyled small mb-0 d-flex flex-column gap-2 text-white-50">
                <li>
                  <button
                    onClick={() => setActiveTab('courses')}
                    className="btn btn-link p-0 text-white-50 text-decoration-none hover-white text-start"
                  >
                    HSE & Safety Training
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveTab('courses')}
                    className="btn btn-link p-0 text-white-50 text-decoration-none hover-white text-start"
                  >
                    Oil & Gas Operations
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveTab('courses')}
                    className="btn btn-link p-0 text-white-50 text-decoration-none hover-white text-start"
                  >
                    Technical & Vocational Skills
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveTab('courses')}
                    className="btn btn-link p-0 text-white-50 text-decoration-none hover-white text-start"
                  >
                    ISO 45001 & Risk Systems
                  </button>
                </li>
                <li>
                  <button
                    onClick={onOpenCorporate}
                    className="btn btn-link p-0 text-white-50 text-decoration-none hover-white text-start"
                  >
                    Workforce Solutions
                  </button>
                </li>
              </ul>
            </div>

            <div className="col-lg-3 col-md-6">
              <h6 className="text-uppercase fw-bold text-warning mb-3 small tracking-wider">
                Training Centre
              </h6>
              <p className="text-white-50 small mb-2">
                <i className="bi bi-geo-alt text-warning me-2"></i>
                Trans-Amadi Industrial Layout, Port Harcourt, Rivers State, Nigeria
              </p>
              <p className="text-white-50 small mb-2">
                <i className="bi bi-telephone text-warning me-2"></i>
                +234 803 000 7890
              </p>
              <p className="text-white-50 small mb-2">
                <i className="bi bi-whatsapp text-warning me-2"></i>
                +234 803 000 7890
              </p>
              <p className="text-white-50 small mb-3">
                <i className="bi bi-envelope text-warning me-2"></i>
                training@skytop.ng
              </p>
              <button
                onClick={onOpenDownload}
                className="btn btn-sm btn-outline-warning w-100"
              >
                <i className="bi bi-download me-1"></i> Download PHP & MySQL .ZIP
              </button>
            </div>
          </div>

          <hr className="border-secondary opacity-25 my-3" />

          <div className="d-flex flex-column flex-md-row justify-content-between align-items-center text-white-50 small">
            <div>
              &copy; {new Date().getFullYear()} Skytop Global Services Limited. All Rights Reserved.
            </div>
            <div className="d-flex gap-3 mt-2 mt-md-0">
              <button
                onClick={() => setActiveTab('admin')}
                className="btn btn-link p-0 text-white-50 text-decoration-none"
              >
                <i className="bi bi-lock me-1"></i> Staff Portal
              </button>
              <span>·</span>
              <span className="text-white-50">Port Harcourt, Nigeria</span>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};
