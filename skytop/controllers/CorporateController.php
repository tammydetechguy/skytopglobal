<?php
/**
 * Corporate Training Request Controller
 */

require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../config/config.php';
require_once __DIR__ . '/../includes/functions.php';

class CorporateController {
    public function handleRequest() {
        if ($_SERVER['REQUEST_METHOD'] !== 'POST') return null;

        if (!verify_csrf_token($_POST['csrf_token'] ?? '')) {
            set_flash_message('danger', 'Security validation expired. Please resubmit.');
            return false;
        }

        $company_name = sanitize_input($_POST['company_name'] ?? '');
        $contact_person = sanitize_input($_POST['contact_person'] ?? '');
        $email = filter_var($_POST['email'] ?? '', FILTER_VALIDATE_EMAIL);
        $phone = sanitize_input($_POST['phone'] ?? '');
        $industry = sanitize_input($_POST['industry'] ?? 'Oil & Gas');
        $participants = (int)($_POST['participants'] ?? 5);
        $requirement = sanitize_input($_POST['requirement'] ?? '');
        $preferred_date = sanitize_input($_POST['preferred_date'] ?? '');
        $location = sanitize_input($_POST['location'] ?? 'On-site Client Facility');
        $message = sanitize_input($_POST['message'] ?? '');

        if (empty($company_name) || empty($contact_person) || !$email || empty($phone) || empty($requirement)) {
            set_flash_message('danger', 'Please provide company name, contact person, email, phone, and training requirement.');
            return false;
        }

        $refNo = 'CORP-' . date('Y') . '-' . rand(1000, 9999);

        try {
            $db = Database::getConnection();
            $stmt = $db->prepare("INSERT INTO corporate_requests (
                reference_no, company_name, contact_person, email, phone, industry, 
                num_participants, training_requirement, preferred_date, training_location, message
            ) VALUES (
                :ref, :company, :contact, :email, :phone, :industry, 
                :num, :req, :pdate, :loc, :msg
            )");

            $stmt->execute([
                ':ref' => $refNo,
                ':company' => $company_name,
                ':contact' => $contact_person,
                ':email' => $email,
                ':phone' => $phone,
                ':industry' => $industry,
                ':num' => $participants,
                ':req' => $requirement,
                ':pdate' => !empty($preferred_date) ? $preferred_date : null,
                ':loc' => $location,
                ':msg' => $message
            ]);

            set_flash_message('success', "Corporate training request submitted successfully! Your tracking reference is {$refNo}. Our workforce solutions manager will reach out within 24 business hours.");
            return $refNo;
        } catch (Exception $e) {
            error_log("Corporate request error: " . $e->getMessage());
            set_flash_message('danger', 'Unable to submit corporate training request at this time.');
            return false;
        }
    }
}
