<?php
$page_title = 'Skytop Global Services Limited | Oil & Gas, HSE & Technical Training Institute';
$page_desc = 'Building Competence. Empowering Professionals. Advancing Safety. Premium Nigerian training institute for Oil & Gas, HSE, and engineering workforce development.';

require_once __DIR__ . '/includes/header.php';
require_once __DIR__ . '/includes/navbar.php';
require_once __DIR__ . '/models/Course.php';
require_once __DIR__ . '/models/Training.php';
require_once __DIR__ . '/models/Instructor.php';

$featured_courses = Course::getFeatured(6);
$upcoming_trainings = Training::getUpcoming(4);
?>

<!-- 1. HERO SECTION -->
<section class="hero-wrapper">
    <img src="<?= SITE_URL ?>/assets/images/hero_oil_gas_rig.jpg" alt="Offshore Oil & Gas Rig" class="hero-bg-img" onerror="this.style.display='none'">
    <div class="hero-overlay"></div>
    <div class="container hero-content py-5">
        <div class="row align-items-center">
            <div class="col-lg-8 col-xl-7">
                <span class="badge bg-warning text-dark fw-bold mb-3 px-3 py-2 text-uppercase tracking-wider">
                    <i class="bi bi-shield-check me-1"></i> Industry-Focused Professional Training
                </span>
                <h1 class="display-4 fw-extrabold text-white mb-3" style="font-weight: 800; line-height: 1.15;">
                    BUILDING COMPETENCE.<br>EMPOWERING PROFESSIONALS.
                </h1>
                <p class="lead text-white-50 mb-4" style="font-size: 1.15rem;">
                    Professional Oil & Gas, HSE, Safety, and Technical Skills Training for Individuals and Organizations in Port Harcourt and Across Nigeria.
                </p>
                <div class="d-flex flex-wrap gap-3">
                    <a href="<?= SITE_URL ?>/courses.php" class="btn btn-skytop-orange px-4 py-2 fs-6">
                        <i class="bi bi-grid-fill me-1"></i> EXPLORE COURSES
                    </a>
                    <a href="<?= SITE_URL ?>/register.php" class="btn btn-skytop-outline px-4 py-2 fs-6">
                        <i class="bi bi-person-plus-fill me-1"></i> ENROLL NOW
                    </a>
                    <a href="<?= SITE_URL ?>/corporate-training.php" class="btn btn-outline-light px-3 py-2 fs-6">
                        <i class="bi bi-building me-1"></i> CORPORATE SOLUTIONS
                    </a>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- 2. TRUST & VALUE STRIP -->
<section class="trust-strip">
    <div class="container">
        <div class="row g-0">
            <div class="col-md-4 col-lg trust-item">
                <div class="d-flex align-items-start gap-3">
                    <i class="bi bi-gear-wide-connected fs-2 text-primary"></i>
                    <div>
                        <h6 class="fw-bold mb-1 text-navy">Industry-Focused Training</h6>
                        <p class="small text-muted mb-0">Practical programs tailored around real workplace operations.</p>
                    </div>
                </div>
            </div>
            <div class="col-md-4 col-lg trust-item">
                <div class="d-flex align-items-start gap-3">
                    <i class="bi bi-person-badge fs-2 text-primary"></i>
                    <div>
                        <h6 class="fw-bold mb-1 text-navy">Experienced Instructors</h6>
                        <p class="small text-muted mb-0">Learn directly from seasoned energy & safety specialists.</p>
                    </div>
                </div>
            </div>
            <div class="col-md-4 col-lg trust-item">
                <div class="d-flex align-items-start gap-3">
                    <i class="bi bi-wrench-adjustable fs-2 text-primary"></i>
                    <div>
                        <h6 class="fw-bold mb-1 text-navy">Practical Learning</h6>
                        <p class="small text-muted mb-0">Competency-based drills and live operational scenarios.</p>
                    </div>
                </div>
            </div>
            <div class="col-md-6 col-lg trust-item">
                <div class="d-flex align-items-start gap-3">
                    <i class="bi bi-graph-up-arrow fs-2 text-primary"></i>
                    <div>
                        <h6 class="fw-bold mb-1 text-navy">Career Advancement</h6>
                        <p class="small text-muted mb-0">Build job-ready capabilities to excel across upstream sectors.</p>
                    </div>
                </div>
            </div>
            <div class="col-md-6 col-lg trust-item">
                <div class="d-flex align-items-start gap-3">
                    <i class="bi bi-building-check fs-2 text-primary"></i>
                    <div>
                        <h6 class="fw-bold mb-1 text-navy">Corporate Readiness</h6>
                        <p class="small text-muted mb-0">Customized workforce solutions for companies and teams.</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- 3. ABOUT SECTION -->
