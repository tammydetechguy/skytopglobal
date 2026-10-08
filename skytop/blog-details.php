<?php
require_once __DIR__ . '/includes/header.php';
require_once __DIR__ . '/includes/navbar.php';
require_once __DIR__ . '/models/Blog.php';

$slug = sanitize_input($_GET['slug'] ?? '');
$post = Blog::findBySlug($slug);

if (!$post) {
    header('Location: ' . SITE_URL . '/blog.php');
    exit;
}
?>

<div class="bg-navy text-white py-5">
    <div class="container py-3">
        <nav aria-label="breadcrumb">
            <ol class="breadcrumb mb-2">
                <li class="breadcrumb-item"><a href="<?= SITE_URL ?>/index.php" class="text-white-50 text-decoration-none">Home</a></li>
                <li class="breadcrumb-item"><a href="<?= SITE_URL ?>/blog.php" class="text-white-50 text-decoration-none">Insights</a></li>
                <li class="breadcrumb-item active text-warning" aria-current="page"><?= htmlspecialchars($post['title']) ?></li>
            </ol>
        </nav>
        <span class="badge bg-warning text-dark fw-bold mb-2 text-uppercase"><?= htmlspecialchars($post['category_name']) ?></span>
        <h1 class="fw-bold display-5 mb-2"><?= htmlspecialchars($post['title']) ?></h1>
        <p class="text-white-50 mb-0">By <?= htmlspecialchars($post['author']) ?> · Published <?= format_date($post['published_at']) ?></p>
    </div>
</div>

<div class="container py-5">
    <div class="row">
        <div class="col-lg-8 mx-auto">
            <div class="lead text-dark mb-4 fw-semibold">
                <?= htmlspecialchars($post['excerpt']) ?>
            </div>
            <div class="text-muted lh-lg mb-5" style="font-size: 1.1rem;">
                <?= nl2br(htmlspecialchars($post['content'])) ?>
            </div>

            <div class="p-4 bg-light rounded-3 border d-flex flex-column flex-sm-row justify-content-between align-items-center gap-3">
                <div>
                    <h6 class="fw-bold text-navy mb-0">Looking to train your workforce on this subject?</h6>
                    <small class="text-muted">Speak with our curriculum advisors today.</small>
                </div>
                <a href="<?= SITE_URL ?>/corporate-training.php" class="btn btn-skytop-orange btn-sm text-uppercase fw-bold">
                    Request Corporate Training
                </a>
            </div>
        </div>
    </div>
</div>

<?php require_once __DIR__ . '/includes/footer.php'; ?>
