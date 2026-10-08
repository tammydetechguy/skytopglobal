export interface CourseItem {
  id: number;
  category_id: number;
  category_name: string;
  category_slug: string;
  title: string;
  slug: string;
  short_description: string;
  overview: string;
  learning_outcomes: string[];
  target_audience: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'All Levels';
  duration: string;
  training_mode: 'Classroom' | 'Online' | 'Hybrid' | 'Corporate On-site';
  fee_ngn: number;
  is_featured: boolean;
}

export interface TrainingScheduleItem {
  id: number;
  course_id: number;
  course_title: string;
  duration: string;
  instructor_name: string;
  start_date: string;
  end_date: string;
  location_name: string;
  venue_address: string;
  training_mode: 'Classroom' | 'Online' | 'Hybrid' | 'Corporate On-site';
  capacity: number;
  slots_available: number;
  registration_deadline: string;
  status: 'OPEN' | 'FEW SLOTS LEFT' | 'FULL' | 'COMPLETED';
}

export interface RegistrationRecord {
  id: number;
  registration_id: string;
  course_id: number;
  course_title: string;
  category_name: string;
  fee_ngn: number;
  duration: string;
  schedule_id?: number;
  first_name: string;
  last_name: string;
  gender: string;
  email: string;
  phone: string;
  company_name?: string;
  job_title?: string;
  training_mode: string;
  preferred_date?: string;
  address?: string;
  state: string;
  country: string;
  notes?: string;
  payment_status: 'Pending' | 'Invoiced' | 'Confirmed';
  status: 'New' | 'Approved' | 'Completed';
  created_at: string;
}

export interface CorporateRequestRecord {
  id: number;
  reference_no: string;
  company_name: string;
  contact_person: string;
  email: string;
  phone: string;
  industry: string;
  num_participants: number;
  training_requirement: string;
  preferred_date?: string;
  training_location: string;
  message?: string;
  status: 'Pending' | 'Contacted' | 'Proposal Sent' | 'Confirmed';
  created_at: string;
}

export interface BlogPostItem {
  id: number;
  title: string;
  slug: string;
  category_name: string;
  author: string;
  excerpt: string;
  content: string;
  published_at: string;
}

export interface InstructorItem {
  id: number;
  full_name: string;
  title: string;
  specialization: string;
  bio: string;
}

export interface FAQItem {
  id: number;
  question: string;
  answer: string;
  category: string;
}

export const INITIAL_CATEGORIES = [
  { id: 1, name: 'HSE & Safety', slug: 'hse-safety', icon: 'bi-shield-check' },
  { id: 2, name: 'Oil & Gas Operations', slug: 'oil-and-gas', icon: 'bi-droplet-half' },
  { id: 3, name: 'Technical & Vocational Skills', slug: 'technical-skills', icon: 'bi-tools' },
  { id: 4, name: 'Professional & Management', slug: 'professional-development', icon: 'bi-briefcase' },
  { id: 5, name: 'Corporate Solutions', slug: 'corporate-solutions', icon: 'bi-building-check' },
];

