const express = require("express");
const path = require("path");
const {
  kts,
  contributions,
  assignments,
  accounts,
  institutions,
  institutionMemberships,
  associationRequests,
} = require("./mockData");

const app = express();
const port = process.env.PORT || 3000;
const appDirectory = path.join(__dirname, "..", "app");

app.use(express.json());
app.use(express.static(appDirectory));

app.get("/api/health", (_request, response) => {
  response.json({
    status: "ok",
    service: "KTHub API",
    release: "0.2.0",
  });
});

app.get("/api/kts", (_request, response) => {
  response.json({ data: kts });
});

app.get("/api/accounts/current", (_request, response) => {
  response.json({
    data: accounts.find((account) => account.id === "user-demo-001"),
  });
});

app.get("/api/kts/:id", (request, response) => {
  const kt = kts.find((item) => item.id === request.params.id);

  if (!kt) {
    response.status(404).json({ error: "KT not found" });
    return;
  }

  response.json({ data: kt });
});

app.get("/api/contributions", (_request, response) => {
  response.json({ data: contributions });
});

app.post("/api/contributions", (request, response) => {
  const proposal = {
    id: `proposal-${Date.now()}`,
    status: "Submitted",
    submittedAt: new Date().toISOString(),
    ...request.body,
  };

  contributions.unshift(proposal);
  response.status(201).json({ data: proposal });
});

app.get("/api/assignments", (_request, response) => {
  response.json({ data: assignments });
});

app.post("/api/assignments", (request, response) => {
  const assignment = {
    id: `assignment-${Date.now()}`,
    status: "Draft",
    createdAt: new Date().toISOString(),
    ...request.body,
  };

  assignments.unshift(assignment);
  response.status(201).json({ data: assignment });
});

app.get("/api/institutions", (_request, response) => {
  response.json({ data: institutions });
});

app.get("/api/institution-memberships", (_request, response) => {
  response.json({ data: institutionMemberships });
});

app.delete("/api/institution-memberships/:id", (request, response) => {
  const index = institutionMemberships.findIndex((membership) => membership.id === request.params.id);

  if (index === -1) {
    response.status(404).json({ error: "Institution membership not found" });
    return;
  }

  const [removedMembership] = institutionMemberships.splice(index, 1);
  response.json({ data: removedMembership });
});

app.post("/api/institution-association-requests", (request, response) => {
  const associationRequest = {
    id: `association-${Date.now()}`,
    accountId: "user-demo-001",
    accountType: "user",
    status: "Pending verification",
    submittedAt: new Date().toISOString(),
    ...request.body,
  };

  associationRequests.unshift(associationRequest);
  response.status(201).json({ data: associationRequest });
});

app.get("/api/institution-association-requests", (_request, response) => {
  response.json({ data: associationRequests });
});

app.delete("/api/institution-association-requests/:id", (request, response) => {
  const index = associationRequests.findIndex((associationRequest) => associationRequest.id === request.params.id);

  if (index === -1) {
    response.status(404).json({ error: "Institution association request not found" });
    return;
  }

  const [removedAssociationRequest] = associationRequests.splice(index, 1);
  response.json({ data: removedAssociationRequest });
});

app.get("*", (_request, response) => {
  response.sendFile(path.join(appDirectory, "index.html"));
});

app.listen(port, () => {
  console.log(`KTHub v0.2 server running at http://localhost:${port}`);
});
