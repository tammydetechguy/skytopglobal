<?php
$page_title = 'Training Calendar | Skytop Global Services Limited';
$page_desc = 'View scheduled upcoming dates for Oil & Gas, HSE, and Technical skills training in Port Harcourt and online.';

require_once __DIR__ . '/includes/header.php';
require_once __DIR__ . '/includes/navbar.php';
require_once __DIR__ . '/models/Training.php';

$schedules = Training::getAll();
?>

<div class="bg-navy text-white py-5">
    <div class="container py-3">
        <span class="badge bg-warning text-dark fw-bold mb-2 text-uppercase">Schedule Directory</span>
        <h1 class="fw-bold display-5 mb-2">Training Calendar</h1>
        <p class="lead text-white-50 mb-0" style="max-width: 700px;">
            Plan your technical and safety certifications across upcoming cohorts in Port Harcourt and virtual learning sessions.
        </p>
    </div>
</div>

<div class="container py-5">
    <div class="card border-0 shadow-sm border rounded-3 overflow-hidden">
        <div class="p-4 bg-light border-bottom d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3">
            <div>
                <h5 class="fw-bold text-navy mb-1">Scheduled Training Cohorts</h5>
                <p class="text-muted small mb-0">Select your preferred training date and proceed directly to enrolment.</p>
            </div>
            <a href="<?= SITE_URL ?>/corporate-training.php" class="btn btn-sm btn-outline-primary">
                <i class="bi bi-calendar-plus me-1"></i> Request Custom Date for Your Team
            </a>
        </div>

        <div class="table-responsive">
            <table class="table table-hover align-middle mb-0">
                <thead class="table-light text-navy">
                    <tr>
                        <th class="ps-4 py-3">Course</th>
                        <th class="py-3">Start Date</th>
                        <th class="py-3">End Date</th>
                        <th class="py-3">Location & Mode</th>
                        <th class="py-3">Instructor</th>
                        <th class="py-3">Registration Deadline</th>
                        <th class="py-3">Status</th>
                        <th class="pe-4 py-3 text-end">Action</th>
                    </tr>
                </thead>
                <tbody>
                    <?php if (empty($schedules)): ?>
                    <tr>
                        <td colspan="8" class="text-center py-5 text-muted">No scheduled sessions found. Please check back soon or request a custom corporate session.</td>
                    </tr>
                    <?php else: ?>
                    <?php foreach ($schedules as $s): ?>
                    <tr>
                        <td class="ps-4">
                            <span class="fw-bold text-navy d-block"><?= htmlspecialchars($s['course_title']) ?></span>
                        </td>
                        <td>
                            <span class="fw-semibold text-dark"><?= format_date($s['start_date']) ?></span>
                        </td>
                        <td>
                            <span class="text-muted"><?= format_date($s['end_date']) ?></span>
                        </td>
                        <td>
                            <span class="d-block small fw-semibold text-dark"><?= htmlspecialchars($s['location_name']) ?></span>
                            <small class="badge bg-light text-dark border"><?= htmlspecialchars($s['training_mode']) ?></small>
                        </td>
                        <td>
                            <small class="text-muted"><?= htmlspecialchars($s['instructor_name'] ?? 'Senior Facilitator') ?></small>
                        </td>
                        <td>
                            <small class="text-danger fw-semibold"><?= format_date($s['registration_deadline']) ?></small>
                        </td>
                        <td>
                            <?php if ($s['status'] === 'OPEN'): ?>
                                <span class="badge bg-success-subtle text-success fw-bold">OPEN</span>
                            <?php elseif ($s['status'] === 'FEW SLOTS LEFT'): ?>
                                <span class="badge bg-warning-subtle text-dark fw-bold">FEW SLOTS LEFT</span>
                            <?php elseif ($s['status'] === 'FULL'): ?>
                                <span class="badge bg-danger-subtle text-danger fw-bold">FULL</span>
                            <?php else: ?>
                                <span class="badge bg-secondary"><?= htmlspecialchars($s['status']) ?></span>
                            <?php endif; ?>
                        </td>
                        <td class="pe-4 text-end">
                            <?php if ($s['status'] !== 'FULL' && $s['status'] !== 'COMPLETED'): ?>
                            <a href="<?= SITE_URL ?>/register.php?course_id=<?= $s['course_id'] ?>&schedule_id=<?= $s['id'] ?>" class="btn btn-sm btn-skytop-orange">
                                Register
                            </a>
                            <?php else: ?>
                            <button class="btn btn-sm btn-light border" disabled>Closed</button>
                            <?php endif; ?>
                        </td>
                    </tr>
                    <?php endforeach; ?>
                    <?php endif; ?>
                </tbody>
            </table>
        </div>
    </div>
</div>

<?php require_once __DIR__ . '/includes/footer.php'; ?>
