# KTHub UML Diagram Drafts

**Document status:** Draft for review  
**Project:** KTHub - Knowledge Transfer Hub  
**Repository:** https://github.com/vigneshreddyputluri/KTHub  
**Local path:** `C:\Users\VIGNESH\Desktop\KTHub`  
**Prepared on:** 19 April 2026  
**Prepared for:** Project design review and final UML documentation

## 1. Reference

This document uses the UML diagram categories described by GeeksforGeeks as a baseline reference. The article explains UML as a standard visual language used to model system structure and behavior, and classifies UML diagrams into structural diagrams and behavioral diagrams.

**Citation:** GeeksforGeeks. "Unified Modeling Language (UML) Diagrams." Last updated 16 April 2026. Available at: https://www.geeksforgeeks.org/system-design/unified-modeling-language-uml-introduction/. Accessed 19 April 2026.

## 2. Project Understanding

KTHub is a Knowledge Transfer platform where users can discover, create, teach, improve, and reuse structured KT modules. The current Release 0.2 implementation is a clickable MVP with a static browser frontend, localStorage-backed mock persistence, and a Node.js/Express backend foundation exposing REST-style mock API endpoints.

Positioning line: **Enhancing learning through collective knowledge enrichment.**

The project documentation and source code identify the following main functional areas:

- KT discovery and filtering.
- Learner and mentor view modes.
- Conceptual and technical KT categories.
- KT detail viewing.
- KT creation as a local draft.
- Contribution proposal submission.
- Assignment curation.
- Institution account model and association request workflow.
- Membership-based institution admin detection.
- Mock backend APIs for KTs, assignments, contributions, accounts, institutions, memberships, and association requests.

## 3. UML Diagram Applicability Matrix

| UML Diagram Type | Recommended for KTHub | Purpose in This Project | Draft Status |
| --- | --- | --- | --- |
| Use Case Diagram | Yes | Shows actors and system-level functionality. | Included |
| Class Diagram | Yes | Shows major domain entities and relationships. | Included |
| Object Diagram | Optional | Shows sample runtime object instances for one scenario. | Included as optional draft |
| Component Diagram | Yes | Shows frontend, backend, mock data, browser storage, and future database direction. | Included |
| Deployment Diagram | Yes | Shows current local MVP deployment and future production architecture. | Included |
| Package Diagram | Yes | Shows logical grouping of modules and documentation areas. | Included |
| Activity Diagram | Yes | Shows workflow steps for core business processes. | Included |
| Sequence Diagram | Yes | Shows interaction order for contribution and institution association flows. | Included |
| State Machine Diagram | Yes | Shows lifecycle of contribution proposal and institution association request. | Included |
| Communication Diagram | Optional | Similar coverage to sequence diagrams; may be added if required by submission format. | Not included in first draft |
| Composite Structure Diagram | Not required currently | Useful when modeling internals of a complex component; current MVP is too lightweight. | Not recommended now |
| Interaction Overview Diagram | Optional | Useful for summarizing multiple workflows at a high level. | Included as activity-style overview |
| Timing Diagram | Not required currently | Useful for time-bound or real-time systems; KTHub has no such requirement in v0.2. | Not recommended now |

## 4. Draft 1 - Use Case Diagram

```mermaid
flowchart LR
  Learner[User Account<br/>Learner View]
  Mentor[User Account<br/>Mentor View]
  Contributor[Contributor]
  Maintainer[KT Maintainer]
  InstitutionAdmin[Institution Admin<br/>permission via verified membership]
  Institution[Institution Account]
  PlatformAdmin[Platform Admin]

  subgraph System[KTHub Platform]
    UC1((Browse KTs))
    UC2((Search and Filter KTs))
    UC3((View KT Detail))
    UC4((Switch View Mode))
    UC5((Create KT Draft))
    UC6((Submit Contribution Proposal))
    UC7((Review Contribution))
    UC8((Curate Assignment))
    UC9((Request Institution Association))
    UC10((Verify Association Request))
    UC11((Manage Institution Collections))
    UC12((View Institution Statistics))
    UC13((Moderate Platform Content))
  end

  Learner --> UC1
  Learner --> UC2
  Learner --> UC3
  Learner --> UC4
  Learner --> UC9

  Mentor --> UC3
  Mentor --> UC4
  Mentor --> UC5
  Mentor --> UC8
  Mentor --> UC9

  Contributor --> UC6
  Maintainer --> UC7

  Institution --> UC11
  InstitutionAdmin --> UC10
  InstitutionAdmin --> UC11
  InstitutionAdmin --> UC12

  PlatformAdmin --> UC13
```

