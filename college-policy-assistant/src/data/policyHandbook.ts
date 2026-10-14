import { PolicyCategory, DepartmentContact } from '../types';

export const COLLEGE_NAME = "Apex University & Institute of Higher Studies";
export const ACADEMIC_YEAR = "2025–2026";

export const POLICY_CATEGORIES: PolicyCategory[] = [
  {
    id: "attendance",
    name: "Attendance Policies",
    icon: "Clock",
    description: "Rules regarding minimum attendance criteria, condonation, and medical absences.",
    topics: [
      {
        id: "att-min",
        title: "Minimum Attendance Requirement",
        summary: "Mandatory 75% attendance in theory and practical sessions for semester exam eligibility.",
        keyPoints: [
          "Students must maintain an aggregate minimum of 75% attendance across all registered courses.",
          "Attendance between 65% and 74.9% may be condoned solely on documented medical grounds or authorized institutional duty.",
          "A condonation fee of $25 (or ₹500 equivalent) applies per approved condonation application.",
          "Students with below 65% attendance are strictly debarred from sitting for the end-semester examinations in those subjects.",
          "Debarred students must re-register for the course in subsequent summer or regular semesters."
        ],
        officialNote: "Attendance calculations freeze 5 working days before the commencement of practical examinations. Check your ERP portal weekly.",
        concernedDepartment: "Academic Registrar & Respective Department Heads (HODs)",
        suggestedQuestions: [
          "What is the minimum attendance required?",
          "Can attendance below 75% be excused for medical reasons?",
          "What happens if my attendance falls below 65%?"
        ]
      },
      {
        id: "att-duty",
        title: "Duty Leave (On-Duty Attendance)",
        summary: "Attendance credit for university sports, technical symposiums, NCC/NSS, and hackathons.",
        keyPoints: [
          "Duty leave must be pre-approved by the Faculty Coordinator and HOD at least 48 hours prior to the event.",
          "Proof of participation/certificate must be submitted within 3 working days of returning.",
          "A maximum cap of 10% duty attendance is permitted per semester.",
          "Duty leave is not applicable for regular internal mid-term examinations."
        ],
        officialNote: "Late submissions of duty certificates after the semester cutoff date will not be entertained.",
        concernedDepartment: "Office of Student Affairs & Respective HOD",
        suggestedQuestions: [
          "How do I apply for on-duty attendance for sports or hackathons?",
          "What is the maximum limit for on-duty leave?"
        ]
      }
    ]
  },
  {
    id: "examination",
    name: "Examination Rules",
    icon: "GraduationCap",
    description: "Protocols for mid-terms, final exams, hall tickets, and malpractice disciplinary action.",
    topics: [
      {
        id: "exam-conduct",
        title: "Examination Hall Code & Entry",
        summary: "Mandatory identification, entry timings, and permitted examination stationery.",
        keyPoints: [
          "Physical College ID card and verified Hall Ticket are mandatory for entry into the exam hall.",
          "Students must report to the examination hall at least 20 minutes prior to the scheduled exam commencement.",
          "No student will be permitted entry after 15 minutes of exam commencement.",
          "Smartwatches, mobile phones, Bluetooth headsets, programmable calculators, and notes are strictly forbidden.",
          "Students are not permitted to leave the examination hall during the first 60 minutes or last 10 minutes."
        ],
        officialNote: "Possession of any unauthorized electronic device inside the exam hall is considered an immediate attempt at malpractice, regardless of whether it was used.",
        concernedDepartment: "Office of the Controller of Examinations (COE)",
        suggestedQuestions: [
          "What documents are required to enter the exam hall?",
          "Are smartwatches or digital calculators allowed in examinations?",
          "What is the late entry policy for exams?"
        ]
      },
      {
        id: "exam-malpractice",
        title: "Malpractice & Unfair Means Policy",
        summary: "Penalties for academic dishonesty, unauthorized material, or impersonation.",
        keyPoints: [
          "First offense (written cheat notes/material found): Cancellation of the specific subject examination and award of zero marks.",
          "Second offense or communication with others: Cancellation of all examinations in the current semester.",
          "Impersonation or tampering with answer scripts: Immediate suspension for up to two academic years and recommendation for rustication.",
          "All cases are evaluated by the Central Examination Malpractice Committee (CEMC), where the student is granted a hearing."
        ],
        officialNote: "Decisions of the CEMC approved by the Academic Council are final and binding.",
        concernedDepartment: "Controller of Examinations & Disciplinary Board",
        suggestedQuestions: [
          "What are the penalties for exam malpractice?",
          "How does the Malpractice Committee handle unfair means cases?"
        ]
      }
    ]
  },
  {
    id: "assessment",
    name: "Internal Assessment & Marks",
    icon: "FileCheck",
    description: "Criteria for continuous internal evaluations (CIE), assignments, and pass percentages.",
    topics: [
      {
        id: "assess-weightage",
        title: "Evaluation Weightage & Passing Criteria",
        summary: "40% Continuous Internal Assessment (CIA) and 60% End Semester Examination (ESE).",
        keyPoints: [
          "Continuous Internal Assessment (CIA) carries 40 marks: 2 Mid-Term Tests (20 marks average), Quizzes/Surprise Tests (10 marks), Assignments & Presentations (5 marks), and Attendance (5 marks).",
          "End Semester Examination (ESE) carries 60 marks.",
          "Students must score a minimum of 40% in CIA and 40% in ESE individually, and an aggregate of 45% to clear the course.",
          "No re-tests are conducted for internal examinations except on pre-sanctioned medical emergencies approved by the Dean Academics."
        ],
        officialNote: "Internal marks are displayed on the ERP portal 10 days before final exams; disputes must be reported within 48 hours to the subject faculty.",
        concernedDepartment: "Academic Dean & Department Course Coordinators",
        suggestedQuestions: [
          "How are internal assessment marks calculated?",
          "What is the minimum passing mark for internal and semester exams?",
          "Can I give a re-test if I missed a mid-term exam?"
        ]
      }
    ]
  },
  {
    id: "assignments",
    name: "Assignment Submission Rules",
    icon: "ClipboardList",
    description: "Deadlines, plagiarism thresholds, and late submission penalty protocols.",
    topics: [
      {
        id: "assign-deadlines",
        title: "Deadlines, Late Penalties & Plagiarism",
        summary: "Turnitin similarity limits, electronic LMS portal submissions, and grace periods.",
        keyPoints: [
          "All assignments must be submitted via the official Learning Management System (LMS) by 11:59 PM of the stipulated due date.",
          "Late submissions incur a 10% mark deduction for each 24-hour delay, up to a maximum of 3 days.",
          "Submissions beyond 72 hours of the deadline are awarded zero marks automatically by the portal.",
          "Turnitin/anti-plagiarism software checks all submissions: similarity index must not exceed 15% (excluding references and standard templates).",
          "Plagiarism exceeding 25% results in automatic assignment rejection and referral to the academic ethics committee."
        ],
        officialNote: "Technical issues with personal Wi-Fi or laptops are not accepted as valid grounds for missed deadlines; submit well in advance.",
        concernedDepartment: "Course Faculty & LMS Administrator",
        suggestedQuestions: [
          "What is the penalty for late assignment submission?",
          "What is the allowed plagiarism limit for assignments?"
        ]
      }
    ]
  },
  {
    id: "fees",
    name: "Fee Payment Policies",
    icon: "CreditCard",
    description: "Tuition deadlines, installment options, late fines, and refund policy on withdrawal.",
    topics: [
      {
        id: "fee-deadlines",
        title: "Fee Schedule & Late Payment Fines",
        summary: "Semester fee due dates, 15-day grace window, and registration holds.",
        keyPoints: [
          "Semester tuition and facility fees are due within 10 days before the commencement of the semester.",
          "A grace period of 15 days is permitted with a late fee of $10 (₹250) per week.",
          "Failure to clear fees after 30 days results in temporary freezing of the student portal, course enrollment, and library services.",
          "Installment payment facilities can be requested by submitting Form FA-2 to the Finance Office on financial hardship grounds."
        ],
        officialNote: "All fee transactions must be performed exclusively via the university payment gateway; cash transactions are not permitted.",
        concernedDepartment: "Accounts & Finance Section",
        suggestedQuestions: [
          "When is the tuition fee due?",
          "What happens if I miss the fee payment deadline?",
          "Can I pay my college fees in installments?"
        ]
      },
      {
        id: "fee-refund",
        title: "Cancellation & Fee Refund Policy",
        summary: "Standard refund percentage based on date of formal withdrawal application.",
        keyPoints: [
          "15 days or more before the formal start of session: 100% refund (minus 5% processing charge up to $50).",
          "Less than 15 days before start of session: 90% refund.",
          "Up to 15 days after formal start of classes: 80% refund.",
          "Between 16 to 30 days after formal start: 50% refund.",
          "Beyond 30 days of formal session commencement: No tuition fee refund applicable (only security deposit is refundable)."
        ],
        officialNote: "Security deposits (caution money) are 100% refundable upon submission of the clearance certificate from all departments.",
        concernedDepartment: "Accounts Section & Registrar Office",
        suggestedQuestions: [
          "What is the college fee refund policy if I withdraw admission?",
          "When is caution money / security deposit refunded?"
        ]
      }
    ]
  },
  {
    id: "scholarships",
    name: "Scholarship Information",
    icon: "Award",
    description: "Merit scholarships, need-based fee concessions, and government portal guidelines.",
    topics: [
      {
        id: "schol-merit",
        title: "Merit & Means Scholarships",
        summary: "Tuition waivers for high academic achievers and economically disadvantaged students.",
        keyPoints: [
          "University Merit Scholarship: Top 5% of students in each branch with CGPA ≥ 8.75 receive a 50% tuition fee waiver for the subsequent semester.",
          "Sports & Cultural Scholarship: Up to 100% tuition waiver for medalists in National/State recognized university games.",
          "Need-based Aid: Available for students with gross family annual income under $4,000 (₹3.5 Lakhs) upon income certificate verification.",
          "Renewal condition: Recipient must maintain a minimum CGPA of 8.0 with no active backlogs and zero disciplinary complaints."
        ],
        officialNote: "Applications open during the first month of every academic year on the Student Scholarship Portal.",
        concernedDepartment: "Scholarship Cell & Dean of Student Welfare",
        suggestedQuestions: [
          "What scholarships are available for high CGPA students?",
          "What are the eligibility criteria to renew a merit scholarship?",
          "How can I apply for need-based financial aid?"
        ]
      }
    ]
  },
  {
    id: "library",
    name: "Library Rules",
    icon: "BookOpen",
    description: "Borrowing quotas, loan durations, overdue charges, and digital repository access.",
    topics: [
      {
        id: "lib-circulation",
        title: "Borrowing, Fines & Reading Hall Protocols",
        summary: "Book limits, overdue penalties, and digital repository credentials.",
        keyPoints: [
          "Undergraduate students may borrow up to 4 books for a duration of 14 days.",
          "Postgraduate and Research students may borrow up to 6 books for 28 days.",
          "Overdue fine: $0.50 (₹5) per book per day past the stipulated return date.",
          "Reference books, journals, theses, and rare manuscripts are strictly for reading room use and cannot be issued out.",
          "Loss of a library book requires the student to replace the exact edition or pay double the market replacement cost plus processing fees.",
          "Silence must be maintained in designated silent study zones; phone calls and group discussions must remain in collaborative pods."
        ],
        officialNote: "Clearance ('No Dues') from the Central Library is mandatory before issuing hall tickets or graduation degree certificates.",
        concernedDepartment: "Central University Library Administration",
        suggestedQuestions: [
          "How many books can I borrow from the library and for how long?",
          "What is the overdue fine for late library book returns?",
          "Can reference books and journals be taken home?"
        ]
      }
    ]
  },
  {
    id: "hostel",
    name: "Hostel Rules & Curfew",
    icon: "Home",
    description: "In-timings, leave passes, visitor restrictions, and room maintenance policies.",
    topics: [
      {
        id: "hostel-curfew",
        title: "Hostel In-Timings & Night Passes",
        summary: "Curfew timings, biometric verification, and outstation leave protocols.",
        keyPoints: [
          "Hostel gates close strictly at 9:30 PM on weekdays (Sunday to Thursday) and 10:30 PM on Fridays and Saturdays.",
          "Late entry without a pre-approved pass will be logged; 3 late entries result in parental notification and disciplinary hearing.",
          "Night-out and weekend leave requires an electronic pass submitted through the Hostel Management Portal at least 24 hours in advance with verified parental SMS/email consent.",
          "Day scholars and outside guests of any gender are strictly prohibited inside resident rooms at all times.",
          "Possession of electrical appliances exceeding 500W (heaters, induction stoves) is prohibited for fire safety reasons."
        ],
        officialNote: "Surprise inspections are conducted by the Proctorial Board. Contraband or alcohol possession leads to immediate expulsion from hostel.",
        concernedDepartment: "Chief Warden Office & Hostel Administration",
        suggestedQuestions: [
          "What are the hostel curfew timings on weekdays and weekends?",
          "How do I apply for a hostel night out or weekend leave?",
          "Are day scholars allowed to visit hostel rooms?"
        ]
      }
    ]
  },
  {
    id: "leave",
    name: "Leave & Permission Policies",
    icon: "CalendarCheck",
    description: "Medical leave certificates, emergency leave, and official leave of absence.",
    topics: [
      {
        id: "leave-medical",
        title: "Medical Leave & Absence Approval",
        summary: "Doctor's certificate requirements, submission timelines, and condonation links.",
        keyPoints: [
          "Medical leave applications must be submitted along with a registered physician's medical certificate and prescription within 3 working days of resuming classes.",
          "For illnesses exceeding 7 continuous days, intimation must be emailed to the HOD within 48 hours of sickness onset.",
          "Medical leave helps fulfill eligibility for attendance condonation (subject to the 65% statutory limit), but does NOT automatically grant 100% attendance credit.",
          "Emergency leave during exam periods requires prior written notification to the Controller of Examinations and Dean Academics."
        ],
        officialNote: "All submitted medical certificates undergo random verification with the issuing hospital/clinic by the University Medical Center.",
        concernedDepartment: "University Health Center & Respective HOD",
        suggestedQuestions: [
          "How do I submit medical leave for missing classes?",
          "What is the deadline to submit a doctor's certificate?",
          "Does medical leave give me 100% attendance?"
        ]
      }
    ]
  },
  {
    id: "conduct",
    name: "Student Code of Conduct",
    icon: "ShieldAlert",
    description: "General campus conduct, ID badge enforcement, substance ban, and academic integrity.",
    topics: [
      {
        id: "conduct-general",
        title: "Campus Behavior & Disciplinary Guidelines",
        summary: "ID cards, respectful communication, property preservation, and substance prohibition.",
        keyPoints: [
          "Students must visibly wear their official University ID smart card at all times inside campus buildings and buses.",
          "Alcohol, tobacco, vaping, and narcotics are strictly forbidden across the entire campus; violations result in immediate police referral and expulsion.",
          "Vandalism, damage to lab equipment, or writing on university property requires full monetary restitution plus a minimum 100% penalty surcharge.",
          "Disrespect, harassment, or verbal abuse directed toward faculty, staff, or fellow students invokes immediate review by the Proctorial Board.",
          "Unauthorized recording or distribution of classroom lectures or student photographs without consent is prohibited."
        ],
        officialNote: "A suspension on disciplinary grounds is permanently recorded in the student's confidential conduct dossier.",
        concernedDepartment: "Office of the Proctor & Chief Disciplinary Officer",
        suggestedQuestions: [
          "Is wearing a college ID card mandatory on campus?",
          "What is the university policy regarding tobacco or alcohol?",
          "What are the consequences of damaging college property?"
        ]
      }
    ]
  },
  {
    id: "anti-ragging",
    name: "Anti-Ragging Policies",
    icon: "AlertOctagon",
    description: "Statutory Zero-Tolerance policy, definitions, punitive actions, and 24x7 crisis helpline.",
    topics: [
      {
        id: "ragging-zero",
        title: "Zero-Tolerance Anti-Ragging Mandate",
        summary: "Absolute prohibition of physical, psychological, verbal, or financial intimidation.",
        keyPoints: [
          "The University enforces an absolute ZERO-TOLERANCE policy against ragging in any form, inside or outside campus.",
          "Ragging includes teasing, humiliating, demanding money, forced tasks, bullying, or making derogatory remarks based on race, gender, or appearance.",
          "Punishments include immediate suspension from classes/hostel, debarment from exams, cancellation of admission, and mandatory registration of a First Information Report (FIR) with the local police.",
          "The Anti-Ragging Squad conducts 24/7 unannounced patrols across hostels, canteens, and sports grounds.",
          "Reports can be submitted 100% anonymously via the emergency helpline or drop boxes located across every academic block."
        ],
        officialNote: "National 24x7 Toll-Free Anti-Ragging Helpline: 1800-180-5522 | Campus Internal Emergency: +1 (800) 555-RAGG / ext 100.",
        concernedDepartment: "Anti-Ragging Committee & Dean of Student Welfare",
        suggestedQuestions: [
          "What is the college's anti-ragging policy?",
          "What actions are taken against students involved in ragging?",
          "How can I report a ragging incident anonymously?"
        ]
      }
    ]
  },
  {
    id: "campus",
    name: "Campus Rules & Regulations",
    icon: "Building2",
    description: "Vehicle speed limits, parking stickers, laboratory dress codes, and event permits.",
    topics: [
      {
        id: "campus-general",
        title: "Vehicle Parking, Labs & Event Guidelines",
        summary: "Campus speed limits, authorized student parking, safety equipment, and poster guidelines.",
        keyPoints: [
          "Vehicle speed limit inside campus roads is capped strictly at 20 km/h; helmets are mandatory for two-wheeler riders.",
          "Student vehicles must display a valid annual campus parking sticker issued by the Security Office.",
          "Laboratories require mandatory safety attire: cotton lab coats, closed-toe shoes, and safety goggles where designated.",
          "No posters, flyers, or banners may be affixed without formal written authorization from the Dean of Student Affairs.",
          "Campus curfew for day scholars is 8:00 PM unless actively participating in authorized academic labs or library hours."
        ],
        officialNote: "Violating traffic regulations inside campus results in impounding of the parking permit for the semester.",
        concernedDepartment: "Campus Security Office & Facilities Management",
        suggestedQuestions: [
          "What are the vehicle speed limits and parking rules on campus?",
          "What is the dress code for engineering and science laboratories?",
          "Can students host events or put up posters on campus noticeboards?"
        ]
      }
    ]
  },
  {
    id: "placement",
    name: "Placement & Internship Policies",
    icon: "Briefcase",
    description: "Eligibility CGPA, one-student-one-job offer rule, internship NOC, and interview decorum.",
    topics: [
      {
        id: "placement-rules",
        title: "Training, Placement & Internship Guidelines",
        summary: "Dream company offers, mandatory attendance at drives, and semester internship credits.",
        keyPoints: [
          "Eligibility: Students must maintain a minimum CGPA of 6.0 (or higher as specified by the visiting company) with no active backlogs.",
          "One Student, One Job Policy: Once a student receives a formal job offer, they are ineligible for further on-campus drives, unless the new role is categorized as a 'Dream Offer' (>1.5x salary tier).",
          "Mandatory Attendance: A student who registers for a company recruitment drive and fails to attend the test/interview without prior written excuse is barred from the next 2 campus recruitment opportunities.",
          "Internship NOC: Eighth-semester full-time industrial internships require a formal No Objection Certificate (NOC) endorsed by the Department HOD and Dean Academics.",
          "Professional attire (formal business wear) and valid ID card are compulsory for all recruitment drives and interview rounds."
        ],
        officialNote: "Rejecting a confirmed job offer without legitimate cause forfeits all future campus placement privileges.",
        concernedDepartment: "Training & Placement Cell (TPO)",
        suggestedQuestions: [
          "What is the 'One Student, One Job' placement policy?",
          "What happens if I register for an on-campus placement drive and do not attend?",
          "How do I obtain a No Objection Certificate (NOC) for an internship?"
        ]
      }
    ]
  }
];

