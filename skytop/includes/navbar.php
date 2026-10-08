<?php
/**
 * Navigation Bar Component
 */
$current_page = basename($_SERVER['PHP_SELF']);
?>
<!-- Top Slim Info Bar -->
<div class="skytop-topbar py-1 d-none d-md-block">
    <div class="container d-flex justify-content-between align-items-center">
        <div class="d-flex align-items-center gap-3">
            <span><i class="bi bi-geo-alt-fill text-warning me-1"></i> Port Harcourt, Rivers State, Nigeria</span>
            <span><i class="bi bi-telephone-fill text-warning me-1"></i> <?= SITE_PHONE ?></span>
            <span><i class="bi bi-envelope-fill text-warning me-1"></i> <?= ADMIN_EMAIL ?></span>
        </div>
        <div class="d-flex align-items-center gap-2">
            <span class="text-white-50">Professional Training | HSE & Safety | Oil & Gas | Technical Skills</span>
        </div>
    </div>
</div>

<!-- Main Sticky Navbar -->
<nav class="navbar navbar-expand-lg navbar-light sticky-top skytop-navbar py-2">
    <div class="container">
        <!-- Brand Logo -->
        <a class="navbar-brand d-flex align-items-center gap-2" href="<?= SITE_URL ?>/index.php">
            <img src="<?= SITE_URL ?>/assets/images/logo.png" alt="Skytop Global Services Limited" style="height: 48px; width: auto;" class="d-inline-block">
        </a>

        <!-- Mobile Toggler -->
        <button class="navbar-toggler border-0" type="button" data-bs-toggle="collapse" data-bs-target="#skytopNav" aria-controls="skytopNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>

        <!-- Nav Links -->
        <div class="collapse navbar-collapse" id="skytopNav">
            <ul class="navbar-nav ms-auto mb-2 mb-lg-0 align-items-lg-center">
                <li class="nav-item">
                    <a class="nav-link skytop-nav-link <?= ($current_page === 'index.php') ? 'active' : '' ?>" href="<?= SITE_URL ?>/index.php">Home</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link skytop-nav-link <?= ($current_page === 'about.php') ? 'active' : '' ?>" href="<?= SITE_URL ?>/about.php">About</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link skytop-nav-link <?= ($current_page === 'courses.php' || $current_page === 'course-details.php') ? 'active' : '' ?>" href="<?= SITE_URL ?>/courses.php">Training</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link skytop-nav-link <?= ($current_page === 'services.php') ? 'active' : '' ?>" href="<?= SITE_URL ?>/services.php">Services</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link skytop-nav-link <?= ($current_page === 'corporate-training.php') ? 'active' : '' ?>" href="<?= SITE_URL ?>/corporate-training.php">Corporate Training</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link skytop-nav-link <?= ($current_page === 'training-calendar.php') ? 'active' : '' ?>" href="<?= SITE_URL ?>/training-calendar.php">Calendar</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link skytop-nav-link <?= ($current_page === 'blog.php') ? 'active' : '' ?>" href="<?= SITE_URL ?>/blog.php">Insights</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link skytop-nav-link <?= ($current_page === 'contact.php') ? 'active' : '' ?>" href="<?= SITE_URL ?>/contact.php">Contact</a>
                </li>
            </ul>

            <!-- Action CTAs -->
            <div class="d-flex align-items-center gap-2 ms-lg-3 mt-3 mt-lg-0">
                <a href="<?= SITE_URL ?>/register.php" class="btn btn-skytop-orange btn-sm text-uppercase fw-bold px-3">
                    Enroll Now
                </a>
            </div>
        </div>
    </div>
</nav>

<!-- Global Flash Messages -->
<?php $flash = get_flash_message(); if ($flash): ?>
<div class="container mt-3">
    <div class="alert alert-<?= htmlspecialchars($flash['type']) ?> alert-dismissible fade show" role="alert">
        <?= htmlspecialchars($flash['message']) ?>
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>
</div>
<?php endif; ?>
