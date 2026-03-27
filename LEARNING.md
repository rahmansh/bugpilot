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


