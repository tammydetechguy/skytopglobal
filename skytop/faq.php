<?php
$page_title = 'Frequently Asked Questions (FAQ) | Skytop Global Services Limited';
$page_desc = 'Find answers to common questions about our Oil & Gas, HSE, and technical training courses.';

require_once __DIR__ . '/includes/header.php';
require_once __DIR__ . '/includes/navbar.php';
require_once __DIR__ . '/config/database.php';

$db = Database::getConnection();
$faqs = $db->query("SELECT * FROM faqs WHERE status = 'active' ORDER BY sort_order ASC")->fetchAll();
?>

<div class="bg-navy text-white py-5">
    <div class="container py-3">
        <span class="badge bg-warning text-dark fw-bold mb-2 text-uppercase">Learner Assistance</span>
        <h1 class="fw-bold display-5 mb-2">Frequently Asked Questions</h1>
        <p class="lead text-white-50 mb-0" style="max-width: 700px;">
            Answers to key questions regarding course enrolment, schedules, venue details, and corporate arrangements.
        </p>
    </div>
</div>

<div class="container py-5">
    <div class="row">
        <div class="col-lg-9 mx-auto">
            <div class="accordion" id="faqAccordion">
                <?php foreach ($faqs as $idx => $faq): ?>
                <div class="accordion-item border mb-3 rounded overflow-hidden">
                    <h2 class="accordion-header" id="heading<?= $idx ?>">
                        <button class="accordion-button fw-bold text-navy <?= ($idx !== 0) ? 'collapsed' : '' ?>" type="button" data-bs-toggle="collapse" data-bs-target="#collapse<?= $idx ?>" aria-expanded="<?= ($idx === 0) ? 'true' : 'false' ?>" aria-controls="collapse<?= $idx ?>">
                            <?= htmlspecialchars($faq['question']) ?>
                        </button>
                    </h2>
                    <div id="collapse<?= $idx ?>" class="accordion-collapse collapse <?= ($idx === 0) ? 'show' : '' ?>" aria-labelledby="heading<?= $idx ?>" data-bs-parent="#faqAccordion">
                        <div class="accordion-body text-muted small lh-lg">
                            <?= htmlspecialchars($faq['answer']) ?>
                        </div>
                    </div>
                </div>
                <?php endforeach; ?>
            </div>

            <div class="text-center mt-5 p-4 bg-light rounded-3 border">
                <h5 class="fw-bold text-navy mb-1">Have a question not covered here?</h5>
                <p class="text-muted small mb-3">Our training advisors in Port Harcourt are ready to assist you.</p>
                <a href="<?= SITE_URL ?>/contact.php" class="btn btn-skytop-primary">
                    <i class="bi bi-chat-dots-fill me-1"></i> Contact Admissions Team
                </a>
            </div>
        </div>
    </div>
</div>

<?php require_once __DIR__ . '/includes/footer.php'; ?>
