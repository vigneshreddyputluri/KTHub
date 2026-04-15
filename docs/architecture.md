# KTHub Architecture Proposal

## Recommended MVP Architecture

For the production MVP, use a modular web architecture:

- Frontend: React or Next.js
- Backend: Node.js with NestJS or Express
- Database: PostgreSQL
- Search: PostgreSQL full text search first, then OpenSearch or Meilisearch later
- Authentication: Email/password plus future SSO
- Storage: Object storage for files and media
- Deployment: Cloud platform with CI/CD

## Main Domain Objects

- User
- Profile
- Role
- KT
- KT Version
- Lesson
- Assignment
- Rubric
- Contribution
- Review
- Discussion
- Institution
- Collection
- Cohort

## Suggested Data Model

```text
User 1--1 Profile
User *--* Role
User 1--* KT
KT 1--* KTVersion
KTVersion 1--* Lesson
KTVersion 1--* Assignment
Assignment 1--1 Rubric
KT 1--* Contribution
Contribution 1--* Review
KT 1--* Discussion
Institution 1--* Collection
Collection *--* KT
Cohort *--* KT
```

## Permission Model

- Public viewer: read public KTs
- Authenticated learner: save progress and participate in discussion
- Contributor: propose changes
- Maintainer: review contributions
- Creator: manage owned KTs
- Institution admin: manage collections and organization members
- Platform admin: moderation and system operations

## Professional Architecture Principle

Do not build KTHub as only a content website. The core platform value is collaboration, versioning, contribution review, assignment curation, and role-specific learning views.
