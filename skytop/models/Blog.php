<?php
/**
 * Blog Model
 */

require_once __DIR__ . '/../config/database.php';

class Blog {
    public static function getLatest(int $limit = 6): array {
        $db = Database::getConnection();
        $stmt = $db->prepare("SELECT b.*, cat.name AS category_name 
                              FROM blog_posts b
                              JOIN blog_categories cat ON b.category_id = cat.id
                              WHERE b.status = 'published'
                              ORDER BY b.published_at DESC LIMIT :limit");
        $stmt->bindValue(':limit', $limit, PDO::PARAM_INT);
        $stmt->execute();
        return $stmt->fetchAll();
    }

    public static function findBySlug(string $slug): ?array {
        $db = Database::getConnection();
        $stmt = $db->prepare("SELECT b.*, cat.name AS category_name 
                              FROM blog_posts b
                              JOIN blog_categories cat ON b.category_id = cat.id
                              WHERE b.slug = :slug AND b.status = 'published' LIMIT 1");
        $stmt->execute([':slug' => $slug]);
        $row = $stmt->fetch();
        return $row ?: null;
    }
}
