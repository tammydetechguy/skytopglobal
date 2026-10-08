<?php
$page_title = 'Online Registration & Enrolment | Skytop Global Services Limited';
$page_desc = 'Register for accredited Oil & Gas, HSE, and technical skills training at Skytop Global Services Limited in Port Harcourt.';

require_once __DIR__ . '/includes/header.php';
require_once __DIR__ . '/includes/navbar.php';
require_once __DIR__ . '/models/Course.php';
require_once __DIR__ . '/models/Registration.php';
require_once __DIR__ . '/controllers/RegistrationController.php';

$regController = new RegistrationController();
$regController->handlePost();

$courses = Course::getAll();
$preselected_course_id = (int)($_GET['course_id'] ?? 0);
$preselected_schedule_id = (int)($_GET['schedule_id'] ?? 0);

// Check if displaying a completed registration slip
$slip_reg_id = sanitize_input($_GET['reg_id'] ?? '');
$slip_data = $slip_reg_id ? Registration::findByRegId($slip_reg_id) : null;
?>

<div class="bg-navy text-white py-5">
    <div class="container py-3">
        <span class="badge bg-warning text-dark fw-bold mb-2 text-uppercase">Admissions & Enrolment</span>
        <h1 class="fw-bold display-5 mb-2">Training Registration</h1>
        <p class="lead text-white-50 mb-0" style="max-width: 720px;">
            Secure your slot in upcoming cohorts or submit enrolment details for corporate invoicing.
        </p>
    </div>
</div>