<section class="py-5 bg-white">
    <div class="container py-lg-4">
        <div class="row align-items-center g-5">
            <div class="col-lg-6">
                <div class="position-relative">
                    <img src="<?= SITE_URL ?>/assets/images/practical_hse_training.jpg" alt="Practical HSE Training Session" class="img-fluid rounded-3 shadow-sm border" style="object-fit: cover; width: 100%; max-height: 440px;" onerror="this.src='https://placehold.co/600x440/082B49/FFF?text=Skytop+HSE+Training'">
                    <div class="position-absolute bottom-0 start-0 bg-navy text-white p-3 rounded-end shadow-lg" style="max-width: 280px;">
                        <span class="d-block fw-bold fs-5 text-warning">Port Harcourt</span>
                        <small class="text-white-50">Strategic training hub serving Niger Delta and national energy corridors.</small>
                    </div>
                </div>
            </div>
            <div class="col-lg-6">
                <span class="section-kicker">About Skytop Global Services</span>
                <h2 class="section-heading">Advancing Workplace Safety & Operational Competence</h2>
                <p class="text-muted mb-3">
                    <strong>Skytop Global Services Limited</strong> is an indigenous Nigerian professional training and technical skills development institute based in Port Harcourt, Rivers State. We are dedicated to bridging the critical competency gap across the energy, manufacturing, maritime, and construction sectors.
                </p>
                <p class="text-muted mb-4">
                    Our training programs are designed around recognized professional practices and applicable standards. From entry-level HSE qualifications to high-pressure joint integrity, process safety management, and customized corporate workshops, we provide actionable competence that translates directly to zero-incident workplace performance.
                </p>
                <div class="row g-3 mb-4">
                    <div class="col-sm-6">
                        <div class="d-flex align-items-center gap-2">
                            <i class="bi bi-check-circle-fill text-warning fs-5"></i>
                            <span class="fw-semibold text-navy">Zero-Incident Philosophy</span>
                        </div>
                    </div>
                    <div class="col-sm-6">
                        <div class="d-flex align-items-center gap-2">
                            <i class="bi bi-check-circle-fill text-warning fs-5"></i>
                            <span class="fw-semibold text-navy">Practical Hands-On Simulators</span>
                        </div>
                    </div>
                    <div class="col-sm-6">
                        <div class="d-flex align-items-center gap-2">
                            <i class="bi bi-check-circle-fill text-warning fs-5"></i>
                            <span class="fw-semibold text-navy">Verified Course Records</span>
                        </div>
                    </div>
                    <div class="col-sm-6">
                        <div class="d-flex align-items-center gap-2">
                            <i class="bi bi-check-circle-fill text-warning fs-5"></i>
                            <span class="fw-semibold text-navy">Bespoke Corporate Tracks</span>
                        </div>
                    </div>
                </div>
                <div class="d-flex gap-3">
                    <a href="<?= SITE_URL ?>/about.php" class="btn btn-skytop-primary">
                        Learn More About Us <i class="bi bi-arrow-right"></i>
                    </a>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- 4. CORE SERVICES GRID -->
