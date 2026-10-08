<?php
/**
 * Course Controller
 */

require_once __DIR__ . '/../models/Course.php';
require_once __DIR__ . '/../includes/functions.php';

class CourseController {
    public function index() {
        $category = sanitize_input($_GET['category'] ?? '');
        $search = sanitize_input($_GET['search'] ?? '');
        $level = sanitize_input($_GET['level'] ?? '');
        $mode = sanitize_input($_GET['mode'] ?? '');

        $courses = Course::getAll($category, $search, $level, $mode);
        $categories = Course::getCategories();

        return [
            'courses' => $courses,
            'categories' => $categories,
            'active_category' => $category,
            'search' => $search,
            'level' => $level,
            'mode' => $mode
        ];
    }

    public function show(int $id) {
        $course = Course::findById($id);
        if (!$course) {
            header('Location: ' . SITE_URL . '/courses.php');
            exit;
        }
        return ['course' => $course];
    }
}
