<?php
/**
 * Skytop Global Services Limited - Main Configuration
 */

if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

define('SITE_NAME', 'Skytop Global Services Limited');
define('SITE_TAGLINE', 'Building Competence. Empowering Professionals. Advancing Safety.');
define('SITE_URL', 'http://localhost/skytop');
define('ADMIN_EMAIL', 'training@skytop.ng');
define('SITE_PHONE', '+234 803 000 7890');
define('SITE_WHATSAPP', '+234 803 000 7890');
define('SITE_ADDRESS', 'Trans-Amadi Industrial Layout, Port Harcourt, Rivers State, Nigeria');

// CSRF Token Generation
if (empty($_SESSION['csrf_token'])) {
    $_SESSION['csrf_token'] = bin2hex(random_bytes(32));
}

function verify_csrf_token(?string $token): bool {
    if (empty($token) || empty($_SESSION['csrf_token'])) {
        return false;
    }
    return hash_equals($_SESSION['csrf_token'], $token);
}

function get_csrf_token(): string {
    return $_SESSION['csrf_token'] ?? '';
}