### Review Notes

- Learner and mentor are treated as view modes, not separate account types.
- Institution admin is represented as a permission derived from verified institution membership, not as an account type.
- Platform admin is included as a future operational actor from the architecture documentation.

## 5. Draft 2 - Domain Class Diagram

```mermaid
classDiagram
  class Account {
    +String id
    +String type
    +String name
    +String email
  }

  class UserProfile {
    +String id
    +String accountId
    +String displayName
  }

  class InstitutionProfile {
    +String id
    +String accountId
    +String name
    +String domain
    +String verificationMethod
  }

  class InstitutionMembership {
    +String id
    +String userProfileId
    +String institutionProfileId
    +String relationship
    +String status
    +String institutionRole
  }

  class InstitutionAssociationRequest {
    +String id
    +String accountId
    +String institutionId
    +String institutionEmail
    +String relationship
    +String status
    +DateTime submittedAt
  }

  class InstitutionVerification {
    +String id
    +String method
    +String status
    +DateTime verifiedAt
  }

  class KT {
    +String id
    +String title
    +String summary
    +String category
    +String difficulty
    +String source
    +String version
    +Number adoptionCount
    +Number contributors
  }

  class KTVersion {
    +String id
    +String versionNumber
    +DateTime releasedAt
    +String status
  }

  class Lesson {
    +String id
    +String title
    +String content
    +Number sequence
  }

  class Assignment {
    +String id
    +String title
    +String difficulty
    +String status
    +String expectedOutput
    +String submissionGuidance
  }

  class Rubric {
    +String id
    +String criteria
    +String scoringGuide
  }

  class Contribution {
    +String id
    +String ktId
    +String changeType
    +String title
    +String reason
    +String details
    +String status
  }

  class Review {
    +String id
    +String decision
    +String comments
    +DateTime reviewedAt
  }

  class Discussion {
    +String id
    +String ktId
    +String message
    +DateTime createdAt
  }

  class Collection {
    +String id
    +String title
    +String description
  }

  class Cohort {
    +String id
    +String name
    +String term
  }

  Account "1" --> "0..1" UserProfile : owns
  Account "1" --> "0..1" InstitutionProfile : owns
  UserProfile "1" --> "0..*" InstitutionMembership : holds
  InstitutionProfile "1" --> "0..*" InstitutionMembership : verifies
  UserProfile "1" --> "0..*" InstitutionAssociationRequest : submits
  InstitutionProfile "1" --> "0..*" InstitutionAssociationRequest : receives
  InstitutionMembership "0..*" --> "0..1" InstitutionVerification : supported by

  UserProfile "1" --> "0..*" KT : creates
  KT "1" --> "1..*" KTVersion : versions
  KTVersion "1" --> "0..*" Lesson : contains
  KTVersion "1" --> "0..*" Assignment : contains
  Assignment "1" --> "0..1" Rubric : evaluated by
  KT "1" --> "0..*" Contribution : receives
  Contribution "1" --> "0..*" Review : reviewed through
  KT "1" --> "0..*" Discussion : has
  InstitutionProfile "1" --> "0..*" Collection : manages
  Collection "0..*" --> "0..*" KT : includes
  Cohort "0..*" --> "0..*" KT : assigned
```

### Review Notes

- This diagram combines the current MVP fields with planned Release 0.3 backend entities.
- Cardinalities are draft assumptions based on `docs/architecture.md` and `docs/account-and-institution-model.md`.
- `Account.type` should be restricted to `user` or `institution` in production.

## 6. Draft 3 - Component Diagram

```mermaid
flowchart TB
  Browser[User Browser]

  subgraph Frontend[Frontend - app folder]
    HTML[index.html]
    CSS[styles.css]
    JS[script.js]
    HashRouter[Hash Routing]
    LocalStorage[Browser localStorage]
  end

  subgraph Backend[Backend - server folder]
    Express[Node.js Express Server]
    ApiRoutes[REST API Routes]
    MockData[mockData.js]
  end

  subgraph Future[Future Production Services]
    Auth[Authentication and Authorization]
    Database[(PostgreSQL Database)]
    Search[Search Service]
    ObjectStorage[(Object Storage)]
    Integrations[LMS, SSO, GitHub, Classroom Integrations]
  end

  Browser --> HTML
  HTML --> CSS
  HTML --> JS
  JS --> HashRouter
  JS --> LocalStorage
  Browser --> Express
  Express --> HTML
  Express --> ApiRoutes
  ApiRoutes --> MockData

  ApiRoutes -. Release 0.3 .-> Auth
  ApiRoutes -. Release 0.3 .-> Database
  ApiRoutes -. Future .-> Search
  ApiRoutes -. Future .-> ObjectStorage
  ApiRoutes -. Future .-> Integrations
```

