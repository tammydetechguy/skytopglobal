<?php
/**
 * Helper Utility Functions for Skytop Global Services Limited
 */

function sanitize_input(?string $data): string {
    if ($data === null) return '';
    return htmlspecialchars(trim($data), ENT_QUOTES, 'UTF-8');
}

function generate_registration_id(): string {
    $year = date('Y');
    $random = strtoupper(bin2hex(random_bytes(2)));
    $num = rand(1000, 9999);
    return "SGS-{$year}-{$num}{$random}";
}

function format_currency(float $amount): string {
    return '₦' . number_format($amount, 2);
}

function format_date(string $dateString): string {
    $timestamp = strtotime($dateString);
    if (!$timestamp) return $dateString;
    return date('d M Y', $timestamp);
}

function set_flash_message(string $type, string $message): void {
    $_SESSION['flash'] = [
        'type' => $type,
        'message' => $message
    ];
}

function get_flash_message(): ?array {
    if (isset($_SESSION['flash'])) {
        $flash = $_SESSION['flash'];
        unset($_SESSION['flash']);
        return $flash;
    }
    return null;
}
