<?php
$page_title = 'Contact Us | Skytop Global Services Limited';
$page_desc = 'Contact Skytop Global Services Limited in Port Harcourt, Rivers State, Nigeria.';

require_once __DIR__ . '/includes/header.php';
require_once __DIR__ . '/includes/navbar.php';
require_once __DIR__ . '/controllers/ContactController.php';

$contactCtrl = new ContactController();
$contactCtrl->handleContact();
?>

<div class="bg-navy text-white py-5">
    <div class="container py-3">
        <span class="badge bg-warning text-dark fw-bold mb-2 text-uppercase">Admissions & Inquiries</span>
        <h1 class="fw-bold display-5 mb-2">Contact Us</h1>
        <p class="lead text-white-50 mb-0" style="max-width: 700px;">
            Visit our corporate learning centre in Port Harcourt or reach out for custom corporate proposals.
        </p>
    </div>
</div>

<div class="container py-5">
    <div class="row g-5">
        <!-- Contact Info & Location -->
        <div class="col-lg-5">
            <span class="section-kicker">Get in Touch</span>
            <h3 class="fw-bold text-navy mb-4">Training Centre & Head Office</h3>

            <div class="card p-4 border rounded-3 bg-light mb-4">
                <div class="d-flex align-items-start gap-3 mb-3">
                    <i class="bi bi-geo-alt-fill text-warning fs-3"></i>
                    <div>
                        <h6 class="fw-bold text-navy mb-1">Port Harcourt Training Hub</h6>
                        <p class="text-muted small mb-0">
                            Trans-Amadi Industrial Layout, Port Harcourt, Rivers State, Nigeria
                        </p>
                    </div>
                </div>

                <div class="d-flex align-items-start gap-3 mb-3">
                    <i class="bi bi-telephone-fill text-warning fs-3"></i>
                    <div>
                        <h6 class="fw-bold text-navy mb-1">Telephone</h6>
                        <p class="text-muted small mb-0"><?= SITE_PHONE ?></p>
                    </div>
                </div>

                <div class="d-flex align-items-start gap-3 mb-3">
                    <i class="bi bi-whatsapp text-warning fs-3"></i>
                    <div>
                        <h6 class="fw-bold text-navy mb-1">WhatsApp Direct</h6>
                        <p class="text-muted small mb-0"><?= SITE_WHATSAPP ?></p>
                    </div>
                </div>

                <div class="d-flex align-items-start gap-3">
                    <i class="bi bi-envelope-fill text-warning fs-3"></i>
                    <div>
                        <h6 class="fw-bold text-navy mb-1">Email Inquiries</h6>
                        <p class="text-muted small mb-0"><?= ADMIN_EMAIL ?></p>
                    </div>
                </div>
            </div>

            <!-- Operating Hours -->
            <div class="card p-4 border rounded-3">
                <h6 class="fw-bold text-navy mb-2"><i class="bi bi-clock-history text-primary me-2"></i> Business & Training Hours</h6>
                <p class="small text-muted mb-1">Monday – Friday: 8:00 AM – 5:00 PM</p>
                <p class="small text-muted mb-0">Saturday (Weekend Cohorts): 9:00 AM – 2:00 PM</p>
            </div>
        </div>

        <!-- Contact Form -->
        <div class="col-lg-7">
            <div class="card border-0 shadow-sm border rounded-3 p-4 p-md-5">
                <h4 class="fw-bold text-navy mb-2">Send an Inquiry</h4>
                <p class="text-muted small mb-4">Our client advisory team will respond promptly.</p>

                <form action="<?= SITE_URL ?>/contact.php" method="POST" class="needs-validation" novalidate>
                    <input type="hidden" name="csrf_token" value="<?= get_csrf_token() ?>">

                    <div class="row g-3 mb-3">
                        <div class="col-md-6">
                            <label class="form-label small fw-bold text-navy">Full Name *</label>
                            <input type="text" name="full_name" class="form-control" required placeholder="Your Full Name">
                            <div class="invalid-feedback">Name required.</div>
                        </div>
                        <div class="col-md-6">
                            <label class="form-label small fw-bold text-navy">Email Address *</label>
                            <input type="email" name="email" class="form-control" required placeholder="name@domain.com">
                            <div class="invalid-feedback">Valid email required.</div>
                        </div>
                    </div>

                    <div class="row g-3 mb-3">
                        <div class="col-md-6">
                            <label class="form-label small fw-bold text-navy">Phone Number</label>
                            <input type="tel" name="phone" class="form-control" placeholder="+234 800 000 0000">
                        </div>
                        <div class="col-md-6">
                            <label class="form-label small fw-bold text-navy">Subject *</label>
                            <input type="text" name="subject" class="form-control" required placeholder="Course Inquiry / Corporate Quote">
                        </div>
                    </div>

                    <div class="mb-4">
                        <label class="form-label small fw-bold text-navy">Your Message *</label>
                        <textarea name="message" class="form-control" rows="4" required placeholder="How can our technical training team assist you?"></textarea>
                        <div class="invalid-feedback">Message required.</div>
                    </div>

                    <button type="submit" class="btn btn-skytop-orange w-100 py-2 fw-bold text-uppercase">
                        <i class="bi bi-send-fill me-1"></i> Send Message
                    </button>
                </form>
            </div>
        </div>
    </div>
</div>

<?php require_once __DIR__ . '/includes/footer.php'; ?>
