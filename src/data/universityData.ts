export interface UniversityStat {
  id: string;
  value: string;
  numericTarget?: number;
  suffix?: string;
  label: string;
  category: string;
  description: string;
}

export interface LearningFeature {
  id: string;
  step: string;
  title: string;
  subtitle: string;
  description: string;
  lmsModuleTitle: string;
  lmsMetricLabel: string;
  lmsMetricValue: string;
  lmsDetails: string[];
}

export interface CareerBenefit {
  id: string;
  number: string;
  title: string;
  description: string;
}

export interface TestimonialItem {
  id: string;
  quote: string;
  name: string;
  program: string;
  role: string;
  location: string;
  outcome: string;
  image: string;
  isSampleProfile: boolean;
}

export interface AdmissionStep {
  number: string;
  title: string;
  description: string;
  detail: string;
}

export interface FAQItem {
  id: string;
  category: string;
  question: string;
  answer: string;
}

export const HERO_MEDIA = '/src/assets/images/image.png';
export const LEARNING_MEDIA = '/src/assets/images/learning_experience_studio_1795249767002.jpg';
export const CAREER_MEDIA = '/src/assets/images/career_mentorship_editorial_1795249768197.jpg';
export const CAMPUS_MEDIA = '/src/assets/images/campus_gla_architecture_1795249766869.jpg';

export const RECOGNITION_BADGES = [
  { label: 'Academic Legacy', value: '28 Years' },
  { label: '5-Yr Avg Placement', value: '86%' },
  { label: 'NAAC Institutional Grade', value: 'A+ (3.46)' },
  { label: 'Statutory Approval', value: 'UGC-DEB · WES' },
];

export const FEE_CONCESSIONS = [
  { id: 'standard', label: 'Standard Tuition', discountPercent: 0, note: 'Regular 2026 intake schedule' },
  { id: 'sibling', label: 'Sibling Grant (20% Off)', discountPercent: 20, note: 'Verified GLA sibling fee benefit' },
  { id: 'alumni', label: 'Alumni Grant (40% Off)', discountPercent: 40, note: 'Verified GLA University alumni benefit' },
] as const;

export const UNIVERSITY_STATS: UniversityStat[] = [
  {
    id: 'legacy',
    value: '28',
    numericTarget: 28,
    suffix: ' Yrs',
    label: 'Years of Academic Legacy',
    category: 'Institutional Heritage',
    description:
      'Built on nearly three decades of academic excellence across GLA University’s Mathura and Greater Noida campuses—now engineered for digital delivery.',
  },
  {
    id: 'placement',
    value: '86%',
    numericTarget: 86,
    suffix: '%',
    label: '5-Year Average Placement Rate',
    category: 'Career Outcomes',
    description:
      'Consistent multi-year placement performance driven by industry-calibrated curricula and GLA University’s central corporate relations network.',
  },
  {
    id: 'alumni',
    value: '46,000+',
    numericTarget: 46000,
    suffix: '+',
    label: 'Global GLAdiators Network',
    category: 'Global Footprint',
    description:
      'A worldwide network of graduates contributing across global technology enterprises, high-growth startups, public institutions, and research labs.',
  },
  {
    id: 'partners',
    value: '3,000+',
    numericTarget: 3000,
    suffix: '+',
    label: 'Corporate Hiring Partners',
    category: 'Industry Ecosystem',
    description:
      'Direct recruiting partnerships across IT services, fintech, management consulting, banking, and digital commerce.',
  },
];

export const GLOBAL_HUBS = [
  { region: 'India & South Asia', focus: 'Tech Hubs, BFSI & Consulting' },
  { region: 'North America', focus: 'Cloud Engineering & Analytics' },
  { region: 'Europe & UK', focus: 'Enterprise IT & Finance' },
  { region: 'Middle East & APAC', focus: 'Operations, Supply Chain & FinTech' },
];