export const INITIAL_COURSES: CourseItem[] = [
  {
    id: 1,
    category_id: 1,
    category_name: 'HSE & Safety',
    category_slug: 'hse-safety',
    title: 'Basic Occupational Health & Safety (HSE Level 1)',
    slug: 'hse-level-1',
    short_description: 'Foundational principles of workplace safety, statutory obligations, and hazard classification.',
    overview: 'This course introduces learners to statutory workplace health and safety requirements, hazard classification, personal protective equipment (PPE), and hazard communication tailored to high-risk industrial operations in Nigeria.',
    learning_outcomes: [
      'Understand core workplace safety duties and liability',
      'Identify physical, chemical, biological, and ergonomic hazards',
      'Execute prompt hazard communication and near-miss reporting',
      'Deploy appropriate personal protective equipment (PPE) per task'
    ],
    target_audience: 'Entry-level industrial workers, technicians, field operatives, safety representatives, and graduates seeking energy sector careers.',
    level: 'Beginner',
    duration: '2 Days',
    training_mode: 'Classroom',
    fee_ngn: 65000,
    is_featured: true,
  },
  {
    id: 2,
    category_id: 1,
    category_name: 'HSE & Safety',
    category_slug: 'hse-safety',
    title: 'Advanced HSE Management & Risk Assessment (HSE Level 2 & 3)',
    slug: 'advanced-hse-level-2-3',
    short_description: 'Quantitative risk profiling, hierarchy of controls, Job Safety Analysis (JSA), and safety supervisory governance.',
    overview: 'Deep dive into proactive risk assessment methodologies, Job Safety Analysis (JSA), incident prevention frameworks, and safety leadership in high-hazard operational settings across Niger Delta platforms and manufacturing facilities.',
    learning_outcomes: [
      'Construct 5x5 quantitative risk matrices and assess residual risk',
      'Facilitate pre-job safety meetings (Toolbox Talks)',
      'Formulate effective hierarchies of hazard control',
      'Lead formal workplace hazard inspections and corrective actions'
    ],
    target_audience: 'Supervisors, safety champions, engineers, line managers, and contractor team leads.',
    level: 'Intermediate',
    duration: '4 Days',
    training_mode: 'Hybrid',
    fee_ngn: 125000,
    is_featured: true,
  },
  {
    id: 3,
    category_id: 1,
    category_name: 'HSE & Safety',
    category_slug: 'hse-safety',
    title: 'Permit to Work (PTW) Systems & Isolation Management',
    slug: 'permit-to-work-systems',
    short_description: 'Procedural governance for hot work, cold work, electrical lockouts (LOTO), and confined spaces.',
    overview: 'Mastering statutory permit to work coordination, energy isolation protocols (LOTO), atmospheric gas checks, and handback validation in operating facilities.',
    learning_outcomes: [
      'Interpret PTW authorizations and identify simultaneous operations (SIMOPS)',
      'Conduct site isolation verification and mechanical lockouts',
      'Manage permit handbacks and emergency suspensions',
      'Ensure contractor compliance with facility safety cases'
    ],
    target_audience: 'Performing authorities, area authorities, safety officers, maintenance teams, and turnaround contractors.',
    level: 'Intermediate',
    duration: '3 Days',
    training_mode: 'Classroom',
    fee_ngn: 95000,
    is_featured: true,
  },
  {
    id: 4,
    category_id: 2,
    category_name: 'Oil & Gas Operations',
    category_slug: 'oil-and-gas',
    title: 'Introduction to Offshore Oil & Gas Operations',
    slug: 'offshore-oil-gas-operations',
    short_description: 'Overview of upstream exploration, drilling rigs, FPSO systems, and wellhead integrity.',
    overview: 'An industry-standard introduction to the offshore energy lifecycle, marine logistics, production manifolds, process separation flows, and environmental stewardship.',
    learning_outcomes: [
      'Map offshore production flows from wellhead to topsides',
      'Master subsea, FPSO, and platform technical terminology',
      'Identify wellsite hazards and blowout prevention basics',
      'Comprehend offshore survival and emergency muster protocols'
    ],
    target_audience: 'New industry entrants, technical graduates, procurement personnel, and offshore contractors.',
    level: 'Beginner',
    duration: '3 Days',
    training_mode: 'Classroom',
    fee_ngn: 140000,
    is_featured: true,
  },
  {
    id: 5,
    category_id: 2,
    category_name: 'Oil & Gas Operations',
    category_slug: 'oil-and-gas',
    title: 'Process Safety Management (PSM) & Hazardous Areas',
    slug: 'process-safety-management',
    short_description: 'Preventing catastrophic loss of containment, ATEX classification, and barrier integrity.',
    overview: 'In-depth focus on process safety principles, HAZOP concepts, fire and explosion mitigation, explosion-proof electrical zoning, and emergency shutdown integrity.',
    learning_outcomes: [
      'Identify major accident hazard precursors and safe operating limits',
      'Apply hazardous area zoning (Zone 0, 1, 2 / ATEX standards)',
      'Inspect safety critical elements (SCEs) and pressure relief systems',
      'Implement Swiss Cheese barrier monitoring frameworks'
    ],
    target_audience: 'Process engineers, instrumentation technicians, facility operators, and HSE coordinators.',
    level: 'Advanced',
    duration: '5 Days',
    training_mode: 'Classroom',
    fee_ngn: 185000,
    is_featured: true,
  },
  {
    id: 6,
    category_id: 3,
    category_name: 'Technical & Vocational Skills',
    category_slug: 'technical-skills',
    title: 'Industrial Flange Bolting & Pressure Joint Integrity',
    slug: 'industrial-flange-bolting-integrity',
    short_description: 'Mechanical joint integrity, torque calculation, gasket selection, and hydrostatic leak testing.',
    overview: 'Hands-on training in torque tightening, bolt tensioning, gasket inspection, and pipeline flange alignment to eliminate hydrocarbon release risks on flowlines and pressure vessels.',
    learning_outcomes: [
      'Calculate bolt torques per ANSI/ASME flange ratings',
      'Inspect joint sealing faces for pitting and alignment tolerances',
      'Operate hydraulic torquing systems and pneumatic tensioners',
      'Validate pressure testing handovers and zero-leak signoffs'
    ],
    target_audience: 'Mechanical technicians, pipefitters, turnaround contractors, maintenance crews, and QA/QC inspectors.',
    level: 'Intermediate',
    duration: '3 Days',
    training_mode: 'Classroom',
    fee_ngn: 110000,
    is_featured: true,
  },
  {
    id: 7,
    category_id: 4,
    category_name: 'Professional & Management',
    category_slug: 'professional-development',
    title: 'ISO 45001:2018 Occupational Health & Safety Systems',
    slug: 'iso-45001-systems-awareness',
    short_description: 'Implementation and internal auditing of international occupational safety management standards.',
    overview: 'Understand the High-Level Structure (HLS) of ISO 45001, leadership accountability, hazard identification frameworks, and internal auditing cycles for corporate certification readiness.',
    learning_outcomes: [
      'Interpret ISO 45001 clauses and organizational context requirements',
      'Design actionable internal compliance audit checklists',
      'Lead internal compliance reviews and stakeholder interviews',
      'Drive corrective action tracking and continuous improvement loops'
    ],
    target_audience: 'HSE managers, quality auditors, corporate directors, and compliance officers.',
    level: 'Advanced',
    duration: '4 Days',
    training_mode: 'Hybrid',
    fee_ngn: 160000,
    is_featured: false,
  },
  {
    id: 8,
    category_id: 1,
    category_name: 'HSE & Safety',
    category_slug: 'hse-safety',
    title: 'First Aid, CPR & Emergency Response Preparedness',
    slug: 'first-aid-cpr-emergency-response',
    short_description: 'Critical life-saving medical response, AED operation, and industrial trauma stabilization.',
    overview: 'Practical training in basic life support, medical emergencies, CPR resuscitation, bleeding control, burn care, and casualty evacuation under industrial constraints.',
    learning_outcomes: [
      'Demonstrate adult CPR & AED deployment per AHA protocols',
      'Stabilize fractures, burns, and traumatic bleeding',
      'Execute triage in industrial mass casualty incidents',
      'Maintain workplace emergency first aid inventory'
    ],
    target_audience: 'Safety wardens, plant workers, emergency team members, office staff, and field drivers.',
    level: 'All Levels',
    duration: '2 Days',
    training_mode: 'Classroom',
    fee_ngn: 70000,
    is_featured: true,
  }
];

