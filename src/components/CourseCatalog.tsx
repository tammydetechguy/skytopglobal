import React, { useState, useMemo } from 'react';
import { CourseItem } from '../data/skytopData';

interface CourseCatalogProps {
  courses: CourseItem[];
  categories: { id: number; name: string; slug: string; icon: string }[];
  onSelectCourse: (course: CourseItem) => void;
  onEnrollCourse: (courseId: number) => void;
  initialCategory?: string;
}

export const CourseCatalog: React.FC<CourseCatalogProps> = ({
  courses,
  categories,
  onSelectCourse,
  onEnrollCourse,
  initialCategory = 'all',
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedLevel, setSelectedLevel] = useState('all');
  const [selectedMode, setSelectedMode] = useState('all');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'title'>('featured');

  // Quick popular search tags
  const popularKeywords = [
    'HSE Level 1',
    'Permit to Work',
    'Offshore',
    'Process Safety',
    'Flange Bolting',
    'First Aid & CPR',
    'Risk Assessment',
  ];

  // Calculate course counts per category
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: courses.length };
    categories.forEach((cat) => {
      counts[cat.slug] = courses.filter((c) => c.category_slug === cat.slug).length;
    });
    return counts;
  }, [courses, categories]);

  // Real-time filtering and sorting
  const filteredCourses = useMemo(() => {
    const term = searchTerm.toLowerCase().trim();

    const result = courses.filter((c) => {
      // Search matches title, category name, or short description
      const matchesSearch =
        !term ||
        c.title.toLowerCase().includes(term) ||
        c.category_name.toLowerCase().includes(term) ||
        c.short_description.toLowerCase().includes(term);

      const matchesCategory =
        selectedCategory === 'all' || c.category_slug === selectedCategory;
      const matchesLevel =
        selectedLevel === 'all' || c.level === selectedLevel;
      const matchesMode =
        selectedMode === 'all' || c.training_mode === selectedMode;

      return matchesSearch && matchesCategory && matchesLevel && matchesMode;
    });

    // Sorting
    return result.sort((a, b) => {
      if (sortBy === 'price-asc') return a.fee_ngn - b.fee_ngn;
      if (sortBy === 'price-desc') return b.fee_ngn - a.fee_ngn;
      if (sortBy === 'title') return a.title.localeCompare(b.title);
      // default: featured first, then ID
      if (a.is_featured && !b.is_featured) return -1;
      if (!a.is_featured && b.is_featured) return 1;
      return a.id - b.id;
    });
  }, [courses, searchTerm, selectedCategory, selectedLevel, selectedMode, sortBy]);

  const hasActiveFilters =
    Boolean(searchTerm) ||
    selectedCategory !== 'all' ||
    selectedLevel !== 'all' ||
    selectedMode !== 'all' ||
    sortBy !== 'featured';

  const resetAllFilters = () => {
    setSearchTerm('');
    setSelectedCategory('all');
    setSelectedLevel('all');
    setSelectedMode('all');
    setSortBy('featured');
  };

  // Helper to highlight matching text in title
  const renderHighlightedText = (text: string, highlight: string) => {
    if (!highlight.trim()) return text;
    const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
    return (
      <>
        {parts.map((part, i) =>
          part.toLowerCase() === highlight.toLowerCase() ? (
            <mark key={i} className="bg-warning-subtle text-dark px-1 rounded">
              {part}
            </mark>
          ) : (
            part
          )
        )}
      </>
    );
  };

  return (
    <div>
      {/* Search & Filter Header Container */}
      <div className="bg-white rounded-3 border shadow-sm p-4 mb-4">
        {/* Main Search Input */}
        <div className="row g-3 align-items-center mb-3">
          <div className="col-lg-6">
            <div className="position-relative">
              <span
                className="position-absolute top-50 translate-middle-y ms-3 text-muted"
                style={{ zIndex: 5 }}
              >
                <i className="bi bi-search fs-5 text-primary"></i>
              </span>
              <input
                type="text"
                className="form-control form-control-lg ps-5 pe-5 py-2 fs-6 border-2"
                placeholder="Search courses by title or category (e.g. HSE, Permit to Work, Bolting)..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ borderColor: 'rgba(8, 43, 73, 0.2)' }}
              />
              {searchTerm && (
                <button
                  type="button"
                  className="btn btn-sm btn-link text-muted position-absolute top-50 end-0 translate-middle-y me-2 text-decoration-none"
                  onClick={() => setSearchTerm('')}
                  title="Clear search"
                >
                  <i className="bi bi-x-circle-fill fs-5"></i>
                </button>
              )}
            </div>
          </div>

          <div className="col-sm-6 col-lg-3">
            <div className="input-group">
              <span className="input-group-text bg-light text-muted small">
                <i className="bi bi-folder2-open me-1"></i> Category
              </span>
              <select
                className="form-select fs-6"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="all">All Categories ({courses.length})</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.slug}>
                    {cat.name} ({categoryCounts[cat.slug] || 0})
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="col-sm-6 col-lg-3">
            <div className="input-group">
              <span className="input-group-text bg-light text-muted small">
                <i className="bi bi-sort-down me-1"></i> Sort By
              </span>
              <select
                className="form-select fs-6"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
              >
                <option value="featured">Featured First</option>
                <option value="price-asc">Fee: Low to High</option>
                <option value="price-desc">Fee: High to Low</option>
                <option value="title">Title: A to Z</option>
              </select>
            </div>
          </div>
        </div>

        {/* Secondary Filters: Level, Mode, and Category Pills */}
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 pt-3 border-top">
          {/* Category Filter Pills */}
          <div className="d-flex flex-wrap gap-2 align-items-center">
            <span className="small text-muted fw-bold d-none d-lg-inline me-1">
              Categories:
            </span>
            <button
              onClick={() => setSelectedCategory('all')}
              className={`btn btn-sm px-3 py-1.5 rounded-pill transition-all ${
                selectedCategory === 'all'
                  ? 'btn-skytop-primary shadow-sm'
                  : 'btn-outline-secondary'
              }`}
            >
              All ({categoryCounts['all']})
            </button>
            {categories.map((cat) => {
              const count = categoryCounts[cat.slug] || 0;
              const isSelected = selectedCategory === cat.slug;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.slug)}
                  className={`btn btn-sm px-3 py-1.5 rounded-pill transition-all ${
                    isSelected
                      ? 'btn-skytop-primary shadow-sm'
                      : 'btn-outline-secondary'
                  }`}
                >
                  <i className={`bi ${cat.icon} me-1`}></i>
                  {cat.name} ({count})
                </button>
              );
            })}
          </div>

          {/* Quick Selectors for Level & Delivery Mode */}
          <div className="d-flex gap-2">
            <select
              className="form-select form-select-sm"
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value)}
              style={{ width: 'auto' }}
              title="Filter by Difficulty Level"
            >
              <option value="all">Level: All</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
              <option value="All Levels">All Levels</option>
            </select>

            <select
              className="form-select form-select-sm"
              value={selectedMode}
              onChange={(e) => setSelectedMode(e.target.value)}
              style={{ width: 'auto' }}
              title="Filter by Training Delivery Mode"
            >
              <option value="all">Mode: All</option>
              <option value="Classroom">Classroom</option>
              <option value="Online">Virtual / Online</option>
              <option value="Hybrid">Hybrid</option>
              <option value="Corporate On-site">Corporate On-site</option>
            </select>
          </div>
        </div>

        {/* Quick Keyword Suggestion Tags */}
        <div className="d-flex flex-wrap align-items-center gap-2 mt-3 pt-3 border-top text-muted small">
          <span className="fw-semibold text-navy">
            <i className="bi bi-lightning-charge-fill text-warning me-1"></i> Quick Filters:
          </span>
          {popularKeywords.map((kw, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setSearchTerm(kw)}
              className={`btn btn-sm py-0 px-2 rounded border small ${
                searchTerm.toLowerCase() === kw.toLowerCase()
                  ? 'btn-primary text-white border-primary'
                  : 'btn-light text-dark'
              }`}
              style={{ fontSize: '0.78rem' }}
            >
              {kw}
            </button>
          ))}
        </div>

        {/* Active Filters Bar */}
        {hasActiveFilters && (
          <div className="d-flex flex-wrap align-items-center gap-2 mt-3 pt-3 border-top bg-light p-2 rounded">
            <span className="small text-muted fw-bold me-1">
              Active Filters:
            </span>
            {searchTerm && (
              <span className="badge bg-white text-navy border d-inline-flex align-items-center gap-1 p-2">
                Search: &ldquo;{searchTerm}&rdquo;
                <button
                  type="button"
                  className="btn-close ms-1"
                  style={{ fontSize: '0.55rem' }}
                  onClick={() => setSearchTerm('')}
                ></button>
              </span>
            )}
            {selectedCategory !== 'all' && (
              <span className="badge bg-white text-navy border d-inline-flex align-items-center gap-1 p-2">
                Category: {categories.find((c) => c.slug === selectedCategory)?.name || selectedCategory}
                <button
                  type="button"
                  className="btn-close ms-1"
                  style={{ fontSize: '0.55rem' }}
                  onClick={() => setSelectedCategory('all')}
                ></button>
              </span>
            )}
            {selectedLevel !== 'all' && (
              <span className="badge bg-white text-navy border d-inline-flex align-items-center gap-1 p-2">
                Level: {selectedLevel}
                <button
                  type="button"
                  className="btn-close ms-1"
                  style={{ fontSize: '0.55rem' }}
                  onClick={() => setSelectedLevel('all')}
                ></button>
              </span>
            )}
            {selectedMode !== 'all' && (
              <span className="badge bg-white text-navy border d-inline-flex align-items-center gap-1 p-2">
                Mode: {selectedMode}
                <button
                  type="button"
                  className="btn-close ms-1"
                  style={{ fontSize: '0.55rem' }}
                  onClick={() => setSelectedMode('all')}
                ></button>
              </span>
            )}
            <button
              onClick={resetAllFilters}
              className="btn btn-link btn-sm text-danger p-0 ms-auto text-decoration-none fw-semibold"
            >
              <i className="bi bi-trash3 me-1"></i> Clear All Filters
            </button>
          </div>
        )}
      </div>

      {/* Real-time Match Counter Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h5 className="fw-bold text-navy mb-0">
            {selectedCategory === 'all'
              ? 'All Training Programs'
              : categories.find((c) => c.slug === selectedCategory)?.name}
          </h5>
          <small className="text-muted">
            Found <strong>{filteredCourses.length}</strong> matching course{filteredCourses.length === 1 ? '' : 's'}{' '}
            {searchTerm && (
              <span>
                for &ldquo;<strong className="text-dark">{searchTerm}</strong>&rdquo;
              </span>
            )}
          </small>
        </div>

        {hasActiveFilters && (
          <button
            onClick={resetAllFilters}
            className="btn btn-outline-secondary btn-sm"
          >
            Reset Filters
          </button>
        )}
      </div>

      {/* Course Cards Grid */}
      {filteredCourses.length === 0 ? (
        <div className="card border-0 shadow-sm border rounded-3 p-5 text-center bg-white">
          <div
            className="rounded-circle bg-light d-inline-flex align-items-center justify-content-center mx-auto mb-3 text-primary"
            style={{ width: '70px', height: '70px' }}
          >
            <i className="bi bi-search fs-2"></i>
          </div>
          <h4 className="fw-bold text-navy mb-2">No courses found matching &ldquo;{searchTerm}&rdquo;</h4>
          <p className="text-muted small mx-auto mb-4" style={{ maxWidth: '480px' }}>
            We could not find any training courses that match your current search criteria. Try modifying your keywords, selecting &quot;All Categories&quot;, or request a custom corporate training syllabus.
          </p>
          <div className="d-flex justify-content-center gap-3">
            <button
              onClick={resetAllFilters}
              className="btn btn-skytop-primary px-4 py-2"
            >
              <i className="bi bi-arrow-repeat me-1"></i> Reset All Filters
            </button>
          </div>
        </div>
      ) : (
        <div className="row g-4">
          {filteredCourses.map((c) => (
            <div className="col-md-6 col-lg-4" key={c.id}>
              <div className="card h-100 skytop-card border overflow-hidden">
                <div className="card-body p-4 d-flex flex-column">
                  {/* Category and Level Badges */}
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <span className="text-muted small fw-semibold">
                      {renderHighlightedText(c.category_name, searchTerm)}
                    </span>
                    <span className="badge bg-light text-navy border fw-bold">
                      {c.level}
                    </span>
                  </div>

                  {/* Course Title */}
                  <h5 className="card-title fw-bold text-navy mb-2">
                    {renderHighlightedText(c.title, searchTerm)}
                  </h5>

                  {/* Short Description */}
                  <p className="card-text text-muted small flex-grow-1 mb-3">
                    {c.short_description}
                  </p>

                  {/* Metadata Specs */}
                  <div className="pt-3 border-top d-flex justify-content-between align-items-center text-muted small mb-3">
                    <span>
                      <i className="bi bi-clock me-1 text-primary"></i> {c.duration}
                    </span>
                    <span>
                      <i className="bi bi-laptop me-1 text-primary"></i>{' '}
                      {c.training_mode}
                    </span>
                  </div>

                  {/* Price & Action CTAs */}
                  <div className="d-flex justify-content-between align-items-center pt-2">
                    <div>
                      <span className="fs-5 fw-bold text-navy">
                        ₦{c.fee_ngn.toLocaleString()}
                      </span>
                    </div>
                    <div className="d-flex gap-2">
                      <button
                        onClick={() => onSelectCourse(c)}
                        className="btn btn-sm btn-outline-secondary"
                        title="View Detailed Syllabus"
                      >
                        Details
                      </button>
                      <button
                        onClick={() => onEnrollCourse(c.id)}
                        className="btn btn-sm btn-skytop-orange"
                        title="Enroll in this course"
                      >
                        Enroll
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
