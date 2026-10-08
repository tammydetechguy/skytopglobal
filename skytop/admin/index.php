<?php
require_once __DIR__ . '/../config/config.php';
require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../includes/auth.php';
require_once __DIR__ . '/../includes/functions.php';

require_admin_auth();
$current_admin = get_current_admin();

$db = Database::getConnection();

// Metrics
$total_courses = $db->query("SELECT COUNT(*) FROM courses WHERE status = 'active'")->fetchColumn();
$total_schedules = $db->query("SELECT COUNT(*) FROM training_schedules WHERE status != 'COMPLETED'")->fetchColumn();
$total_registrations = $db->query("SELECT COUNT(*) FROM registrations")->fetchColumn();
$total_corporate = $db->query("SELECT COUNT(*) FROM corporate_requests")->fetchColumn();

// Recent Registrations
$recent_regs = $db->query("SELECT r.*, c.title AS course_title 
                           FROM registrations r 
                           JOIN courses c ON r.course_id = c.id 
                           ORDER BY r.id DESC LIMIT 5")->fetchAll();

// Recent Corporate Requests
$recent_corp = $db->query("SELECT * FROM corporate_requests ORDER BY id DESC LIMIT 5")->fetchAll();
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dashboard | Skytop Admin</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">
    <link rel="stylesheet" href="<?= SITE_URL ?>/assets/css/style.css">
</head>
<body class="bg-light">

<!-- Admin Nav -->
<nav class="navbar navbar-dark bg-navy sticky-top px-3 shadow-sm">
    <a class="navbar-brand d-flex align-items-center gap-2" href="<?= SITE_URL ?>/admin/index.php">
        <img src="<?= SITE_URL ?>/assets/images/logo.png" alt="Skytop Logo" style="height: 38px; width: auto;" class="bg-white p-1 rounded d-inline-block">
        <span class="fw-bold tracking-tight ms-1">SKYTOP ADMIN</span>
    </a>
    <div class="d-flex align-items-center gap-3">
        <span class="text-white-50 small d-none d-md-inline">Signed in as <strong><?= htmlspecialchars($current_admin['name']) ?></strong></span>
        <a href="<?= SITE_URL ?>/index.php" target="_blank" class="btn btn-sm btn-outline-light">
            <i class="bi bi-box-arrow-up-right me-1"></i> Public Site
        </a>
        <a href="<?= SITE_URL ?>/admin/logout.php" class="btn btn-sm btn-danger">
            <i class="bi bi-box-arrow-right me-1"></i> Sign Out
        </a>
    </div>
</nav>

<div class="container-fluid py-4">
    <div class="row">
        <!-- Sidebar -->
        <div class="col-lg-2 mb-4">
            <div class="list-group shadow-sm border-0">
                <a href="<?= SITE_URL ?>/admin/index.php" class="list-group-item list-group-item-action active bg-navy border-0">
                    <i class="bi bi-speedometer2 me-2 text-warning"></i> Dashboard
                </a>
                <a href="<?= SITE_URL ?>/admin/courses.php" class="list-group-item list-group-item-action">
                    <i class="bi bi-journal-bookmark me-2 text-primary"></i> Courses (<?= $total_courses ?>)
                </a>
                <a href="<?= SITE_URL ?>/admin/registrations.php" class="list-group-item list-group-item-action">
                    <i class="bi bi-people me-2 text-success"></i> Registrations (<?= $total_registrations ?>)
                </a>
                <a href="<?= SITE_URL ?>/admin/corporate.php" class="list-group-item list-group-item-action">
                    <i class="bi bi-building me-2 text-warning"></i> Corporate Requests (<?= $total_corporate ?>)
                </a>
            </div>
        </div>

        <!-- Main Content -->
        <div class="col-lg-10">
            <!-- Metric Cards -->
            <div class="row g-3 mb-4">
                <div class="col-sm-6 col-xl-3">
                    <div class="card border-0 shadow-sm p-3 border-start border-4 border-primary">
                        <small class="text-muted fw-bold text-uppercase">Active Courses</small>
                        <h2 class="fw-bold text-navy mb-0"><?= $total_courses ?></h2>
                    </div>
                </div>
                <div class="col-sm-6 col-xl-3">
                    <div class="card border-0 shadow-sm p-3 border-start border-4 border-warning">
                        <small class="text-muted fw-bold text-uppercase">Active Cohorts</small>
                        <h2 class="fw-bold text-navy mb-0"><?= $total_schedules ?></h2>
                    </div>
                </div>
                <div class="col-sm-6 col-xl-3">
                    <div class="card border-0 shadow-sm p-3 border-start border-4 border-success">
                        <small class="text-muted fw-bold text-uppercase">Candidate Registrations</small>
                        <h2 class="fw-bold text-navy mb-0"><?= $total_registrations ?></h2>
                    </div>
                </div>
                <div class="col-sm-6 col-xl-3">
                    <div class="card border-0 shadow-sm p-3 border-start border-4 border-info">
                        <small class="text-muted fw-bold text-uppercase">Corporate Requests</small>
                        <h2 class="fw-bold text-navy mb-0"><?= $total_corporate ?></h2>
                    </div>
                </div>
            </div>

            <!-- Recent Registrations -->
            <div class="card border-0 shadow-sm mb-4">
                <div class="card-header bg-white py-3 d-flex justify-content-between align-items-center">
                    <h5 class="fw-bold text-navy mb-0">Recent Candidate Registrations</h5>
                    <a href="<?= SITE_URL ?>/admin/registrations.php" class="btn btn-sm btn-link text-decoration-none">View All</a>
                </div>
                <div class="table-responsive">
                    <table class="table table-hover align-middle mb-0">
                        <thead class="table-light small">
                            <tr>
                                <th>Registration ID</th>
                                <th>Candidate Name</th>
                                <th>Course</th>
                                <th>Mode</th>
                                <th>Phone</th>
                                <th>Date</th>
                                <th class="text-end">Slip</th>
                            </tr>
                        </thead>
                        <tbody>
                            <?php if (empty($recent_regs)): ?>
                            <tr><td colspan="7" class="text-center py-4 text-muted">No student registrations recorded yet.</td></tr>
                            <?php else: ?>
                            <?php foreach ($recent_regs as $r): ?>
                            <tr>
                                <td><span class="badge bg-light text-navy border font-monospace"><?= htmlspecialchars($r['registration_id']) ?></span></td>
                                <td class="fw-bold text-dark"><?= htmlspecialchars($r['first_name'] . ' ' . $r['last_name']) ?></td>
                                <td class="small"><?= htmlspecialchars($r['course_title']) ?></td>
                                <td><span class="badge bg-light text-muted border"><?= htmlspecialchars($r['training_mode']) ?></span></td>
                                <td class="small"><?= htmlspecialchars($r['phone']) ?></td>
                                <td class="small text-muted"><?= date('d M Y', strtotime($r['created_at'])) ?></td>
                                <td class="text-end">
                                    <a href="<?= SITE_URL ?>/register.php?reg_id=<?= $r['registration_id'] ?>" target="_blank" class="btn btn-sm btn-outline-primary">
                                        <i class="bi bi-printer"></i>
                                    </a>
                                </td>
                            </tr>
                            <?php endforeach; ?>
                            <?php endif; ?>
                        </tbody>
                    </table>
                </div>
            </div>

            <!-- Recent Corporate Inquiries -->
            <div class="card border-0 shadow-sm">
                <div class="card-header bg-white py-3 d-flex justify-content-between align-items-center">
                    <h5 class="fw-bold text-navy mb-0">Recent Corporate Training Inquiries</h5>
                    <a href="<?= SITE_URL ?>/admin/corporate.php" class="btn btn-sm btn-link text-decoration-none">View All</a>
                </div>
                <div class="table-responsive">
                    <table class="table table-hover align-middle mb-0">
                        <thead class="table-light small">
                            <tr>
                                <th>Reference</th>
                                <th>Company</th>
                                <th>Contact Person</th>
                                <th>Industry</th>
                                <th>Participants</th>
                                <th>Location</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            <?php if (empty($recent_corp)): ?>
                            <tr><td colspan="7" class="text-center py-4 text-muted">No corporate requests received yet.</td></tr>
                            <?php else: ?>
                            <?php foreach ($recent_corp as $c): ?>
                            <tr>
                                <td><span class="badge bg-light text-navy border font-monospace"><?= htmlspecialchars($c['reference_no']) ?></span></td>
                                <td class="fw-bold text-dark"><?= htmlspecialchars($c['company_name']) ?></td>
                                <td class="small"><?= htmlspecialchars($c['contact_person']) ?> (<?= htmlspecialchars($c['phone']) ?>)</td>
                                <td class="small"><?= htmlspecialchars($c['industry']) ?></td>
                                <td class="fw-bold"><?= $c['num_participants'] ?> Pax</td>
                                <td class="small"><?= htmlspecialchars($c['training_location']) ?></td>
                                <td><span class="badge bg-warning-subtle text-dark"><?= htmlspecialchars($c['status']) ?></span></td>
                            </tr>
                            <?php endforeach; ?>
                            <?php endif; ?>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</div>

</body>
</html>