export const INITIAL_SCHEDULES: TrainingScheduleItem[] = [
  {
    id: 1,
    course_id: 1,
    course_title: 'Basic Occupational Health & Safety (HSE Level 1)',
    duration: '2 Days',
    instructor_name: 'Mrs. Blessing O. Adeleke, CSP',
    start_date: '2026-11-09',
    end_date: '2026-11-10',
    location_name: 'Port Harcourt Training Centre',
    venue_address: 'Skytop Corporate Learning Hub, Trans-Amadi Industrial Layout, Port Harcourt',
    training_mode: 'Classroom',
    capacity: 25,
    slots_available: 12,
    registration_deadline: '2026-11-05',
    status: 'OPEN',
  },
  {
    id: 2,
    course_id: 2,
    course_title: 'Advanced HSE Management & Risk Assessment (HSE Level 2 & 3)',
    duration: '4 Days',
    instructor_name: 'Mrs. Blessing O. Adeleke, CSP',
    start_date: '2026-11-16',
    end_date: '2026-11-19',
    location_name: 'Port Harcourt Training Centre',
    venue_address: 'Skytop Corporate Learning Hub, Trans-Amadi Industrial Layout, Port Harcourt',
    training_mode: 'Hybrid',
    capacity: 20,
    slots_available: 6,
    registration_deadline: '2026-11-12',
    status: 'FEW SLOTS LEFT',
  },
  {
    id: 3,
    course_id: 3,
    course_title: 'Permit to Work (PTW) Systems & Isolation Management',
    duration: '3 Days',
    instructor_name: 'Engr. Tari E. Briggs',
    start_date: '2026-11-23',
    end_date: '2026-11-25',
    location_name: 'Port Harcourt Training Centre',
    venue_address: 'Skytop Corporate Learning Hub, Trans-Amadi Industrial Layout, Port Harcourt',
    training_mode: 'Classroom',
    capacity: 18,
    slots_available: 9,
    registration_deadline: '2026-11-20',
    status: 'OPEN',
  },
  {
    id: 4,
    course_id: 4,
    course_title: 'Introduction to Offshore Oil & Gas Operations',
    duration: '3 Days',
    instructor_name: 'Engr. Tari E. Briggs',
    start_date: '2026-12-01',
    end_date: '2026-12-03',
    location_name: 'Port Harcourt Training Centre',
    venue_address: 'Skytop Corporate Learning Hub, Trans-Amadi Industrial Layout, Port Harcourt',
    training_mode: 'Classroom',
    capacity: 20,
    slots_available: 15,
    registration_deadline: '2026-11-26',
    status: 'OPEN',
  },
  {
    id: 5,
    course_id: 5,
    course_title: 'Process Safety Management (PSM) & Hazardous Areas',
    duration: '5 Days',
    instructor_name: 'Engr. Tari E. Briggs',
    start_date: '2026-12-07',
    end_date: '2026-12-11',
    location_name: 'Port Harcourt Training Centre',
    venue_address: 'Skytop Corporate Learning Hub, Trans-Amadi Industrial Layout, Port Harcourt',
    training_mode: 'Classroom',
    capacity: 15,
    slots_available: 4,
    registration_deadline: '2026-12-02',
    status: 'FEW SLOTS LEFT',
  },
  {
    id: 6,
    course_id: 6,
    course_title: 'Industrial Flange Bolting & Pressure Joint Integrity',
    duration: '3 Days',
    instructor_name: 'Engr. Chidi M. Okonkwo',
    start_date: '2026-12-14',
    end_date: '2026-12-16',
    location_name: 'Port Harcourt Technical Workshop',
    venue_address: 'Skytop Technical Yard, Off Peter Odili Road, Port Harcourt',
    training_mode: 'Classroom',
    capacity: 16,
    slots_available: 8,
    registration_deadline: '2026-12-10',
    status: 'OPEN',
  }
];

