<?php
/**
 * Footer Component
 */
?>
<!-- Global Pre-Footer Call to Action -->
<section class="py-5 bg-navy text-white text-center position-relative overflow-hidden">
    <div class="container position-relative z-2">
        <h2 class="display-6 fw-bold mb-3">START YOUR PROFESSIONAL DEVELOPMENT JOURNEY</h2>
        <p class="lead text-white-50 mx-auto mb-4" style="max-width: 720px;">
            Equip yourself and your team with recognized competencies in Oil & Gas, Health, Safety & Environment, and Technical Engineering operations.
        </p>
        <div class="d-flex flex-wrap justify-content-center gap-3">
            <a href="<?= SITE_URL ?>/courses.php" class="btn btn-skytop-outline px-4 py-2">
                <i class="bi bi-grid-fill me-1"></i> EXPLORE COURSES
            </a>
            <a href="<?= SITE_URL ?>/register.php" class="btn btn-skytop-orange px-4 py-2">
                <i class="bi bi-person-check-fill me-1"></i> ENROLL NOW
            </a>
            <a href="<?= SITE_URL ?>/corporate-training.php" class="btn btn-skytop-outline px-4 py-2">
                <i class="bi bi-building-check me-1"></i> REQUEST CORPORATE TRAINING
            </a>
        </div>
    </div>
</section>

<!-- Footer -->
<footer class="bg-navy-dark text-white pt-5 pb-4 border-top border-secondary border-opacity-25">
    <div class="container">
        <div class="row g-4 mb-4">
            <!-- Col 1: About -->
            <div class="col-lg-4 col-md-6">
                <div class="mb-3">
                    <img src="<?= SITE_URL ?>/assets/images/logo.png" alt="Skytop Global Services Limited" style="height: 52px; width: auto;" class="bg-white p-1 rounded shadow-sm d-inline-block">
                </div>
                <p class="text-white-50 small mb-3">
                    Skytop Global Services Limited is a premier Nigerian technical training and professional development institute. We equip individuals, contractors, and energy organizations with critical skills in Oil & Gas, HSE, and engineering competence.
                </p>
                <div class="d-flex gap-2">
                    <a href="#" class="btn btn-sm btn-outline-light rounded-circle" style="width: 34px; height: 34px; display: inline-flex; align-items: center; justify-content: center;"><i class="bi bi-linkedin"></i></a>
                    <a href="#" class="btn btn-sm btn-outline-light rounded-circle" style="width: 34px; height: 34px; display: inline-flex; align-items: center; justify-content: center;"><i class="bi bi-facebook"></i></a>
                    <a href="#" class="btn btn-sm btn-outline-light rounded-circle" style="width: 34px; height: 34px; display: inline-flex; align-items: center; justify-content: center;"><i class="bi bi-twitter-x"></i></a>
                    <a href="#" class="btn btn-sm btn-outline-light rounded-circle" style="width: 34px; height: 34px; display: inline-flex; align-items: center; justify-content: center;"><i class="bi bi-whatsapp"></i></a>
                </div>
            </div>

            <!-- Col 2: Quick Links -->
            <div class="col-lg-2 col-md-6 col-6">
                <h6 class="text-uppercase fw-bold text-warning mb-3 small tracking-wider">Quick Links</h6>
                <ul class="list-unstyled small mb-0 d-flex flex-column gap-2 text-white-50">
                    <li><a href="<?= SITE_URL ?>/index.php" class="text-white-50 text-decoration-none hover-white">Home</a></li>
                    <li><a href="<?= SITE_URL ?>/about.php" class="text-white-50 text-decoration-none hover-white">About Us</a></li>
                    <li><a href="<?= SITE_URL ?>/courses.php" class="text-white-50 text-decoration-none hover-white">Courses Catalog</a></li>
                    <li><a href="<?= SITE_URL ?>/training-calendar.php" class="text-white-50 text-decoration-none hover-white">Training Calendar</a></li>
                    <li><a href="<?= SITE_URL ?>/corporate-training.php" class="text-white-50 text-decoration-none hover-white">Corporate Training</a></li>
                    <li><a href="<?= SITE_URL ?>/faq.php" class="text-white-50 text-decoration-none hover-white">FAQ</a></li>
                    <li><a href="<?= SITE_URL ?>/contact.php" class="text-white-50 text-decoration-none hover-white">Contact Us</a></li>
                </ul>
            </div>

            <!-- Col 3: Training Tracks -->
            <div class="col-lg-3 col-md-6 col-6">
                <h6 class="text-uppercase fw-bold text-warning mb-3 small tracking-wider">Training Tracks</h6>
                <ul class="list-unstyled small mb-0 d-flex flex-column gap-2 text-white-50">
                    <li><a href="<?= SITE_URL ?>/courses.php?category=hse-safety" class="text-white-50 text-decoration-none hover-white">HSE & Safety Training</a></li>
                    <li><a href="<?= SITE_URL ?>/courses.php?category=oil-and-gas" class="text-white-50 text-decoration-none hover-white">Oil & Gas Operations</a></li>
                    <li><a href="<?= SITE_URL ?>/courses.php?category=technical-skills" class="text-white-50 text-decoration-none hover-white">Technical & Vocational Skills</a></li>
                    <li><a href="<?= SITE_URL ?>/courses.php?category=professional-development" class="text-white-50 text-decoration-none hover-white">ISO & Risk Management</a></li>
                    <li><a href="<?= SITE_URL ?>/corporate-training.php" class="text-white-50 text-decoration-none hover-white">Workforce Competency</a></li>
                </ul>
            </div>

            <!-- Col 4: Contact -->
            <div class="col-lg-3 col-md-6">
                <h6 class="text-uppercase fw-bold text-warning mb-3 small tracking-wider">Head Office</h6>
                <p class="text-white-50 small mb-2">
                    <i class="bi bi-geo-alt text-warning me-2"></i> Trans-Amadi Industrial Layout, Port Harcourt, Rivers State, Nigeria
                </p>
                <p class="text-white-50 small mb-2">
                    <i class="bi bi-telephone text-warning me-2"></i> <?= SITE_PHONE ?>
                </p>
                <p class="text-white-50 small mb-2">
                    <i class="bi bi-whatsapp text-warning me-2"></i> <?= SITE_WHATSAPP ?>
                </p>
                <p class="text-white-50 small mb-0">
                    <i class="bi bi-envelope text-warning me-2"></i> <?= ADMIN_EMAIL ?>
                </p>
            </div>
        </div>

        <hr class="border-secondary opacity-25 my-3">

        <div class="d-flex flex-column flex-md-row justify-content-between align-items-center text-white-50 small">
            <div>
                &copy; <?= date('Y') ?> Skytop Global Services Limited. All Rights Reserved.
            </div>
            <div class="d-flex gap-3 mt-2 mt-md-0">
                <a href="<?= SITE_URL ?>/admin/login.php" class="text-white-50 text-decoration-none"><i class="bi bi-lock me-1"></i> Staff Portal</a>
                <span>·</span>
                <span class="text-white-50">Port Harcourt, Nigeria</span>
            </div>
        </div>
    </div>
</footer>

<!-- Bootstrap Bundle JS -->
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
<!-- Vanilla JS -->
<script src="<?= SITE_URL ?>/assets/js/main.js"></script>
</body>
</html>
