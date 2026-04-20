const kts = [
  {
    id: "full-stack-foundations",
    title: "Full Stack Web Development Foundations",
    summary: "Frontend, backend, APIs, databases, and deployment through a realistic project.",
    topic: "technology",
    difficulty: "Beginner",
    source: "Community maintained",
    version: "v1.4",
    adoptionCount: 1840,
    modes: ["learner", "mentor"],
    hasAssignment: true,
    rating: "4.9",
    contributors: 128,
  },
  {
    id: "research-methods",
    title: "Research Methods for Undergraduate Projects",
    summary: "A practical KT for problem selection, literature review, methodology, and reporting.",
    topic: "science",
    difficulty: "Intermediate",
    source: "University collection",
    version: "v2.1",
    adoptionCount: 920,
    modes: ["learner", "mentor"],
    hasAssignment: true,
    rating: "4.7",
    contributors: 64,
  },
  {
    id: "business-communication",
    title: "Business Communication for First Jobs",
    summary: "Email writing, meeting notes, stakeholder updates, presentations, and workplace clarity.",
    topic: "business",
    difficulty: "Beginner",
    source: "Professional expert",
    version: "v1.2",
    adoptionCount: 1310,
    modes: ["learner", "mentor"],
    hasAssignment: true,
    rating: "4.8",
    contributors: 91,
  },
  {
    id: "teaching-ai-literacy",
    title: "Teaching AI Literacy Without Coding",
    summary: "A non-technical teaching kit for AI concepts, ethics, prompts, and evaluation.",
    topic: "teaching",
    difficulty: "Intermediate",
    source: "Mentor network",
    version: "v1.0",
    adoptionCount: 760,
    modes: ["learner", "mentor"],
    hasAssignment: true,
    rating: "4.6",
    contributors: 52,
  },
  {
    id: "hospitality-service",
    title: "Hospitality Service Excellence",
    summary: "A practical KT for guest handling, service recovery, standards, and team coordination.",
    topic: "business",
    difficulty: "Advanced",
    source: "Industry mentor",
    version: "v0.9",
    adoptionCount: 410,
    modes: ["learner", "mentor"],
    hasAssignment: false,
    rating: "4.5",
    contributors: 37,
  },
  {
    id: "data-analysis",
    title: "Introduction to Data Analysis",
    summary: "Clean data, calculate summaries, create charts, and communicate insights for beginners.",
    topic: "technology",
    difficulty: "Beginner",
    source: "College department",
    version: "v1.7",
    adoptionCount: 2140,
    modes: ["learner", "mentor"],
    hasAssignment: true,
    rating: "4.9",
    contributors: 143,
  },
];

const contributions = [
  {
    id: "proposal-101",
    ktId: "full-stack-foundations",
    title: "Add deployment troubleshooting checklist",
    changeType: "Mentor note",
    status: "In Review",
    submittedBy: "Mentor reviewer",
  },
  {
    id: "proposal-102",
    ktId: "research-methods",
    title: "Improve ethics examples for student surveys",
    changeType: "Lesson correction",
    status: "Submitted",
    submittedBy: "Research mentor",
  },
];

const assignments = [
  {
    id: "assignment-201",
    ktId: "full-stack-foundations",
    title: "Build a course feedback app",
    difficulty: "Beginner",
    status: "Published",
  },
  {
    id: "assignment-202",
    ktId: "data-analysis",
    title: "Clean a student activity dataset",
    difficulty: "Beginner",
    status: "Draft",
  },
];

const accounts = [
  {
    id: "user-demo-001",
    type: "user",
    name: "Demo User",
    email: "student@example.edu",
  },
  {
    id: "institution-kakatiya",
    type: "institution",
    name: "Kakatiya Institute of Technology",
    verified: true,
    domain: "kakatiya.edu",
  },
  {
    id: "institution-northstar",
    type: "institution",
    name: "Northstar University",
    verified: true,
    domain: "northstar.edu",
  },
];

const institutions = [
  {
    id: "kakatiya-institute",
    accountId: "institution-kakatiya",
    name: "Kakatiya Institute of Technology",
    domain: "kakatiya.edu",
    verification: "College email approval",
    stats: {
      associatedUsers: 4820,
      activeKts: 126,
      adoptionRate: "71%",
    },
  },
  {
    id: "northstar-university",
    accountId: "institution-northstar",
    name: "Northstar University",
    domain: "northstar.edu",
    verification: "Registrar-approved email domain",
    stats: {
      associatedUsers: 11800,
      activeKts: 342,
      adoptionRate: "64%",
    },
  },
];

const institutionMemberships = [];
const associationRequests = [];

module.exports = {
  kts,
  contributions,
  assignments,
  accounts,
  institutions,
  institutionMemberships,
  associationRequests,
};
