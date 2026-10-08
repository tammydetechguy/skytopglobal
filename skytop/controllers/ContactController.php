<?php
/**
 * Contact & Inquiry Controller
 */

require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../config/config.php';
require_once __DIR__ . '/../includes/functions.php';

class ContactController {
    public function handleContact() {
        if ($_SERVER['REQUEST_METHOD'] !== 'POST') return null;

        if (!verify_csrf_token($_POST['csrf_token'] ?? '')) {
            set_flash_message('danger', 'Security token invalid.');
            return false;
        }

        $full_name = sanitize_input($_POST['full_name'] ?? '');
        $email = filter_var($_POST['email'] ?? '', FILTER_VALIDATE_EMAIL);
        $phone = sanitize_input($_POST['phone'] ?? '');
        $subject = sanitize_input($_POST['subject'] ?? 'General Inquiry');
        $message = sanitize_input($_POST['message'] ?? '');

        if (empty($full_name) || !$email || empty($message)) {
            set_flash_message('danger', 'Please provide your name, valid email address, and message.');
            return false;
        }

        try {
            $db = Database::getConnection();
            $stmt = $db->prepare("INSERT INTO contact_messages (full_name, email, phone, subject, message) 
                                  VALUES (:name, :email, :phone, :subj, :msg)");
            $stmt->execute([
                ':name' => $full_name,
                ':email' => $email,
                ':phone' => $phone,
                ':subj' => $subject,
                ':msg' => $message
            ]);
            set_flash_message('success', 'Thank you! Your message has been received. Our team will contact you shortly.');
            return true;
        } catch (Exception $e) {
            error_log("Contact error: " . $e->getMessage());
            set_flash_message('danger', 'Unable to send message at this time.');
            return false;
        }
    }
}
