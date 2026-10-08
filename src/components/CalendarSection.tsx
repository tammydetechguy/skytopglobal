import React from 'react';
import { TrainingScheduleItem } from '../data/skytopData';

interface CalendarSectionProps {
  schedules: TrainingScheduleItem[];
  onEnrollSchedule: (courseId: number, scheduleId: number) => void;
  onRequestCorporate: () => void;
}

export const CalendarSection: React.FC<CalendarSectionProps> = ({
  schedules,
  onEnrollSchedule,
  onRequestCorporate,
}) => {
  return (
    <div className="container py-5">
      <div className="card border-0 shadow-sm border rounded-3 overflow-hidden">
        <div className="p-4 bg-light border-bottom d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3">
          <div>
            <h5 className="fw-bold text-navy mb-1">Scheduled Training Cohorts</h5>
            <p className="text-muted small mb-0">
              Select your preferred training date and proceed directly to enrolment.
            </p>
          </div>
          <button
            onClick={onRequestCorporate}
            className="btn btn-sm btn-outline-primary"
          >
            <i className="bi bi-calendar-plus me-1"></i> Request Custom Date for Your Team
          </button>
        </div>

        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0">
            <thead className="table-light text-navy">
              <tr>
                <th className="ps-4 py-3">Course</th>
                <th className="py-3">Start Date</th>
                <th className="py-3">End Date</th>
                <th className="py-3">Location & Mode</th>
                <th className="py-3">Instructor</th>
                <th className="py-3">Registration Deadline</th>
                <th className="py-3">Status</th>
                <th className="pe-4 py-3 text-end">Action</th>
              </tr>
            </thead>
            <tbody>
              {schedules.map((s) => (
                <tr key={s.id}>
                  <td className="ps-4">
                    <span className="fw-bold text-navy d-block">
                      {s.course_title}
                    </span>
                    <small className="text-muted">{s.duration}</small>
                  </td>
                  <td>
                    <span className="fw-semibold text-dark">
                      {new Date(s.start_date).toLocaleDateString('en-GB', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </span>
                  </td>
                  <td>
                    <span className="text-muted">
                      {new Date(s.end_date).toLocaleDateString('en-GB', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </span>
                  </td>
                  <td>
                    <span className="d-block small fw-semibold text-dark">
                      {s.location_name}
                    </span>
                    <small className="badge bg-light text-dark border">
                      {s.training_mode}
                    </small>
                  </td>
                  <td>
                    <small className="text-muted">{s.instructor_name}</small>
                  </td>
                  <td>
                    <small className="text-danger fw-semibold">
                      {new Date(s.registration_deadline).toLocaleDateString('en-GB', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </small>
                  </td>
                  <td>
                    {s.status === 'OPEN' ? (
                      <span className="badge bg-success-subtle text-success fw-bold">
                        OPEN ({s.slots_available} SLOTS)
                      </span>
                    ) : s.status === 'FEW SLOTS LEFT' ? (
                      <span className="badge bg-warning-subtle text-dark fw-bold">
                        FEW SLOTS ({s.slots_available})
                      </span>
                    ) : (
                      <span className="badge bg-secondary">{s.status}</span>
                    )}
                  </td>
                  <td className="pe-4 text-end">
                    <button
                      onClick={() => onEnrollSchedule(s.course_id, s.id)}
                      className="btn btn-sm btn-skytop-orange"
                    >
                      Register
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
