/**
 * Skytop Global Services Limited - Vanilla JS Interactions
 */

document.addEventListener('DOMContentLoaded', function () {
    // 1. Live Client-Side Course Filtering
    const courseSearchInput = document.getElementById('courseSearchInput');
    const categoryFilterSelect = document.getElementById('categoryFilterSelect');
    const levelFilterSelect = document.getElementById('levelFilterSelect');
    const modeFilterSelect = document.getElementById('modeFilterSelect');
    const courseCards = document.querySelectorAll('.course-card-item');
    const noCoursesAlert = document.getElementById('noCoursesAlert');

    function filterCourses() {
        if (!courseCards.length) return;

        const searchTerm = courseSearchInput ? courseSearchInput.value.toLowerCase().trim() : '';
        const selectedCategory = categoryFilterSelect ? categoryFilterSelect.value : 'all';
        const selectedLevel = levelFilterSelect ? levelFilterSelect.value : 'all';
        const selectedMode = modeFilterSelect ? modeFilterSelect.value : 'all';

        let visibleCount = 0;

        courseCards.forEach(function (card) {
            const title = card.getAttribute('data-title')?.toLowerCase() || '';
            const desc = card.getAttribute('data-desc')?.toLowerCase() || '';
            const category = card.getAttribute('data-category') || '';
            const categoryName = card.getAttribute('data-category-name')?.toLowerCase() || '';
            const level = card.getAttribute('data-level') || '';
            const mode = card.getAttribute('data-mode') || '';

            const matchesSearch = !searchTerm || title.includes(searchTerm) || categoryName.includes(searchTerm) || desc.includes(searchTerm);
            const matchesCat = selectedCategory === 'all' || category === selectedCategory;
            const matchesLevel = selectedLevel === 'all' || level === selectedLevel;
            const matchesMode = selectedMode === 'all' || mode === selectedMode;

            if (matchesSearch && matchesCat && matchesLevel && matchesMode) {
                card.style.display = '';
                visibleCount++;
            } else {
                card.style.display = 'none';
            }
        });

        if (noCoursesAlert) {
            noCoursesAlert.style.display = visibleCount === 0 ? 'block' : 'none';
        }
    }

    if (courseSearchInput) courseSearchInput.addEventListener('input', filterCourses);
    if (categoryFilterSelect) categoryFilterSelect.addEventListener('change', filterCourses);
    if (levelFilterSelect) levelFilterSelect.addEventListener('change', filterCourses);
    if (modeFilterSelect) modeFilterSelect.addEventListener('change', filterCourses);

    // Filter Buttons (Pills / Tab buttons)
    const categoryPills = document.querySelectorAll('.category-filter-btn');
    categoryPills.forEach(function (btn) {
        btn.addEventListener('click', function () {
            categoryPills.forEach(b => b.classList.remove('active', 'btn-navy'));
            this.classList.add('active', 'btn-navy');
            if (categoryFilterSelect) {
                categoryFilterSelect.value = this.getAttribute('data-filter') || 'all';
                filterCourses();
            }
        });
    });

    // 2. Print Helper
    const printBtn = document.getElementById('printSlipBtn');
    if (printBtn) {
        printBtn.addEventListener('click', function () {
            window.print();
        });
    }

    // 3. Form Validation Helpers
    const forms = document.querySelectorAll('.needs-validation');
    Array.prototype.slice.call(forms).forEach(function (form) {
        form.addEventListener('submit', function (event) {
            if (!form.checkValidity()) {
                event.preventDefault();
                event.stopPropagation();
            }
            form.classList.add('was-validated');
        }, false);
    });
});
