# Software Requirements Specification

## Product Name

KTHub - Knowledge Transfer Hub

## Scope

The initial version will be a web application that allows users to discover, view, contribute to, enrich, and organize KT modules.

## Release 0.2 Requirement Treatment

Release 0.2 demonstrates the core requirements through a clickable MVP. The application uses mock data, browser localStorage, and a Node.js/Express backend foundation. Production persistence, real authentication, and authorization are deferred to Release 0.3.

## Account Types

KTHub has exactly two account types:

- User account: a person such as a student, lecturer, professor, alumni member, mentor, or professional.
- Institution account: a verified organization page for a college, university, department, company, training center, or community.

Institution admin is not an account type. It is a permission detected from a verified institution membership held by a user account.

## KT View Modes

A user account can view and contribute to a KT in either learner view or mentor view.

### Learner

- Browse public KTs
- Search by category, difficulty, author, institution, and use case
- Open a KT in learner mode
- Follow lessons and assignments
- Track progress
- Ask questions and view discussions

### Mentor

- Open a KT in mentor mode
- View mentor notes, session plan, prerequisite map, assignment rubrics, and common mistakes
- Adapt a KT for a class or cohort
- Curate assignments
- Suggest improvements

## KT Categories

- Conceptual: 
- Technical: 

## User Account Capabilities

- Create and publish KTs
- Add lessons, assignments, resources, and mentor guidance
- Accept or reject contributions
- Version KT releases
- Request association with one or many institutions
- Leave an institution association where permitted

## Institution Account Capabilities

- Create official collections
- Maintain department or team knowledge
- Assign KTs to cohorts
- Review quality and usage
- Verify association requests from students, lecturers, professors, staff, and alumni
- Grant institution admin permission to approved user accounts

## Institution Association Rules

- New user accounts are not associated with any institution by default.
- A user account can be associated with many institutions.
- Each institution association must pass the respective institution's verification or approval process.
- Institution email verification is the first planned verification method.
- Association records must be manageable, including join/request, approval, rejection, and exit flows.
- Institution admins can see statistics only for institutions where their user account has verified admin permission.

## Functional Requirements

- FR-001: Users can browse featured and recent KTs.
- FR-002: Users can filter KTs by KT view mode, conceptual/technical category, difficulty, and source.
- FR-003: Users can view KT detail pages containing overview, lessons, assignments, discussions, and contribution history.
- FR-004: Users can switch between learner and mentor views for supported KTs.
- FR-005: User accounts can publish a KT with structured metadata.
- FR-006: Contributors can propose improvements to KT content.
- FR-007: Maintainers can review, accept, or reject contributions.
- FR-008: KTs can include practical assignments with difficulty, expected output, rubric, and submission guidance.
- FR-009: Institution accounts can create collections of KTs.
- FR-010: The application can show trust signals such as contributors, ratings, version, and adoption count.
- FR-011: User accounts can request association with one or many institutions.
- FR-012: Institution association requires institution-specific verification or approval.
- FR-013: Institution admin access is derived from verified institution membership, not from a separate account type.

## Non-Functional Requirements

- NFR-001: The UI must be clean, simple, and accessible.
- NFR-002: The platform should support technical and non-technical subjects.
- NFR-003: The system should be modular enough to support future mobile apps.
- NFR-004: KT content should be versioned.
- NFR-005: Permissions must protect draft, private, institutional, and public KTs.
- NFR-006: Search should be fast and relevant.
- NFR-007: The platform should support future integrations with LMS tools, GitHub, Google Classroom, and university SSO.

## Out Of Scope For First MVP

- Native mobile apps
- Paid marketplace
- AI grading
- Video hosting infrastructure
- Deep LMS integrations
- Complex university ERP integration

## Release 0.2 Out Of Scope

- Real database persistence
- Production login and session management
- Permission authorization enforcement
- Production institution association verification
- File upload and media hosting
- Production deployment pipeline
