# KTHub Design Pattern Recommendation Document

**Document status:** Draft for review  
**Project:** KTHub - Knowledge Transfer Hub  
**Repository:** https://github.com/vigneshreddyputluri/KTHub  
**Local path:** `C:\Users\VIGNESH\Desktop\KTHub`  
**Prepared on:** 19 April 2026  
**Prepared for:** Architecture review and Release 0.3 development planning

## 1. Purpose

This document identifies suitable software design patterns for the KTHub project and provides a formal development plan for applying them in future releases. The recommendations are based on the current Release 0.2 implementation, project documentation, and the planned Release 0.3 backend MVP.

The objective is to improve maintainability, modularity, scalability, testability, and long-term extensibility without over-engineering the current clickable MVP.

Product positioning line: **Enhancing learning through collective knowledge enrichment.**

## 2. Reference

This document refers to the design pattern categories described by GeeksforGeeks. The article explains design patterns as reusable solutions for common software design problems and groups them into creational, structural, behavioral, and advanced/system-level patterns.

**Citation:** GeeksforGeeks. "Design Patterns Tutorial." Last updated 16 April 2026. Available at: https://www.geeksforgeeks.org/system-design/software-design-patterns/. Accessed 19 April 2026.

## 3. Current Project Context

KTHub Release 0.2 is a clickable MVP with the following implementation characteristics:

- Static frontend using HTML, CSS, and JavaScript.
- Learner and mentor view modes.
- Conceptual and technical KT categories.
- Browser hash routing.
- Browser localStorage for local draft, proposal, assignment, membership, and association request state.
- Node.js and Express.js backend foundation.
- REST-style JSON API endpoints.
- Mock in-memory data through `server/mockData.js`.

The documented Release 0.3 roadmap includes:

- User and institution accounts.
- Verified institution association workflow.
- Membership-based institution admin permissions.
- Database schema.
- KT CRUD APIs.
- Contribution review workflow.
- Assignment data model.
- Search API.

## 4. Design Pattern Applicability Matrix

| Pattern | Category | Suitability | Recommended Usage in KTHub | Priority |
| --- | --- | --- | --- | --- |
| MVC | Advanced/System-level | Highly suitable | Separate routes/controllers, service logic, data models, and frontend views. | High |
| Repository | Advanced/System-level | Highly suitable | Isolate database access for KTs, accounts, institutions, memberships, assignments, and contributions. | High |
| Service Layer | Advanced/System-level | Highly suitable | Centralize business rules for KT publishing, contribution review, and institution association. | High |
| Strategy | Behavioral | Highly suitable | Support multiple verification methods and search ranking modes. | High |
| State | Behavioral | Highly suitable | Manage contribution proposal and institution association lifecycles. | High |
| Factory Method | Creational | Suitable | Create typed domain objects such as accounts, KTs, assignments, requests, and proposals. | Medium |
| Builder | Creational | Suitable | Build complex KT packages with lessons, assignments, rubrics, resources, and mentor notes. | Medium |
| Facade | Structural | Suitable | Provide simplified APIs over internal modules such as KT management and institution management. | Medium |
| Adapter | Structural | Suitable | Integrate future LMS, SSO, GitHub, Google Classroom, and email verification providers. | Medium |
| Observer/Event-driven | Behavioral/Architecture | Suitable | Notify maintainers, contributors, institutions, and learners about workflow events. | Medium |
| Dependency Injection | Advanced/System-level | Suitable | Improve testability by injecting repositories, services, and external providers. | Medium |
| Chain of Responsibility | Behavioral | Optional | Apply layered authorization and moderation checks. | Low |
| Command | Behavioral | Optional | Represent user actions such as submit proposal, approve request, publish KT, and revert version. | Low |
| Singleton | Creational | Limited use | Use only for configuration or shared database connection management where framework-appropriate. | Low |
| Prototype | Creational | Optional | Clone or adapt KT templates for a new class, cohort, or institution. | Low |
| Decorator | Structural | Optional | Add non-core capabilities such as analytics, audit logging, or caching around services. | Low |

## 5. Recommended Pattern Set for Release 0.3

The following patterns are recommended as the primary implementation baseline for the next backend-focused release:

1. MVC Pattern.
2. Repository Pattern.
3. Service Layer Pattern.
4. Strategy Pattern.
5. State Pattern.
6. Factory Method Pattern.
7. Builder Pattern.
8. Facade Pattern.
9. Adapter Pattern.
10. Dependency Injection.