export const INITIAL_REGISTRATIONS: RegistrationRecord[] = [
  {
    id: 1,
    registration_id: 'SGS-2026-00021',
    course_id: 1,
    course_title: 'Basic Occupational Health & Safety (HSE Level 1)',
    category_name: 'HSE & Safety',
    fee_ngn: 65000,
    duration: '2 Days',
    first_name: 'Emmanuel',
    last_name: 'Dike',
    gender: 'Male',
    email: 'e.dike@example.com',
    phone: '+234 803 456 7891',
    company_name: 'Delta Engineering Contractors',
    job_title: 'Field Safety Officer',
    training_mode: 'Classroom',
    preferred_date: '2026-11-09',
    address: 'Peter Odili Road, Port Harcourt',
    state: 'Rivers State',
    country: 'Nigeria',
    payment_status: 'Confirmed',
    status: 'Approved',
    created_at: '2026-10-02 09:15:00',
  },
  {
    id: 2,
    registration_id: 'SGS-2026-00022',
    course_id: 3,
    course_title: 'Permit to Work (PTW) Systems & Isolation Management',
    category_name: 'HSE & Safety',
    fee_ngn: 95000,
    duration: '3 Days',
    first_name: 'Ngozi',
    last_name: 'Amadi',
    gender: 'Female',
    email: 'ngozi.amadi@oilcorp.ng',
    phone: '+234 802 334 1122',
    company_name: 'Atlantic Offshore Logistics',
    job_title: 'Operations Coordinator',
    training_mode: 'Classroom',
    preferred_date: '2026-11-23',
    address: 'GRA Phase 2, Port Harcourt',
    state: 'Rivers State',
    country: 'Nigeria',
    payment_status: 'Invoiced',
    status: 'New',
    created_at: '2026-10-04 14:30:00',
  }
];

export const INITIAL_CORPORATE_REQUESTS: CorporateRequestRecord[] = [
  {
    id: 1,
    reference_no: 'CORP-2026-1044',
    company_name: 'Bonaventure Offshore Drilling Ltd',
    contact_person: 'Captain Danjuma Bako',
    email: 'danjuma.bako@bonaventureoffshore.com',
    phone: '+234 803 999 1234',
    industry: 'Oil & Gas Upstream',
    num_participants: 18,
    training_requirement: 'Full crew refresher on Permit to Work (PTW), Gas Testing, and Confined Space Entry prior to offshore turnaround mobilization.',
    preferred_date: '2026-11-20',
    training_location: 'On-site Client Facility (Port Harcourt Base)',
    message: 'We require customized practical drills incorporating our client permit book and lockout equipment.',
    status: 'Proposal Sent',
    created_at: '2026-10-03 11:20:00',
  }
];

