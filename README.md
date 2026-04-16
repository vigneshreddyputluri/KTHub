# KTHub

KTHub is a Knowledge Transfer Hub: a collaborative platform where learners, instructors, professionals, universities, and organizations can publish, learn from, improve, and reuse structured knowledge transfer modules.

The product idea is similar in spirit to GitHub, but instead of source code repositories, the main unit is a **KT**: a practical learning module with lessons, assignments, teaching notes, contributions, reviews, and adoption workflows.

## Current Delivery Stage

This repository currently contains Release 0.2, the Clickable MVP:

- Product vision and scope
- Initial software requirements
- MVP backlog
- Architecture proposal
- Clickable browser MVP
- Node.js and Express.js backend foundation
- Release delivery plan and release notes

## Open The Prototype

For quick review, open this file in a browser:

```text
app/index.html
```

No build step is required for the current browser MVP.

## Run With Express

Install dependencies and start the local server:

```text
npm install
npm start
```

Then open:

```text
http://localhost:3000
```

The v0.2 backend exposes mock API endpoints such as `/api/health`, `/api/kts`, `/api/contributions`, `/api/assignments`, and `/api/institutions`.

## Account Model

KTHub has two account types:

- **User account**: a person, such as a student, lecturer, professor, alumni member, mentor, or professional.
- **Institution account**: a verified college, university, department, company, training center, or organization page.

Institution admin is not a separate account type. It is a verified permission held by a user account for a specific institution.

## KT View Modes

- **Learner view**: view or propose changes to a KT from the learning perspective.
- **Instructor view**: view or propose changes to a KT from the teaching, curation, and assignment perspective.

A user can contribute to a KT while using either view mode.

## Institution Association

A new user account starts without institution association. A user can request association with one or many institutions as a student, lecturer, professor, alumni member, or staff member. Each association must pass that institution's verification or approval process, commonly through an institutional email address.

## Professional SDLC Notes

In a real IT delivery cycle, this project should move through:

1. Discovery and requirement analysis
2. UX and architecture design
3. MVP implementation
4. Testing and quality assurance
5. User acceptance testing
6. Pilot launch
7. Production release and continuous improvement

See the `docs/` folder for the current artifacts.

## Release Documents

- `docs/v0.2-delivery-plan.md`
- `docs/release-notes-v0.2.md`
- `docs/account-and-institution-model.md`
- `docs/backlog.md`
- `docs/requirements.md`
- `docs/architecture.md`