These patterns suit KTHub because the product is not only a content website. It is a collective knowledge enrichment platform involving accounts, KTs, versions, assignments, contributions, reviews, institution verification, and permissions.

## 6. Pattern Recommendations

### 6.1 MVC Pattern

**Suitability:** Highly suitable.

KTHub currently has all Express route logic in `server/index.js`. As APIs increase, this file will become difficult to maintain. MVC should be introduced to separate request handling, business logic, and data models.

**Recommended structure:**

```text
server/
  app.js
  routes/
    kt.routes.js
    contribution.routes.js
    assignment.routes.js
    institution.routes.js
    account.routes.js
  controllers/
    kt.controller.js
    contribution.controller.js
    assignment.controller.js
    institution.controller.js
    account.controller.js
  services/
    kt.service.js
    contribution.service.js
    assignment.service.js
    institution.service.js
    account.service.js
  repositories/
    kt.repository.js
    contribution.repository.js
    assignment.repository.js
    institution.repository.js
    account.repository.js
  models/
    kt.model.js
    account.model.js
    institution.model.js
```

**Development direction:**

- Move each API group from `server/index.js` into separate route files.
- Controllers should validate request input and call services.
- Services should apply business rules.
- Repositories should handle data persistence.
- Models should define domain structure and database schema mapping.

### 6.2 Repository Pattern

**Suitability:** Highly suitable.

The current MVP reads and mutates arrays from `mockData.js`. Release 0.3 will require PostgreSQL persistence. The Repository Pattern should isolate data access so the service layer does not depend directly on mock arrays or SQL queries.

**Candidate repositories:**

- `KtRepository`
- `AccountRepository`
- `InstitutionRepository`
- `InstitutionMembershipRepository`
- `InstitutionAssociationRequestRepository`
- `ContributionRepository`
- `AssignmentRepository`
- `ReviewRepository`

**Draft interface example:**

```text
KtRepository
  findAll(filters)
  findById(id)
  create(payload)
  update(id, payload)
  publishVersion(ktId, versionPayload)
```

**Development direction:**

- First implement repositories using the existing mock data.
- Later replace mock repositories with PostgreSQL-backed repositories.
- Keep service method signatures unchanged during migration.

### 6.3 Service Layer Pattern

**Suitability:** Highly suitable.

KTHub has business rules that should not be placed directly inside route handlers. Examples include validating institution admin access, creating contribution proposals, reviewing contributions, publishing KT versions, and verifying association requests.

**Candidate services:**

- `KtService`
- `ContributionService`
- `AssignmentService`
- `InstitutionAssociationService`
- `PermissionService`
- `SearchService`
- `NotificationService`

**Development direction:**

- Add services after route/controller separation.
- Move business decisions out of Express handlers.
- Add unit tests for service methods before connecting real database logic.

### 6.4 Strategy Pattern

**Suitability:** Highly suitable.

KTHub will require multiple interchangeable algorithms. The first strong use case is institution verification. Different institutions may verify association using email domain validation, manual admin approval, university SSO, or document-based verification.

**Recommended strategies:**

```text
InstitutionVerificationStrategy
  verify(request)

EmailDomainVerificationStrategy
ManualApprovalStrategy
SsoVerificationStrategy
DocumentVerificationStrategy
```

**Additional future use cases:**

- Search ranking strategy.
- KT recommendation strategy.
- Assignment evaluation strategy.
- Notification delivery strategy.

**Development direction:**

- Start with `EmailDomainVerificationStrategy`.
- Add `ManualApprovalStrategy` for institution admin approval.
- Keep each verification method independently testable.

### 6.5 State Pattern

**Suitability:** Highly suitable.

KTHub has workflow entities with clearly defined lifecycle states. The State Pattern will help avoid scattered conditional logic when workflows mature.

**Contribution proposal states:**

```text
Draft -> Submitted -> In Review -> Accepted -> Merged
Draft -> Submitted -> In Review -> Rejected
In Review -> Changes Requested -> Submitted
```

**Institution association states:**

```text
Not Associated -> Pending Verification -> Verified -> Active
Pending Verification -> Rejected
Pending Verification -> Withdrawn
Active -> Suspended -> Active
Active -> Exited
```

**Development direction:**

- Define allowed status transitions centrally.
- Reject invalid state transitions in the service layer.
- Store status history for auditability in future releases.