<section class="py-5 bg-skytop-light">
    <div class="container py-lg-4">
        <div class="text-center mb-5">
            <span class="section-kicker">What We Do</span>
            <h2 class="section-heading">Core Training & Consultancy Services</h2>
            <p class="text-muted mx-auto" style="max-width: 650px;">
                Comprehensive competency tracks engineered for individuals pursuing career growth and organizations upgrading workforce capabilities.
            </p>
        </div>

        <div class="row g-4">
            <!-- Service 1 -->
            <div class="col-md-6 col-lg-4">
                <div class="skytop-card service-card p-4 h-100">
                    <div class="text-primary mb-3">
                        <i class="bi bi-shield-shaded fs-1"></i>
                    </div>
                    <h5 class="fw-bold text-navy mb-2">HSE & Safety Training</h5>
                    <p class="text-muted small mb-3">
                        Workplace safety governance, hazard identification, risk assessment, emergency preparedness, and HSE Level 1, 2, and 3 certifications.
                    </p>
                    <a href="<?= SITE_URL ?>/courses.php?category=hse-safety" class="btn btn-link text-primary p-0 fw-semibold text-decoration-none">
                        Explore HSE Courses <i class="bi bi-chevron-right"></i>
                    </a>
                </div>
            </div>

            <!-- Service 2 -->
            <div class="col-md-6 col-lg-4">
                <div class="skytop-card service-card p-4 h-100">
                    <div class="text-primary mb-3">
                        <i class="bi bi-droplet-half fs-1"></i>
                    </div>
                    <h5 class="fw-bold text-navy mb-2">Oil & Gas Operations</h5>
                    <p class="text-muted small mb-3">
                        Upstream drilling overview, offshore platform safety, process safety management (PSM), gas testing, and wellhead integrity.
                    </p>
                    <a href="<?= SITE_URL ?>/courses.php?category=oil-and-gas" class="btn btn-link text-primary p-0 fw-semibold text-decoration-none">
                        Explore Oil & Gas <i class="bi bi-chevron-right"></i>
                    </a>
                </div>
            </div>

            <!-- Service 3 -->
            <div class="col-md-6 col-lg-4">
                <div class="skytop-card service-card p-4 h-100">
                    <div class="text-primary mb-3">
                        <i class="bi bi-tools fs-1"></i>
                    </div>
                    <h5 class="fw-bold text-navy mb-2">Technical & Vocational Skills</h5>
                    <p class="text-muted small mb-3">
                        Industrial flange bolting, pipe fitting, electrical isolations, mechanical maintenance, and non-destructive inspection fundamentals.
                    </p>
                    <a href="<?= SITE_URL ?>/courses.php?category=technical-skills" class="btn btn-link text-primary p-0 fw-semibold text-decoration-none">
                        Explore Technical Skills <i class="bi bi-chevron-right"></i>
                    </a>
                </div>
            </div>

            <!-- Service 4 -->
            <div class="col-md-6 col-lg-4">
                <div class="skytop-card service-card p-4 h-100">
                    <div class="text-primary mb-3">
                        <i class="bi bi-briefcase-fill fs-1"></i>
                    </div>
                    <h5 class="fw-bold text-navy mb-2">Professional Development</h5>
                    <p class="text-muted small mb-3">
                        ISO 45001, ISO 9001, and ISO 14001 auditing, safety leadership for managers, and contractor HSE performance oversight.
                    </p>
                    <a href="<?= SITE_URL ?>/courses.php?category=professional-development" class="btn btn-link text-primary p-0 fw-semibold text-decoration-none">
                        Explore Leadership <i class="bi bi-chevron-right"></i>
                    </a>
                </div>
            </div>

            <!-- Service 5 -->
            <div class="col-md-6 col-lg-4">
                <div class="skytop-card service-card p-4 h-100">
                    <div class="text-primary mb-3">
                        <i class="bi bi-building-check fs-1"></i>
                    </div>
                    <h5 class="fw-bold text-navy mb-2">Corporate Workforce Training</h5>
                    <p class="text-muted small mb-3">
                        Customized on-site programs engineered to address site-specific hazards, regulatory compliance, and turnaround readiness.
                    </p>
                    <a href="<?= SITE_URL ?>/corporate-training.php" class="btn btn-link text-primary p-0 fw-semibold text-decoration-none">
                        Corporate Solutions <i class="bi bi-chevron-right"></i>
                    </a>
                </div>
            </div>

            <!-- Service 6 -->
            <div class="col-md-6 col-lg-4">
                <div class="skytop-card service-card p-4 h-100">
                    <div class="text-primary mb-3">
                        <i class="bi bi-clipboard2-check-fill fs-1"></i>
                    </div>
                    <h5 class="fw-bold text-navy mb-2">HSE & Systems Consultancy</h5>
                    <p class="text-muted small mb-3">
                        Operational risk assessments, HSE manual drafting, facility safety inspections, and incident prevention advisory services.
                    </p>
                    <a href="<?= SITE_URL ?>/services.php" class="btn btn-link text-primary p-0 fw-semibold text-decoration-none">
                        Consultancy Services <i class="bi bi-chevron-right"></i>
                    </a>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- 5. FEATURED COURSES CATALOG -->