### Review Notes

- Release 0.2 uses localStorage in the browser and mock in-memory backend data.
- The backend foundation already has endpoints for KTs, assignments, contributions, current account, institutions, memberships, and association requests.
- Future components are shown as planned architecture, not current implementation.

## 7. Draft 4 - Deployment Diagram

```mermaid
flowchart TB
  subgraph LocalMachine[Developer or Reviewer Machine]
    BrowserNode[Browser]
    StaticFiles[Static App Files<br/>app/index.html, script.js, styles.css]
    NodeRuntime[Node.js Runtime]
    ExpressApp[Express Application<br/>server/index.js]
    InMemoryData[In-Memory Mock Data<br/>server/mockData.js]
    BrowserStorage[Browser localStorage]
  end

  BrowserNode --> StaticFiles
  BrowserNode --> BrowserStorage
  BrowserNode -->|HTTP localhost:3000| ExpressApp
  NodeRuntime --> ExpressApp
  ExpressApp --> StaticFiles
  ExpressApp --> InMemoryData

  subgraph ProductionTarget[Recommended Production Target]
    WebHost[Web Hosting or CDN]
    AppServer[Node.js Application Server]
    Postgres[(PostgreSQL)]
    ObjectStore[(Object Storage)]
    CICD[CI/CD Pipeline]
  end

  StaticFiles -. future deployment .-> WebHost
  ExpressApp -. future deployment .-> AppServer
  AppServer -. future persistence .-> Postgres
  AppServer -. future media files .-> ObjectStore
  CICD -. build and release .-> WebHost
  CICD -. deploy .-> AppServer
```

### Review Notes

- Current review can be performed by opening `app/index.html` directly or by running the Express server.
- Production deployment should separate durable persistence from mock/local state.

## 8. Draft 5 - Package Diagram

```mermaid
flowchart LR
  subgraph Docs[docs package]
    Vision[product-vision.md]
    Requirements[requirements.md]
    Architecture[architecture.md]
    AccountModel[account-and-institution-model.md]
    Backlog[backlog.md]
    ReleaseDocs[delivery plan and release notes]
  end

  subgraph App[app package]
    UI[index.html]
    Styles[styles.css]
    ClientLogic[script.js]
  end

  subgraph Server[server package]
    ServerIndex[index.js]
    MockDataFile[mockData.js]
  end

  subgraph Domain[domain concepts]
    KTDomain[KT and KT Version]
    AccountDomain[Account and Membership]
    ContributionDomain[Contribution and Review]
    AssignmentDomain[Assignment and Rubric]
    InstitutionDomain[Institution and Collection]
  end

  Docs --> Domain
  App --> Domain
  Server --> Domain
  App --> Server
  ServerIndex --> MockDataFile
```

### Review Notes

- This diagram is repository-oriented and useful for project documentation.
- If the project is upgraded to React/Next.js, this package diagram should be revised into feature modules.

## 9. Draft 6 - Activity Diagram: KT Discovery and Contribution

```mermaid
flowchart TD
  Start([Start])
  SelectMode[Select learner or mentor view mode]
  Browse[Browse featured or recent KTs]
  ApplyFilters[Apply search, category, difficulty, source, and assignment filters]
  OpenDetail[Open KT detail]
  ReviewContent[Review lessons, assignment, rubric, mentor notes, and contribution history]
  Decision{Is improvement required?}
  SubmitProposal[Submit contribution proposal]
  StoreProposal[Store proposal as submitted]
  MaintainerReview[Maintainer reviews proposal]
  ReviewDecision{Accept proposal?}
  MergeChange[Accept and update KT version]
  RejectChange[Reject with reason]
  End([End])

  Start --> SelectMode
  SelectMode --> Browse
  Browse --> ApplyFilters
  ApplyFilters --> OpenDetail
  OpenDetail --> ReviewContent
  ReviewContent --> Decision
  Decision -- No --> End
  Decision -- Yes --> SubmitProposal
  SubmitProposal --> StoreProposal
  StoreProposal --> MaintainerReview
  MaintainerReview --> ReviewDecision
  ReviewDecision -- Yes --> MergeChange
  ReviewDecision -- No --> RejectChange
  MergeChange --> End
  RejectChange --> End
```