### 6.6 Factory Method Pattern

**Suitability:** Suitable.

Factory methods can standardize creation of domain objects and reduce duplicate default values. Current code creates proposals, assignments, and association requests directly inside handlers or frontend functions.

**Recommended factories:**

- `AccountFactory`
- `KtFactory`
- `ContributionFactory`
- `AssignmentFactory`
- `AssociationRequestFactory`

**Development direction:**

- Use factories to assign IDs, default statuses, timestamps, and normalized fields.
- Keep validation in service or validation layer, not inside the factory alone.

### 6.7 Builder Pattern

**Suitability:** Suitable.

A KT package can become complex because it may include metadata, category, lessons, assignments, rubrics, mentor notes, resources, versions, and institution collection mapping. The Builder Pattern can help create complete KT objects step by step.

**Draft builder flow:**

```text
KtBuilder
  setMetadata()
  setCategory()
  addLesson()
  addAssignment()
  addRubric()
  addMentorNotes()
  addResources()
  build()
```

**Development direction:**

- Use this pattern when KT creation becomes multi-step.
- Avoid introducing it too early if KT creation remains simple.
- Apply it for backend KT publishing and import workflows.

### 6.8 Facade Pattern

**Suitability:** Suitable.

KTHub workflows often touch multiple internal modules. For example, publishing a KT may involve KT data, versions, lessons, assignments, rubrics, and notifications. A facade can expose a simple workflow-level interface.

**Candidate facades:**

- `KtManagementFacade`
- `InstitutionManagementFacade`
- `ContributionReviewFacade`

**Development direction:**

- Use facades for high-level workflows consumed by controllers.
- Keep lower-level services independently testable.

### 6.9 Adapter Pattern

**Suitability:** Suitable.

KTHub requirements mention future integrations with LMS tools, GitHub, Google Classroom, and university SSO. The Adapter Pattern will protect the core application from vendor-specific APIs.

**Candidate adapters:**

- `GoogleClassroomAdapter`
- `LmsAdapter`
- `GithubAdapter`
- `UniversitySsoAdapter`
- `EmailProviderAdapter`

**Development direction:**

- Define internal interfaces before adding external integrations.
- Keep provider-specific request and response formats inside adapters.
- Add integration tests for each adapter.

### 6.10 Observer Pattern and Event-Driven Architecture

**Suitability:** Suitable.

KTHub will generate workflow events such as contribution submitted, contribution accepted, KT published, association requested, association approved, and assignment assigned. Observer or event-driven design can decouple event producers from notification, audit, analytics, and activity feed consumers.

**Candidate events:**

- `ContributionSubmitted`
- `ContributionReviewed`
- `KtVersionPublished`
- `AssociationRequested`
- `AssociationApproved`
- `AssignmentCurated`

**Development direction:**

- Start with an in-process event bus.
- Use event handlers for audit logs, notification triggers, and activity feeds.
- Consider message queues only when the application reaches production scale.

### 6.11 Dependency Injection

**Suitability:** Suitable.

Dependency Injection will help services receive repositories, strategies, and adapters without hardcoding concrete implementations. This will simplify testing and future migration from mock data to PostgreSQL.

**Development direction:**

- Keep constructors or factory functions responsible for wiring dependencies.
- Inject repository implementations into services.
- Inject verification strategies into institution association services.
- Avoid global dependencies where practical.

### 6.12 Chain of Responsibility Pattern

**Suitability:** Optional.

This pattern may suit authorization and moderation checks when multiple conditions must be evaluated in sequence.

**Possible usage:**

```text
AuthenticationCheck -> AccountStatusCheck -> MembershipCheck -> InstitutionRoleCheck -> ResourceOwnershipCheck
```

**Development direction:**

- Do not implement immediately.
- Reconsider when authorization rules become complex.

### 6.13 Command Pattern

**Suitability:** Optional.

The Command Pattern may suit auditable operations such as publish KT, submit contribution, approve contribution, reject association request, and leave institution. It is useful if the project later needs undo, retry, audit trails, or background job execution.

**Development direction:**

- Defer until auditability and asynchronous processing requirements become stronger.
- Use service methods first for Release 0.3.

## 7. Patterns Not Recommended for Immediate Implementation

The following patterns should not be prioritized in the immediate next release:

