const ktData = [
  {
    id: "full-stack-foundations",
    title: "Full Stack Web Development Foundations",
    summary: "Frontend, backend, APIs, databases, and deployment through a realistic project.",
    topic: "technology",
    difficulty: "Beginner",
    source: "Community maintained",
    modes: ["learner", "instructor", "creator"],
    hasAssignment: true,
    rating: "4.9",
    contributors: 128,
    lessons: ["Web architecture basics", "HTML, CSS, and JavaScript flow", "REST API design", "Database modeling", "Deployment checklist"],
    instructorNote: "Use one mini-product across all sessions so students see how each layer connects.",
    assignment: "Build a course feedback app with authentication, feedback submission, admin review, and deployment evidence.",
  },
  {
    id: "research-methods",
    title: "Research Methods for Undergraduate Projects",
    summary: "A practical KT for problem selection, literature review, methodology, and reporting.",
    topic: "science",
    difficulty: "Intermediate",
    source: "University collection",
    modes: ["learner", "instructor", "institution"],
    hasAssignment: true,
    rating: "4.7",
    contributors: 64,
    lessons: ["Choosing a research problem", "Literature review mapping", "Methodology design", "Ethics and citations", "Final report structure"],
    instructorNote: "Run weekly peer review checkpoints and maintain a visible rubric from day one.",
    assignment: "Create a one-page research proposal with question, hypothesis, method, risks, and expected output.",
  },
  {
    id: "business-communication",
    title: "Business Communication for First Jobs",
    summary: "Email writing, meeting notes, stakeholder updates, presentations, and workplace clarity.",
    topic: "business",
    difficulty: "Beginner",
    source: "Professional expert",
    modes: ["learner", "instructor", "creator"],
    hasAssignment: true,
    rating: "4.8",
    contributors: 91,
    lessons: ["Professional email structure", "Status reporting", "Meeting minutes", "Presentation clarity", "Escalation etiquette"],
    instructorNote: "Teach using messy real-world scenarios and ask learners to rewrite them professionally.",
    assignment: "Convert an unclear project update into a concise stakeholder email and action tracker.",
  },
  {
    id: "teaching-ai-literacy",
    title: "Teaching AI Literacy Without Coding",
    summary: "A non-technical teaching kit for AI concepts, ethics, prompts, and evaluation.",
    topic: "teaching",
    difficulty: "Intermediate",
    source: "Instructor network",
    modes: ["learner", "instructor", "institution"],
    hasAssignment: true,
    rating: "4.6",
    contributors: 52,
    lessons: ["What AI systems do", "Prompt design", "Bias and reliability", "Classroom activities", "Assessment patterns"],
    instructorNote: "Keep examples domain-neutral so arts, commerce, science, and engineering students can participate.",
    assignment: "Design a responsible AI use policy for a class project and defend it with three examples.",
  },
  {
    id: "hospitality-service",
    title: "Hospitality Service Excellence",
    summary: "A practical KT for guest handling, service recovery, standards, and team coordination.",
    topic: "business",
    difficulty: "Advanced",
    source: "Industry mentor",
    modes: ["learner", "instructor", "creator"],
    hasAssignment: false,
    rating: "4.5",
    contributors: 37,
    lessons: ["Guest journey mapping", "Service standards", "Complaint recovery", "Shift handover", "Quality review"],
    instructorNote: "Role-play difficult guest scenarios and evaluate response tone, speed, and ownership.",
    assignment: "Create a service recovery plan for a delayed room check-in with guest communication scripts.",
  },
  {
    id: "data-analysis",
    title: "Introduction to Data Analysis",
    summary: "Clean data, calculate summaries, create charts, and communicate insights for beginners.",
    topic: "technology",
    difficulty: "Beginner",
    source: "College department",
    modes: ["learner", "instructor", "institution"],
    hasAssignment: true,
    rating: "4.9",
    contributors: 143,
    lessons: ["Data types", "Cleaning spreadsheet data", "Summary statistics", "Chart selection", "Insight storytelling"],
    instructorNote: "Use familiar datasets like marks, attendance, expenses, or survey results before advanced tools.",
    assignment: "Clean a student activity dataset and present three useful charts with written interpretation.",
  },
];

