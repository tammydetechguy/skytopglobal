<?php
/**
 * Instructor Model
 */

require_once __DIR__ . '/../config/database.php';

class Instructor {
    public static function getAll(): array {
        $db = Database::getConnection();
        $stmt = $db->query("SELECT * FROM instructors WHERE status = 'active' ORDER BY id ASC");
        return $stmt->fetchAll();
    }
}