| Pattern | Reason |
| --- | --- |
| Singleton | Can introduce hidden global state. Use only for configuration or database connection management if appropriate. |
| Object Pool | Not required for current web application workload. |
| Flyweight | Useful for memory optimization, but not currently needed. |
| Bridge | Not necessary until the platform has multiple independent implementation dimensions. |
| Visitor | Not required unless complex operations must be applied across many domain object types. |
| Memento | Not required unless detailed undo/restore functionality is added. |

## 8. Proposed Release 0.3 Architecture Direction

The recommended backend architecture should follow this flow:

```text
HTTP Request
  -> Route
  -> Controller
  -> Service
  -> Repository
  -> Database
```

For workflows with interchangeable behavior:

```text
Service
  -> Strategy
  -> Adapter
  -> External Provider
```

For workflow events:

```text
Service
  -> Domain Event
  -> Event Handler
  -> Notification, Audit Log, Analytics, or Activity Feed
```

## 9. Draft Development Plan

### Phase 1 - Backend Modularization

**Objective:** Convert the current Express backend from a single-file implementation into a maintainable MVC structure.

**Activities:**

- Create route modules for KTs, contributions, assignments, accounts, and institutions.
- Create controller modules for each route group.
- Keep existing mock behavior unchanged.
- Add basic request validation.
- Maintain all current API endpoint paths.

**Expected outcome:**

- No functional regression.
- Cleaner backend structure ready for service and repository layers.

### Phase 2 - Service and Repository Layer Introduction

**Objective:** Separate business logic from data access.

**Activities:**

- Create mock repositories that wrap `mockData.js`.
- Create services for KT, contribution, assignment, account, and institution workflows.
- Move status defaulting, timestamp creation, and object construction into factories or service helpers.
- Add unit tests for service behavior.

**Expected outcome:**

- Express controllers become thin.
- Business logic becomes testable.
- Database migration becomes easier.

### Phase 3 - Workflow State Management

**Objective:** Formalize lifecycle rules for contribution proposals and institution association requests.

**Activities:**

- Define allowed state transitions for contributions.
- Define allowed state transitions for institution association requests.
- Add service-level validation for invalid transitions.
- Prepare status history data structure for future audit tracking.

**Expected outcome:**

- Workflow logic becomes consistent.
- Future UI can safely show action buttons based on valid next states.

### Phase 4 - Institution Verification Strategy

**Objective:** Implement flexible institution verification behavior.

**Activities:**

- Define `InstitutionVerificationStrategy`.
- Implement email domain verification as the first strategy.
- Draft manual approval strategy for institution admins.
- Add tests for approval, rejection, and pending states.

**Expected outcome:**

- KTHub can support different verification methods per institution.
- Institution verification logic remains extensible.

### Phase 5 - PostgreSQL Integration

**Objective:** Replace mock repositories with database-backed repositories.

**Activities:**

- Design PostgreSQL schema for accounts, profiles, memberships, requests, KTs, versions, lessons, assignments, rubrics, contributions, and reviews.
- Implement database repositories using the same repository contracts.
- Add migration scripts and seed data.
- Update services to use database repositories through dependency injection.

**Expected outcome:**

- Persistent backend MVP.
- Reduced rewrite risk because services remain stable.

### Phase 6 - Facades, Events, and External Integration Readiness

**Objective:** Prepare for higher-level workflows and external systems.

**Activities:**

- Add facades for KT management, contribution review, and institution management if controllers become workflow-heavy.
- Add simple in-process domain events.
- Add adapter interfaces for future LMS, SSO, and email provider integrations.
- Add audit logging for critical workflow events.

**Expected outcome:**

- System becomes ready for pilot-level workflows.
- External integrations can be introduced without disturbing core domain services.

## 10. Suggested Development Backlog Items

| ID | Backlog Item | Pattern Applied | Priority |
| --- | --- | --- | --- |
| DP-001 | Split Express routes into route and controller modules. | MVC | High |
| DP-002 | Create mock repository layer for existing data. | Repository | High |
| DP-003 | Create service layer for KT and contribution workflows. | Service Layer | High |
| DP-004 | Create institution association service. | Service Layer | High |
| DP-005 | Define contribution status transition rules. | State | High |
| DP-006 | Define institution association status transition rules. | State | High |
| DP-007 | Implement email domain verification strategy. | Strategy | High |
| DP-008 | Add factories for proposals, assignments, and association requests. | Factory Method | Medium |
| DP-009 | Add KT builder for multi-step KT publishing. | Builder | Medium |
| DP-010 | Add facade for contribution review workflow. | Facade | Medium |
| DP-011 | Define adapter interface for external email or SSO provider. | Adapter | Medium |
| DP-012 | Add in-process domain event dispatcher. | Observer/Event-driven | Medium |
| DP-013 | Add dependency injection wiring for services and repositories. | Dependency Injection | Medium |