export const INITIAL_INSTRUCTORS: InstructorItem[] = [
  {
    id: 1,
    full_name: 'Engr. Tari E. Briggs',
    title: 'Lead Oil & Gas Operations Specialist',
    specialization: 'Process Safety & Offshore Facilities',
    bio: 'Over 18 years of technical operations leadership across Niger Delta offshore platforms, specializing in process safety management and wellhead integrity.'
  },
  {
    id: 2,
    full_name: 'Mrs. Blessing O. Adeleke, CSP',
    title: 'Senior HSE Consultant & Auditor',
    specialization: 'Occupational Safety & ISO Systems',
    bio: 'Lead ISO 45001 auditor with extensive track record in developing enterprise safety management systems and risk assessment governance.'
  },
  {
    id: 3,
    full_name: 'Engr. Chidi M. Okonkwo',
    title: 'Technical Skills & Mechanical Facilitator',
    specialization: 'Pressure Systems & Joint Integrity',
    bio: 'Certified mechanical reliability engineer specializing in high-pressure piping, non-destructive testing, and hands-on maintenance crew upskilling.'
  }
];

export const INITIAL_BLOGS: BlogPostItem[] = [
  {
    id: 1,
    title: 'Mitigating Hydrocarbon Releases Through Strict Permit to Work Execution',
    slug: 'mitigating-hydrocarbon-releases-permit-to-work',
    category_name: 'HSE Insights',
    author: 'Skytop Technical Directorate',
    excerpt: 'Discover why procedural permit-to-work discipline and simultaneous operations (SIMOPS) coordination remain the first defense against industrial accidents.',
    content: 'A robust Permit to Work (PTW) system is not merely documentation; it is an active hazard-control barrier. High-hazard processing plants require rigorous live verification of energy isolations, atmospheric monitoring for LEL, and cross-functional signoffs before breaking containment.',
    published_at: '2026-09-15'
  },
  {
    id: 2,
    title: 'Building Technical Competence for Next-Generation Upstream Assets',
    slug: 'building-technical-competence-upstream-assets',
    category_name: 'Oil & Gas Operations',
    author: 'Engr. Tari E. Briggs',
    excerpt: 'How structured practical upskilling prepares technicians and engineers to operate modern automated wellheads and offshore production manifolds.',
    content: 'As deepwater and shallow-water assets modernize, maintenance personnel must bridge traditional mechanical troubleshooting with automated process safety protocols. Practical workshop immersion ensures technicians understand fail-safe logic.',
    published_at: '2026-09-28'
  },
  {
    id: 3,
    title: 'Why Corporate Safety Culture Outweighs Standalone Compliance',
    slug: 'corporate-safety-culture-vs-compliance',
    category_name: 'Workforce Competence',
    author: 'Mrs. Blessing O. Adeleke',
    excerpt: 'Transitioning organizations from checklist compliance into proactive safety leadership that protects lives and improves operational uptime.',
    content: 'Compliance prevents penalties, but culture protects lives. When corporate leaders empower technicians on the deck to enact "Stop Work Authority" without friction, incident frequency drops dramatically across drilling and maintenance campaigns.',
    published_at: '2026-10-02'
  }
];

export const INITIAL_FAQS: FAQItem[] = [
  {
    id: 1,
    question: 'How do I register for a training program at Skytop?',
    answer: 'You can register online by selecting your preferred course, filling out the enrolment form with your contact and employment details, and receiving your unique Skytop Registration ID (e.g. SGS-2026-XXXXX). You will receive an immediate confirmation slip with payment and venue details.',
    category: 'Registration'
  },
  {
    id: 2,
    question: 'Where are your physical training programs conducted?',
    answer: 'Our primary training facility and technical workshops are located in Trans-Amadi Industrial Layout, Port Harcourt, Rivers State, Nigeria. We also coordinate nationwide on-site corporate training at client facilities and virtual interactive learning.',
    category: 'Locations'
  },
  {
    id: 3,
    question: 'Do you offer customized corporate training for companies and contractor crews?',
    answer: 'Yes. Skytop Global Services delivers tailored workforce training designed around your operational hazards, company standard operating procedures (SOPs), and turnaround schedules.',
    category: 'Corporate'
  },
  {
    id: 4,
    question: 'Are training manuals and certificates provided upon completion?',
    answer: 'Yes. All registered participants receive comprehensive technical course handbooks, practical exercise worksheets, and an official Certificate of Completion / Competence upon meeting course attendance and assessment requirements.',
    category: 'Certificates'
  },
  {
    id: 5,
    question: 'Can our organization request weekend or evening sessions?',
    answer: 'Yes. For busy operating teams and shift workers, we offer modular weekend cohorts and hybrid learning tracks upon request.',
    category: 'Schedules'
  }
];
