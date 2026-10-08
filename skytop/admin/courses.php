<?php
require_once __DIR__ . '/../config/config.php';
require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../includes/auth.php';
require_once __DIR__ . '/../includes/functions.php';

require_admin_auth();
$db = Database::getConnection();

// Handle new course creation
$message = '';
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['action']) && $_POST['action'] === 'create_course') {
    if (verify_csrf_token($_POST['csrf_token'] ?? '')) {
        $title = sanitize_input($_POST['title'] ?? '');
        $category_id = (int)($_POST['category_id'] ?? 1);
        $short_desc = sanitize_input($_POST['short_description'] ?? '');
        $overview = sanitize_input($_POST['overview'] ?? '');
        $level = sanitize_input($_POST['level'] ?? 'Beginner');
        $duration = sanitize_input($_POST['duration'] ?? '3 Days');
        $training_mode = sanitize_input($_POST['training_mode'] ?? 'Classroom');
        $fee_ngn = (float)($_POST['fee_ngn'] ?? 0);
        $slug = strtolower(trim(preg_replace('/[^A-Za-z0-9-]+/', '-', $title))) . '-' . rand(10, 99);

        if ($title && $short_desc && $overview) {
            $stmt = $db->prepare("INSERT INTO courses (
                category_id, title, slug, short_description, overview, level, duration, training_mode, fee_ngn
            ) VALUES (
                :cat, :title, :slug, :short, :overview, :lvl, :dur, :mode, :fee
            )");
            $stmt->execute([
                ':cat'      => $category_id,
                ':title'    => $title,
                ':slug'     => $slug,
                ':short'    => $short_desc,
                ':overview' => $overview,
                ':lvl'      => $level,
                ':dur'      => $duration,
                ':mode'     => $training_mode,
                ':fee'      => $fee_ngn
            ]);
            $message = 'New course added successfully!';
        }
    }
}

// Fetch all courses
$courses = $db->query("SELECT c.*, cat.name AS category_name 
                       FROM courses c 
                       JOIN course_categories cat ON c.category_id = cat.id 
                       ORDER BY c.id DESC")->fetchAll();
$categories = $db->query("SELECT * FROM course_categories ORDER BY sort_order ASC")->fetchAll();
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Course Management | Skytop Admin</title>
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

<div class="container py-4">
    <div class="d-flex justify-content-between align-items-center mb-4">
        <div>
            <h3 class="fw-bold text-navy mb-0">Course Curriculum Management</h3>
            <small class="text-muted">Create, edit, and organize training courses across all categories.</small>
        </div>
        <button class="btn btn-skytop-orange" data-bs-toggle="modal" data-bs-target="#newCourseModal">
            <i class="bi bi-plus-circle me-1"></i> Add New Course
        </button>
    </div>

    <?php if ($message): ?>
        <div class="alert alert-success alert-dismissible fade show"><?= htmlspecialchars($message) ?></div>
    <?php endif; ?>

    <div class="card border-0 shadow-sm">
        <div class="table-responsive">
            <table class="table table-hover align-middle mb-0">
                <thead class="table-light">
                    <tr>
                        <th class="ps-3">ID</th>
                        <th>Course Title</th>
                        <th>Category</th>
                        <th>Level</th>
                        <th>Duration</th>
                        <th>Fee</th>
                        <th>Mode</th>
                        <th class="pe-3 text-end">Action</th>
                    </tr>
                </thead>
                <tbody>
                    <?php foreach ($courses as $c): ?>
                    <tr>
                        <td class="ps-3 text-muted">#<?= $c['id'] ?></td>
                        <td>
                            <strong class="text-navy"><?= htmlspecialchars($c['title']) ?></strong>
                        </td>
                        <td><span class="badge bg-light text-navy border"><?= htmlspecialchars($c['category_name']) ?></span></td>
                        <td><small><?= htmlspecialchars($c['level']) ?></small></td>
                        <td><small><?= htmlspecialchars($c['duration']) ?></small></td>
                        <td class="fw-bold"><?= format_currency($c['fee_ngn']) ?></td>
                        <td><small><?= htmlspecialchars($c['training_mode']) ?></small></td>
                        <td class="pe-3 text-end">
                            <a href="<?= SITE_URL ?>/course-details.php?id=<?= $c['id'] ?>" target="_blank" class="btn btn-sm btn-outline-secondary">
                                <i class="bi bi-eye"></i> View
                            </a>
                        </td>
                    </tr>
                    <?php endforeach; ?>
                </tbody>
            </table>
        </div>
    </div>
</div>

<!-- Modal: New Course -->
<div class="modal fade" id="newCourseModal" tabindex="-1">
    <div class="modal-dialog modal-lg">
        <form action="<?= SITE_URL ?>/admin/courses.php" method="POST" class="modal-content">
            <input type="hidden" name="action" value="create_course">
            <input type="hidden" name="csrf_token" value="<?= get_csrf_token() ?>">
            <div class="modal-header bg-navy text-white">
                <h5 class="modal-title fw-bold">Add New Training Course</h5>
                <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
            </div>
            <div class="modal-body p-4">
                <div class="mb-3">
                    <label class="form-label fw-bold small text-navy">Course Title *</label>
                    <input type="text" name="title" class="form-control" required placeholder="e.g. Scaffolding Erection & Inspection">
                </div>
                <div class="row g-3 mb-3">
                    <div class="col-md-6">
                        <label class="form-label fw-bold small text-navy">Category *</label>
                        <select name="category_id" class="form-select" required>
                            <?php foreach ($categories as $cat): ?>
                                <option value="<?= $cat['id'] ?>"><?= htmlspecialchars($cat['name']) ?></option>
                            <?php endforeach; ?>
                        </select>
                    </div>
                    <div class="col-md-6">
                        <label class="form-label fw-bold small text-navy">Level *</label>
                        <select name="level" class="form-select" required>
                            <option value="Beginner">Beginner</option>
                            <option value="Intermediate">Intermediate</option>
                            <option value="Advanced">Advanced</option>
                            <option value="All Levels">All Levels</option>
                        </select>
                    </div>
                </div>
                <div class="row g-3 mb-3">
                    <div class="col-md-4">
                        <label class="form-label fw-bold small text-navy">Duration *</label>
                        <input type="text" name="duration" class="form-control" placeholder="e.g. 3 Days" required>
                    </div>
                    <div class="col-md-4">
                        <label class="form-label fw-bold small text-navy">Training Mode *</label>
                        <select name="training_mode" class="form-select" required>
                            <option value="Classroom">Classroom</option>
                            <option value="Online">Online</option>
                            <option value="Hybrid">Hybrid</option>
                            <option value="Corporate On-site">Corporate On-site</option>
                        </select>
                    </div>
                    <div class="col-md-4">
                        <label class="form-label fw-bold small text-navy">Fee (NGN) *</label>
                        <input type="number" step="0.01" name="fee_ngn" class="form-control" placeholder="95000" required>
                    </div>
                </div>
                <div class="mb-3">
                    <label class="form-label fw-bold small text-navy">Short Description *</label>
                    <textarea name="short_description" class="form-control" rows="2" required placeholder="Brief summary for card display..."></textarea>
                </div>
                <div class="mb-3">
                    <label class="form-label fw-bold small text-navy">Full Curriculum Overview *</label>
                    <textarea name="overview" class="form-control" rows="4" required placeholder="Detailed course outline and methodology..."></textarea>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                <button type="submit" class="btn btn-skytop-orange">Save Course</button>
            </div>
        </form>
    </div>
</div>

<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