<section class="py-5 bg-white">
    <div class="container py-lg-4">
        <div class="d-flex flex-column flex-md-row justify-content-between align-items-md-end mb-4">
            <div>
                <span class="section-kicker">Course Catalog</span>
                <h2 class="section-heading mb-0">Featured Training Programs</h2>
            </div>
            <a href="<?= SITE_URL ?>/courses.php" class="btn btn-skytop-navy-outline mt-3 mt-md-0">
                View All Courses <i class="bi bi-arrow-right"></i>
            </a>
        </div>

        <div class="row g-4">
            <?php foreach ($featured_courses as $c): ?>
            <div class="col-md-6 col-lg-4">
                <div class="card h-100 skytop-card border overflow-hidden">
                    <div class="card-body p-4 d-flex flex-column">
                        <div class="d-flex justify-content-between align-items-center mb-2">
                            <span class="text-muted small fw-semibold"><?= htmlspecialchars($c['category_name']) ?></span>
                            <span class="badge bg-light text-navy border fw-bold"><?= htmlspecialchars($c['level']) ?></span>
                        </div>
                        <h5 class="card-title fw-bold text-navy mb-2"><?= htmlspecialchars($c['title']) ?></h5>
                        <p class="card-text text-muted small flex-grow-1 mb-3">
                            <?= htmlspecialchars($c['short_description']) ?>
                        </p>
                        <div class="pt-3 border-top d-flex justify-content-between align-items-center text-muted small mb-3">
                            <span><i class="bi bi-clock me-1 text-primary"></i> <?= htmlspecialchars($c['duration']) ?></span>
                            <span><i class="bi bi-laptop me-1 text-primary"></i> <?= htmlspecialchars($c['training_mode']) ?></span>
                        </div>
                        <div class="d-flex justify-content-between align-items-center pt-2">
                            <span class="fs-5 fw-bold text-navy"><?= format_currency($c['fee_ngn']) ?></span>
                            <div class="d-flex gap-2">
                                <a href="<?= SITE_URL ?>/course-details.php?id=<?= $c['id'] ?>" class="btn btn-sm btn-outline-secondary">Details</a>
                                <a href="<?= SITE_URL ?>/register.php?course_id=<?= $c['id'] ?>" class="btn btn-sm btn-skytop-orange">Enroll</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <?php endforeach; ?>
        </div>
    </div>
</section>

