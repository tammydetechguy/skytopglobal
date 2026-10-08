import React from 'react';

interface HeroSectionProps {
  onExploreCourses: () => void;
  onEnrollNow: () => void;
  onRequestCorporate: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreCourses,
  onEnrollNow,
  onRequestCorporate,
}) => {
  return (
    <section className="hero-wrapper">
      <img
        src="/assets/images/hero_oil_gas_rig.jpg"
        alt="Offshore Oil & Gas Rig"
        className="hero-bg-img"
        onError={(e) => {
          (e.currentTarget as HTMLImageElement).style.display = 'none';
        }}
      />
      <div className="hero-overlay"></div>
      <div className="container hero-content py-5">
        <div className="row align-items-center">
          <div className="col-lg-8 col-xl-7">
            <span className="badge bg-warning text-dark fw-bold mb-3 px-3 py-2 text-uppercase tracking-wider">
              <i className="bi bi-shield-check me-1"></i> Industry-Focused Professional Training
            </span>
            <h1
              className="display-4 fw-extrabold text-white mb-3"
              style={{ fontWeight: 800, lineHeight: 1.15 }}
            >
              BUILDING COMPETENCE.<br />EMPOWERING PROFESSIONALS.
            </h1>
            <p className="lead text-white-50 mb-4" style={{ fontSize: '1.15rem' }}>
              Professional Oil & Gas, HSE, Safety, and Technical Skills Training for Individuals and Organizations in Port Harcourt and Across Nigeria.
            </p>
            <div className="d-flex flex-wrap gap-3">
              <button
                onClick={onExploreCourses}
                className="btn btn-skytop-orange px-4 py-2 fs-6"
              >
                <i className="bi bi-grid-fill me-1"></i> EXPLORE COURSES
              </button>
              <button
                onClick={onEnrollNow}
                className="btn btn-skytop-outline px-4 py-2 fs-6"
              >
                <i className="bi bi-person-plus-fill me-1"></i> ENROLL NOW
              </button>
              <button
                onClick={onRequestCorporate}
                className="btn btn-outline-light px-3 py-2 fs-6"
              >
                <i className="bi bi-building me-1"></i> REQUEST CORPORATE TRAINING
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
