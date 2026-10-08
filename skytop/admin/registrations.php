<?php
require_once __DIR__ . '/../config/config.php';
require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../includes/auth.php';
require_once __DIR__ . '/../includes/functions.php';

require_admin_auth();
$db = Database::getConnection();

$regs = $db->query("SELECT r.*, c.title AS course_title, c.fee_ngn 
                    FROM registrations r 
                    JOIN courses c ON r.course_id = c.id 
                    ORDER BY r.id DESC")->fetchAll();
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Candidate Registrations | Skytop Admin</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">
    <link rel="stylesheet" href="<?= SITE_URL ?>/assets/css/style.css">
</head>
<body class="bg-light">

<nav class="navbar navbar-dark bg-navy sticky-top px-3 shadow-sm">
    <a class="navbar-brand d-flex align-items-center gap-2" href="<?= SITE_URL ?>/admin/index.php">
        <img src="<?= SITE_URL ?>/assets/images/logo.png" alt="Skytop Logo" style="height: 38px; width: auto;" class="bg-white p-1 rounded d-inline-block">
        <span class="fw-bold tracking-tight ms-1">SKYTOP ADMIN</span>
    </a>
    <div class="d-flex align-items-center gap-2">
        <a href="<?= SITE_URL ?>/admin/index.php" class="btn btn-sm btn-outline-light">Dashboard</a>
        <a href="<?= SITE_URL ?>/admin/logout.php" class="btn btn-sm btn-danger">Sign Out</a>
    </div>
</nav>

<div class="container-fluid py-4">
    <div class="d-flex justify-content-between align-items-center mb-4">
        <div>
            <h3 class="fw-bold text-navy mb-0">Candidate Registrations</h3>
            <small class="text-muted">Review, print registration slips, and manage participant statuses.</small>
        </div>
    </div>

    <div class="card border-0 shadow-sm">
        <div class="table-responsive">
            <table class="table table-hover align-middle mb-0">
                <thead class="table-light">
                    <tr>
                        <th class="ps-3">ID</th>
                        <th>Reference</th>
                        <th>Candidate</th>
                        <th>Course Enrolled</th>
                        <th>Tuition</th>
                        <th>Mode</th>
                        <th>Contact</th>
                        <th>Company</th>
                        <th>Date Registered</th>
                        <th class="pe-3 text-end">Slip</th>
                    </tr>
                </thead>
                <tbody>
                    <?php if (empty($regs)): ?>
                    <tr><td colspan="10" class="text-center py-4 text-muted">No student registrations recorded yet.</td></tr>
                    <?php else: ?>
                    <?php foreach ($regs as $r): ?>
                    <tr>
                        <td class="ps-3 text-muted">#<?= $r['id'] ?></td>
                        <td><span class="badge bg-light text-navy border font-monospace"><?= htmlspecialchars($r['registration_id']) ?></span></td>
                        <td>
                            <strong class="text-navy"><?= htmlspecialchars($r['first_name'] . ' ' . $r['last_name']) ?></strong>
                            <small class="d-block text-muted"><?= htmlspecialchars($r['gender']) ?></small>
                        </td>
                        <td><?= htmlspecialchars($r['course_title']) ?></td>
                        <td class="fw-bold"><?= format_currency($r['fee_ngn']) ?></td>
                        <td><span class="badge bg-light text-muted border"><?= htmlspecialchars($r['training_mode']) ?></span></td>
                        <td>
                            <small class="d-block"><?= htmlspecialchars($r['email']) ?></small>
                            <small class="text-muted"><?= htmlspecialchars($r['phone']) ?></small>
                        </td>
                        <td><small><?= htmlspecialchars($r['company_name'] ?: 'Self') ?></small></td>
                        <td><small class="text-muted"><?= date('d M Y', strtotime($r['created_at'])) ?></small></td>
                        <td class="pe-3 text-end">
                            <a href="<?= SITE_URL ?>/register.php?reg_id=<?= $r['registration_id'] ?>" target="_blank" class="btn btn-sm btn-outline-primary" title="Print Enrolment Slip">
                                <i class="bi bi-printer"></i> Slip
                            </a>
                        </td>
                    </tr>
                    <?php endforeach; ?>
                    <?php endif; ?>
                </tbody>
            </table>
        </div>
    </div>
</div>

<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
