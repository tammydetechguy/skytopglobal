================================================================================
SKYTOP GLOBAL SERVICES LIMITED - DEPLOYMENT & INSTALLATION GUIDE
================================================================================
Product: Corporate Oil & Gas, HSE & Technical Training Platform
Architecture: PHP 8+ (PDO), MySQL 8.0 / MariaDB 10.4+, Bootstrap 5.3, Vanilla JS
Default Port / Host: http://localhost/skytop
Admin Portal: http://localhost/skytop/admin/login.php
Default Admin Credentials:
  - Email: admin@skytop.ng
  - Password: Admin@Skytop2026!

--------------------------------------------------------------------------------
1. LOCAL INSTALLATION ON XAMPP / WAMP / LARAGON
--------------------------------------------------------------------------------
STEP 1: Extract Files
  - Extract the contents of this package into your web server's document root:
    * For XAMPP: C:\xampp\htdocs\skytop\
    * For WAMP:  C:\wamp64\www\skytop\
    * For Laragon: C:\laragon\www\skytop\

STEP 2: Create MySQL Database
  - Open phpMyAdmin in your browser (usually http://localhost/phpmyadmin).
  - Create a new database named: `skytop_db`
  - Collation: `utf8mb4_unicode_ci`

STEP 3: Import the SQL Schema
  - Inside phpMyAdmin, select `skytop_db` and navigate to the "Import" tab.
  - Choose the file: `database/skytop.sql`
  - Click "Import" or "Go" at the bottom to execute the migration and seed data.

STEP 4: Database Configuration
  - Open `config/database.php` in a text editor.
  - Verify your credentials:
      define('DB_HOST', 'localhost');
      define('DB_NAME', 'skytop_db');
      define('DB_USER', 'root');
      define('DB_PASS', ''); // default is empty in XAMPP
  - If your local MySQL setup has a root password, insert it here.

STEP 5: Launch Application
  - Open your browser and navigate to:
      http://localhost/skytop/
  - Access Admin Portal:
      http://localhost/skytop/admin/login.php

--------------------------------------------------------------------------------
2. LIVE CPANEL / SHARED HOSTING DEPLOYMENT
--------------------------------------------------------------------------------
1. Compress all files in the root folder into a ZIP file and upload to:
   public_html (or your subdomain directory) using cPanel File Manager.
2. In cPanel, go to "MySQL Databases":
   - Create a new database (e.g., `user_skytop_db`)
   - Create a new database user and assign ALL PRIVILEGES to the database.
3. Open "phpMyAdmin" in cPanel, select the new database, and import `database/skytop.sql`.
4. Update `config/database.php` with the database name, user, and password generated in cPanel.
5. In `config/config.php`, update `SITE_URL` to match your domain (e.g. `https://skytop.ng`).

--------------------------------------------------------------------------------
3. FEATURES INCLUDED IN THIS BUILD
--------------------------------------------------------------------------------
- Corporate Homepage with oil & gas hero visual hierarchy and value proposition
- 100% Client-Side Live Course Search & Filtering without page reload
- Course Catalog & Details with transparent pricing and syllabi
- Candidate Registration System with auto-generated registration ID (e.g. SGS-2026-XXXXX)
- Official Printable Registration Slip with company letterhead and venue reporting notes
- Corporate Training Request Portal storing inbound inquiries in MySQL
- Training Calendar with cohort statuses (OPEN, FEW SLOTS, FULL)
- Technical Knowledge Base / Blog with article reader
- Accordion-based FAQ and Interactive Contact Page
- Secure Administrative Dashboard with authentication and course/registration/corporate managers

================================================================================
Skytop Global Services Limited • Port Harcourt, Rivers State, Nigeria
"Building Competence. Empowering Professionals. Advancing Safety."
================================================================================