<!-- 6. TRAINING DELIVERY MODES -->
<section class="py-5 bg-skytop-light">
    <div class="container py-lg-4">
        <div class="text-center mb-5">
            <span class="section-kicker">Flexible Delivery</span>
            <h2 class="section-heading">How We Deliver Training</h2>
            <p class="text-muted mx-auto" style="max-width: 600px;">
                Designed around operational schedules and workforce learning preferences.
            </p>
        </div>

        <div class="row g-4">
            <div class="col-md-6 col-lg-3">
                <div class="skytop-card p-4 text-center h-100">
                    <div class="rounded-circle bg-navy text-white d-inline-flex p-3 mb-3">
                        <i class="bi bi-mortarboard fs-3 text-warning"></i>
                    </div>
                    <h5 class="fw-bold text-navy">Classroom Training</h5>
                    <p class="text-muted small mb-0">Interactive instructor-led sessions in our Port Harcourt technical learning suites with practical simulation kits.</p>
                </div>
            </div>

            <div class="col-md-6 col-lg-3">
                <div class="skytop-card p-4 text-center h-100">
                    <div class="rounded-circle bg-navy text-white d-inline-flex p-3 mb-3">
                        <i class="bi bi-laptop fs-3 text-warning"></i>
                    </div>
                    <h5 class="fw-bold text-navy">Virtual / Online</h5>
                    <p class="text-muted small mb-0">Live interactive online classes for remote engineers, offshore shift personnel, and busy executives.</p>
                </div>
            </div>

            <div class="col-md-6 col-lg-3">
                <div class="skytop-card p-4 text-center h-100">
                    <div class="rounded-circle bg-navy text-white d-inline-flex p-3 mb-3">
                        <i class="bi bi-building fs-3 text-warning"></i>
                    </div>
                    <h5 class="fw-bold text-navy">Corporate On-Site</h5>
                    <p class="text-muted small mb-0">Instructors mobilized to client operational bases, barges, fabrication yards, or offshore terminals nationwide.</p>
                </div>
            </div>

            <div class="col-md-6 col-lg-3">
                <div class="skytop-card p-4 text-center h-100">
                    <div class="rounded-circle bg-navy text-white d-inline-flex p-3 mb-3">
                        <i class="bi bi-diagram-3 fs-3 text-warning"></i>
                    </div>
                    <h5 class="fw-bold text-navy">Hybrid Model</h5>
                    <p class="text-muted small mb-0">Self-paced theoretical modules combined with intensive weekend practical workshop evaluations.</p>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- 7. INDUSTRIES WE SERVE -->
<section class="py-5 bg-white">
    <div class="container py-lg-4">
        <div class="text-center mb-5">
            <span class="section-kicker">Sector Coverage</span>
            <h2 class="section-heading">Industries We Serve</h2>
            <p class="text-muted mx-auto" style="max-width: 600px;">
                Providing safety, technical skills, and compliance solutions across high-hazard operating sectors.
            </p>
        </div>

        <div class="row g-3 row-cols-2 row-cols-md-3 row-cols-lg-6 text-center">
            <div class="col">
                <div class="p-3 border rounded h-100 d-flex flex-column align-items-center justify-content-center">
                    <i class="bi bi-fuel-pump fs-2 text-primary mb-2"></i>
                    <span class="fw-bold text-navy small">Oil & Gas (Up/Down)</span>
                </div>
            </div>
            <div class="col">
                <div class="p-3 border rounded h-100 d-flex flex-column align-items-center justify-content-center">
                    <i class="bi bi-tsunami fs-2 text-primary mb-2"></i>
                    <span class="fw-bold text-navy small">Maritime & Offshore</span>
                </div>
            </div>
            <div class="col">
                <div class="p-3 border rounded h-100 d-flex flex-column align-items-center justify-content-center">
                    <i class="bi bi-hammer fs-2 text-primary mb-2"></i>
                    <span class="fw-bold text-navy small">Heavy Construction</span>
                </div>
            </div>
            <div class="col">
                <div class="p-3 border rounded h-100 d-flex flex-column align-items-center justify-content-center">
                    <i class="bi bi-gear-fill fs-2 text-primary mb-2"></i>
                    <span class="fw-bold text-navy small">Manufacturing Plants</span>
                </div>
            </div>
            <div class="col">
                <div class="p-3 border rounded h-100 d-flex flex-column align-items-center justify-content-center">
                    <i class="bi bi-lightning-charge-fill fs-2 text-primary mb-2"></i>
                    <span class="fw-bold text-navy small">Power & Energy</span>
                </div>
            </div>
            <div class="col">
                <div class="p-3 border rounded h-100 d-flex flex-column align-items-center justify-content-center">
                    <i class="bi bi-truck fs-2 text-primary mb-2"></i>
                    <span class="fw-bold text-navy small">Logistics & Supply</span>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- 8. UPCOMING TRAINING SCHEDULES -->
