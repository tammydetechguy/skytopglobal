<?php
/**
 * Registration Controller
 */

require_once __DIR__ . '/../models/Registration.php';
require_once __DIR__ . '/../models/Course.php';
require_once __DIR__ . '/../config/config.php';
require_once __DIR__ . '/../includes/functions.php';

class RegistrationController {
    public function handlePost() {
        if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
            return null;
        }

        if (!verify_csrf_token($_POST['csrf_token'] ?? '')) {
            set_flash_message('danger', 'Security validation failed (CSRF). Please resubmit.');
            return ['error' => 'CSRF verification failed'];
        }

        $course_id = (int)($_POST['course_id'] ?? 0);
        $first_name = sanitize_input($_POST['first_name'] ?? '');
        $last_name = sanitize_input($_POST['last_name'] ?? '');
        $email = filter_var($_POST['email'] ?? '', FILTER_VALIDATE_EMAIL);
        $phone = sanitize_input($_POST['phone'] ?? '');

        if (!$course_id || empty($first_name) || empty($last_name) || !$email || empty($phone)) {
            set_flash_message('danger', 'Please complete all required fields correctly.');
            return ['error' => 'Validation error'];
        }

        $data = [
            'course_id'       => $course_id,
            'schedule_id'     => !empty($_POST['schedule_id']) ? (int)$_POST['schedule_id'] : null,
            'first_name'      => $first_name,
            'last_name'       => $last_name,
            'gender'          => sanitize_input($_POST['gender'] ?? 'Male'),
            'email'           => $email,
            'phone'           => $phone,
            'company_name'    => sanitize_input($_POST['company_name'] ?? ''),
            'job_title'       => sanitize_input($_POST['job_title'] ?? ''),
            'training_mode'   => sanitize_input($_POST['training_mode'] ?? 'Classroom'),
            'preferred_date'  => sanitize_input($_POST['preferred_date'] ?? ''),
            'address'         => sanitize_input($_POST['address'] ?? ''),
            'state'           => sanitize_input($_POST['state'] ?? 'Rivers State'),
            'country'         => sanitize_input($_POST['country'] ?? 'Nigeria'),
            'notes'           => sanitize_input($_POST['notes'] ?? '')
        ];

        try {
            $regId = Registration::create($data);
            set_flash_message('success', "Registration successful! Your reference ID is {$regId}.");
            header('Location: ' . SITE_URL . "/register.php?reg_id={$regId}");
            exit;
        } catch (Exception $e) {
            error_log("Registration error: " . $e->getMessage());
            set_flash_message('danger', 'An error occurred while saving your registration. Please try again.');
            return ['error' => $e->getMessage()];
        }
    }
}
