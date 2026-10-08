<?php
require_once __DIR__ . '/../config/config.php';
require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../includes/auth.php';
require_once __DIR__ . '/../includes/functions.php';

require_admin_auth();
$db = Database::getConnection();

$corporate = $db->query("SELECT * FROM corporate_requests ORDER BY id DESC")->fetchAll();
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Corporate Requests | Skytop Admin</title>
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
            <h3 class="fw-bold text-navy mb-0">Corporate Training Requests</h3>
            <small class="text-muted">Inbound commercial proposals and workforce requests from corporate clients.</small>
        </div>
    </div>

    <div class="card border-0 shadow-sm">
        <div class="table-responsive">
            <table class="table table-hover align-middle mb-0">
                <thead class="table-light">
                    <tr>
                        <th class="ps-3">Reference</th>
                        <th>Company Name</th>
                        <th>Contact Person</th>
                        <th>Industry</th>
                        <th>Participants</th>
                        <th>Target Date</th>
                        <th>Location</th>
                        <th>Requirement Summary</th>
                        <th class="pe-3">Status</th>
                    </tr>
                </thead>
                <tbody>
                    <?php if (empty($corporate)): ?>
                    <tr><td colspan="9" class="text-center py-4 text-muted">No corporate requests recorded.</td></tr>
                    <?php else: ?>
                    <?php foreach ($corporate as $c): ?>
                    <tr>
                        <td class="ps-3"><span class="badge bg-light text-navy border font-monospace"><?= htmlspecialchars($c['reference_no']) ?></span></td>
                        <td><strong class="text-navy"><?= htmlspecialchars($c['company_name']) ?></strong></td>
                        <td>
                            <span class="d-block fw-semibold"><?= htmlspecialchars($c['contact_person']) ?></span>
                            <small class="text-muted"><?= htmlspecialchars($c['email']) ?> | <?= htmlspecialchars($c['phone']) ?></small>
                        </td>
                        <td><small><?= htmlspecialchars($c['industry']) ?></small></td>
                        <td class="fw-bold"><?= $c['num_participants'] ?> Pax</td>
                        <td><small><?= $c['preferred_date'] ? date('d M Y', strtotime($c['preferred_date'])) : 'Flexible' ?></small></td>
                        <td><small><?= htmlspecialchars($c['training_location']) ?></small></td>
                        <td><small class="text-muted text-truncate d-inline-block" style="max-width: 250px;"><?= htmlspecialchars($c['training_requirement']) ?></small></td>
                        <td class="pe-3"><span class="badge bg-warning-subtle text-dark"><?= htmlspecialchars($c['status']) ?></span></td>
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
