-- =====================================================================
-- SKYTOP GLOBAL SERVICES LIMITED - DATABASE SCHEMA & SEED DATA
-- Version: 1.0 (PHP 8+ & MySQL 8.0 / MariaDB 10.4+)
-- Designed for: Port Harcourt, Rivers State, Nigeria
-- =====================================================================

SET FOREIGN_KEY_CHECKS = 0;
DROP TABLE IF EXISTS website_settings;
DROP TABLE IF EXISTS contact_messages;
DROP TABLE IF EXISTS corporate_requests;
DROP TABLE IF EXISTS registrations;
DROP TABLE IF EXISTS training_schedules;
DROP TABLE IF EXISTS courses;
DROP TABLE IF EXISTS course_categories;
DROP TABLE IF EXISTS instructors;
DROP TABLE IF EXISTS testimonials;
DROP TABLE IF EXISTS blog_posts;
DROP TABLE IF EXISTS blog_categories;
DROP TABLE IF EXISTS faqs;
DROP TABLE IF EXISTS locations;
DROP TABLE IF EXISTS admins;
DROP TABLE IF EXISTS users;
SET FOREIGN_KEY_CHECKS = 1;

-- 1. ADMINS TABLE
CREATE TABLE admins (
    id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(120) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    role ENUM('super_admin', 'training_manager', 'editor') DEFAULT 'super_admin',
    last_login DATETIME NULL,
    status ENUM('active', 'inactive') DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 2. COURSE CATEGORIES TABLE
CREATE TABLE course_categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    slug VARCHAR(120) NOT NULL UNIQUE,
    description TEXT NULL,
    icon VARCHAR(60) DEFAULT 'bi-gear',
    sort_order INT DEFAULT 0,
    status ENUM('active', 'inactive') DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 3. COURSES TABLE
CREATE TABLE courses (
    id INT AUTO_INCREMENT PRIMARY KEY,
    category_id INT NOT NULL,
    title VARCHAR(200) NOT NULL,
    slug VARCHAR(220) NOT NULL UNIQUE,
    short_description TEXT NOT NULL,
    overview LONGTEXT NOT NULL,
    learning_outcomes TEXT NULL,
    target_audience TEXT NULL,
    level ENUM('Beginner', 'Intermediate', 'Advanced', 'All Levels') DEFAULT 'Beginner',
    duration VARCHAR(50) NOT NULL, -- e.g. "3 Days", "1 Week"
    training_mode ENUM('Classroom', 'Online', 'Hybrid', 'Corporate On-site') DEFAULT 'Classroom',
    fee_ngn DECIMAL(12, 2) NOT NULL DEFAULT 0.00,
    featured_image VARCHAR(255) NULL,
    is_featured BOOLEAN DEFAULT FALSE,
    status ENUM('active', 'archived') DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_course_category FOREIGN KEY (category_id) REFERENCES course_categories(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 4. INSTRUCTORS TABLE
CREATE TABLE instructors (
    id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(120) NOT NULL,
    title VARCHAR(150) NOT NULL,
    specialization VARCHAR(150) NOT NULL,
    bio TEXT NOT NULL,
    photo VARCHAR(255) NULL,
    email VARCHAR(150) NULL,
    phone VARCHAR(50) NULL,
    status ENUM('active', 'inactive') DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 5. TRAINING SCHEDULES TABLE
CREATE TABLE training_schedules (
    id INT AUTO_INCREMENT PRIMARY KEY,
    course_id INT NOT NULL,
    instructor_id INT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    location_name VARCHAR(150) NOT NULL DEFAULT 'Port Harcourt Training Centre',
    venue_address VARCHAR(255) DEFAULT 'Skytop Corporate Centre, Port Harcourt, Rivers State',
    training_mode ENUM('Classroom', 'Online', 'Hybrid', 'Corporate On-site') DEFAULT 'Classroom',
    capacity INT DEFAULT 25,
    slots_available INT DEFAULT 25,
    registration_deadline DATE NOT NULL,
    status ENUM('OPEN', 'FEW SLOTS LEFT', 'FULL', 'COMPLETED') DEFAULT 'OPEN',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_schedule_course FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE,
    CONSTRAINT fk_schedule_instructor FOREIGN KEY (instructor_id) REFERENCES instructors(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 6. REGISTRATIONS TABLE
CREATE TABLE registrations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    registration_id VARCHAR(50) NOT NULL UNIQUE, -- e.g. SGS-2026-00001
    course_id INT NOT NULL,
    schedule_id INT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    gender ENUM('Male', 'Female', 'Other') DEFAULT 'Male',
    email VARCHAR(150) NOT NULL,
    phone VARCHAR(40) NOT NULL,
    company_name VARCHAR(150) NULL,
    job_title VARCHAR(100) NULL,
    training_mode ENUM('Classroom', 'Online', 'Hybrid', 'Corporate On-site') DEFAULT 'Classroom',
    preferred_date DATE NULL,
    residential_address TEXT NULL,
    state VARCHAR(80) DEFAULT 'Rivers State',
    country VARCHAR(80) DEFAULT 'Nigeria',
    notes TEXT NULL,
    payment_status ENUM('Pending', 'Invoiced', 'Confirmed', 'Waived') DEFAULT 'Pending',
    status ENUM('New', 'Approved', 'Cancelled', 'Completed') DEFAULT 'New',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_registration_course FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE,
    CONSTRAINT fk_registration_schedule FOREIGN KEY (schedule_id) REFERENCES training_schedules(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 7. CORPORATE REQUESTS TABLE
CREATE TABLE corporate_requests (
    id INT AUTO_INCREMENT PRIMARY KEY,
    reference_no VARCHAR(50) NOT NULL UNIQUE,
    company_name VARCHAR(180) NOT NULL,
    contact_person VARCHAR(120) NOT NULL,
    email VARCHAR(150) NOT NULL,
    phone VARCHAR(40) NOT NULL,
    industry VARCHAR(100) NOT NULL,
    num_participants INT NOT NULL DEFAULT 5,
    training_requirement TEXT NOT NULL,
    preferred_date DATE NULL,
    training_location VARCHAR(180) NOT NULL,
    message TEXT NULL,
    status ENUM('Pending', 'Contacted', 'Proposal Sent', 'Confirmed', 'Closed') DEFAULT 'Pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 8. TESTIMONIALS TABLE
CREATE TABLE testimonials (
    id INT AUTO_INCREMENT PRIMARY KEY,
    client_name VARCHAR(120) NOT NULL,
    position VARCHAR(100) NOT NULL,
    organization VARCHAR(150) NOT NULL,
    quote TEXT NOT NULL,
    is_sample BOOLEAN DEFAULT TRUE,
    rating INT DEFAULT 5,
    status ENUM('active', 'inactive') DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 9. BLOG POSTS & CATEGORIES TABLE
CREATE TABLE blog_categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    slug VARCHAR(120) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE blog_posts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    category_id INT NOT NULL,
    title VARCHAR(220) NOT NULL,
    slug VARCHAR(240) NOT NULL UNIQUE,
    author VARCHAR(100) NOT NULL DEFAULT 'Skytop HSE Technical Team',
    excerpt TEXT NOT NULL,
    content LONGTEXT NOT NULL,
    featured_image VARCHAR(255) NULL,
    status ENUM('published', 'draft') DEFAULT 'published',
    published_at DATE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_blog_category FOREIGN KEY (category_id) REFERENCES blog_categories(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 10. FAQS TABLE
CREATE TABLE faqs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    question VARCHAR(255) NOT NULL,
    answer TEXT NOT NULL,
    category VARCHAR(80) DEFAULT 'General',
    sort_order INT DEFAULT 0,
    status ENUM('active', 'inactive') DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 11. LOCATIONS TABLE
CREATE TABLE locations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    city VARCHAR(100) NOT NULL,
    state VARCHAR(100) NOT NULL,
    address TEXT NOT NULL,
    phone VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL,
    is_headquarters BOOLEAN DEFAULT FALSE,
    status ENUM('active', 'inactive') DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 12. CONTACT MESSAGES TABLE
CREATE TABLE contact_messages (
    id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(120) NOT NULL,
    email VARCHAR(150) NOT NULL,
    phone VARCHAR(40) NULL,
    subject VARCHAR(180) NOT NULL,
    message TEXT NOT NULL,
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 13. WEBSITE SETTINGS TABLE
CREATE TABLE website_settings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    setting_key VARCHAR(100) NOT NULL UNIQUE,
    setting_value TEXT NULL,
    setting_group VARCHAR(50) DEFAULT 'general',
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================================
-- SEED DATA
-- =====================================================================

-- Default Admin User (Password is 'Admin@Skytop2026!' hashed using password_hash)
INSERT INTO admins (full_name, email, password_hash, role) VALUES 
('Skytop Administrator', 'admin@skytop.ng', '$2y$10$w09tO81hGf253Zz9wR0.eOFk1cKjJ.d.wVdI6yF0hUv04m9N75xee', 'super_admin');

-- Course Categories
INSERT INTO course_categories (name, slug, description, icon, sort_order) VALUES
('HSE & Safety', 'hse-safety', 'Occupational health, safety engineering, and workplace hazard management programs.', 'bi-shield-check', 1),
('Oil & Gas Operations', 'oil-and-gas', 'Upstream, midstream, and downstream technical process and operations training.', 'bi-droplet-half', 2),
('Technical & Vocational Skills', 'technical-skills', 'Hands-on mechanical, piping, electrical, and fabrication competence development.', 'bi-tools', 3),
('Professional & Management', 'professional-development', 'HSE leadership, ISO compliance, auditing, and corporate management systems.', 'bi-briefcase', 4),
('Corporate Workforce Solutions', 'corporate-solutions', 'Bespoke workforce readiness and mandatory regulatory compliance tracks.', 'bi-building-check', 5);

-- Courses
INSERT INTO courses (category_id, title, slug, short_description, overview, learning_outcomes, target_audience, level, duration, training_mode, fee_ngn, is_featured) VALUES
(1, 'Basic Occupational Health & Safety (HSE Level 1)', 'hse-level-1', 'Foundational principles of workplace safety, hazard identification, and hazard control.', 'This course introduces learners to statutory workplace health and safety requirements, hazard classification, personal protective equipment (PPE), and reporting procedures tailored to high-risk environments.', 'Understand core workplace safety duties; Identify physical, chemical, and biological hazards; Execute hazard communication protocols; Master personal protective equipment deployment.', 'Entry-level industrial workers, graduates, technicians, field operatives, and safety representatives.', 'Beginner', '2 Days', 'Classroom', 65000.00, 1),

(1, 'Advanced HSE Management & Risk Assessment (HSE Level 2 & 3)', 'advanced-hse-level-2-3', 'Comprehensive risk profiling, hierarchy of controls, and HSE supervisory governance.', 'Deep dive into proactive risk assessment methodologies, Job Safety Analysis (JSA), incident prevention frameworks, and safety leadership in high-hazard operational settings.', 'Execute 5x5 quantitative risk matrices; Facilitate pre-job safety meetings; Formulate control hierarchies; Lead workplace hazard inspections.', 'Supervisors, safety champions, engineers, line managers, and contractor leads.', 'Intermediate', '4 Days', 'Hybrid', 125000.00, 1),

(1, 'Permit to Work (PTW) Systems & Isolation Management', 'permit-to-work-systems', 'Procedural governance for hot work, cold work, electrical lockouts, and confined spaces.', 'Mastering statutory permit to work coordination, energy isolation protocols (LOTO), atmospheric checks, and handback validation in operational facilities.', 'Interpret PTW authorizations; Conduct site isolation verification; Manage permit handbacks and emergencies; Ensure contractor compliance.', 'Performing authorities, area authorities, safety officers, maintenance teams.', 'Intermediate', '3 Days', 'Classroom', 95000.00, 1),

(2, 'Introduction to Offshore Oil & Gas Operations', 'offshore-oil-gas-operations', 'Overview of upstream exploration, drilling rigs, FPSO systems, and wellhead integrity.', 'An industry-standard introduction to offshore energy lifecycle, marine logistics, production manifolds, process flows, and environmental stewardship.', 'Map offshore production flows; Grasp subsea and topside terminology; Identify wellsite hazards; Comprehend offshore survival protocols.', 'New industry entrants, technical graduates, procurement personnel, and offshore contractors.', 'Beginner', '3 Days', 'Classroom', 140000.00, 1),

(2, 'Process Safety Management (PSM) & Hazardous Areas', 'process-safety-management', 'Preventing catastrophic loss of containment, ATEX classification, and barrier management.', 'In-depth focus on process safety principles, HAZOP concepts, fire and explosion mitigation, explosion-proof electrical zoning, and emergency shutdown integrity.', 'Identify major accident hazard precursors; Apply hazardous area zoning (Zone 0, 1, 2); Inspect safety critical elements; Implement barrier monitoring.', 'Process engineers, instrumentation techs, facility operators, HSE coordinators.', 'Advanced', '5 Days', 'Classroom', 185000.00, 1),

(3, 'Industrial Flange Bolting & Pressure Integrity', 'industrial-flange-bolting-integrity', 'Mechanical joint integrity, torque calculation, gasket selection, and leak testing.', 'Hands-on training in torque tightening, bolt tensioning, gasket inspection, and pipeline flange alignment to eliminate hydrocarbon release risks.', 'Calculate bolt torques per ANSI/ASME standards; Inspect joint sealing faces; Operate hydraulic torquing systems; Validate pressure testing handovers.', 'Mechanical technicians, pipefitters, turnaround contractors, maintenance crews.', 'Intermediate', '3 Days', 'Classroom', 110000.00, 1),

(4, 'ISO 45001:2018 Occupational Health & Safety Systems', 'iso-45001-systems-awareness', 'Implementation and internal auditing of international occupational safety standards.', 'Understand the High-Level Structure (HLS) of ISO 45001, leadership accountability, hazard identification frameworks, and internal auditing cycles.', 'Interpret ISO 45001 clauses; Design audit checklists; Lead internal compliance reviews; Drive corrective action tracking.', 'HSE managers, quality auditors, corporate directors, compliance officers.', 'Advanced', '4 Days', 'Hybrid', 160000.00, 0),

(1, 'First Aid, CPR & Emergency Response Preparedness', 'first-aid-cpr-emergency-response', 'Critical life-saving medical response, AED operation, and trauma stabilization.', 'Practical training in basic life support, medical emergencies, CPR resuscitation, bleeding control, burn care, and casualty evacuation under industrial constraints.', 'Demonstrate adult CPR & AED deployment; Stabilize fractures and burns; Execute triage in industrial incidents; Maintain emergency first aid inventory.', 'Safety wardens, plant workers, emergency team members, office staff.', 'All Levels', '2 Days', 'Classroom', 70000.00, 1);

-- Instructors
INSERT INTO instructors (full_name, title, specialization, bio) VALUES
('Engr. Tari E. Briggs', 'Lead Oil & Gas Operations Specialist', 'Process Safety & Offshore Facilities', 'Over 18 years of technical operations leadership across Niger Delta offshore platforms, specializing in process safety management and wellhead integrity.'),
('Mrs. Blessing O. Adeleke, CSP', 'Senior HSE Consultant & Auditor', 'Occupational Safety & ISO Systems', 'Lead ISO 45001 auditor with extensive track record in developing enterprise safety management systems and risk assessment governance.'),
('Engr. Chidi M. Okonkwo', 'Technical Skills & Mechanical Facilitator', 'Pressure Systems & Joint Integrity', 'Certified mechanical reliability engineer specializing in high-pressure piping, non-destructive testing, and hands-on maintenance crew upskilling.');

-- Training Schedules
INSERT INTO training_schedules (course_id, instructor_id, start_date, end_date, location_name, venue_address, training_mode, capacity, slots_available, registration_deadline, status) VALUES
(1, 2, '2026-11-09', '2026-11-10', 'Port Harcourt Training Centre', 'Skytop Corporate Learning Hub, Trans-Amadi Industrial Layout, Port Harcourt', 'Classroom', 25, 12, '2026-11-05', 'OPEN'),
(2, 2, '2026-11-16', '2026-11-19', 'Port Harcourt Training Centre', 'Skytop Corporate Learning Hub, Trans-Amadi Industrial Layout, Port Harcourt', 'Hybrid', 20, 6, '2026-11-12', 'FEW SLOTS LEFT'),
(3, 1, '2026-11-23', '2026-11-25', 'Port Harcourt Training Centre', 'Skytop Corporate Learning Hub, Trans-Amadi Industrial Layout, Port Harcourt', 'Classroom', 18, 9, '2026-11-20', 'OPEN'),
(4, 1, '2026-12-01', '2026-12-03', 'Port Harcourt Training Centre', 'Skytop Corporate Learning Hub, Trans-Amadi Industrial Layout, Port Harcourt', 'Classroom', 20, 15, '2026-11-26', 'OPEN'),
(5, 1, '2026-12-07', '2026-12-11', 'Port Harcourt Training Centre', 'Skytop Corporate Learning Hub, Trans-Amadi Industrial Layout, Port Harcourt', 'Classroom', 15, 4, '2026-12-02', 'FEW SLOTS LEFT'),
(6, 3, '2026-12-14', '2026-12-16', 'Port Harcourt Technical Workshop', 'Skytop Technical Yard, Off Peter Odili Road, Port Harcourt', 'Classroom', 16, 8, '2026-12-10', 'OPEN');

-- Sample Testimonials (Clearly identified per prompt requirements)
INSERT INTO testimonials (client_name, position, organization, quote, is_sample) VALUES
('Efejuku Oghenero', 'Operations Safety Supervisor', 'Offshore Marine Logistics Ltd', 'The practical Permit to Work and Risk Assessment simulations mirrored the actual realities on our operational barges in Port Harcourt. Excellent delivery.', 1),
('Amina Bello', 'Compliance Coordinator', 'Energy Infrastructure Contractors', 'Skytop''s ISO 45001 training gave our supervisory staff the concrete tools required to execute internal compliance audits without disrupting operations.', 1),
('Kehinde Alabi', 'Mechanical Maintenance Lead', 'Turnaround Technical Services', 'Our piping technicians gained immediate hands-on precision with torque bolting and flange alignment. The instructors possess real industry grit.', 1);

-- Blog Categories & Posts
INSERT INTO blog_categories (name, slug) VALUES
('HSE Insights', 'hse-insights'),
('Oil & Gas Operations', 'oil-and-gas-operations'),
('Workforce Competence', 'workforce-competence');

INSERT INTO blog_posts (category_id, title, slug, author, excerpt, content, published_at) VALUES
(1, 'Mitigating Hydrocarbon Releases Through Strict Permit to Work Execution', 'mitigating-hydrocarbon-releases-permit-to-work', 'Skytop Technical Directorate', 'Discover why procedural permit-to-work discipline and simultaneous operations (SIMOPS) coordination remain the first defense against industrial accidents.', 'A robust Permit to Work (PTW) system is not merely documentation; it is an active hazard-control barrier. High-hazard processing plants require rigorous live verification of energy isolations, atmospheric monitoring for LEL, and cross-functional signoffs before breaking containment.', '2026-09-15'),

(2, 'Building Technical Competence for Next-Generation Upstream Assets', 'building-technical-competence-upstream-assets', 'Engr. Tari E. Briggs', 'How structured practical upskilling prepares technicians and engineers to operate modern automated wellheads and offshore production manifolds.', 'As deepwater and shallow-water assets modernize, maintenance personnel must bridge traditional mechanical troubleshooting with automated process safety protocols. Practical workshop immersion ensures technicians understand fail-safe logic.', '2026-09-28'),

(3, 'Why Corporate Safety Culture Outweighs Standalone Compliance', 'corporate-safety-culture-vs-compliance', 'Mrs. Blessing O. Adeleke', 'Transitioning organizations from checklist compliance into proactive safety leadership that protects lives and improves operational uptime.', 'Compliance prevents penalties, but culture protects lives. When corporate leaders empower technicians on the deck to enact "Stop Work Authority" without friction, incident frequency drops dramatically across drilling and maintenance campaigns.', '2026-10-02');

-- FAQs
INSERT INTO faqs (question, answer, category, sort_order) VALUES
('How do I register for a training program at Skytop?', 'You can register online by selecting your preferred course, filling out the enrolment form with your contact and employment details, and receiving your unique Skytop Registration ID (e.g. SGS-2026-XXXXX). You will receive an immediate confirmation slip with payment and venue details.', 'Registration', 1),
('Where are your physical training programs conducted?', 'Our primary training facility and technical workshops are located in Port Harcourt, Rivers State, Nigeria. We also coordinate nationwide on-site corporate training at client facilities and virtual interactive learning.', 'Locations', 2),
('Do you offer customized corporate training for companies and contractor crews?', 'Yes. Skytop Global Services delivers tailored workforce training designed around your operational hazards, company standard operating procedures (SOPs), and turnaround schedules.', 'Corporate', 3),
('Are training manuals and certificates provided upon completion?', 'Yes. All registered participants receive comprehensive technical course handbooks, practical exercise worksheets, and a Certificate of Competence / Completion upon meeting course attendance and assessment requirements.', 'Certificates', 4),
('Can our organization request weekend or evening sessions?', 'Yes. For busy operating teams and shift workers, we offer modular weekend schedules and hybrid learning tracks upon request.', 'Schedules', 5);

-- Locations
INSERT INTO locations (city, state, address, phone, email, is_headquarters) VALUES
('Port Harcourt', 'Rivers State', 'Skytop Corporate Learning Hub, Trans-Amadi Industrial Layout, Port Harcourt, Rivers State, Nigeria', '+234 803 000 7890', 'info@skytop.ng', 1),
('Lagos', 'Lagos State', 'Liaison & Corporate Training Desk, Lekki Phase 1, Lagos, Nigeria', '+234 802 000 4567', 'lagos@skytop.ng', 0);

-- Website Settings
INSERT INTO website_settings (setting_key, setting_value, setting_group) VALUES
('site_name', 'Skytop Global Services Limited', 'general'),
('site_tagline', 'Building Competence. Empowering Professionals. Advancing Safety.', 'general'),
('site_email', 'training@skytop.ng', 'contact'),
('site_phone', '+234 803 000 7890', 'contact'),
('site_whatsapp', '+234 803 000 7890', 'contact'),
('site_address', 'Trans-Amadi Industrial Layout, Port Harcourt, Rivers State, Nigeria', 'contact'),
('opening_hours', 'Monday - Friday: 8:00 AM - 5:00 PM | Saturday: 9:00 AM - 2:00 PM', 'contact');
