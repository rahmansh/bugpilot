# BugPilot Learning Notes

## Table of Contents
- [Day 1 - Bug List Feature](#day-1--bug-list-feature)

## Day 1 - Bug List Feature
**Date:** March 27, 2024

### Goal
Build a full-stack feature to display bugs from the API

### What I Built(A summary of features):
- Shared Bug types in `packages/shared` (Bug, BugStatus, BugPriority, DTOs)
- Express API: GET /api/bugs endpoint (in `apps/server/src/routes/bugs.ts`)
- React BugList component with fetch and loading state
- Color-coded priorities (red/orange/yellow/gray based on priority)
- Bug count display in header (Bug List(2))

### Key Concepts:
- **Monorepo with npm workspaces** - One repo, multiple apps, shared code
- **Shared Typescript types** - Define once in `packages/shared`, user everywhere
- **Express routers** - Organize routes by features (`routes/bugs.ts`)
- **React useEffect** - Fetch data when component mounts (with `[]` dependency)
- **CORS** - Allows client (port 3000) to talk to server (port 5001)
- **State management** - `userState` + `setBugs` triggers re-render
- Define bug types in shared folder so that client and server have the same understanding about the bug.


### Biggest Insights
- The monorepo archtecture make sharing types effortless - no duplication!
- useEffect with [] runs only noce on mount - prevents infinite loops
- TypeScript catches bugs at compile time instead of runtime

### Questions I Still Have and Decision I have to Make
- How to add a real database and which one to use


### Self-Assesment Quiz
1. What are the three main folders in monorepo and what does each contain?
- Three main folders: apps/ (contains client and server application), packages/ (contains shared code like types), and the root folder (contains workspace configuration)

2. Why do we have a package.json at the root AND in each app folder?
- With package.json at the root we can run, build both client and server all at once. While package.json in each app folder store seperate dependecy for client and server.

Root package.josn:
- Define the workspace ("workspaces" : ["apps/*", "packages/*"])
- Has scripts that run both apps
- Contains shared deve dependencies (Typescript)

App packages.json:
- Each app has its own dependencies (client: React, server: Express)
- Different apps have different needs

3. What does "workspaces": ["apps/*", "packages/*"] do in the root package.josn()
- It tell npm "scan the apps/ and packages/ folders and treat any subfolder with a package.json as part of this monorepo workspace.