export const LEARNING_FEATURES: LearningFeature[] = [
  {
    id: 'anywhere',
    step: '01',
    title: 'Learn from anywhere',
    subtitle: 'Campus rigour without relocation',
    description:
      'Access your complete degree curriculum across desktop, tablet, or mobile via the dedicated GLA Online Learning Management System.',
    lmsModuleTitle: 'Unified Student LMS Portal',
    lmsMetricLabel: 'Access Window',
    lmsMetricValue: '24 × 7 On-Demand',
    lmsDetails: [
      'Synchronised desktop & mobile study progress',
      'Downloadable e-books and structured unit notes',
      'Centralised academic calendar and exam alerts',
    ],
  },
  {
    id: 'flexible',
    step: '02',
    title: 'Flexible learning',
    subtitle: 'Built for working schedules',
    description:
      'Attend live interactive lectures when your calendar permits, or catch full HD session recordings at your own pace without falling behind.',
    lmsModuleTitle: 'Live & Recorded Classroom',
    lmsMetricLabel: 'Session Format',
    lmsMetricValue: 'Live + Full Archive',
    lmsDetails: [
      'Live faculty classes scheduled around work hours',
      'Instant replay library indexed by syllabus topic',
      'Self-paced module checkpoints before finals',
    ],
  },
  {
    id: 'faculty',
    step: '03',
    title: 'Expert faculty',
    subtitle: 'Taught by university professors',
    description:
      'Learn directly from the same seasoned academic faculty and subject specialists who shape GLA University’s flagship on-campus programmes.',
    lmsModuleTitle: 'Faculty Mentorship Desk',
    lmsMetricLabel: 'Academic Guidance',
    lmsMetricValue: 'Direct Q&A Threads',
    lmsDetails: [
      'Dedicated discussion forums per course module',
      'Scheduled faculty doubt-clearing office hours',
      'Individual feedback on term assignments',
    ],
  },
  {
    id: 'materials',
    step: '04',
    title: 'Interactive learning materials',
    subtitle: 'Curated e-content & self-checks',
    description:
      'Move beyond passive PDFs with structured digital study guides, concept summaries, and formative MCQ self-assessments.',
    lmsModuleTitle: 'Interactive Curriculum Kit',
    lmsMetricLabel: 'Internal Weightage',
    lmsMetricValue: '30% Continuous Eval',
    lmsDetails: [
      'Unit-wise digital readers and case briefs',
      'Practice quizzes with immediate concept feedback',
      'Mock tests modelled on external exam patterns',
    ],
  },
  {
    id: 'projects',
    step: '05',
    title: 'Real-world projects',
    subtitle: 'Applied labs & capstone work',
    description:
      'Translate classroom theory into portfolio-ready assignments, business case analyses, and virtual programming labs.',
    lmsModuleTitle: 'Applied Project Studio',
    lmsMetricLabel: 'Assessment Mode',
    lmsMetricValue: 'Case + Virtual Labs',
    lmsDetails: [
      'Industry-grounded management and IT casework',
      'Practical coding & analytics assignments',
      'Faculty-reviewed capstone project evaluation',
    ],
  },
  {
    id: 'support',
    step: '06',
    title: 'Academic support',
    subtitle: 'Guidance from admission to convocation',
    description:
      'Stay supported through dedicated student counsellors, technical exam-day helpdesks, and clear administrative communication.',
    lmsModuleTitle: 'Learner Support & Helpdesk',
    lmsMetricLabel: 'Counselling Desk',
    lmsMetricValue: '9 AM – 5 PM Support',
    lmsDetails: [
      'Dedicated admissions & DEB ID onboarding help',
      'Pre-exam system check and proctoring guidance',
      'Transparent transcript & alumni network onboarding',
    ],
  },
];