## 11. Draft Implementation Model

The following module design is recommended for Release 0.3:

```text
server/
  app.js
  index.js
  config/
    environment.js
  routes/
    kt.routes.js
    contribution.routes.js
    assignment.routes.js
    account.routes.js
    institution.routes.js
  controllers/
    kt.controller.js
    contribution.controller.js
    assignment.controller.js
    account.controller.js
    institution.controller.js
  services/
    kt.service.js
    contribution.service.js
    assignment.service.js
    account.service.js
    institution-association.service.js
    permission.service.js
  repositories/
    mock/
      kt.mock-repository.js
      contribution.mock-repository.js
      assignment.mock-repository.js
      institution.mock-repository.js
    postgres/
      kt.postgres-repository.js
      contribution.postgres-repository.js
      assignment.postgres-repository.js
      institution.postgres-repository.js
  factories/
    contribution.factory.js
    assignment.factory.js
    association-request.factory.js
  strategies/
    institution-verification.strategy.js
    email-domain-verification.strategy.js
    manual-approval.strategy.js
  state/
    contribution-state-machine.js
    association-request-state-machine.js
  events/
    event-bus.js
    contribution.events.js
    institution.events.js
  adapters/
    email-provider.adapter.js
    sso-provider.adapter.js
```

## 12. Example Pattern Mapping by Feature

| KTHub Feature | Recommended Pattern Combination |
| --- | --- |
| Browse and search KTs | MVC, Repository, Service Layer, Strategy |
| Create KT package | MVC, Service Layer, Builder, Factory Method |
| Submit contribution proposal | MVC, Service Layer, Factory Method, State, Observer |
| Review contribution proposal | Service Layer, State, Facade, Observer |
| Curate assignments | MVC, Repository, Service Layer, Factory Method |
| Request institution association | MVC, Service Layer, Strategy, State, Factory Method |
| Verify institution membership | Strategy, Service Layer, Repository |
| Detect institution admin permission | Service Layer, Repository, Chain of Responsibility if needed |
| Integrate LMS or SSO | Adapter, Strategy, Dependency Injection |
| Publish KT version | Service Layer, Builder, State, Observer |

## 13. Risks and Controls

| Risk | Impact | Control |
| --- | --- | --- |
| Over-engineering the MVP | Slower delivery and unnecessary complexity | Apply high-priority patterns first and defer optional patterns. |
| Business logic remains in controllers | Low testability and difficult maintenance | Enforce thin controllers and service-based business logic. |
| Database migration causes large rewrite | Schedule delay | Use repository contracts before adding PostgreSQL. |
| Workflow states become inconsistent | Data quality issues | Centralize state transition rules. |
| External integrations pollute domain logic | Vendor lock-in and maintenance issues | Use adapters for external providers. |
| Permission logic becomes scattered | Security defects | Centralize authorization in permission service. |

## 14. Acceptance Criteria for Pattern Adoption

Design pattern adoption should be considered successful when:

1. Existing Release 0.2 API behavior continues to work.
2. Controllers do not contain core business rules.
3. Services can be unit tested without Express request or response objects.
4. Repositories can be replaced from mock implementation to PostgreSQL implementation without changing controller logic.
5. Contribution and association status transitions are centrally controlled.
6. Institution verification can support at least two methods without changing core service logic.
7. Future integrations can be added through adapters without changing domain entities.

## 15. Final Recommendation

KTHub should adopt design patterns gradually, beginning with MVC, Repository, Service Layer, State, and Strategy patterns in Release 0.3. These patterns directly support the immediate backend MVP requirements and reduce the risk of future rewrites.

Factory Method and Builder should be introduced where object creation becomes repetitive or complex. Facade, Adapter, Observer/Event-driven design, and Dependency Injection should be introduced as the platform moves toward pilot readiness and external integrations.

The implementation should remain practical and delivery-focused. Patterns should be used only where they solve a clear project problem such as workflow management, persistence abstraction, verification flexibility, testability, or integration readiness.