const modeContent = {
  learner: { title: "Learner dashboard", empty: "No KTs match your learner filters." },
  instructor: { title: "Instructor dashboard", empty: "No KTs match your instructor filters." },
  creator: { title: "Creator workspace", empty: "No creator-ready KTs match your filters." },
  institution: { title: "Institution collection view", empty: "No institutional KTs match your filters." },
};

const state = {
  mode: "learner",
  selectedId: ktData[0].id,
};

const grid = document.querySelector("#kt-grid");
const modeTitle = document.querySelector("#mode-title");
const searchInput = document.querySelector("#kt-search");
const topicFilter = document.querySelector("#topic-filter");
const difficultyFilter = document.querySelector("#difficulty-filter");
const assignmentFilter = document.querySelector("#assignment-filter");

function getVisibleKts() {
  const query = searchInput.value.trim().toLowerCase();
  const topic = topicFilter.value;
  const difficulty = difficultyFilter.value;
  const assignmentOnly = assignmentFilter.checked;

  return ktData.filter((kt) => {
    const queryText = `${kt.title} ${kt.summary} ${kt.source} ${kt.topic}`.toLowerCase();
    return kt.modes.includes(state.mode)
      && (topic === "all" || kt.topic === topic)
      && (difficulty === "all" || kt.difficulty === difficulty)
      && (!assignmentOnly || kt.hasAssignment)
      && (!query || queryText.includes(query));
  });
}

function renderCards() {
  modeTitle.textContent = modeContent[state.mode].title;
  const visibleKts = getVisibleKts();

  if (!visibleKts.some((kt) => kt.id === state.selectedId) && visibleKts.length) {
    state.selectedId = visibleKts[0].id;
  }

  grid.innerHTML = "";

  if (!visibleKts.length) {
    const empty = document.createElement("p");
    empty.className = "empty-state";
    empty.textContent = modeContent[state.mode].empty;
    grid.append(empty);
    return;
  }

  visibleKts.forEach((kt) => {
    const card = document.createElement("article");
    card.className = `kt-card${kt.id === state.selectedId ? " active" : ""}`;
    card.tabIndex = 0;
    card.setAttribute("role", "button");
    card.setAttribute("aria-label", `Open ${kt.title}`);
    card.innerHTML = `
      <div class="meta-row">
        <span class="pill">${kt.difficulty}</span>
        <span class="pill gold">${kt.rating} rating</span>
      </div>
      <div>
        <h3>${kt.title}</h3>
        <p>${kt.summary}</p>
      </div>
      <div class="meta-row">
        <span class="pill green">${kt.contributors} contributors</span>
        <span class="pill rose">${kt.source}</span>
      </div>
    `;
    card.addEventListener("click", () => selectKt(kt.id));
    card.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        selectKt(kt.id);
      }
    });
    grid.append(card);
  });
}

function selectKt(id) {
  state.selectedId = id;
  renderDetail();
  renderCards();
}

function renderDetail() {
  const kt = ktData.find((item) => item.id === state.selectedId) || ktData[0];
  document.querySelector("#selected-title").textContent = kt.title;
  document.querySelector("#selected-summary").textContent = kt.summary;
  document.querySelector("#instructor-note").textContent = kt.instructorNote;
  document.querySelector("#assignment-note").textContent = kt.assignment;

  const tags = document.querySelector("#selected-tags");
  tags.innerHTML = "";
  [kt.difficulty, kt.topic, kt.source, `${kt.contributors} contributors`].forEach((label) => {
    const tag = document.createElement("span");
    tag.className = "pill";
    tag.textContent = label;
    tags.append(tag);
  });

  const lessonList = document.querySelector("#lesson-list");
  lessonList.innerHTML = "";
  kt.lessons.forEach((lesson) => {
    const item = document.createElement("li");
    item.textContent = lesson;
    lessonList.append(item);
  });
}

document.querySelectorAll(".mode-button").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelector(".mode-button.active").classList.remove("active");
    button.classList.add("active");
    state.mode = button.dataset.mode;
    renderCards();
    renderDetail();
  });
});
[searchInput, topicFilter, difficultyFilter, assignmentFilter].forEach((control) => {
  control.addEventListener("input", renderCards);
});

renderCards();
renderDetail();
