const baseKts = [
  {
    id: "full-stack-foundations",
    title: "Full Stack Web Development Foundations",
    summary: "Frontend, backend, APIs, databases, and deployment through a realistic project.",
    topic: "technology",
    difficulty: "Beginner",
    source: "Community maintained",
    version: "v1.4",
    adoptionCount: 1840,
    modes: ["learner", "instructor"],
    hasAssignment: true,
    rating: "4.9",
    contributors: 128,
    lessons: ["Web architecture basics", "HTML, CSS, and JavaScript flow", "REST API design", "Database modeling", "Deployment checklist"],
    instructorNote: "Use one mini-product across all sessions so students see how each layer connects.",
    assignment: "Build a course feedback app with authentication, feedback submission, admin review, and deployment evidence.",
    rubric: "Functionality, API structure, UI clarity, deployment evidence, and reflection quality.",
    contributionHistory: ["Added REST API checklist", "Improved database modeling lesson", "Merged deployment resource pack"],
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
    modes: ["learner", "instructor"],
    hasAssignment: true,
    rating: "4.7",
    contributors: 64,
    lessons: ["Choosing a research problem", "Literature review mapping", "Methodology design", "Ethics and citations", "Final report structure"],
    instructorNote: "Run weekly peer review checkpoints and maintain a visible rubric from day one.",
    assignment: "Create a one-page research proposal with question, hypothesis, method, risks, and expected output.",
    rubric: "Problem clarity, source quality, method fit, ethics awareness, and feasibility.",
    contributionHistory: ["Updated citation examples", "Added peer review checkpoint", "Improved ethics guidance"],
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
    modes: ["learner", "instructor"],
    hasAssignment: true,
    rating: "4.8",
    contributors: 91,
    lessons: ["Professional email structure", "Status reporting", "Meeting minutes", "Presentation clarity", "Escalation etiquette"],
    instructorNote: "Teach using messy real-world scenarios and ask learners to rewrite them professionally.",
    assignment: "Convert an unclear project update into a concise stakeholder email and action tracker.",
    rubric: "Tone, brevity, action clarity, audience fit, and follow-up discipline.",
    contributionHistory: ["Added escalation examples", "Reworked meeting minutes template", "Merged stakeholder update exercise"],
  },
  {
    id: "teaching-ai-literacy",
    title: "Teaching AI Literacy Without Coding",
    summary: "A non-technical teaching kit for AI concepts, ethics, prompts, and evaluation.",
    topic: "teaching",
    difficulty: "Intermediate",
    source: "Instructor network",
    version: "v1.0",
    adoptionCount: 760,
    modes: ["learner", "instructor"],
    hasAssignment: true,
    rating: "4.6",
    contributors: 52,
    lessons: ["What AI systems do", "Prompt design", "Bias and reliability", "Classroom activities", "Assessment patterns"],
    instructorNote: "Keep examples domain-neutral so arts, commerce, science, and engineering students can participate.",
    assignment: "Design a responsible AI use policy for a class project and defend it with three examples.",
    rubric: "Policy clarity, risk identification, practical examples, and responsible use reasoning.",
    contributionHistory: ["Added assessment prompts", "Improved bias activity", "Added classroom policy template"],
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
    modes: ["learner", "instructor"],
    hasAssignment: false,
    rating: "4.5",
    contributors: 37,
    lessons: ["Guest journey mapping", "Service standards", "Complaint recovery", "Shift handover", "Quality review"],
    instructorNote: "Role-play difficult guest scenarios and evaluate response tone, speed, and ownership.",
    assignment: "Create a service recovery plan for a delayed room check-in with guest communication scripts.",
    rubric: "Empathy, speed, ownership, escalation judgment, and recovery completeness.",
    contributionHistory: ["Added handover template", "Improved service recovery scenario"],
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
    modes: ["learner", "instructor"],
    hasAssignment: true,
    rating: "4.9",
    contributors: 143,
    lessons: ["Data types", "Cleaning spreadsheet data", "Summary statistics", "Chart selection", "Insight storytelling"],
    instructorNote: "Use familiar datasets like marks, attendance, expenses, or survey results before advanced tools.",
    assignment: "Clean a student activity dataset and present three useful charts with written interpretation.",
    rubric: "Data cleaning accuracy, chart selection, interpretation quality, and presentation clarity.",
    contributionHistory: ["Added chart selection guide", "Merged attendance dataset", "Updated rubric for beginners"],
  },
];

