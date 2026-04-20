# KTHub Release Notes - v0.2

## Release Summary

Release 0.2 introduces the Clickable MVP for KTHub. It expands the Release 0.1 static prototype into a navigable product experience with learner/mentor view modes, KT detail pages, KT draft creation, contribution proposals, assignment curation, institution association flow, and a Node.js/Express backend foundation.

## Release Type

Minor product release.

## Delivered Capabilities

- Client-side product routing using browser hash routes.
- View mode switcher for learner and mentor perspectives.
- Explore screen with search, conceptual/technical category, difficulty, assignment, and source filters.
- Full KT detail view with lessons, assignments, mentor notes, contribution history, version, and trust signals.
- Create KT draft workflow using local browser persistence.
- Contribution proposal workflow using local browser persistence.
- Assignment curation workflow using local browser persistence.
- Institutions route with generic institution information, association request flow, and local request withdrawal.
- Documented account model with only `user` and `institution` account types.
- Express backend scaffold with mock API endpoints.
- Updated SDLC documentation for release planning and traceability.

## Technical Notes

- Frontend remains a lightweight static browser application for fast review and continuity with v0.1.
- Backend uses Node.js and Express.js as requested for the production direction.
- Browser localStorage is used only for v0.2 mock persistence.
- Institution admin is represented as a membership-based permission, not an account type.
- No database, real authentication, or authorization is included in this release.

## Validation Checklist

- Open `app/index.html` directly and verify navigation works.
- Run `npm install` and `npm start`, then verify the Express server starts.
- Open the served app and verify Explore, Detail, Create, Contribute, Assignments, and Institutions flows.
- Verify newly created drafts, proposals, assignment drafts, and association requests persist after refresh in the same browser.

## Known Limitations

- Data resets if browser localStorage is cleared.
- Backend mock API and frontend mock data are not yet synchronized through full API calls.
- Authentication is simulated with a local demo user account.
- Institution association requests are local mock records and are not verified by email in v0.2.
- Contribution review is represented as activity, not a production approval workflow.

## Next Release Direction

Release 0.3 should add real backend persistence, user accounts, institution accounts, verified institution association workflow, membership-based permissions, KT CRUD APIs, contribution review APIs, assignment data model, and search API.
