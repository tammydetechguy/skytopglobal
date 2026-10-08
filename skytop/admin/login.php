<?php
require_once __DIR__ . '/../config/config.php';
require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../includes/functions.php';

$error = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (!verify_csrf_token($_POST['csrf_token'] ?? '')) {
        $error = 'Security validation failed.';
    } else {
        $email = filter_var($_POST['email'] ?? '', FILTER_VALIDATE_EMAIL);
        $password = $_POST['password'] ?? '';

        if ($email && $password) {
            $db = Database::getConnection();
            $stmt = $db->prepare("SELECT * FROM admins WHERE email = :email AND status = 'active' LIMIT 1");
            $stmt->execute([':email' => $email]);
            $admin = $stmt->fetch();

            // Check password hash or fallback default check for seed account
            if ($admin && (password_verify($password, $admin['password_hash']) || ($password === 'Admin@Skytop2026!' && $email === 'admin@skytop.ng'))) {
                $_SESSION['admin_id'] = $admin['id'];
                $_SESSION['admin_name'] = $admin['full_name'];
                $_SESSION['admin_email'] = $admin['email'];
                $_SESSION['admin_role'] = $admin['role'];

                header('Location: ' . SITE_URL . '/admin/index.php');
                exit;
            } else {
                $error = 'Invalid email address or password.';
            }
        } else {
            $error = 'Please fill in all fields.';
        }
    }
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Staff Portal Login | Skytop Global Services Limited</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">
    <link rel="stylesheet" href="<?= SITE_URL ?>/assets/css/style.css">
</head>
<body class="bg-light d-flex align-items-center justify-content-center min-vh-100">

<div class="container" style="max-width: 440px;">
    <div class="card border-0 shadow-lg rounded-3 overflow-hidden">
        <div class="bg-navy p-4 text-center text-white">
            <img src="<?= SITE_URL ?>/assets/images/logo.png" alt="Skytop Global Services Limited" style="height: 70px; width: auto;" class="bg-white p-2 rounded shadow-sm mb-2 d-inline-block">
            <small class="text-white-50 text-uppercase fw-semibold d-block" style="letter-spacing: 0.1em;">Administrative Portal</small>
        </div>
        <div class="p-4 p-md-5 bg-white">
            <?php if ($error): ?>
                <div class="alert alert-danger small py-2"><?= htmlspecialchars($error) ?></div>
            <?php endif; ?>

            <form action="<?= SITE_URL ?>/admin/login.php" method="POST">
                <input type="hidden" name="csrf_token" value="<?= get_csrf_token() ?>">

                <div class="mb-3">
                    <label class="form-label small fw-bold text-navy">Admin Email</label>
                    <input type="email" name="email" class="form-control" value="admin@skytop.ng" required autofocus>
                </div>

                <div class="mb-4">
                    <label class="form-label small fw-bold text-navy">Password</label>
                    <input type="password" name="password" class="form-control" placeholder="••••••••" required>
                    <small class="text-muted d-block mt-1">Default demo: <code>Admin@Skytop2026!</code></small>
                </div>

                <button type="submit" class="btn btn-skytop-orange w-100 py-2 fw-bold text-uppercase">
                    <i class="bi bi-box-arrow-in-right me-1"></i> Sign In to Portal
                </button>

                <div class="text-center mt-3">
                    <a href="<?= SITE_URL ?>/index.php" class="text-muted small text-decoration-none">← Return to Public Website</a>
                </div>
            </form>
        </div>
    </div>
</div>

</body>
</html>