### Review Notes

- The current MVP implements proposal submission.
- Maintainer review, acceptance, rejection, and KT version updates are planned capabilities.

## 10. Draft 7 - Activity Diagram: Institution Association

```mermaid
flowchart TD
  Start([Start])
  UserOpensInstitution[User opens Institutions section]
  CurrentState{Existing association?}
  ShowAssociation[Display active membership]
  SubmitRequest[Submit institution association request]
  Pending[Set status to Pending verification]
  VerifyMethod[Institution verifies email or performs approval]
  Decision{Verification successful?}
  CreateMembership[Create verified institution membership]
  GrantRole{Institution admin role granted?}
  EnableAdmin[Enable institution admin statistics and management access]
  StandardAccess[Enable standard institution association]
  RejectRequest[Reject or keep request pending]
  LeaveAssociation[User may leave association where permitted]
  End([End])

  Start --> UserOpensInstitution
  UserOpensInstitution --> CurrentState
  CurrentState -- Yes --> ShowAssociation
  CurrentState -- No --> SubmitRequest
  SubmitRequest --> Pending
  Pending --> VerifyMethod
  VerifyMethod --> Decision
  Decision -- Yes --> CreateMembership
  Decision -- No --> RejectRequest
  CreateMembership --> GrantRole
  GrantRole -- Yes --> EnableAdmin
  GrantRole -- No --> StandardAccess
  ShowAssociation --> LeaveAssociation
  EnableAdmin --> End
  StandardAccess --> End
  RejectRequest --> End
  LeaveAssociation --> End
```

### Review Notes

- The current MVP stores association requests locally.
- Verified membership creation and approval authority are planned backend features.

## 11. Draft 8 - Sequence Diagram: Submit Contribution Proposal

```mermaid
sequenceDiagram
  actor User
  participant Browser as Browser UI
  participant Router as Hash Router
  participant Storage as localStorage
  participant Api as Future Contributions API
  participant Maintainer as KT Maintainer

  User->>Browser: Open KT detail
  Browser->>Router: Navigate to #/kt/{ktId}
  Router-->>Browser: Render KT detail
  User->>Browser: Select Propose change
  Browser->>Router: Navigate to #/contribute/{ktId}
  Router-->>Browser: Render proposal form
  User->>Browser: Enter proposal details
  Browser->>Storage: Save proposal with Submitted status
  Storage-->>Browser: Confirm local save
  Browser-->>User: Display submitted proposal

  Note over Browser,Api: Release 0.3 target behavior
  Browser-->>Api: POST /api/contributions
  Api-->>Maintainer: Make proposal available for review
```

### Review Notes

- Release 0.2 uses localStorage for browser-submitted proposals.
- The Express backend already has `POST /api/contributions`, which can be connected from the frontend in a future release.

## 12. Draft 9 - Sequence Diagram: Institution Association Request

```mermaid
sequenceDiagram
  actor User
  participant Browser as Browser UI
  participant Storage as localStorage
  participant Api as Future Association API
  participant InstitutionAdmin as Institution Admin
  participant Membership as Membership Service

  User->>Browser: Open Institutions section
  Browser-->>User: Display institutions and association form
  User->>Browser: Submit institution email and relationship
  Browser->>Storage: Save request as Pending verification
  Storage-->>Browser: Confirm request saved
  Browser-->>User: Display pending request

  Note over Browser,Membership: Release 0.3 target behavior
  Browser-->>Api: POST /api/institution-association-requests
  Api-->>InstitutionAdmin: Queue request for verification
  InstitutionAdmin-->>Api: Approve or reject request
  Api-->>Membership: Create or update membership
  Membership-->>Browser: Return verified membership state
```

### Review Notes

- Institution association is a formal business workflow and should be part of the final UML submission.
- Admin access must be inferred from verified membership role.

## 13. Draft 10 - State Machine Diagram: Contribution Proposal

```mermaid
stateDiagram-v2
  [*] --> Draft
  Draft --> Submitted: user submits proposal
  Submitted --> InReview: maintainer starts review
  InReview --> Accepted: maintainer approves
  InReview --> Rejected: maintainer rejects
  InReview --> ChangesRequested: maintainer requests updates
  ChangesRequested --> Submitted: contributor resubmits
  Accepted --> Merged: KT version updated
  Rejected --> [*]
  Merged --> [*]
```

