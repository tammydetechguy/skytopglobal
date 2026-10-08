import React, { useState } from 'react';

interface DeploymentModalProps {
  onClose: () => void;
}

export const DeploymentModal: React.FC<DeploymentModalProps> = ({ onClose }) => {
  const [copied, setCopied] = useState(false);

  const sampleDbCode = `-- =====================================================================
-- SKYTOP GLOBAL SERVICES LIMITED - DATABASE SCHEMA & SEED DATA
-- Version: 1.0 (PHP 8+ & MySQL 8.0 / MariaDB 10.4+)
-- =====================================================================
CREATE DATABASE IF NOT EXISTS skytop_db DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE skytop_db;

-- 1. COURSES TABLE
CREATE TABLE courses (
    id INT AUTO_INCREMENT PRIMARY KEY,
    category_id INT NOT NULL,
    title VARCHAR(200) NOT NULL,
    slug VARCHAR(220) NOT NULL UNIQUE,
    short_description TEXT NOT NULL,
    overview LONGTEXT NOT NULL,
    level ENUM('Beginner', 'Intermediate', 'Advanced', 'All Levels') DEFAULT 'Beginner',
    duration VARCHAR(50) NOT NULL,
    training_mode ENUM('Classroom', 'Online', 'Hybrid', 'Corporate On-site') DEFAULT 'Classroom',
    fee_ngn DECIMAL(12, 2) NOT NULL DEFAULT 0.00,
    status ENUM('active', 'archived') DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. REGISTRATIONS TABLE
CREATE TABLE registrations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    registration_id VARCHAR(50) NOT NULL UNIQUE,
    course_id INT NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL,
    phone VARCHAR(40) NOT NULL,
    company_name VARCHAR(150) NULL,
    training_mode ENUM('Classroom', 'Online', 'Hybrid', 'Corporate On-site') DEFAULT 'Classroom',
    status ENUM('New', 'Approved', 'Cancelled', 'Completed') DEFAULT 'New',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);`;

  const copyDb = () => {
    navigator.clipboard.writeText(sampleDbCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className="modal fade show d-block"
      tabIndex={-1}
      style={{ backgroundColor: 'rgba(5, 26, 45, 0.75)' }}
    >
      <div className="modal-dialog modal-xl modal-dialog-scrollable">
        <div className="modal-content border-0 shadow-lg">
          <div className="modal-header bg-navy text-white">
            <div className="d-flex align-items-center gap-2">
              <i className="bi bi-file-earmark-zip-fill text-warning fs-4"></i>
              <div>
                <h5 className="modal-title fw-bold text-white mb-0">
                  PHP 8+ & MySQL Production Package (.ZIP)
                </h5>
                <small className="text-white-50">
                  Skytop Global Services Limited • Deployment & Installation Center
                </small>
              </div>
            </div>
            <button
              type="button"
              className="btn-close btn-close-white"
              onClick={onClose}
            ></button>
          </div>

          <div className="modal-body p-4">
            <div className="alert alert-success d-flex flex-column flex-md-row justify-content-between align-items-center gap-3 p-3 mb-4 border-success">
              <div>
                <h6 className="fw-bold mb-1 text-success">
                  <i className="bi bi-check-circle-fill me-2"></i> Packed ZIP Archive Ready for Download
                </h6>
                <p className="small text-muted mb-0">
                  Contains all clean PHP 8+ MVC files, PDO database connector, controllers, models, includes, Bootstrap 5 assets, and the <code>database/skytop.sql</code> import script.
                </p>
              </div>
              <a
                href="/skytop_global_services_php_mysql.zip"
                download="skytop_global_services_php_mysql.zip"
                className="btn btn-skytop-orange fw-bold text-uppercase px-4 py-2 text-nowrap shadow-sm"
              >
                <i className="bi bi-download me-1"></i> Download .ZIP (3.8 MB)
              </a>
            </div>

            <div className="row g-4 mb-4">
              <div className="col-lg-6">
                <div className="card h-100 border p-3">
                  <h6 className="fw-bold text-navy mb-2">
                    <i className="bi bi-laptop text-primary me-2"></i> Local Server Setup (XAMPP / WAMP / Laragon)
                  </h6>
                  <ol className="small text-muted ps-3 mb-0 d-flex flex-column gap-2">
                    <li>Extract the downloaded ZIP to <code>C:\xampp\htdocs\skytop\</code></li>
                    <li>Open phpMyAdmin (<code>http://localhost/phpmyadmin</code>) and create a database named <code>skytop_db</code> with <code>utf8mb4_unicode_ci</code> collation.</li>
                    <li>Import <code>database/skytop.sql</code> into <code>skytop_db</code>.</li>
                    <li>Verify database credentials in <code>config/database.php</code> (default is user: <code>root</code>, pass: empty).</li>
                    <li>Access your website at <code>http://localhost/skytop/</code> and admin portal at <code>http://localhost/skytop/admin/login.php</code> (Password: <code>Admin@Skytop2026!</code>).</li>
                  </ol>
                </div>
              </div>

              <div className="col-lg-6">
                <div className="card h-100 border p-3">
                  <h6 className="fw-bold text-navy mb-2">
                    <i className="bi bi-cloud-arrow-up text-primary me-2"></i> Live Web Hosting (cPanel / Apache)
                  </h6>
                  <ol className="small text-muted ps-3 mb-0 d-flex flex-column gap-2">
                    <li>Upload the ZIP file to your <code>public_html</code> via cPanel File Manager and extract.</li>
                    <li>Go to cPanel &gt; MySQL Databases: Create database and user, assign ALL PRIVILEGES.</li>
                    <li>Open phpMyAdmin in cPanel, select the database, and import <code>database/skytop.sql</code>.</li>
                    <li>Update DB credentials in <code>config/database.php</code> and set your live URL in <code>config/config.php</code>.</li>
                    <li>Done! Your corporate training website is now live with zero framework overhead.</li>
                  </ol>
                </div>
              </div>
            </div>

            <div className="border rounded p-3 bg-light">
              <div className="d-flex justify-content-between align-items-center mb-2">
                <span className="fw-bold text-navy small">
                  <i className="bi bi-database me-1"></i> MySQL Schema Preview (database/skytop.sql)
                </span>
                <button onClick={copyDb} className="btn btn-sm btn-outline-secondary py-0">
                  {copied ? 'Copied!' : 'Copy SQL'}
                </button>
              </div>
              <pre
                className="bg-dark text-light p-3 rounded mb-0 font-monospace small"
                style={{ maxHeight: '200px', overflowY: 'auto' }}
              >
                {sampleDbCode}
              </pre>
            </div>
          </div>

          <div className="modal-footer bg-light">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
            >
              Close
            </button>
            <a
              href="/skytop_global_services_php_mysql.zip"
              download="skytop_global_services_php_mysql.zip"
              className="btn btn-skytop-orange fw-bold"
            >
              <i className="bi bi-download me-1"></i> Download .ZIP
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