export const DEPARTMENT_CONTACTS: DepartmentContact[] = [
  {
    id: "admin-reg",
    name: "Dr. Sarah Jenkins",
    department: "Academic Registrar",
    role: "Registrar & Enrollment Officer",
    email: "registrar@apex-university.edu",
    phone: "+1 (800) 555-0190",
    officeLocation: "Admin Block, Ground Floor, Room 102",
    officeHours: "Mon-Fri: 9:00 AM - 4:30 PM"
  },
  {
    id: "coe-office",
    name: "Prof. Arthur Pendelton",
    department: "Examination Cell",
    role: "Controller of Examinations (COE)",
    email: "coe@apex-university.edu",
    phone: "+1 (800) 555-0192",
    officeLocation: "Examination Bhavan, 1st Floor",
    officeHours: "Mon-Fri: 10:00 AM - 4:00 PM"
  },
  {
    id: "student-welfare",
    name: "Dr. Marcus Vance",
    department: "Dean of Student Welfare",
    role: "Dean of Student Affairs & Scholarships",
    email: "studentwelfare@apex-university.edu",
    phone: "+1 (800) 555-0194",
    officeLocation: "Student Center, Room 204",
    officeHours: "Mon-Fri: 10:30 AM - 5:00 PM"
  },
  {
    id: "accounts-office",
    name: "Ms. Elena Rostova",
    department: "Accounts & Finance",
    role: "Senior Accounts Officer",
    email: "accounts@apex-university.edu",
    phone: "+1 (800) 555-0196",
    officeLocation: "Admin Block, East Wing, Room 108",
    officeHours: "Mon-Fri: 9:30 AM - 3:30 PM"
  },
  {
    id: "chief-warden",
    name: "Prof. Robert Sterling",
    department: "Hostel Administration",
    role: "Chief Hostel Warden",
    email: "warden@apex-university.edu",
    phone: "+1 (800) 555-0198",
    officeLocation: "Central Hostel Complex, Main Office",
    officeHours: "Daily: 4:00 PM - 8:00 PM"
  },
  {
    id: "anti-ragging-cell",
    name: "Anti-Ragging Squad & Committee",
    department: "Student Safety & Anti-Ragging Cell",
    role: "24x7 Emergency Contact",
    email: "antiragging@apex-university.edu",
    phone: "+1 (800) 555-RAGG (7244)",
    officeLocation: "Proctorial Office, Campus Security Wing",
    officeHours: "24 Hours / 7 Days a Week"
  },
  {
    id: "tpo-cell",
    name: "Mr. David Thorne",
    department: "Training & Placement Cell (TPO)",
    role: "Head of Corporate Relations & Placements",
    email: "placements@apex-university.edu",
    phone: "+1 (800) 555-0200",
    officeLocation: "Innovation & Placement Hub, 2nd Floor",
    officeHours: "Mon-Fri: 9:00 AM - 5:30 PM"
  },
  {
    id: "library-desk",
    name: "Mrs. Clara Higgins",
    department: "Central University Library",
    role: "Chief Librarian",
    email: "library@apex-university.edu",
    phone: "+1 (800) 555-0202",
    officeLocation: "Central Library, Circulation Helpdesk",
    officeHours: "Mon-Sat: 8:00 AM - 9:00 PM"
  }
];

// Helper function to build a text summary of the whole policy document for Gemini's system instruction
export function generateKnowledgeBasePromptText(): string {
  let text = `OFFICIAL COLLEGE POLICY DOCUMENTS & KNOWLEDGE BASE (${COLLEGE_NAME} - Academic Year ${ACADEMIC_YEAR}):\n\n`;
  for (const cat of POLICY_CATEGORIES) {
    text += `### CATEGORY: ${cat.name}\n`;
    for (const top of cat.topics) {
      text += `Topic: ${top.title}\n`;
      text += `Summary: ${top.summary}\n`;
      text += `Key Regulations:\n`;
      for (const pt of top.keyPoints) {
        text += `- ${pt}\n`;
      }
      text += `Official Notice: ${top.officialNote}\n`;
      text += `Concerned Department: ${top.concernedDepartment}\n\n`;
    }
  }

  text += `### OFFICIAL DEPARTMENT CONTACT DIRECTORY:\n`;
  for (const contact of DEPARTMENT_CONTACTS) {
    text += `- ${contact.department}: Contact ${contact.name} (${contact.role}) | Email: ${contact.email} | Phone: ${contact.phone} | Location: ${contact.officeLocation} | Hours: ${contact.officeHours}\n`;
  }

  return text;
}
