<?php
$page_title = 'Corporate Training Solutions | Skytop Global Services Limited';
$page_desc = 'Empower your workforce with tailored Oil & Gas, HSE, and technical competency training programs in Port Harcourt and across Nigeria.';

require_once __DIR__ . '/includes/header.php';
require_once __DIR__ . '/includes/navbar.php';
require_once __DIR__ . '/controllers/CorporateController.php';

$corpController = new CorporateController();
$submissionRef = $corpController->handleRequest();
?>

<div class="bg-navy text-white py-5">
    <div class="container py-3">
        <span class="badge bg-warning text-dark fw-bold mb-2 text-uppercase">Enterprise Workforce Solutions</span>
        <h1 class="fw-bold display-5 mb-2">EMPOWER YOUR WORKFORCE</h1>
        <p class="lead text-white-50 mb-0" style="max-width: 720px;">
            Offer organizations customized training solutions designed around their operational environment, hazard profiles, and workforce competency requirements.
        </p>
    </div>
</div>

<div class="container py-5">
    <div class="row g-5">
        <!-- Overview & Offerings -->
        <div class="col-lg-6">
            <span class="section-kicker">Customized Enterprise Delivery</span>
            <h2 class="section-heading mb-3">Tailored Corporate Training for Oil & Gas & Heavy Industry</h2>
            <p class="text-muted mb-4">
                At Skytop Global Services Limited, we understand that high-hazard operations cannot afford training downtime that does not translate to immediate operational safety and efficiency. We partner with energy companies, engineering EPCs, fabrication yards, and oilfield service contractors to design focused workforce upskilling tracks.
            </p>

            <div class="row g-3 mb-4">
                <div class="col-12">
                    <div class="p-3 border rounded-3 bg-light d-flex align-items-start gap-3">
                        <i class="bi bi-shield-check text-primary fs-3 mt-1"></i>
                        <div>
                            <h6 class="fw-bold text-navy mb-1">HSE & Safety Leadership</h6>
                            <p class="small text-muted mb-0">Permit to Work compliance, Job Safety Analysis (JSA), hazard identification, and supervisory safety accountability.</p>
                        </div>
                    </div>
                </div>
                <div class="col-12">
                    <div class="p-3 border rounded-3 bg-light d-flex align-items-start gap-3">
                        <i class="bi bi-tools text-primary fs-3 mt-1"></i>
                        <div>
                            <h6 class="fw-bold text-navy mb-1">Technical & Mechanical Skills</h6>
                            <p class="small text-muted mb-0">Flange bolting, pressure joint integrity, valves, scaffolding inspection, and rigging safety.</p>
                        </div>
                    </div>
                </div>
                <div class="col-12">
                    <div class="p-3 border rounded-3 bg-light d-flex align-items-start gap-3">
                        <i class="bi bi-geo-alt-fill text-primary fs-3 mt-1"></i>
                        <div>
                            <h6 class="fw-bold text-navy mb-1">On-Site Client Mobilization</h6>
                            <p class="small text-muted mb-0">Our certified facilitators deploy directly to your facility, fabrication yard, barge, or operating terminal nationwide.</p>
                        </div>
                    </div>
                </div>
            </div>

            <div class="p-3 border-start border-4 border-warning bg-light">
                <h6 class="fw-bold text-navy mb-1">Group Enrolment Discounts</h6>
                <p class="small text-muted mb-0">Preferential tiered pricing packages available for teams of 5 or more participants with customized scheduling.</p>
            </div>
        </div>

        <!-- Corporate Request Form -->
        <div class="col-lg-6">
            <div class="card border-0 shadow-sm border rounded-3 p-4 p-md-5">
                <h4 class="fw-bold text-navy mb-2">Request Corporate Training</h4>
                <p class="small text-muted mb-4">Complete the form below to receive a formal curriculum proposal and commercial quotation.</p>

                <form action="<?= SITE_URL ?>/corporate-training.php" method="POST" class="needs-validation" novalidate>
                    <input type="hidden" name="csrf_token" value="<?= get_csrf_token() ?>">

                    <div class="mb-3">
                        <label class="form-label small fw-bold text-navy">Company Name *</label>
                        <input type="text" name="company_name" class="form-control" required placeholder="e.g. Apex Marine Logistics Ltd">
                    </div>

                    <div class="row g-3 mb-3">
                        <div class="col-md-6">
                            <label class="form-label small fw-bold text-navy">Contact Person *</label>
                            <input type="text" name="contact_person" class="form-control" required placeholder="Full Name">
                        </div>
                        <div class="col-md-6">
                            <label class="form-label small fw-bold text-navy">Official Email *</label>
                            <input type="email" name="email" class="form-control" required placeholder="name@company.com">
                        </div>
                    </div>

                    <div class="row g-3 mb-3">
                        <div class="col-md-6">
                            <label class="form-label small fw-bold text-navy">Phone Number *</label>
                            <input type="tel" name="phone" class="form-control" required placeholder="+234 800 000 0000">
                        </div>
                        <div class="col-md-6">
                            <label class="form-label small fw-bold text-navy">Industry Sector *</label>
                            <select name="industry" class="form-select" required>
                                <option value="Oil & Gas Upstream">Oil & Gas (Upstream)</option>
                                <option value="Oil & Gas Downstream">Oil & Gas (Downstream / Refining)</option>
                                <option value="Maritime & Offshore">Maritime & Offshore Operations</option>
                                <option value="Construction & Engineering">Construction & EPC</option>
                                <option value="Manufacturing & Industrial">Manufacturing Plants</option>
                                <option value="Power & Energy">Power & Energy Utilities</option>
                                <option value="Other">Other Industrial</option>
                            </select>
                        </div>
                    </div>

                    <div class="row g-3 mb-3">
                        <div class="col-md-6">
                            <label class="form-label small fw-bold text-navy">Est. Number of Participants *</label>
                            <input type="number" name="participants" class="form-control" min="1" max="500" value="10" required>
                        </div>
                        <div class="col-md-6">
                            <label class="form-label small fw-bold text-navy">Preferred Training Date</label>
                            <input type="date" name="preferred_date" class="form-control">
                        </div>
                    </div>

                    <div class="mb-3">
                        <label class="form-label small fw-bold text-navy">Training Location / Venue *</label>
                        <select name="location" class="form-select" required>
                            <option value="Skytop Port Harcourt Centre">Skytop Port Harcourt Training Centre</option>
                            <option value="On-site Client Facility (Port Harcourt)">Client Facility in Port Harcourt</option>
                            <option value="On-site Client Facility (Lagos / Nationwide)">Client Facility Nationwide</option>
                            <option value="Online Virtual Classroom">Virtual Online Delivery</option>
                        </select>
                    </div>

                    <div class="mb-3">
                        <label class="form-label small fw-bold text-navy">Training Requirement / Program Topics *</label>
                        <textarea name="requirement" class="form-control" rows="3" required placeholder="Specify your desired course topics, specific hazards, or learning objectives..."></textarea>
                    </div>

                    <div class="mb-4">
                        <label class="form-label small fw-bold text-navy">Additional Notes</label>
                        <textarea name="message" class="form-control" rows="2" placeholder="Any special scheduling constraints or requirements..."></textarea>
                    </div>

                    <button type="submit" class="btn btn-skytop-orange w-100 py-2 fw-bold text-uppercase">
                        <i class="bi bi-send-fill me-1"></i> Submit Request
                    </button>
                </form>
            </div>
        </div>
    </div>
</div>

<?php require_once __DIR__ . '/includes/footer.php'; ?>
