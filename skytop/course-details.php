<?php
require_once __DIR__ . '/includes/header.php';
require_once __DIR__ . '/includes/navbar.php';
require_once __DIR__ . '/controllers/CourseController.php';

$id = (int)($_GET['id'] ?? 1);
$controller = new CourseController();
$data = $controller->show($id);
$course = $data['course'];
?>

<div class="bg-navy text-white py-5">
    <div class="container py-3">
        <nav aria-label="breadcrumb">
            <ol class="breadcrumb mb-2">
                <li class="breadcrumb-item"><a href="<?= SITE_URL ?>/index.php" class="text-white-50 text-decoration-none">Home</a></li>
                <li class="breadcrumb-item"><a href="<?= SITE_URL ?>/courses.php" class="text-white-50 text-decoration-none">Courses</a></li>
                <li class="breadcrumb-item active text-warning" aria-current="page"><?= htmlspecialchars($course['title']) ?></li>
            </ol>
        </nav>
        <span class="badge bg-warning text-dark fw-bold mb-2 text-uppercase"><?= htmlspecialchars($course['category_name']) ?></span>
        <h1 class="fw-bold display-5 mb-3"><?= htmlspecialchars($course['title']) ?></h1>
        <p class="lead text-white-50 mb-0" style="max-width: 800px;">
            <?= htmlspecialchars($course['short_description']) ?>
        </p>
    </div>
</div>

<div class="container py-5">
    <div class="row g-5">
        <!-- Main details -->
        <div class="col-lg-8">
            <div class="mb-5">
                <h3 class="fw-bold text-navy mb-3">Course Overview</h3>
                <div class="text-muted lh-lg">
                    <?= nl2br(htmlspecialchars($course['overview'])) ?>
                </div>
            </div>

            <?php if (!empty($course['learning_outcomes'])): ?>
            <div class="mb-5">
                <h3 class="fw-bold text-navy mb-3">Key Learning Outcomes</h3>
                <div class="bg-light p-4 rounded-3 border">
                    <ul class="list-unstyled mb-0 d-flex flex-column gap-2">
                        <?php 
                        $outcomes = explode(';', $course['learning_outcomes']);
                        foreach ($outcomes as $outcome): 
                            if (trim($outcome)):
                        ?>
                        <li class="d-flex align-items-start gap-2">
                            <i class="bi bi-check-circle-fill text-success fs-5 mt-1"></i>
                            <span><?= htmlspecialchars(trim($outcome)) ?></span>
                        </li>
                        <?php 
                            endif;
                        endforeach; 
                        ?>
                    </ul>
                </div>
            </div>
            <?php endif; ?>

            <?php if (!empty($course['target_audience'])): ?>
            <div class="mb-5">
                <h3 class="fw-bold text-navy mb-3">Target Audience</h3>
                <p class="text-muted">
                    <?= htmlspecialchars($course['target_audience']) ?>
                </p>
            </div>
            <?php endif; ?>

            <!-- Accreditation / Standard Disclaimer (Strictly per master prompt) -->
            <div class="alert alert-light border p-3 small text-muted">
                <i class="bi bi-shield-lock-fill text-primary me-2"></i>
                <strong>Professional Standards Notice:</strong> Industry-focused training designed around recognized professional practices and applicable standards.
            </div>
        </div>

        <!-- Sidebar Summary & Action -->
        <div class="col-lg-4">
            <div class="card border-0 shadow-sm rounded-3 border p-4 sticky-top" style="top: 100px;">
                <h4 class="fw-bold text-navy mb-3">Training Summary</h4>
                <div class="d-flex align-items-baseline mb-4">
                    <span class="display-6 fw-bold text-navy"><?= format_currency($course['fee_ngn']) ?></span>
                    <span class="text-muted ms-2 small">/ participant</span>
                </div>

                <ul class="list-group list-group-flush mb-4 small">
                    <li class="list-group-item d-flex justify-content-between px-0 py-2">
                        <span class="text-muted"><i class="bi bi-clock me-2"></i> Duration</span>
                        <span class="fw-bold text-dark"><?= htmlspecialchars($course['duration']) ?></span>
                    </li>
                    <li class="list-group-item d-flex justify-content-between px-0 py-2">
                        <span class="text-muted"><i class="bi bi-bar-chart-steps me-2"></i> Level</span>
                        <span class="fw-bold text-dark"><?= htmlspecialchars($course['level']) ?></span>
                    </li>
                    <li class="list-group-item d-flex justify-content-between px-0 py-2">
                        <span class="text-muted"><i class="bi bi-laptop me-2"></i> Mode</span>
                        <span class="fw-bold text-dark"><?= htmlspecialchars($course['training_mode']) ?></span>
                    </li>
                    <li class="list-group-item d-flex justify-content-between px-0 py-2">
                        <span class="text-muted"><i class="bi bi-geo-alt me-2"></i> Location</span>
                        <span class="fw-bold text-dark">Port Harcourt / Client Site</span>
                    </li>
                    <li class="list-group-item d-flex justify-content-between px-0 py-2">
                        <span class="text-muted"><i class="bi bi-award me-2"></i> Certificate</span>
                        <span class="fw-bold text-dark">Included upon completion</span>
                    </li>
                </ul>

                <a href="<?= SITE_URL ?>/register.php?course_id=<?= $course['id'] ?>" class="btn btn-skytop-orange w-100 py-2 fw-bold text-uppercase mb-2">
                    <i class="bi bi-person-check-fill me-1"></i> Enroll in this Course
                </a>
                <a href="<?= SITE_URL ?>/corporate-training.php" class="btn btn-outline-secondary w-100 py-2 btn-sm">
                    Request for Corporate Group
                </a>
            </div>
        </div>
    </div>
</div>

<?php require_once __DIR__ . '/includes/footer.php'; ?>
