<?php
/**
 * Training Schedule Model
 */

require_once __DIR__ . '/../config/database.php';

class Training {
    public static function getUpcoming(int $limit = 20): array {
        $db = Database::getConnection();
        $stmt = $db->prepare("SELECT s.*, c.title AS course_title, c.duration, c.fee_ngn, 
                                     cat.name AS category_name, i.full_name AS instructor_name
                              FROM training_schedules s
                              JOIN courses c ON s.course_id = c.id
                              JOIN course_categories cat ON c.category_id = cat.id
                              LEFT JOIN instructors i ON s.instructor_id = i.id
                              WHERE s.start_date >= CURDATE()
                              ORDER BY s.start_date ASC LIMIT :limit");
        $stmt->bindValue(':limit', $limit, PDO::PARAM_INT);
        $stmt->execute();
        return $stmt->fetchAll();
    }

    public static function getAll(): array {
        $db = Database::getConnection();
        $stmt = $db->query("SELECT s.*, c.title AS course_title, i.full_name AS instructor_name
                            FROM training_schedules s
                            JOIN courses c ON s.course_id = c.id
                            LEFT JOIN instructors i ON s.instructor_id = i.id
                            ORDER BY s.start_date ASC");
        return $stmt->fetchAll();
    }
}
