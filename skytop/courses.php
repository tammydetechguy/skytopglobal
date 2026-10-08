<?php
$page_title = 'Training Courses Catalog | Skytop Global Services Limited';
$page_desc = 'Explore our industry-focused Oil & Gas, HSE, Technical and Vocational training programs in Port Harcourt, Nigeria.';

require_once __DIR__ . '/includes/header.php';
require_once __DIR__ . '/includes/navbar.php';
require_once __DIR__ . '/controllers/CourseController.php';

$controller = new CourseController();
$data = $controller->index();
$courses = $data['courses'];
$categories = $data['categories'];
$active_cat = $data['active_category'];
?>

<div class="bg-navy text-white py-5">
    <div class="container py-3">
        <span class="badge bg-warning text-dark fw-bold mb-2 text-uppercase">Competency Catalog</span>
        <h1 class="fw-bold display-5 mb-2">Training Courses & Certifications</h1>
        <p class="lead text-white-50 mb-0" style="max-width: 700px;">
            Industry-focused training designed around recognized professional practices and applicable standards.
        </p>
    </div>
</div>

<div class="container py-5">
    <!-- Filter Bar -->
    <div class="bg-light p-4 rounded-3 border mb-5">
        <div class="row g-3 align-items-center">
            <div class="col-lg-4">
                <label class="form-label small fw-bold text-navy mb-1">Search Courses</label>
                <div class="input-group">
                    <span class="input-group-text bg-white"><i class="bi bi-search"></i></span>
                    <input type="text" id="courseSearchInput" class="form-control" placeholder="Search by title, keyword (e.g. HSE, Flange)..." value="<?= htmlspecialchars($data['search']) ?>">
                </div>
            </div>

            <div class="col-sm-6 col-lg-3">
                <label class="form-label small fw-bold text-navy mb-1">Category</label>
                <select id="categoryFilterSelect" class="form-select">
                    <option value="all">All Categories</option>
                    <?php foreach ($categories as $cat): ?>
                        <option value="<?= htmlspecialchars($cat['slug']) ?>" <?= ($active_cat === $cat['slug']) ? 'selected' : '' ?>>
                            <?= htmlspecialchars($cat['name']) ?>
                        </option>
                    <?php endforeach; ?>
                </select>
            </div>

            <div class="col-sm-6 col-lg-2">
                <label class="form-label small fw-bold text-navy mb-1">Level</label>
                <select id="levelFilterSelect" class="form-select">
                    <option value="all">All Levels</option>
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                    <option value="All Levels">All Levels</option>
                </select>
            </div>

            <div class="col-sm-6 col-lg-3">
                <label class="form-label small fw-bold text-navy mb-1">Training Mode</label>
                <select id="modeFilterSelect" class="form-select">
                    <option value="all">All Modes</option>
                    <option value="Classroom">Classroom</option>
                    <option value="Online">Online</option>
                    <option value="Hybrid">Hybrid</option>
                    <option value="Corporate On-site">Corporate On-site</option>
                </select>
            </div>
        </div>
    </div>

    <!-- Courses Grid -->
    <div id="noCoursesAlert" class="alert alert-info text-center py-4" style="display: none;">
        <i class="bi bi-info-circle fs-3 d-block mb-2 text-primary"></i>
        <h5>No training programs match your selected criteria</h5>
        <p class="text-muted mb-0">Try clearing your search terms or choosing a different category.</p>
    </div>

    <div class="row g-4" id="coursesGridContainer">
        <?php foreach ($courses as $c): ?>
        <div class="col-md-6 col-lg-4 course-card-item" 
             data-title="<?= htmlspecialchars($c['title']) ?>"
             data-desc="<?= htmlspecialchars($c['short_description']) ?>"
             data-category="<?= htmlspecialchars($c['category_slug']) ?>"
             data-category-name="<?= htmlspecialchars($c['category_name']) ?>"
             data-level="<?= htmlspecialchars($c['level']) ?>"
             data-mode="<?= htmlspecialchars($c['training_mode']) ?>">
            <div class="card h-100 skytop-card border overflow-hidden">
                <div class="card-body p-4 d-flex flex-column">
                    <div class="d-flex justify-content-between align-items-center mb-2">
                        <span class="text-muted small fw-semibold"><?= htmlspecialchars($c['category_name']) ?></span>
                        <span class="badge bg-light text-navy border fw-bold"><?= htmlspecialchars($c['level']) ?></span>
                    </div>
                    <h5 class="card-title fw-bold text-navy mb-2"><?= htmlspecialchars($c['title']) ?></h5>
                    <p class="card-text text-muted small flex-grow-1 mb-3">
                        <?= htmlspecialchars($c['short_description']) ?>
                    </p>
                    <div class="pt-3 border-top d-flex justify-content-between align-items-center text-muted small mb-3">
                        <span><i class="bi bi-clock me-1 text-primary"></i> <?= htmlspecialchars($c['duration']) ?></span>
                        <span><i class="bi bi-laptop me-1 text-primary"></i> <?= htmlspecialchars($c['training_mode']) ?></span>
                    </div>
                    <div class="d-flex justify-content-between align-items-center pt-2">
                        <span class="fs-5 fw-bold text-navy"><?= format_currency($c['fee_ngn']) ?></span>
                        <div class="d-flex gap-2">
                            <a href="<?= SITE_URL ?>/course-details.php?id=<?= $c['id'] ?>" class="btn btn-sm btn-outline-secondary">Details</a>
                            <a href="<?= SITE_URL ?>/register.php?course_id=<?= $c['id'] ?>" class="btn btn-sm btn-skytop-orange">Enroll</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <?php endforeach; ?>
    </div>
</div>

<?php require_once __DIR__ . '/includes/footer.php'; ?>