<div class="container py-5">
    <?php if ($slip_data): ?>
    <!-- REGISTRATION CONFIRMATION & PRINTABLE SLIP -->
    <div class="max-w-3xl mx-auto" style="max-width: 800px;">
        <div class="alert alert-success d-flex align-items-center justify-content-between p-3 mb-4 no-print shadow-sm">
            <div class="d-flex align-items-center gap-2">
                <i class="bi bi-check-circle-fill fs-3 text-success"></i>
                <div>
                    <h6 class="fw-bold mb-0">Registration Successfully Submitted!</h6>
                    <small>Your registration reference number is <strong><?= htmlspecialchars($slip_data['registration_id']) ?></strong>.</small>
                </div>
            </div>
            <div>
                <button type="button" id="printSlipBtn" class="btn btn-outline-success btn-sm fw-bold">
                    <i class="bi bi-printer-fill me-1"></i> Print / Save PDF
                </button>
            </div>
        </div>

        <!-- Official Registration Slip -->
        <div id="printable-slip" class="card border rounded-3 p-4 p-md-5 bg-white shadow-sm">
            <!-- Header of Slip -->
            <div class="d-flex justify-content-between align-items-start border-bottom pb-4 mb-4">
                <div class="d-flex align-items-center gap-3">
                    <img src="<?= SITE_URL ?>/assets/images/logo.png" alt="Skytop Global Services Limited" style="height: 64px; width: auto;" class="d-inline-block">
                    <div>
                        <small class="text-muted d-block text-uppercase fw-semibold" style="letter-spacing: 0.08em;">Official Training Registration Slip</small>
                        <small class="text-muted">Trans-Amadi Industrial Layout, Port Harcourt, Rivers State, Nigeria</small>
                    </div>
                </div>
                <div class="text-end">
                    <span class="badge bg-navy text-warning p-2 fs-6 font-monospace"><?= htmlspecialchars($slip_data['registration_id']) ?></span>
                    <small class="text-muted d-block mt-1">Date: <?= date('d M Y') ?></small>
                </div>
            </div>

            <!-- Candidate Details -->
            <h5 class="fw-bold text-navy mb-3"><i class="bi bi-person-lines-fill me-2 text-primary"></i> Participant Profile</h5>
            <div class="row g-3 mb-4">
                <div class="col-sm-6">
                    <span class="text-muted small d-block">Full Name:</span>
                    <span class="fw-bold text-dark"><?= htmlspecialchars($slip_data['first_name'] . ' ' . $slip_data['last_name']) ?></span>
                </div>
                <div class="col-sm-6">
                    <span class="text-muted small d-block">Gender:</span>
                    <span class="fw-bold text-dark"><?= htmlspecialchars($slip_data['gender']) ?></span>
                </div>
                <div class="col-sm-6">
                    <span class="text-muted small d-block">Email Address:</span>
                    <span class="fw-bold text-dark"><?= htmlspecialchars($slip_data['email']) ?></span>
                </div>
                <div class="col-sm-6">
                    <span class="text-muted small d-block">Phone Number:</span>
                    <span class="fw-bold text-dark"><?= htmlspecialchars($slip_data['phone']) ?></span>
                </div>
                <div class="col-sm-6">
                    <span class="text-muted small d-block">Organization / Company:</span>
                    <span class="fw-bold text-dark"><?= htmlspecialchars($slip_data['company_name'] ?: 'Individual / Independent') ?></span>
                </div>
                <div class="col-sm-6">
                    <span class="text-muted small d-block">Job Title / Designation:</span>
                    <span class="fw-bold text-dark"><?= htmlspecialchars($slip_data['job_title'] ?: 'Participant') ?></span>
                </div>
            </div>

            <!-- Course Details -->
            <h5 class="fw-bold text-navy mb-3 border-top pt-3"><i class="bi bi-journal-check me-2 text-primary"></i> Program Enrolment</h5>
            <div class="row g-3 mb-4">
                <div class="col-sm-8">
                    <span class="text-muted small d-block">Course Title:</span>
                    <span class="fw-bold text-navy fs-6"><?= htmlspecialchars($slip_data['course_title']) ?></span>
                    <small class="text-muted d-block"><?= htmlspecialchars($slip_data['category_name']) ?> (<?= htmlspecialchars($slip_data['duration']) ?>)</small>
                </div>
                <div class="col-sm-4 text-sm-end">
                    <span class="text-muted small d-block">Tuition Fee:</span>
                    <span class="fw-bold text-navy fs-5"><?= format_currency($slip_data['fee_ngn']) ?></span>
                </div>
                <div class="col-sm-6">
                    <span class="text-muted small d-block">Selected Training Mode:</span>
                    <span class="badge bg-light text-dark border"><?= htmlspecialchars($slip_data['training_mode']) ?></span>
                </div>
                <div class="col-sm-6">
                    <span class="text-muted small d-block">Training Venue:</span>
                    <span class="fw-semibold text-dark">Skytop Corporate Learning Hub, Port Harcourt</span>
                </div>
            </div>

            <!-- Venue & Payment Instructions -->
            <div class="bg-light p-3 rounded border mb-4">
                <h6 class="fw-bold text-navy mb-2"><i class="bi bi-info-circle-fill text-warning me-1"></i> Reporting & Payment Instructions</h6>
                <p class="small text-muted mb-2">
                    1. Present this registration slip at the reception on your training start date for badge issuing and course pack collection.<br>
                    2. For bank transfer or corporate invoicing, reference your Registration ID <strong><?= htmlspecialchars($slip_data['registration_id']) ?></strong> in the transaction remarks.<br>
                    3. For questions, call our Admissions Desk at <strong><?= SITE_PHONE ?></strong> or email <strong><?= ADMIN_EMAIL ?></strong>.
                </p>
            </div>

            <!-- Footer of slip -->
            <div class="d-flex justify-content-between align-items-center text-muted small border-top pt-3">
                <span>Skytop Global Services Limited • Port Harcourt, Nigeria</span>
                <span class="fw-semibold font-monospace">STATUS: REGISTRATION RECORDED</span>
            </div>
        </div>

        <div class="text-center mt-4 no-print">
            <a href="<?= SITE_URL ?>/courses.php" class="btn btn-outline-secondary me-2">Browse Other Courses</a>
            <a href="<?= SITE_URL ?>/index.php" class="btn btn-skytop-primary">Return to Homepage</a>
        </div>
    </div>

    <?php else: ?>
    <!-- REGISTRATION FORM -->
    <div class="row g-5">
        <div class="col-lg-8 mx-auto">
            <div class="card border-0 shadow-sm border rounded-3 p-4 p-md-5">
                <h4 class="fw-bold text-navy mb-2">Participant Enrolment Form</h4>
                <p class="text-muted small mb-4">
                    Please provide accurate contact information. A formal registration slip with your unique reference ID will be generated upon submission.
                </p>

                <form action="<?= SITE_URL ?>/register.php" method="POST" class="needs-validation" novalidate>
                    <input type="hidden" name="csrf_token" value="<?= get_csrf_token() ?>">
                    <input type="hidden" name="schedule_id" value="<?= $preselected_schedule_id ?>">

                    <div class="mb-4">
                        <label class="form-label small fw-bold text-navy">Select Training Program *</label>
                        <select name="course_id" class="form-select form-select-lg fs-6" required>
                            <option value="">-- Choose Course --</option>
                            <?php foreach ($courses as $c): ?>
                                <option value="<?= $c['id'] ?>" <?= ($preselected_course_id == $c['id']) ? 'selected' : '' ?>>
                                    <?= htmlspecialchars($c['title']) ?> (<?= format_currency($c['fee_ngn']) ?> - <?= htmlspecialchars($c['duration']) ?>)
                                </option>
                            <?php endforeach; ?>
                        </select>
                        <div class="invalid-feedback">Please select a course.</div>
                    </div>

                    <div class="row g-3 mb-3">
                        <div class="col-md-6">
                            <label class="form-label small fw-bold text-navy">First Name *</label>
                            <input type="text" name="first_name" class="form-control" required placeholder="e.g. Chukwuma">
                            <div class="invalid-feedback">First name is required.</div>
                        </div>
                        <div class="col-md-6">
                            <label class="form-label small fw-bold text-navy">Last Name *</label>
                            <input type="text" name="last_name" class="form-control" required placeholder="e.g. Briggs">
                            <div class="invalid-feedback">Last name is required.</div>
                        </div>
                    </div>

                    <div class="row g-3 mb-3">
                        <div class="col-md-4">
                            <label class="form-label small fw-bold text-navy">Gender *</label>
                            <select name="gender" class="form-select" required>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                            </select>
                        </div>
                        <div class="col-md-4">
                            <label class="form-label small fw-bold text-navy">Email Address *</label>
                            <input type="email" name="email" class="form-control" required placeholder="name@domain.com">
                            <div class="invalid-feedback">Valid email required.</div>
                        </div>
                        <div class="col-md-4">
                            <label class="form-label small fw-bold text-navy">Phone Number *</label>
                            <input type="tel" name="phone" class="form-control" required placeholder="+234 800 000 0000">
                            <div class="invalid-feedback">Phone number required.</div>
                        </div>
                    </div>

                    <div class="row g-3 mb-3">
                        <div class="col-md-6">
                            <label class="form-label small fw-bold text-navy">Company / Sponsoring Organization</label>
                            <input type="text" name="company_name" class="form-control" placeholder="Leave blank if self-sponsored">
                        </div>
                        <div class="col-md-6">
                            <label class="form-label small fw-bold text-navy">Job Title / Current Role</label>
                            <input type="text" name="job_title" class="form-control" placeholder="e.g. HSE Officer, Graduate Trainee">
                        </div>
                    </div>

                    <div class="row g-3 mb-3">
                        <div class="col-md-6">
                            <label class="form-label small fw-bold text-navy">Preferred Training Mode *</label>
                            <select name="training_mode" class="form-select" required>
                                <option value="Classroom">Classroom (Port Harcourt Centre)</option>
                                <option value="Online">Virtual / Online Interactive</option>
                                <option value="Hybrid">Hybrid (Classroom + Virtual)</option>
                                <option value="Corporate On-site">Corporate On-site Facility</option>
                            </select>
                        </div>
                        <div class="col-md-6">
                            <label class="form-label small fw-bold text-navy">Preferred Training Date</label>
                            <input type="date" name="preferred_date" class="form-control">
                        </div>
                    </div>

                    <div class="row g-3 mb-3">
                        <div class="col-md-6">
                            <label class="form-label small fw-bold text-navy">State / Location</label>
                            <input type="text" name="state" class="form-control" value="Rivers State">
                        </div>
                        <div class="col-md-6">
                            <label class="form-label small fw-bold text-navy">Country</label>
                            <input type="text" name="country" class="form-control" value="Nigeria">
                        </div>
                    </div>

                    <div class="mb-3">
                        <label class="form-label small fw-bold text-navy">Residential / Office Address</label>
                        <input type="text" name="address" class="form-control" placeholder="Street Address, City">
                    </div>

                    <div class="mb-4">
                        <label class="form-label small fw-bold text-navy">Additional Notes / Dietary or Access Requirements</label>
                        <textarea name="notes" class="form-control" rows="2" placeholder="Any specific requirements..."></textarea>
                    </div>

                    <div class="form-check mb-4">
                        <input class="form-check-input" type="checkbox" id="termsCheck" required>
                        <label class="form-check-label small text-muted" for="termsCheck">
                            I confirm that the information provided is accurate and agree to Skytop Global Services Limited's training participation guidelines.
                        </label>
                        <div class="invalid-feedback">You must agree before submitting.</div>
                    </div>

                    <button type="submit" class="btn btn-skytop-orange w-100 py-3 fw-bold text-uppercase fs-6">
                        <i class="bi bi-person-check-fill me-1"></i> Complete Enrolment & Generate Slip
                    </button>
                </form>
            </div>
        </div>
    </div>
    <?php endif; ?>
</div>

<?php require_once __DIR__ . '/includes/footer.php'; ?>
