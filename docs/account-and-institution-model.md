# KTHub Account And Institution Model

## Purpose

This document defines the account model, KT view modes, institution association process, and institution admin detection rules for KTHub. It is a product and engineering reference for Release 0.2 and future backend releases.

## Account Types

KTHub supports exactly two account types.

| Account Type | Meaning | Examples |
| --- | --- | --- |
| User | A person using KTHub | Student, lecturer, professor, alumni member, mentor, professional |
| Institution | A verified organization page | College, university, department, company, training center |

## Non-Account Concepts

The following are not account types:

- Learner
- Mentor
- Institution admin
- Creator
- Contributor

Learner and mentor are KT view modes. Institution admin is a permission granted to a user through an institution membership. Creator and contributor are activity states that describe what a user is doing, not separate account categories.

## KT View Modes

A user can view and contribute to a KT in two modes:

- Learner view: optimized for lessons, assignments, progress, questions, and practical learning outcomes.
- Mentor view: optimized for mentor notes, session plans, rubrics, assignment curation, common mistakes, and adaptation.

The same user account can switch between learner and mentor views. A contribution proposal should record which view mode was active when the proposal was submitted.

## KT Categories

KTHub classifies KTs into two broad content categories:

- Conceptual: 
- Technical: 

## Institution Association

A user account is not associated with any institution by default.

A user can request association with one or many institutions. Each association has its own verification lifecycle and can be joined, approved, rejected, suspended, or exited independently.

Valid association relationships include:

- Student
- Lecturer
- Professor
- Alumni
- Staff

Each institution defines its verification process. The first supported verification path should be institution email verification, such as a college or organization email address. Later releases can add manual approval by institution admins.

## Institution Admin Detection

Institution admin is not an account type. It is detected from a verified institution membership.

A user should be treated as an institution admin only when all conditions are true:

- The logged-in account type is `user`.
- The user has a membership record for the institution.
- The membership status is verified or active.
- The membership grants the institution role `Institution admin`.

When these conditions are true, the user can access institution-specific statistics and administration screens for that institution only.

## Suggested Backend Entities

```text
Account
InstitutionProfile
InstitutionMembership
InstitutionAssociationRequest
InstitutionVerification
KT
Contribution
Assignment
```

## Suggested Relationships

```text
Account 1--1 UserProfile
Account 1--1 InstitutionProfile
UserProfile 1--* InstitutionMembership
InstitutionProfile 1--* InstitutionMembership
UserProfile 1--* InstitutionAssociationRequest
InstitutionProfile 1--* InstitutionAssociationRequest
InstitutionProfile 1--* Collection
Collection *--* KT
```

## Release 0.2 Treatment

Release 0.2 demonstrates this model with mock browser state and Express mock endpoints. The Institutions route shows generic institution information and an association request flow. Admin statistics appear only when a verified admin membership exists in the mock membership data.

## Release 0.3 Implementation Notes

- Persist accounts, institution profiles, memberships, and verification requests in PostgreSQL.
- Enforce that account type is either `user` or `institution`.
- Use authenticated session data to detect the current account.
- Use membership permissions to authorize institution admin screens.
- Store association history for auditability.
- Support leaving an institution while preserving historical contribution attribution.
