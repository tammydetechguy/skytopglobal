<?php
/**
 * Registration Model
 */

require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../includes/functions.php';

class Registration {
    public static function create(array $data): string {
        $db = Database::getConnection();
        $registrationId = generate_registration_id();

        $stmt = $db->prepare("INSERT INTO registrations (
            registration_id, course_id, schedule_id, first_name, last_name, 
            gender, email, phone, company_name, job_title, training_mode, 
            preferred_date, residential_address, state, country, notes, status
        ) VALUES (
            :reg_id, :course_id, :schedule_id, :first_name, :last_name, 
            :gender, :email, :phone, :company_name, :job_title, :training_mode, 
            :preferred_date, :address, :state, :country, :notes, 'New'
        )");

        $stmt->execute([
            ':reg_id'         => $registrationId,
            ':course_id'      => $data['course_id'],
            ':schedule_id'    => !empty($data['schedule_id']) ? $data['schedule_id'] : null,
            ':first_name'     => $data['first_name'],
            ':last_name'      => $data['last_name'],
            ':gender'         => $data['gender'] ?? 'Male',
            ':email'          => $data['email'],
            ':phone'          => $data['phone'],
            ':company_name'   => $data['company_name'] ?? null,
            ':job_title'      => $data['job_title'] ?? null,
            ':training_mode'  => $data['training_mode'] ?? 'Classroom',
            ':preferred_date' => !empty($data['preferred_date']) ? $data['preferred_date'] : null,
            ':address'        => $data['address'] ?? null,
            ':state'          => $data['state'] ?? 'Rivers State',
            ':country'        => $data['country'] ?? 'Nigeria',
            ':notes'          => $data['notes'] ?? null
        ]);

        return $registrationId;
    }

    public static function findByRegId(string $regId): ?array {
        $db = Database::getConnection();
        $stmt = $db->prepare("SELECT r.*, c.title AS course_title, c.fee_ngn, c.duration, cat.name AS category_name 
                              FROM registrations r 
                              JOIN courses c ON r.course_id = c.id 
                              JOIN course_categories cat ON c.category_id = cat.id 
                              WHERE r.registration_id = :reg_id LIMIT 1");
        $stmt->execute([':reg_id' => $regId]);
        $res = $stmt->fetch();
        return $res ?: null;
    }

    public static function getAll(int $limit = 50): array {
        $db = Database::getConnection();
        $stmt = $db->prepare("SELECT r.*, c.title AS course_title 
                              FROM registrations r 
                              JOIN courses c ON r.course_id = c.id 
                              ORDER BY r.id DESC LIMIT :limit");
        $stmt->bindValue(':limit', $limit, PDO::PARAM_INT);
        $stmt->execute();
        return $stmt->fetchAll();
    }
}