const viewModeContent = {
  learner: {
    title: "Learner view",
    empty: "No KTs match your learner filters.",
    action: "View or propose changes to KTs from the learning perspective.",
  },
  instructor: {
    title: "Instructor view",
    empty: "No KTs match your instructor filters.",
    action: "View or propose changes to KTs from the teaching and curation perspective.",
  },
};

const storage = {
  viewMode: "kthub.viewMode",
  drafts: "kthub.ktDrafts",
  proposals: "kthub.proposals",
  curatedAssignments: "kthub.curatedAssignments",
  institutionMemberships: "kthub.institutionMemberships",
  associationRequests: "kthub.associationRequests",
};

const app = document.querySelector("#app");
const viewModeSelect = document.querySelector("#view-mode-select");

const currentAccount = {
  id: "user-demo-001",
  type: "user",
  name: "Demo User",
  email: "student@example.edu",
};

const verifiedInstitutions = [
  {
    id: "kakatiya-institute",
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

const state = {
  viewMode: normalizeViewMode(localStorage.getItem(storage.viewMode)),
  filters: {
    query: "",
    topic: "all",
    difficulty: "all",
    source: "all",
    assignmentOnly: false,
  },
};

function readCollection(key) {
  try {
    return JSON.parse(localStorage.getItem(key)) || [];
  } catch (_error) {
    return [];
  }
}

function writeCollection(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function normalizeViewMode(value) {
  return value === "instructor" ? "instructor" : "learner";
}

function getKts() {
  return [...readCollection(storage.drafts), ...baseKts];
}

function getProposals() {
  return readCollection(storage.proposals);
}

function getCuratedAssignments() {
  return readCollection(storage.curatedAssignments);
}

function getInstitutionMemberships() {
  return readCollection(storage.institutionMemberships);
}

function getAssociationRequests() {
  return readCollection(storage.associationRequests);
}

function getInstitutionById(id) {
  return verifiedInstitutions.find((institution) => institution.id === id);
}

function getAdminMemberships() {
  return getInstitutionMemberships().filter((membership) => (
    membership.accountId === currentAccount.id
    && membership.status === "Verified"
    && membership.institutionRole === "Institution admin"
  ));
}

function getRoute() {
  const hash = window.location.hash.replace(/^#/, "") || "/";
  const parts = hash.split("/").filter(Boolean);
  return {
    path: `/${parts[0] || ""}`,
    id: parts[1],
  };
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function slugify(value) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function getVisibleKts() {
  const query = state.filters.query.toLowerCase();

  return getKts().filter((kt) => {
    const queryText = `${kt.title} ${kt.summary} ${kt.source} ${kt.topic}`.toLowerCase();
    return kt.modes.includes(state.viewMode)
      && (state.filters.topic === "all" || kt.topic === state.filters.topic)
      && (state.filters.difficulty === "all" || kt.difficulty === state.filters.difficulty)
      && (state.filters.source === "all" || kt.source === state.filters.source)
      && (!state.filters.assignmentOnly || kt.hasAssignment)
      && (!query || queryText.includes(query));
  });
}

function renderLayout(content) {
  app.innerHTML = content;
}

function renderHome() {
  const featured = getKts().slice(0, 3);
  renderLayout(`
    <section class="hero">
      <div class="hero-copy">
        <p class="eyebrow">Knowledge transfer, made collaborative</p>
        <h1>KTHub</h1>
        <p class="hero-text">
          Discover, teach, improve, and reuse practical knowledge modules across classrooms,
          companies, and communities.
        </p>
        <div class="hero-actions">
          <a class="primary-action" href="#/explore">Explore KTs</a>
          <a class="secondary-action" href="#/create">Create KT</a>
        </div>
      </div>
      <div class="hero-panel" aria-label="KTHub platform snapshot">
        <div class="knowledge-map" aria-label="Knowledge collaboration map">
          <span class="map-node large">KT</span>
          <span class="map-node top">Learners</span>
          <span class="map-node right">Instructors</span>
          <span class="map-node bottom">Assignments</span>
          <span class="map-node left">Contributors</span>
        </div>
        <div class="signal-row">
          <span>Active KTs</span>
          <strong>${getKts().length.toLocaleString()}</strong>
        </div>
        <div class="signal-row">
          <span>Saved proposals</span>
          <strong>${getProposals().length.toLocaleString()}</strong>
        </div>
        <div class="signal-row">
          <span>Curated assignments</span>
          <strong>${getCuratedAssignments().length.toLocaleString()}</strong>
        </div>
      </div>
    </section>
    <section class="mode-bar" aria-label="KT view mode summary">
      ${Object.entries(viewModeContent).map(([key, item]) => `
        <button class="mode-button ${state.viewMode === key ? "active" : ""}" type="button" data-view-mode="${key}">
          ${item.title.replace(" view", "")}
        </button>
      `).join("")}
    </section>
    <section class="dashboard">
      <div class="section-heading">
        <div>
          <p class="eyebrow">Current view mode</p>
          <h2>${viewModeContent[state.viewMode].title}</h2>
        </div>
        <a class="secondary-action" href="#/explore">Open workspace</a>
      </div>
      <p class="route-note">${viewModeContent[state.viewMode].action}</p>
      <div class="kt-grid">
        ${featured.map(renderKtCard).join("")}
      </div>
    </section>
  `);

  document.querySelectorAll("[data-view-mode]").forEach((button) => {
    button.addEventListener("click", () => setViewMode(button.dataset.viewMode));
  });
}

function renderExplore() {
  const visibleKts = getVisibleKts();
  renderLayout(`
    <section class="dashboard" id="explore">
      <div class="section-heading">
        <div>
          <p class="eyebrow">Explore</p>
          <h2>${viewModeContent[state.viewMode].title}</h2>
        </div>
        <a class="primary-action" href="#/create">Create KT</a>
      </div>
      <p class="route-note">${viewModeContent[state.viewMode].action}</p>
      <div class="content-grid">
        <aside class="filters" aria-label="KT filters">
          <h3>Filters</h3>
          <label>
            Search
            <input id="kt-search" type="search" value="${escapeHtml(state.filters.query)}" placeholder="Topic, author, university, skill">
          </label>
          <label>
            Topic
            <select id="topic-filter">
              ${renderOptions(["all", "technology", "business", "science", "teaching"], state.filters.topic)}
            </select>
          </label>
          <label>
            Difficulty
            <select id="difficulty-filter">
              ${renderOptions(["all", "Beginner", "Intermediate", "Advanced"], state.filters.difficulty)}
            </select>
          </label>
          <label>
            Source
            <select id="source-filter">
              ${renderOptions(["all", ...new Set(getKts().map((kt) => kt.source))], state.filters.source)}
            </select>
          </label>
          <label class="check-row">
            <input id="assignment-filter" type="checkbox" ${state.filters.assignmentOnly ? "checked" : ""}>
            <span>Has practical assignments</span>
          </label>
        </aside>
        <div class="kt-grid">
          ${visibleKts.length ? visibleKts.map(renderKtCard).join("") : `<p class="empty-state">${viewModeContent[state.viewMode].empty}</p>`}
        </div>
      </div>
    </section>
  `);

  bindFilters();
}

function renderOptions(options, selected) {
  return options.map((option) => {
    const label = option === "all" ? "All" : option;
    return `<option value="${escapeHtml(option)}" ${option === selected ? "selected" : ""}>${escapeHtml(label)}</option>`;
  }).join("");
}

function renderKtCard(kt) {
  return `
    <article class="kt-card">
      <div class="meta-row">
        <span class="pill">${escapeHtml(kt.difficulty)}</span>
        <span class="pill gold">${escapeHtml(kt.rating)} rating</span>
      </div>
      <div>
        <h3><a href="#/kt/${escapeHtml(kt.id)}">${escapeHtml(kt.title)}</a></h3>
        <p>${escapeHtml(kt.summary)}</p>
      </div>
      <div class="meta-row">
        <span class="pill green">${escapeHtml(kt.contributors)} contributors</span>
        <span class="pill rose">${escapeHtml(kt.source)}</span>
      </div>
      <a class="text-link" href="#/kt/${escapeHtml(kt.id)}">Open KT detail</a>
    </article>
  `;
}

function renderKtDetail(id) {
  const kt = getKts().find((item) => item.id === id) || getKts()[0];
  const proposals = getProposals().filter((proposal) => proposal.ktId === kt.id);
  const viewMode = state.viewMode;

  renderLayout(`
    <section class="kt-detail">
      <div>
        <p class="eyebrow">KT detail</p>
        <h2>${escapeHtml(kt.title)}</h2>
        <p>${escapeHtml(kt.summary)}</p>
        <div class="tag-row">
          <span class="pill">${escapeHtml(kt.difficulty)}</span>
          <span class="pill">${escapeHtml(kt.topic)}</span>
          <span class="pill">${escapeHtml(kt.version)}</span>
          <span class="pill green">${escapeHtml(kt.adoptionCount)} adoptions</span>
          <span class="pill rose">${escapeHtml(kt.source)}</span>
        </div>
      </div>
      <div class="detail-actions">
        <a class="secondary-action" href="#/explore">Back to Explore</a>
        <a class="primary-action" href="#/contribute/${escapeHtml(kt.id)}">Propose change</a>
      </div>
      <div class="detail-columns">
        <article>
          <h3>${viewMode === "mentor" ? "Mentor plan" : "Learning path"}</h3>
          <ul>${kt.lessons.map((lesson) => `<li>${escapeHtml(lesson)}</li>`).join("")}</ul>
        </article>
        <article>
          <h3>Instructor notes</h3>
          <p>${escapeHtml(kt.instructorNote)}</p>
        </article>
        <article>
          <h3>Practical assignment</h3>
          <p>${escapeHtml(kt.assignment)}</p>
          <p><strong>Rubric:</strong> ${escapeHtml(kt.rubric)}</p>
        </article>
      </div>
      <section class="workflow nested-section">
        <div class="section-heading">
          <div>
            <p class="eyebrow">Contribution activity</p>
            <h2>Version improvement history</h2>
          </div>
          <a class="secondary-action" href="#/assignments">Curate assignment</a>
        </div>
        <div class="activity-list">
          ${kt.contributionHistory.map((item) => `<p>${escapeHtml(item)}</p>`).join("")}
          ${proposals.map((item) => `<p>${escapeHtml(item.title)} - ${escapeHtml(item.status)}</p>`).join("")}
        </div>
      </section>
    </section>
  `);
}

function renderCreate() {
  renderLayout(`
    <section class="create-panel">
      <div>
        <p class="eyebrow">KT authoring</p>
        <h2>Create a KT package</h2>
        <p class="route-note">A user account can draft and contribute KTs. Drafts are saved locally for v0.2 review and will become API-backed in v0.3.</p>
      </div>
      <form class="create-form" id="create-form">
        <label>KT title <input name="title" required value="Introduction to Data Analysis"></label>
        <label>Summary <textarea name="summary" rows="3" required>Clean data, calculate summaries, create charts, and communicate insights for beginners.</textarea></label>
        <label>Topic
          <select name="topic">
            <option value="technology">Technology</option>
            <option value="business">Business</option>
            <option value="science">Science</option>
            <option value="teaching">Teaching</option>
          </select>
        </label>
        <label>Difficulty
          <select name="difficulty">
            <option>Beginner</option>
            <option>Intermediate</option>
            <option>Advanced</option>
          </select>
        </label>
        <label>Target audience <input name="audience" value="First-year college students"></label>
        <label>Lessons <textarea name="lessons" rows="4">Data types
Cleaning spreadsheet data
Summary statistics
Chart selection
Insight storytelling</textarea></label>
        <label>Practical assignment <textarea name="assignment" rows="3">Clean a student activity dataset and present three useful charts with written interpretation.</textarea></label>
        <label>Teaching notes <textarea name="instructorNote" rows="3">Use familiar datasets like marks, attendance, expenses, or survey results before advanced tools.</textarea></label>
        <button class="primary-action" type="submit">Save draft</button>
      </form>
    </section>
  `);

  document.querySelector("#create-form").addEventListener("submit", handleCreateKt);
}

function renderContributions(id) {
  const selectedKt = getKts().find((kt) => kt.id === id) || getKts()[0];
  const proposals = getProposals();

  renderLayout(`
    <section class="dashboard">
      <div class="section-heading">
        <div>
          <p class="eyebrow">Contribution proposal</p>
          <h2>Improve a KT</h2>
        </div>
        <a class="secondary-action" href="#/kt/${escapeHtml(selectedKt.id)}">Open selected KT</a>
      </div>
      <div class="content-grid">
        <form class="filters contribution-form" id="proposal-form">
          <h3>Proposal details</h3>
          <label>KT
            <select name="ktId">
              ${getKts().map((kt) => `<option value="${escapeHtml(kt.id)}" ${kt.id === selectedKt.id ? "selected" : ""}>${escapeHtml(kt.title)}</option>`).join("")}
            </select>
          </label>
          <label>Change type
            <select name="changeType">
              <option>Lesson improvement</option>
              <option>Assignment update</option>
              <option>Teaching note</option>
              <option>Resource addition</option>
              <option>Correction</option>
            </select>
          </label>
          <label>Proposal title <input name="title" required placeholder="Add clearer deployment checklist"></label>
          <label>Reason for change <textarea name="reason" rows="4" required></textarea></label>
          <label>Proposed update <textarea name="details" rows="5" required></textarea></label>
          <button class="primary-action" type="submit">Submit proposal</button>
        </form>
        <div class="workflow-grid two-column">
          ${proposals.length ? proposals.map(renderProposalCard).join("") : '<p class="empty-state">No local proposals submitted yet.</p>'}
        </div>
      </div>
    </section>
  `);

  document.querySelector("#proposal-form").addEventListener("submit", handleProposal);
}

function renderProposalCard(proposal) {
  const kt = getKts().find((item) => item.id === proposal.ktId);
  return `
    <article class="workflow-step">
      <span>${escapeHtml(proposal.status)}</span>
      <h3>${escapeHtml(proposal.title)}</h3>
      <p>${escapeHtml(proposal.changeType)} for ${escapeHtml(kt ? kt.title : "KT draft")}</p>
    </article>
  `;
}

function renderAssignments() {
  const curatedAssignments = getCuratedAssignments();

  renderLayout(`
    <section class="dashboard">
      <div class="section-heading">
        <div>
          <p class="eyebrow">Assignment curation</p>
          <h2>Build practical assessment drafts</h2>
        </div>
      </div>
      <div class="content-grid">
        <form class="filters contribution-form" id="assignment-form">
          <h3>Curate assignment</h3>
          <label>KT
            <select name="ktId">
              ${getKts().map((kt) => `<option value="${escapeHtml(kt.id)}">${escapeHtml(kt.title)}</option>`).join("")}
            </select>
          </label>
          <label>Assignment title <input name="title" required placeholder="Build a course feedback app"></label>
          <label>Difficulty
            <select name="difficulty">
              <option>Beginner</option>
              <option>Intermediate</option>
              <option>Advanced</option>
            </select>
          </label>
          <label>Expected output <textarea name="output" rows="3" required></textarea></label>
          <label>Rubric <textarea name="rubric" rows="4" required></textarea></label>
          <label>Submission guidance <textarea name="guidance" rows="3" required></textarea></label>
          <button class="primary-action" type="submit">Save assignment draft</button>
        </form>
        <div class="workflow-grid two-column">
          ${curatedAssignments.length ? curatedAssignments.map(renderAssignmentCard).join("") : '<p class="empty-state">No local assignment drafts yet.</p>'}
        </div>
      </div>
    </section>
  `);

  document.querySelector("#assignment-form").addEventListener("submit", handleAssignment);
}

function renderAssignmentCard(assignment) {
  const kt = getKts().find((item) => item.id === assignment.ktId);
  return `
    <article class="workflow-step">
      <span>${escapeHtml(assignment.difficulty)}</span>
      <h3>${escapeHtml(assignment.title)}</h3>
      <p>${escapeHtml(kt ? kt.title : "KT draft")}</p>
      <p>${escapeHtml(assignment.output)}</p>
    </article>
  `;
}

function renderInstitutions() {
  const memberships = getInstitutionMemberships();
  const requests = getAssociationRequests();
  const adminMemberships = getAdminMemberships();

  renderLayout(`
    <section class="institution-band">
      <div>
        <p class="eyebrow">Universities and organizations</p>
        <h2>Build official knowledge collections</h2>
        <p>
          Institution accounts represent verified colleges, universities, departments, companies, and training teams.
          User accounts can request association with one or many institutions through that institution's verification process.
        </p>
        <div class="hero-actions">
          <button class="primary-action" type="button" id="associate-button">Associate to an institution</button>
        </div>
      </div>
      <div class="institution-stats">
        <span><strong>${verifiedInstitutions.length}</strong> verified institutions</span>
        <span><strong>${memberships.length}</strong> active associations</span>
        <span><strong>${requests.length}</strong> pending requests</span>
      </div>
    </section>
    <section class="dashboard">
      <div class="section-heading">
        <div>
          <p class="eyebrow">Account context</p>
          <h2>Institution associations</h2>
        </div>
      </div>
      <p class="route-note">
        Current mock account: ${escapeHtml(currentAccount.name)} (${escapeHtml(currentAccount.type)} account).
        A newly created user account starts without institution association.
      </p>
      <div class="content-grid">
        <form class="filters contribution-form" id="association-form">
          <h3>Association request</h3>
          <label>Institution
            <select name="institutionId">
              ${verifiedInstitutions.map((institution) => `<option value="${escapeHtml(institution.id)}">${escapeHtml(institution.name)}</option>`).join("")}
            </select>
          </label>
          <label>College or organization email <input name="institutionEmail" type="email" required placeholder="name@college.edu"></label>
          <label>Relationship
            <select name="relationship">
              <option>Student</option>
              <option>Lecturer</option>
              <option>Professor</option>
              <option>Alumni</option>
              <option>Staff</option>
            </select>
          </label>
          <p class="form-note">The selected institution verifies the email or approves the request before association becomes active.</p>
          <button class="primary-action" type="submit">Submit association request</button>
        </form>
        <div class="workflow-grid two-column">
          ${renderAssociationCards(memberships, requests)}
        </div>
      </div>
    </section>
    ${adminMemberships.length ? renderInstitutionAdminStats(adminMemberships) : ""}
  `);

  document.querySelector("#associate-button").addEventListener("click", () => {
    document.querySelector("#association-form").scrollIntoView({ behavior: "smooth", block: "start" });
    document.querySelector("#association-form select").focus();
  });
  document.querySelector("#association-form").addEventListener("submit", handleAssociationRequest);
  document.querySelectorAll("[data-withdraw-request]").forEach((button) => {
    button.addEventListener("click", () => withdrawAssociationRequest(button.dataset.withdrawRequest));
  });
  document.querySelectorAll("[data-leave-membership]").forEach((button) => {
    button.addEventListener("click", () => leaveInstitutionMembership(button.dataset.leaveMembership));
  });
}

function renderAssociationCards(memberships, requests) {
  const membershipCards = memberships.map((membership) => {
    const institution = getInstitutionById(membership.institutionId);
    return `
      <article class="workflow-step">
        <span>${escapeHtml(membership.status)}</span>
        <h3>${escapeHtml(institution ? institution.name : "Institution")}</h3>
        <p>${escapeHtml(membership.relationship)} association</p>
        <p>${escapeHtml(membership.institutionRole)}</p>
        <button class="secondary-action" type="button" data-leave-membership="${escapeHtml(membership.id)}">Leave association</button>
      </article>
    `;
  });
  const requestCards = requests.map((request) => {
    const institution = getInstitutionById(request.institutionId);
    return `
      <article class="workflow-step">
        <span>${escapeHtml(request.status)}</span>
        <h3>${escapeHtml(institution ? institution.name : "Institution")}</h3>
        <p>${escapeHtml(request.relationship)} verification requested with ${escapeHtml(request.institutionEmail)}</p>
        <button class="secondary-action" type="button" data-withdraw-request="${escapeHtml(request.id)}">Withdraw request</button>
      </article>
    `;
  });

  if (!membershipCards.length && !requestCards.length) {
    return '<p class="empty-state">This user account is not associated with any institution yet.</p>';
  }

  return [...membershipCards, ...requestCards].join("");
}

function renderInstitutionAdminStats(adminMemberships) {
  return `
    <section class="dashboard">
      <div class="section-heading">
        <div>
          <p class="eyebrow">Institution admin detection</p>
          <h2>Admin statistics</h2>
        </div>
      </div>
      <div class="workflow-grid">
        ${adminMemberships.map((membership) => {
          const institution = getInstitutionById(membership.institutionId);
          if (!institution) return "";
          return `
            <article class="workflow-step">
              <span>${escapeHtml(institution.domain)}</span>
              <h3>${escapeHtml(institution.name)}</h3>
              <p>${escapeHtml(institution.stats.associatedUsers)} associated users</p>
              <p>${escapeHtml(institution.stats.activeKts)} active KTs</p>
              <p>${escapeHtml(institution.stats.adoptionRate)} KT adoption rate</p>
            </article>
          `;
        }).join("")}
      </div>
    </section>
  `;
}

function bindFilters() {
  document.querySelector("#kt-search").addEventListener("input", (event) => {
    state.filters.query = event.target.value;
    renderExplore();
    const searchInput = document.querySelector("#kt-search");
    searchInput.focus();
    searchInput.setSelectionRange(searchInput.value.length, searchInput.value.length);
  });
  document.querySelector("#topic-filter").addEventListener("input", (event) => {
    state.filters.topic = event.target.value;
    renderExplore();
  });
  document.querySelector("#difficulty-filter").addEventListener("input", (event) => {
    state.filters.difficulty = event.target.value;
    renderExplore();
  });
  document.querySelector("#source-filter").addEventListener("input", (event) => {
    state.filters.source = event.target.value;
    renderExplore();
  });
  document.querySelector("#assignment-filter").addEventListener("input", (event) => {
    state.filters.assignmentOnly = event.target.checked;
    renderExplore();
  });
}

function handleCreateKt(event) {
  event.preventDefault();
  const form = new FormData(event.target);
  const title = form.get("title");
  const draft = {
    id: `${slugify(title)}-${Date.now()}`,
    title,
    summary: form.get("summary"),
    topic: form.get("topic"),
    difficulty: form.get("difficulty"),
    source: "Local draft",
    version: "draft",
    adoptionCount: 0,
    modes: ["learner", "instructor"],
    hasAssignment: Boolean(form.get("assignment")),
    rating: "New",
    contributors: 1,
    lessons: form.get("lessons").split("\n").filter(Boolean),
    instructorNote: form.get("instructorNote"),
    assignment: form.get("assignment"),
    rubric: "Draft rubric to be finalized during assignment curation.",
    contributionHistory: ["Created as local v0.2 draft"],
  };
  const drafts = readCollection(storage.drafts);
  writeCollection(storage.drafts, [draft, ...drafts]);
  window.location.hash = `#/kt/${draft.id}`;
}

function handleProposal(event) {
  event.preventDefault();
  const form = new FormData(event.target);
  const proposal = {
    id: `proposal-${Date.now()}`,
    ktId: form.get("ktId"),
    changeType: form.get("changeType"),
    title: form.get("title"),
    reason: form.get("reason"),
    details: form.get("details"),
    status: "Submitted",
  };
  writeCollection(storage.proposals, [proposal, ...getProposals()]);
  window.location.hash = `#/contributions/${proposal.ktId}`;
}

function handleAssignment(event) {
  event.preventDefault();
  const form = new FormData(event.target);
  const assignment = {
    id: `assignment-${Date.now()}`,
    ktId: form.get("ktId"),
    title: form.get("title"),
    difficulty: form.get("difficulty"),
    output: form.get("output"),
    rubric: form.get("rubric"),
    guidance: form.get("guidance"),
    status: "Draft",
  };
  writeCollection(storage.curatedAssignments, [assignment, ...getCuratedAssignments()]);
  renderAssignments();
}

function handleAssociationRequest(event) {
  event.preventDefault();
  const form = new FormData(event.target);
  const request = {
    id: `association-${Date.now()}`,
    accountId: currentAccount.id,
    accountType: currentAccount.type,
    institutionId: form.get("institutionId"),
    institutionEmail: form.get("institutionEmail"),
    relationship: form.get("relationship"),
    status: "Pending verification",
  };

  writeCollection(storage.associationRequests, [request, ...getAssociationRequests()]);
  renderInstitutions();
}

function withdrawAssociationRequest(id) {
  const remainingRequests = getAssociationRequests().filter((request) => request.id !== id);
  writeCollection(storage.associationRequests, remainingRequests);
  renderInstitutions();
}

function leaveInstitutionMembership(id) {
  const remainingMemberships = getInstitutionMemberships().filter((membership) => membership.id !== id);
  writeCollection(storage.institutionMemberships, remainingMemberships);
  renderInstitutions();
}

function setViewMode(viewMode) {
  state.viewMode = normalizeViewMode(viewMode);
  viewModeSelect.value = state.viewMode;
  localStorage.setItem(storage.viewMode, state.viewMode);
  renderRoute();
}

function renderRoute() {
  const route = getRoute();
  if (route.path === "/explore") renderExplore();
  else if (route.path === "/kt") renderKtDetail(route.id);
  else if (route.path === "/create") renderCreate();
  else if (route.path === "/contributions" || route.path === "/contribute") renderContributions(route.id);
  else if (route.path === "/assignments") renderAssignments();
  else if (route.path === "/institutions") renderInstitutions();
  else renderHome();
}

viewModeSelect.value = state.viewMode;
viewModeSelect.addEventListener("input", (event) => setViewMode(event.target.value));
window.addEventListener("hashchange", renderRoute);
renderRoute();
