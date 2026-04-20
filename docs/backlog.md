# KTHub MVP Backlog

## Release 0.1 - Prototype

- Create product vision and requirements artifacts
- Build static homepage/dashboard prototype
- Show learner/mentor mode switching
- Show KT cards and detail preview
- Show assignments and contribution activity

## Release 0.2 - Clickable MVP

- Add real routing - Completed with browser hash routes
- Add KT detail page - Completed
- Add create KT form - Completed with local draft persistence
- Add contribution proposal flow - Completed with local proposal persistence
- Add assignment curation flow - Completed with local assignment persistence
- Add learner/mentor view mode switching - Completed
- Add account and institution association model - Completed in docs and mock UI
- Add Node.js and Express.js backend foundation - Completed
- Add v0.2 delivery plan and release notes - Completed

## Release 0.3 - Backend MVP

- Add user and institution accounts
- Add verified institution association workflow
- Add membership-based institution admin permissions
- Add database schema
- Add KT CRUD APIs
- Add contribution review workflow
- Add assignments data model
- Add search API

## Release 0.4 - Pilot

- Invite a small group of students and mentors
- Collect feedback
- Improve onboarding
- Add institution collections
- Add analytics for KT adoption and completion

## Professional Backlog Terms

- **Epic**: A large product capability, such as KT publishing.
- **User story**: A user-centered requirement, such as "As a mentor, I want to adapt a KT for my class."
- **Acceptance criteria**: Conditions that prove a story is complete.
- **Sprint**: A short delivery cycle, commonly one or two weeks.
- **Definition of Done**: The quality checklist before work is accepted.

## Sample User Stories

### KT Discovery

As a learner, I want to discover KTs by conceptual/technical category and difficulty so that I can find practical learning material suitable for my current level.

Acceptance criteria:

- User can see featured KTs.
- User can filter by topic, category and difficulty.
- User can identify whether a KT supports learner mode, mentor mode, or both.

### Mentor Mode

As a mentor, I want mentor notes and assignment rubrics so that I can guide learners through an existing KT effectively.

Acceptance criteria:

- KT detail shows mentor notes.
- KT detail shows session plan.
- KT detail shows assignment rubric.
- Mentor can save an adaptation draft.

### KT Contribution

As a contributor, I want to propose an improvement to a KT so that maintainers can review and merge better content.

Acceptance criteria:

- User can submit a contribution proposal.
- Maintainer can see proposed changes.
- Maintainer can accept or reject the proposal.
- Accepted contribution updates the KT version.