### Review Notes

- Current mock data includes `Submitted` and `In Review`.
- `Accepted`, `Rejected`, `Changes Requested`, and `Merged` are recommended for production workflow completeness.

## 14. Draft 11 - State Machine Diagram: Institution Association Request

```mermaid
stateDiagram-v2
  [*] --> NotAssociated
  NotAssociated --> PendingVerification: user submits request
  PendingVerification --> Verified: institution approves
  PendingVerification --> Rejected: institution rejects
  PendingVerification --> Withdrawn: user withdraws request
  Verified --> Active: membership activated
  Active --> Suspended: institution suspends membership
  Suspended --> Active: institution restores membership
  Active --> Exited: user leaves association
  Rejected --> [*]
  Withdrawn --> [*]
  Exited --> [*]
```

### Review Notes

- This aligns with the documented lifecycle: joined/requested, approved, rejected, suspended, and exited.
- The final diagram can be simplified if the evaluator expects only MVP states.

## 15. Draft 12 - Object Diagram: Sample KT Instance

```mermaid
classDiagram
  class demoUser_user_demo_001 {
    id = user-demo-001
    type = user
    name = Demo User
  }

  class kt_full_stack_foundations {
    id = full-stack-foundations
    title = Full Stack Web Development Foundations
    difficulty = Beginner
    version = v1.4
    rating = 4.9
  }

  class assignment_201 {
    id = assignment-201
    title = Build a course feedback app
    difficulty = Beginner
    status = Published
  }

  class proposal_101 {
    id = proposal-101
    title = Add deployment troubleshooting checklist
    changeType = Mentor note
    status = In Review
  }

  demoUser_user_demo_001 --> kt_full_stack_foundations : views and contributes to
  kt_full_stack_foundations --> assignment_201 : contains
  kt_full_stack_foundations --> proposal_101 : has proposal
```

### Review Notes

- Object diagrams are not mandatory but are helpful when explaining mock data and runtime examples.
- This diagram is based on values present in `server/mockData.js` and `app/script.js`.

## 16. Draft 13 - Interaction Overview Diagram

```mermaid
flowchart TD
  Start([KTHub user journey begins])
  AccountContext[Identify current account context]
  ViewMode[Select learner or mentor mode]
  Discover[Discover and filter KT modules]
  Detail[Open KT detail]
  Branch{User intention}
  Learn[Follow learning path and assignment]
  Teach[Use mentor notes and curate assignment]
  Contribute[Submit improvement proposal]
  InstitutionFlow[Request or manage institution association]
  AdminCheck{Verified institution admin?}
  AdminStats[View institution statistics]
  End([Journey complete])

  Start --> AccountContext
  AccountContext --> ViewMode
  ViewMode --> Discover
  Discover --> Detail
  Detail --> Branch
  Branch -- Learn --> Learn
  Branch -- Teach --> Teach
  Branch -- Improve KT --> Contribute
  Branch -- Institution context --> InstitutionFlow
  InstitutionFlow --> AdminCheck
  AdminCheck -- Yes --> AdminStats
  AdminCheck -- No --> End
  Learn --> End
  Teach --> End
  Contribute --> End
  AdminStats --> End
```

### Review Notes

- This gives a management-friendly overview of the main KTHub flows.
- It can be used in presentations before showing detailed activity or sequence diagrams.

## 17. Recommended Final Diagram Set

For a formal academic or corporate submission, the following final set is recommended:

1. Use Case Diagram.
2. Domain Class Diagram.
3. Component Diagram.
4. Deployment Diagram.
5. Package Diagram.
6. Activity Diagram for KT discovery and contribution.
7. Activity Diagram for institution association.
8. Sequence Diagram for contribution proposal.
9. Sequence Diagram for institution association request.
10. State Machine Diagram for contribution proposal.
11. State Machine Diagram for institution association request.

The optional object diagram and interaction overview diagram may be included as supporting diagrams if the final document requires broader coverage.

## 18. Open Review Points

The following items should be confirmed before finalization:

1. Whether the final diagrams should represent only Release 0.2 or the planned Release 0.3 backend MVP as well.
2. Whether the final submission expects strict UML notation in a tool such as StarUML, Visual Paradigm, or draw.io.
3. Whether contribution review roles should include a separate reviewer role or be merged into KT maintainer.
4. Whether institution collection management should be included in the MVP-level diagrams or kept as future scope.
5. Whether platform admin should be retained in final diagrams, because it is documented in architecture but not implemented in Release 0.2.