<section class="py-5 bg-skytop-light">
    <div class="container py-lg-4">
        <div class="d-flex flex-column flex-md-row justify-content-between align-items-md-end mb-4">
            <div>
                <span class="section-kicker">Training Schedule</span>
                <h2 class="section-heading mb-0">Upcoming Training Sessions</h2>
            </div>
            <a href="<?= SITE_URL ?>/training-calendar.php" class="btn btn-skytop-primary mt-3 mt-md-0">
                Full Training Calendar <i class="bi bi-calendar3 ms-1"></i>
            </a>
        </div>

        <div class="table-responsive bg-white rounded-3 shadow-sm border">
            <table class="table table-hover align-middle mb-0">
                <thead class="table-light">
                    <tr>
                        <th class="ps-3 py-3 text-navy">Course Title</th>
                        <th class="py-3 text-navy">Date</th>
                        <th class="py-3 text-navy">Location</th>
                        <th class="py-3 text-navy">Mode</th>
                        <th class="py-3 text-navy">Status</th>
                        <th class="pe-3 py-3 text-end text-navy">Action</th>
                    </tr>
                </thead>
                <tbody>
                    <?php foreach ($upcoming_trainings as $sch): ?>
                    <tr>
                        <td class="ps-3">
                            <span class="fw-bold text-navy d-block"><?= htmlspecialchars($sch['course_title']) ?></span>
                            <small class="text-muted"><?= htmlspecialchars($sch['duration']) ?></small>
                        </td>
                        <td>
                            <span class="fw-semibold text-dark"><?= format_date($sch['start_date']) ?></span>
                            <small class="text-muted d-block">to <?= format_date($sch['end_date']) ?></small>
                        </td>
                        <td><?= htmlspecialchars($sch['location_name']) ?></td>
                        <td><span class="badge bg-light text-dark border"><?= htmlspecialchars($sch['training_mode']) ?></span></td>
                        <td>
                            <?php if ($sch['status'] === 'OPEN'): ?>
                                <span class="badge bg-success-subtle text-success fw-bold">OPEN (<?= $sch['slots_available'] ?> SLOTS)</span>
                            <?php elseif ($sch['status'] === 'FEW SLOTS LEFT'): ?>
                                <span class="badge bg-warning-subtle text-dark fw-bold">FEW SLOTS (<?= $sch['slots_available'] ?>)</span>
                            <?php else: ?>
                                <span class="badge bg-secondary"><?= htmlspecialchars($sch['status']) ?></span>
                            <?php endif; ?>
                        </td>
                        <td class="pe-3 text-end">
                            <a href="<?= SITE_URL ?>/register.php?course_id=<?= $sch['course_id'] ?>&schedule_id=<?= $sch['id'] ?>" class="btn btn-sm btn-skytop-orange">
                                Register
                            </a>
                        </td>
                    </tr>
                    <?php endforeach; ?>
                </tbody>
            </table>
        </div>
    </div>
</section>

<?php require_once __DIR__ . '/includes/footer.php'; ?>
