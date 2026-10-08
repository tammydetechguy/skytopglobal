<?php
$page_title = 'Our Instructors & Facilitators | Skytop Global Services Limited';
$page_desc = 'Meet our certified facilitators and oil & gas industry practitioners.';

require_once __DIR__ . '/includes/header.php';
require_once __DIR__ . '/includes/navbar.php';
require_once __DIR__ . '/models/Instructor.php';

$instructors = Instructor::getAll();
?>

<div class="bg-navy text-white py-5">
    <div class="container py-3">
        <span class="badge bg-warning text-dark fw-bold mb-2 text-uppercase">Faculty & Experts</span>
        <h1 class="fw-bold display-5 mb-2">Our Instructors & Specialists</h1>
        <p class="lead text-white-50 mb-0" style="max-width: 700px;">
            Learn from seasoned professionals with extensive operational track records across offshore platforms and high-hazard operations.
        </p>
    </div>
</div>

<div class="container py-5">
    <div class="row g-4">
        <?php foreach ($instructors as $inst): ?>
        <div class="col-md-6 col-lg-4">
            <div class="card h-100 skytop-card border p-4 text-center">
                <div class="mx-auto rounded-circle bg-navy text-warning p-4 mb-3 d-inline-flex align-items-center justify-content-center" style="width: 90px; height: 90px;">
                    <i class="bi bi-person-badge fs-1"></i>
                </div>
                <h5 class="fw-bold text-navy mb-1"><?= htmlspecialchars($inst['full_name']) ?></h5>
                <span class="text-primary fw-semibold small d-block mb-2"><?= htmlspecialchars($inst['title']) ?></span>
                <span class="badge bg-light text-muted border mb-3"><?= htmlspecialchars($inst['specialization']) ?></span>
                <p class="text-muted small mb-0">
                    <?= htmlspecialchars($inst['bio']) ?>
                </p>
            </div>
        </div>
        <?php endforeach; ?>
    </div>
</div>

<?php require_once __DIR__ . '/includes/footer.php'; ?>