export const CAREER_BENEFITS: CareerBenefit[] = [
  {
    id: 'curriculum',
    number: '01',
    title: 'Career-oriented curriculum',
    description:
      'Syllabi updated in consultation with industry practitioners so your coursework reflects active enterprise tools and management standards.',
  },
  {
    id: 'industry',
    number: '02',
    title: 'Industry-relevant learning',
    description:
      'Eight MBA specialisations and applied computing tracks tailored to high-demand roles in analytics, finance, cloud, and operations.',
  },
  {
    id: 'projects',
    number: '03',
    title: 'Practical projects & case studies',
    description:
      'Structured assignments and real business scenarios that build demonstrable problem-solving evidence for hiring managers.',
  },
  {
    id: 'skills',
    number: '04',
    title: 'Resume & interview readiness',
    description:
      'Guided resume reviews, mock interview preparation, and structured soft-skill coaching through GLA’s placement support framework.',
  },
  {
    id: 'guidance',
    number: '05',
    title: 'Dedicated placement assistance',
    description:
      'Access opportunities across GLA University’s 3,000+ corporate hiring partners spanning consulting, IT services, and banking.',
  },
];

export const HIRING_PARTNERS = [
  'Accenture',
  'Deloitte',
  'TCS',
  'Cognizant',
  'Capgemini',
  'Microsoft',
  'Amazon',
  'Infosys',
  'Wipro',
  'IBM',
  'BOSCH',
  'Aon',
];

export const TESTIMONIALS: TestimonialItem[] = [
  {
    id: 't1',
    quote:
      'Balancing a full-time finance operations role while earning my MBA felt out of reach until I joined GLA Online. Weekend faculty sessions and recorded module archives let me prepare thoroughly without stepping away from my career.',
    name: 'Ananya Verma',
    program: 'Online MBA · Financial Management',
    role: 'Senior Financial Operations Analyst',
    location: 'Gurugram, Haryana',
    outcome: 'Transitioned into corporate financial planning while completing 4 semesters online',
    image: '/src/assets/images/student_portrait_1_1795249766233.jpg',
    isSampleProfile: true,
  },
  {
    id: 't2',
    quote:
      'The MCA curriculum gave me formal depth in distributed systems and database engineering alongside my daily engineering work. Virtual proctored exams and clear LMS milestones kept every semester structured and predictable.',
    name: 'Rohan Kulkarni',
    program: 'Online MCA · Computing Systems',
    role: 'Full-Stack Software Engineer',
    location: 'Pune, Maharashtra',
    outcome: 'Strengthened core computer science credentials for senior engineering progression',
    image: '/src/assets/images/student_portrait_2_1795249766784.jpg',
    isSampleProfile: true,
  },
];

export const ADMISSION_STEPS: AdmissionStep[] = [
  {
    number: '01',
    title: 'Choose your program',
    description:
      'Compare our UGC-entitled UG and PG degrees, review specialisation tracks, and confirm your eligibility.',
    detail: 'MBA · MCA · BBA · BCA · B.Com (Hons.)',
  },
  {
    number: '02',
    title: 'Submit your application',
    description:
      'Register online with basic academic details, generate your mandatory UGC DEB ID, and upload required documents.',
    detail: '100% digital application & ₹500 registration fee',
  },
  {
    number: '03',
    title: 'Complete admission formalities',
    description:
      'Once your credentials are verified by the admissions desk, confirm your seat by paying the semester or annual fee.',
    detail: 'Alumni (40%) & Sibling (20%) fee grants supported',
  },
  {
    number: '04',
    title: 'Begin your learning journey',
    description:
      'Receive your myglaonline LMS credentials, attend live orientation, and start learning on your own schedule.',
    detail: 'Direct access to live classes, e-books & faculty',
  },
];

