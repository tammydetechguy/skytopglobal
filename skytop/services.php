<?php
$page_title = 'Services & Training Pillars | Skytop Global Services Limited';
$page_desc = 'Comprehensive Oil & Gas, HSE Safety Training, Technical Skills, and Management Consultancy Services.';

require_once __DIR__ . '/includes/header.php';
require_once __DIR__ . '/includes/navbar.php';
?>

<div class="bg-navy text-white py-5">
    <div class="container py-3">
        <span class="badge bg-warning text-dark fw-bold mb-2 text-uppercase">Solutions Portfolio</span>
        <h1 class="fw-bold display-5 mb-2">Our Services & Core Pillars</h1>
        <p class="lead text-white-50 mb-0" style="max-width: 720px;">
            Structured professional development and industrial consulting engineered for energy professionals and operating companies.
        </p>
    </div>
</div>

<div class="container py-5">
    <div class="row g-5">
        <!-- 1. HSE & SAFETY -->
        <div class="col-lg-6">
            <div class="card h-100 p-4 border rounded-3 service-card">
                <div class="d-flex align-items-center gap-3 mb-3">
                    <div class="bg-navy p-3 text-warning rounded">
                        <i class="bi bi-shield-shaded fs-3"></i>
                    </div>
                    <div>
                        <h4 class="fw-bold text-navy mb-0">1. HSE & Safety Training</h4>
                        <small class="text-muted">Workplace Health, Safety & Environmental Governance</small>
                    </div>
                </div>
                <p class="text-muted small mb-3">
                    Our safety curriculum covers statutory principles, practical hazard identification, risk assessment, and incident management designed to eliminate workplace accidents.
                </p>
                <ul class="text-muted small d-flex flex-column gap-1 mb-4">
                    <li>• Basic Occupational Health & Safety (HSE Level 1)</li>
                    <li>• Advanced HSE Management & Risk Assessment (HSE Level 2 & 3)</li>
                    <li>• Permit to Work (PTW) & Lockout/Tagout (LOTO) Procedures</li>
                    <li>• Working at Heights & Fall Protection Governance</li>
                    <li>• Confined Space Entry & Atmospheric Testing</li>
                    <li>• Fire Safety, Industrial First Aid & CPR Resuscitation</li>
                </ul>
                <a href="<?= SITE_URL ?>/courses.php?category=hse-safety" class="btn btn-sm btn-skytop-primary align-self-start">
                    View HSE Courses <i class="bi bi-arrow-right ms-1"></i>
                </a>
            </div>
        </div>

        <!-- 2. OIL & GAS -->
        <div class="col-lg-6">
            <div class="card h-100 p-4 border rounded-3 service-card">
                <div class="d-flex align-items-center gap-3 mb-3">
                    <div class="bg-navy p-3 text-warning rounded">
                        <i class="bi bi-droplet-half fs-3"></i>
                    </div>
                    <div>
                        <h4 class="fw-bold text-navy mb-0">2. Oil & Gas Operations</h4>
                        <small class="text-muted">Upstream, Midstream & Downstream Processing</small>
                    </div>
                </div>
                <p class="text-muted small mb-3">
                    Technical programs bridging theory and practical field execution across exploration, drilling, production facilities, and offshore environments.
                </p>
                <ul class="text-muted small d-flex flex-column gap-1 mb-4">
                    <li>• Introduction to Offshore Oil & Gas Production Operations</li>
                    <li>• Process Safety Management (PSM) & HAZOP Methodologies</li>
                    <li>• Hazardous Area Classification (ATEX / IECEx Standards)</li>
                    <li>• Wellhead Integrity & Blowout Prevention Fundamentals</li>
                    <li>• Oil Spill Response & Environmental Remediation Strategy</li>
                </ul>
                <a href="<?= SITE_URL ?>/courses.php?category=oil-and-gas" class="btn btn-sm btn-skytop-primary align-self-start">
                    View Oil & Gas Courses <i class="bi bi-arrow-right ms-1"></i>
                </a>
            </div>
        </div>

        <!-- 3. TECHNICAL SKILLS -->
        <div class="col-lg-6">
            <div class="card h-100 p-4 border rounded-3 service-card">
                <div class="d-flex align-items-center gap-3 mb-3">
                    <div class="bg-navy p-3 text-warning rounded">
                        <i class="bi bi-tools fs-3"></i>
                    </div>
                    <div>
                        <h4 class="fw-bold text-navy mb-0">3. Technical & Vocational Skills</h4>
                        <small class="text-muted">Hands-on Engineering & Mechanical Integrity</small>
                    </div>
                </div>
                <p class="text-muted small mb-3">
                    Equipping technicians with practical hands-on proficiency to maintain mechanical integrity, prevent leaks, and sustain plant uptime.
                </p>
                <ul class="text-muted small d-flex flex-column gap-1 mb-4">
                    <li>• Industrial Flange Bolting, Torqueing & Joint Integrity</li>
                    <li>• Pipe Fitting, Blueprint Reading & Isometric Drawing</li>
                    <li>• Mechanical Valve Overhaul & Hydrostatic Pressure Testing</li>
                    <li>• Electrical Isolations, Earthing & Safe Switching</li>
                </ul>
                <a href="<?= SITE_URL ?>/courses.php?category=technical-skills" class="btn btn-sm btn-skytop-primary align-self-start">
                    View Technical Courses <i class="bi bi-arrow-right ms-1"></i>
                </a>
            </div>
        </div>

        <!-- 4. CONSULTANCY -->
        <div class="col-lg-6">
            <div class="card h-100 p-4 border rounded-3 service-card">
                <div class="d-flex align-items-center gap-3 mb-3">
                    <div class="bg-navy p-3 text-warning rounded">
                        <i class="bi bi-clipboard2-check fs-3"></i>
                    </div>
                    <div>
                        <h4 class="fw-bold text-navy mb-0">4. HSE & Systems Consultancy</h4>
                        <small class="text-muted">Regulatory Compliance & Enterprise Audits</small>
                    </div>
                </div>
                <p class="text-muted small mb-3">
                    Guiding energy organizations in establishing, verifying, and sustaining integrated management systems compliant with international best practices.
                </p>
                <ul class="text-muted small d-flex flex-column gap-1 mb-4">
                    <li>• ISO 45001, 9001 & 14001 Audit Readiness & System Setup</li>
                    <li>• Quantitative Facility Risk Assessment (QRA) & HAZID/HAZOP Facilitation</li>
                    <li>• Contractor HSE Pre-Qualification Management</li>
                    <li>• Corporate Incident Investigation & Root Cause Analysis</li>
                </ul>
                <a href="<?= SITE_URL ?>/contact.php" class="btn btn-sm btn-skytop-primary align-self-start">
                    Consult with our Specialists <i class="bi bi-arrow-right ms-1"></i>
                </a>
            </div>
        </div>
    </div>
</div>

<?php require_once __DIR__ . '/includes/footer.php'; ?>
