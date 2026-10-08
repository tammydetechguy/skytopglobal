import React from 'react';
import { CourseItem } from '../data/skytopData';

interface CourseDetailsModalProps {
  course: CourseItem | null;
  onClose: () => void;
  onEnroll: (courseId: number) => void;
  onRequestCorporate: () => void;
}

export const CourseDetailsModal: React.FC<CourseDetailsModalProps> = ({
  course,
  onClose,
  onEnroll,
  onRequestCorporate,
}) => {
  if (!course) return null;

  return (
    <div
      className="modal fade show d-block"
      tabIndex={-1}
      style={{ backgroundColor: 'rgba(5, 26, 45, 0.7)' }}
    >
      <div className="modal-dialog modal-lg modal-dialog-scrollable">
        <div className="modal-content border-0 shadow-lg">
          <div className="modal-header bg-navy text-white">
            <div>
              <span className="badge bg-warning text-dark fw-bold mb-1">
                {course.category_name}
              </span>
              <h5 className="modal-title fw-bold text-white">{course.title}</h5>
            </div>
            <button
              type="button"
              className="btn-close btn-close-white"
              onClick={onClose}
            ></button>
          </div>

          <div className="modal-body p-4">
            <div className="row g-4 mb-4">
              <div className="col-sm-6 col-md-3">
                <div className="p-3 bg-light rounded border text-center">
                  <small className="text-muted d-block">Tuition Fee</small>
                  <strong className="text-navy fs-5">
                    ₦{course.fee_ngn.toLocaleString()}
                  </strong>
                </div>
              </div>
              <div className="col-sm-6 col-md-3">
                <div className="p-3 bg-light rounded border text-center">
                  <small className="text-muted d-block">Duration</small>
                  <strong className="text-navy fs-6">{course.duration}</strong>
                </div>
              </div>
              <div className="col-sm-6 col-md-3">
                <div className="p-3 bg-light rounded border text-center">
                  <small className="text-muted d-block">Level</small>
                  <strong className="text-navy fs-6">{course.level}</strong>
                </div>
              </div>
              <div className="col-sm-6 col-md-3">
                <div className="p-3 bg-light rounded border text-center">
                  <small className="text-muted d-block">Mode</small>
                  <strong className="text-navy fs-6">{course.training_mode}</strong>
                </div>
              </div>
            </div>

            <div className="mb-4">
              <h6 className="fw-bold text-navy mb-2">Curriculum Overview</h6>
              <p className="text-muted lh-base">{course.overview}</p>
            </div>

            {course.learning_outcomes && course.learning_outcomes.length > 0 && (
              <div className="mb-4">
                <h6 className="fw-bold text-navy mb-2">Key Competencies & Outcomes</h6>
                <div className="bg-light p-3 rounded border">
                  <ul className="list-unstyled mb-0 d-flex flex-column gap-2 small">
                    {course.learning_outcomes.map((outcome, idx) => (
                      <li key={idx} className="d-flex align-items-start gap-2">
                        <i className="bi bi-check-circle-fill text-success mt-0.5"></i>
                        <span>{outcome}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {course.target_audience && (
              <div className="mb-4">
                <h6 className="fw-bold text-navy mb-2">Target Audience</h6>
                <p className="text-muted small">{course.target_audience}</p>
              </div>
            )}

            <div className="alert alert-light border small text-muted mb-0">
              <i className="bi bi-shield-check text-primary me-2"></i>
              <strong>Industry Practice Standard:</strong> Industry-focused training designed around recognized professional practices and applicable standards in Port Harcourt and across Nigeria.
            </div>
          </div>

          <div className="modal-footer bg-light">
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={onClose}
            >
              Close
            </button>
            <button
              type="button"
              className="btn btn-outline-primary"
              onClick={() => {
                onClose();
                onRequestCorporate();
              }}
            >
              Corporate Quote
            </button>
            <button
              type="button"
              className="btn btn-skytop-orange fw-bold"
              onClick={() => {
                onClose();
                onEnroll(course.id);
              }}
            >
              Enroll Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
