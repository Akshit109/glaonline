export type ProgramLevel = 'UG' | 'PG';

export interface Program {
  id: string;
  code: string;
  level: ProgramLevel;
  levelLabel: string;
  name: string;
  shortName: string;
  duration: string;
  semesters: number;
  semesterFee: string;
  annualFee: string;
  totalFee: string;
  registrationFee: string;
  alumniFee: string;
  examFee: string;
  specializations: string[];
  summary: string;
  eligibility: string;
  careers: string[];
  highlights: string[];
  applyUrl: string;
}

export const PROGRAMS: Program[] = [
  {
    id: 'mba',
    code: 'PG-01',
    level: 'PG',
    levelLabel: 'Postgraduate',
    name: 'Master of Business Administration',
    shortName: 'Online MBA',
    duration: '2 Years',
    semesters: 4,
    semesterFee: '₹24,250',
    annualFee: '₹48,500',
    totalFee: '₹97,000',
    registrationFee: '₹500',
    alumniFee: '₹1,800',
    examFee: '₹1,500 / semester',
    specializations: [
      'Marketing Management',
      'Financial Management',
      'Human Resource Management',
      'Business Analytics',
      'Operations Management',
      'Supply Chain Management',
      'Information Technology Management',
      'Banking & Financial Services',
    ],
    summary:
      'Designed for working professionals and graduates stepping into leadership. Combines strategic management core with eight industry-aligned specialisations.',
    eligibility:
      'Bachelor’s degree in any discipline from a recognised university. Final-year students awaiting results may also apply.',
    careers: [
      'Management Consultant',
      'Business Analytics Lead',
      'Corporate Finance Manager',
      'Product & Brand Strategist',
    ],
    highlights: [
      'UGC-DEB entitled degree with equivalence to on-campus MBA',
      'Live weekend & evening classes with full LMS session archives',
      'Case-study pedagogy developed with industry practitioners',
    ],
    applyUrl: 'https://glaonline.com/',
  },
  {
    id: 'mca',
    code: 'PG-02',
    level: 'PG',
    levelLabel: 'Postgraduate',
    name: 'Master of Computer Applications',
    shortName: 'Online MCA',
    duration: '2 Years',
    semesters: 4,
    semesterFee: '₹21,500',
    annualFee: '₹43,000',
    totalFee: '₹86,000',
    registrationFee: '₹500',
    alumniFee: '₹1,800',
    examFee: '₹1,500 / semester',
    specializations: [
      'Full-Stack Software Engineering',
      'Cloud & Distributed Systems',
      'Data Science & Analytics',
      'Enterprise Database Architecture',
    ],
    summary:
      'An advanced computing programme built around modern software architecture, cloud infrastructure, and applied algorithmic problem solving.',
    eligibility:
      'Relevant undergraduate degree (BCA, B.Sc. in Computer Science / IT, or graduation with Mathematics) as per university guidelines.',
    careers: [
      'Software Systems Engineer',
      'Cloud Solutions Architect',
      'Data & Backend Engineer',
      'Technical Lead',
    ],
    highlights: [
      'Virtual programming labs and guided project evaluations',
      'Curriculum aligned with contemporary enterprise software stacks',
      'Proctored online assessments with flexible scheduling support',
    ],
    applyUrl: 'https://glaonline.com/',
  },
  {
    id: 'bba',
    code: 'UG-01',
    level: 'UG',
    levelLabel: 'Undergraduate',
    name: 'Bachelor of Business Administration',
    shortName: 'Online BBA',
    duration: '3 Years',
    semesters: 6,
    semesterFee: '₹14,750',
    annualFee: '₹29,500',
    totalFee: '₹88,500',
    registrationFee: '₹500',
    alumniFee: '₹1,800',
    examFee: '₹1,500 / semester',
    specializations: [
      'Financial Management',
      'Human Resource Management',
      'Marketing Management',
      'Business Logistics & Supply Chain Management',
    ],
    summary:
      'Establishes a strong foundation in managerial economics, corporate operations, and commercial decision-making for aspiring business leaders.',
    eligibility:
      'Passed 10+2 (Intermediate) examination in any stream from a recognised education board.',
    careers: [
      'Business Operations Associate',
      'Marketing & Growth Executive',
      'People Operations Coordinator',
      'Supply Chain Analyst',
    ],
    highlights: [
      'Four focused specialisations starting from foundational management terms',
      'Structured self-assessment quizzes and faculty mentorship',
      'Placement cell guidance and interview readiness workshops',
    ],
    applyUrl: 'https://glaonline.com/',
  },
  {
    id: 'bca',
    code: 'UG-02',
    level: 'UG',
    levelLabel: 'Undergraduate',
    name: 'Bachelor of Computer Applications',
    shortName: 'Online BCA',
    duration: '3 Years',
    semesters: 6,
    semesterFee: '₹14,750',
    annualFee: '₹29,500',
    totalFee: '₹88,500',
    registrationFee: '₹500',
    alumniFee: '₹1,800',
    examFee: '₹1,500 / semester',
    specializations: [
      'Programming & Data Structures',
      'Web & Application Development',
      'Database Management Systems',
      'Networking & Cyber Foundations',
    ],
    summary:
      'A comprehensive three-year computing degree equipping learners with software development fluency, systems thinking, and practical coding experience.',
    eligibility:
      'Passed 10+2 examination from a recognised board (Mathematics / Computer Science criteria as per university norms).',
    careers: [
      'Junior Software Developer',
      'Web Application Engineer',
      'Database Administrator',
      'IT Systems Analyst',
    ],
    highlights: [
      'Hands-on digital labs and real-world software project submissions',
      'Live coding walkthroughs alongside downloadable e-study material',
      'Direct pathway to postgraduate computing degrees or IT roles',
    ],
    applyUrl: 'https://glaonline.com/',
  },
  {
    id: 'bcom',
    code: 'UG-03',
    level: 'UG',
    levelLabel: 'Undergraduate',
    name: 'Bachelor of Commerce (Hons.)',
    shortName: 'Online B.Com (Hons.)',
    duration: '3 Years',
    semesters: 6,
    semesterFee: '₹10,000',
    annualFee: '₹20,000',
    totalFee: '₹60,000',
    registrationFee: '₹500',
    alumniFee: '₹1,800',
    examFee: '₹1,500 / semester',
    specializations: [
      'Corporate Accounting & Auditing',
      'Financial Markets & Banking',
      'Direct & Indirect Taxation',
      'Business Law & Economics',
    ],
    summary:
      'An honours undergraduate commerce qualification built for students preparing for finance, accounting, taxation, and corporate governance careers.',
    eligibility:
      'Passed 10+2 examination preferably with Commerce or Mathematics from a recognised board.',
    careers: [
      'Audit & Taxation Associate',
      'Corporate Financial Accountant',
      'Banking Operations Officer',
      'Compliance & Risk Analyst',
    ],
    highlights: [
      'Honours-depth commerce syllabus aligned with professional accounting tracks',
      'Accessible fee structure with semester-wise or annual payment options',
      'Dedicated academic counsellors and structured exam preparation',
    ],
    applyUrl: 'https://glaonline.com/',
  },
];
