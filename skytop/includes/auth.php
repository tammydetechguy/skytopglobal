<?php
/**
 * Authentication & Access Control Handler
 */

require_once __DIR__ . '/../config/config.php';

function is_admin_logged_in(): bool {
    return isset($_SESSION['admin_id']) && !empty($_SESSION['admin_id']);
}

function require_admin_auth(): void {
    if (!is_admin_logged_in()) {
        header('Location: ' . SITE_URL . '/admin/login.php');
        exit;
    }
}

function get_current_admin(): ?array {
    if (!is_admin_logged_in()) {
        return null;
    }
    return [
        'id' => $_SESSION['admin_id'],
        'name' => $_SESSION['admin_name'] ?? 'Administrator',
        'email' => $_SESSION['admin_email'] ?? '',
        'role' => $_SESSION['admin_role'] ?? 'super_admin'
    ];
}
