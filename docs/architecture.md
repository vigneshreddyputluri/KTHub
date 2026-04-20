# KTHub Architecture Proposal

## Release 0.2 Architecture

Release 0.2 uses a lightweight architecture to demonstrate the product workflows before database-backed implementation.

- Frontend: static HTML, CSS, and JavaScript
- Routing: browser hash routing
- Mock persistence: browser localStorage
- Backend foundation: Node.js with Express.js
- API style: JSON REST endpoints
- Static delivery: Express serves the `app/` directory

This keeps the clickable MVP easy to review while establishing the backend direction requested for future releases.

## Recommended Production MVP Architecture

For the production MVP, use a modular web architecture:

- Frontend: React or Next.js
- Backend: Node.js with Express.js
- Database: PostgreSQL
- Search: PostgreSQL full text search first, then OpenSearch or Meilisearch later
- Authentication: Email/password plus future SSO
- Storage: Object storage for files and media
- Deployment: Cloud platform with CI/CD

## Main Domain Objects

- Account
- User Profile
- Institution Profile
- Institution Membership
- Institution Association Request
- Institution Verification
- KT
- KT Version
- Lesson
- Assignment
- Rubric
- Contribution
- Review
- Discussion
- Collection
- Cohort

## Suggested Data Model

```text
Account 1--1 UserProfile
Account 1--1 InstitutionProfile
UserProfile 1--* InstitutionMembership
InstitutionProfile 1--* InstitutionMembership
UserProfile 1--* InstitutionAssociationRequest
InstitutionProfile 1--* InstitutionAssociationRequest
InstitutionMembership *--1 InstitutionVerification
UserProfile 1--* KT
KT 1--* KTVersion
KTVersion 1--* Lesson
KTVersion 1--* Assignment
Assignment 1--1 Rubric
KT 1--* Contribution
Contribution 1--* Review
KT 1--* Discussion
InstitutionProfile 1--* Collection
Collection *--* KT
Cohort *--* KT
```

## Account And Permission Model

- Account type: `user` or `institution`
- KT view modes for users: learner and mentor
- KT content categories: conceptual and technical
- User permission: save progress and participate in discussion
- Contributor capability: propose changes from learner or mentor view
- Maintainer permission: review contributions for owned or maintained KTs
- KT owner permission: manage owned KTs
- Institution admin permission: manage collections, organization members, and institution stats for verified memberships only
- Platform admin: moderation and system operations

Institution admin is not an account type. The application must detect it from the logged-in user account's verified institution membership.

## Release 0.2 API Foundation

```text
GET  /api/health
GET  /api/kts
GET  /api/kts/:id
GET  /api/contributions
POST /api/contributions
GET  /api/assignments
POST /api/assignments
GET  /api/accounts/current
GET  /api/institutions
GET  /api/institution-memberships
DELETE /api/institution-memberships/:id
GET  /api/institution-association-requests
POST /api/institution-association-requests
DELETE /api/institution-association-requests/:id
```

These endpoints currently use mock in-memory data. In Release 0.3, they should be connected to database-backed services and protected by authentication and authorization middleware.

## Professional Architecture Principle

Do not build KTHub as only a content website. The core platform value is collaboration, versioning, contribution review, assignment curation, learner/mentor view modes, conceptual/technical content organization, and verified institution association.