export const FAQ_ITEMS: FAQItem[] = [
  {
    id: 'eligibility',
    category: 'Eligibility',
    question: 'What are the eligibility criteria for UG and PG online programmes?',
    answer:
      'For undergraduate programmes (BBA, BCA, B.Com Hons.), applicants must have passed 10+2 (Intermediate) from a recognised board (with Commerce/Maths preferred for B.Com Hons. and relevant criteria for BCA). For MBA, a bachelor’s degree in any discipline from a recognised university is required (final-year students may apply). For MCA, a relevant undergraduate degree such as BCA, B.Sc. (CS/IT), or graduation with Mathematics is required.',
  },
  {
    id: 'recognition',
    category: 'Recognition',
    question: 'Are GLA Online degrees valid and recognised like on-campus degrees?',
    answer:
      'Yes. GLA University is accredited by NAAC with an A+ Grade (3.46) and its online programmes are UGC-DEB entitled. As per UGC guidelines, online degrees offered by entitled institutions hold equivalence to regular on-campus degrees and are eligible for corporate employment, government examinations, and higher education—with WES recognition supporting international mobility.',
  },
  {
    id: 'programs',
    category: 'Programmes',
    question: 'Which degrees and specialisations are offered for 2026 admissions?',
    answer:
      'GLA Online offers two Postgraduate programmes—MBA (with 8 specialisations including Finance, Marketing, HR, Business Analytics, Operations, Supply Chain, IT, and Banking & Financial Services) and MCA—alongside three Undergraduate programmes: BBA (4 specialisations), BCA, and B.Com (Hons.).',
  },
  {
    id: 'duration',
    category: 'Duration',
    question: 'How long do the programmes take to complete?',
    answer:
      'Postgraduate programmes (Online MBA and Online MCA) have a standard duration of 2 years divided into 4 semesters. Undergraduate programmes (Online BBA, Online BCA, and Online B.Com Hons.) have a standard duration of 3 years divided into 6 semesters.',
  },
  {
    id: 'learning',
    category: 'Online Learning',
    question: 'How are classes delivered? Can working professionals manage live sessions?',
    answer:
      'Classes are delivered through the GLA Online Learning Management System (LMS). Learners receive a blend of live interactive sessions, pre-recorded HD video lectures, downloadable e-books, self-assessment quizzes, and discussion forums. If you miss a live class due to work commitments, full session recordings remain available on demand.',
  },
  {
    id: 'exams',
    category: 'Examinations',
    question: 'How does the online examination and assessment process work?',
    answer:
      'Assessments combine continuous internal evaluation (30 marks weightage featuring module-based MCQs and assignments) and external semester-end virtual proctored examinations (70 marks weightage, up to 3 hours duration). Re-examination opportunities are also provided in accordance with university regulations.',
  },
  {
    id: 'fees',
    category: 'Fees & Grants',
    question: 'What is the fee structure, and are Alumni or Sibling discounts available?',
    answer:
      'Standard tuition is structured transparently per semester: MBA is ₹24,250/semester (₹97,000 total), MCA is ₹21,500/semester (₹86,000 total), BBA and BCA are ₹14,750/semester (₹88,500 total), and B.Com (Hons.) is ₹10,000/semester (₹60,000 total). Eligible GLA University alumni receive a 40% fee discount and siblings receive a 20% fee discount, alongside semester-wise, annual, and EMI options.',
  },
  {
    id: 'application',
    category: 'Application',
    question: 'How do I apply for GLA Online Admissions 2026?',
    answer:
      'Click "Apply Now" on this site to submit an admissions request or visit glaonline.com directly. You will register your contact and academic details, create a UGC DEB ID, upload verification documents, and complete the ₹500 registration fee to initiate seat confirmation.',
  },
];

export const CONTACT_INFO = {
  phoneDisplay: '+91-9568536853',
  phoneHref: 'tel:+919568536853',
  supportHours: 'Monday – Saturday, 9:00 AM – 5:00 PM IST',
  email: 'onlineadmissions@gla.ac.in',
  emailHref: 'mailto:onlineadmissions@gla.ac.in',
  officialWebsite: 'https://glaonline.com/',
  studentPortalUrl: 'https://myglaonline.com/',
  mathuraCampus:
    '17km Stone, NH-19, Mathura-Delhi Road, P.O. Chaumuhan, Mathura - 281406 (U.P.), India',
  noidaCampus: '15-A, IILM Road, Knowledge Park 2, Greater Noida - 201310, India',
};
