<?php
/**
 * Course Model
 */

require_once __DIR__ . '/../config/database.php';

class Course {
    public static function getAll(string $categorySlug = '', string $search = '', string $level = '', string $mode = ''): array {
        $db = Database::getConnection();
        $query = "SELECT c.*, cat.name AS category_name, cat.slug AS category_slug 
                  FROM courses c 
                  JOIN course_categories cat ON c.category_id = cat.id 
                  WHERE c.status = 'active'";
        $params = [];

        if (!empty($categorySlug) && $categorySlug !== 'all') {
            $query .= " AND cat.slug = :category_slug";
            $params[':category_slug'] = $categorySlug;
        }

        if (!empty($search)) {
            $query .= " AND (c.title LIKE :search OR c.short_description LIKE :search)";
            $params[':search'] = '%' . $search . '%';
        }

        if (!empty($level) && $level !== 'all') {
            $query .= " AND c.level = :level";
            $params[':level'] = $level;
        }

        if (!empty($mode) && $mode !== 'all') {
            $query .= " AND c.training_mode = :mode";
            $params[':mode'] = $mode;
        }

        $query .= " ORDER BY c.is_featured DESC, c.id DESC";

        $stmt = $db->prepare($query);
        $stmt->execute($params);
        return $stmt->fetchAll();
    }

    public static function getFeatured(int $limit = 6): array {
        $db = Database::getConnection();
        $stmt = $db->prepare("SELECT c.*, cat.name AS category_name, cat.slug AS category_slug 
                              FROM courses c 
                              JOIN course_categories cat ON c.category_id = cat.id 
                              WHERE c.status = 'active' AND c.is_featured = 1 
                              ORDER BY c.id ASC LIMIT :limit");
        $stmt->bindValue(':limit', $limit, PDO::PARAM_INT);
        $stmt->execute();
        return $stmt->fetchAll();
    }

    public static function findById(int $id): ?array {
        $db = Database::getConnection();
        $stmt = $db->prepare("SELECT c.*, cat.name AS category_name, cat.slug AS category_slug 
                              FROM courses c 
                              JOIN course_categories cat ON c.category_id = cat.id 
                              WHERE c.id = :id LIMIT 1");
        $stmt->execute([':id' => $id]);
        $result = $stmt->fetch();
        return $result ?: null;
    }

    public static function getCategories(): array {
        $db = Database::getConnection();
        $stmt = $db->query("SELECT * FROM course_categories WHERE status = 'active' ORDER BY sort_order ASC");
        return $stmt->fetchAll();
    }
}
