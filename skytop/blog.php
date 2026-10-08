<?php
$page_title = 'Industry Insights & Technical Articles | Skytop Global Services Limited';
$page_desc = 'Technical articles, safety practices, and workforce development insights from the Skytop engineering team.';

require_once __DIR__ . '/includes/header.php';
require_once __DIR__ . '/includes/navbar.php';
require_once __DIR__ . '/models/Blog.php';

$articles = Blog::getLatest(9);
?>

<div class="bg-navy text-white py-5">
    <div class="container py-3">
        <span class="badge bg-warning text-dark fw-bold mb-2 text-uppercase">Knowledge Hub</span>
        <h1 class="fw-bold display-5 mb-2">Technical Insights & Articles</h1>
        <p class="lead text-white-50 mb-0" style="max-width: 700px;">
            Expert analysis on process safety, hazard prevention, and technical workforce development.
        </p>
    </div>
</div>

<div class="container py-5">
    <div class="row g-4">
        <?php foreach ($articles as $post): ?>
        <div class="col-md-6 col-lg-4">
            <div class="card h-100 skytop-card border overflow-hidden">
                <div class="card-body p-4 d-flex flex-column">
                    <div class="d-flex justify-content-between align-items-center mb-2">
                        <span class="text-primary small fw-semibold"><?= htmlspecialchars($post['category_name']) ?></span>
                        <small class="text-muted"><?= format_date($post['published_at']) ?></small>
                    </div>
                    <h5 class="fw-bold text-navy mb-2"><?= htmlspecialchars($post['title']) ?></h5>
                    <p class="text-muted small flex-grow-1 mb-3">
                        <?= htmlspecialchars($post['excerpt']) ?>
                    </p>
                    <div class="d-flex justify-content-between align-items-center border-top pt-3">
                        <small class="text-muted"><i class="bi bi-person me-1"></i> <?= htmlspecialchars($post['author']) ?></small>
                        <a href="<?= SITE_URL ?>/blog-details.php?slug=<?= urlencode($post['slug']) ?>" class="btn btn-sm btn-link text-primary text-decoration-none fw-bold p-0">
                            Read Article <i class="bi bi-arrow-right"></i>
                        </a>
                    </div>
                </div>
            </div>
        </div>
        <?php endforeach; ?>
    </div>
</div>

<?php require_once __DIR__ . '/includes/footer.php'; ?>
