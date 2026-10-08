import React from 'react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenEnroll: (courseId?: number) => void;
  onOpenCorporate: () => void;
  onOpenDownload: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  onOpenEnroll,
  onOpenCorporate,
  onOpenDownload,
}) => {
  return (
    <>
      {/* Top Slim Info Bar */}
      <div className="skytop-topbar py-1 d-none d-md-block">
        <div className="container d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center gap-3">
            <span>
              <i className="bi bi-geo-alt-fill text-warning me-1"></i>
              Trans-Amadi, Port Harcourt, Rivers State, Nigeria
            </span>
            <span>
              <i className="bi bi-telephone-fill text-warning me-1"></i>
              +234 803 000 7890
            </span>
            <span>
              <i className="bi bi-envelope-fill text-warning me-1"></i>
              training@skytop.ng
            </span>
          </div>
          <div className="d-flex align-items-center gap-3">
            <button
              onClick={onOpenDownload}
              className="btn btn-xs btn-outline-warning text-white py-0 px-2 fw-semibold border-warning text-decoration-none"
              style={{ fontSize: '0.75rem' }}
            >
              <i className="bi bi-file-earmark-zip me-1"></i>
              PHP & MySQL Package (.ZIP)
            </button>
            <span className="text-white-50" style={{ fontSize: '0.78rem' }}>
              Oil & Gas • HSE • Technical Skills
            </span>
          </div>
        </div>
      </div>

      {/* Main Sticky Navbar */}
      <nav className="navbar navbar-expand-lg navbar-light sticky-top skytop-navbar py-2">
        <div className="container">
          {/* Brand Logo */}
          <button
            className="navbar-brand d-flex align-items-center gap-2 border-0 bg-transparent text-start p-0"
            onClick={() => setActiveTab('home')}
          >
            <img
              src="/assets/images/logo.png"
              alt="Skytop Global Services Limited"
              style={{ height: '48px', width: 'auto', objectFit: 'contain' }}
              className="d-inline-block"
            />
          </button>

          {/* Mobile Toggler */}
          <button
            className="navbar-toggler border-0"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#skytopNav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Links */}
          <div className="collapse navbar-collapse" id="skytopNav">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0 align-items-lg-center">
              {[
                { id: 'home', label: 'Home' },
                { id: 'about', label: 'About' },
                { id: 'courses', label: 'Training' },
                { id: 'services', label: 'Services' },
                { id: 'corporate', label: 'Corporate Training' },
                { id: 'calendar', label: 'Calendar' },
                { id: 'blog', label: 'Insights' },
                { id: 'faq', label: 'FAQ' },
                { id: 'contact', label: 'Contact' },
              ].map((item) => (
                <li className="nav-item" key={item.id}>
                  <button
                    className={`nav-link skytop-nav-link border-0 bg-transparent ${
                      activeTab === item.id ? 'active' : ''
                    }`}
                    onClick={() => setActiveTab(item.id)}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>

            {/* CTAs */}
            <div className="d-flex align-items-center gap-2 ms-lg-3 mt-3 mt-lg-0">
              <button
                onClick={() => onOpenEnroll()}
                className="btn btn-skytop-orange btn-sm text-uppercase fw-bold px-3 shadow-sm"
              >
                Enroll Now
              </button>
              <button
                onClick={() => setActiveTab('admin')}
                className="btn btn-outline-secondary btn-sm"
                title="Staff & Admin Portal"
              >
                <i className="bi bi-lock-fill"></i>
              </button>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};
