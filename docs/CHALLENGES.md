# Full-Stack TypeScript Practice Challenges

**Purpose:** Master common patterns in full-stack web development through hands-on practice.

**Project:** BugPilot - Bug tracking application
**Stack:** React, TypeScript, Express, npm workspaces
**Started:** March 27, 2024

---

## 📊 My Progress

| Challenge | Status | First Try | Last Try | Times Practiced | Mastered |
|-----------|--------|-----------|----------|-----------------|----------|
| 1. Shared Type | ✅ | 2024-03-27 | - | 1 | ✅ |
| 2. GET Endpoint | ✅ | 2024-03-27 | - | 1 | ✅ |
| 3. Detail Component | ✅ | 2024-03-27 | - | 1 | ✅ |
| 4. POST Endpoint | ⏳ | - | - | 0 | ⬜ |
| 5. Create Form | ⏳ | - | - | 0 | ⬜ |
| 6. Error Handling | ⏳ | - | - | 0 | ⬜ |
| 7. Filter/Search | ⏳ | - | - | 0 | ⬜ |
| 8. Environment Variables | ⏳ | - | - | 0 | ⬜ |
| 9. Loading Spinner | ⏳ | - | - | 0 | ⬜ |
| 10. Update Endpoint | ⏳ | - | - | 0 | ⬜ |
| 11. Delete Endpoint | ⏳ | - | - | 0 | ⬜ |
| 12. Pagination | ⏳ | - | - | 0 | ⬜ |
| 13. Input Validation | ⏳ | - | - | 0 | ⬜ |
| 14. Debounced Search | ⏳ | - | - | 0 | ⬜ |
| 15. Optimistic Updates | ⏳ | - | - | 0 | ⬜ |

**Legend:** ✅ Completed | ⏳ In Progress | ⬜ Not Started

---

## 🎯 Challenge Categories

### **Foundation (Complete First)**
- Challenge 1-3: Basic CRUD Read operations
- Challenge 8: Configuration
- Challenge 9: Loading states

### **Core CRUD**
- Challenge 4-5: Create operations
- Challenge 10: Update operations
- Challenge 11: Delete operations

### **User Experience**
- Challenge 6: Error handling
- Challenge 7: Filtering/Searching
- Challenge 12: Pagination
- Challenge 14: Debounced search

### **Data Integrity**
- Challenge 13: Validation
- Challenge 15: Optimistic updates

---

## Challenge 1: Add a New Shared Type ⭐

### **Goal**
Create reusable types in the shared package that both client and server can import.

### **Requirements**
1. Create `packages/shared/src/types/user.ts`
2. Define `User` interface with: `id`, `name`, `email`, `role`
3. Define `Role` type: `'admin' | 'developer' | 'viewer'`
4. Create `CreateUserDTO` (fields needed to create a user)
5. Export from `packages/shared/src/types/index.ts`
6. Import and use in both client and server

### **Key Concepts**
- TypeScript `interface` vs `type`
- DTO (Data Transfer Object) pattern
- Monorepo package imports
- Type reusability

### **Common Mistakes**
- Using lowercase for type names (`role` vs `Role`)
- Using `interface` for union types (use `type` instead)
- Forgetting to export from `index.ts`
- Type mismatch between `User.id` and `Bug.id` (should both be `string`)

### **Success Criteria**
- [ ] Can import `User` from `@bugpilot/shared` in client
- [ ] Can import `User` from `@bugpilot/shared` in server
- [ ] TypeScript autocomplete works
- [ ] No TypeScript errors

### **Bonus Challenges**
- Add `UpdateUserDTO` with all optional fields
- Create a `Team` type that references `User[]`
- Add JSDoc comments to document the types

---

## Challenge 2: Add a New API Endpoint ⭐⭐

### **Goal**
Create a GET endpoint that fetches a single resource by ID.

### **Requirements**
1. Add route in `apps/server/src/routes/bugs.ts`
2. Route: `GET /api/bugs/:id`
3. Extract `id` from `req.params`
4. Find bug by id using `.find()`
5. Return bug if found (200 status)
6. Return 404 error if not found
7. Test with browser: `http://localhost:5001/api/bugs/1`

### **Key Concepts**
- Express route parameters (`:id`)
- Array methods (`.find()`)
- HTTP status codes (200, 404)
- Early return pattern

### **Common Mistakes**
- Not checking if bug exists before returning
- Returning 200 status for 404 errors
- Using `let` instead of `const`
- Not using `return` with error response

### **Success Criteria**
- [ ] `GET /api/bugs/1` returns bug 1
- [ ] `GET /api/bugs/999` returns 404 error
- [ ] Response has correct status code
- [ ] No TypeScript errors

### **Bonus Challenges**
- Add route for `GET /api/users/:id`
- Validate that `id` is not empty
- Return specific error message: "Bug with id X not found"

---

## Challenge 3: Display Single Bug Component ⭐⭐

### **Goal**
Create a React component that fetches and displays a single bug.

### **Requirements**
1. Create `apps/client/src/components/BugDetail.tsx`
2. Accept `bugId` as a prop (TypeScript interface)
3. Fetch from `GET /api/bugs/:id` in `useEffect`
4. Show loading state while fetching
5. Show error state if fetch fails
6. Display bug details when loaded
7. Reset state when `bugId` prop changes

### **Key Concepts**
- Component props with TypeScript
- `useState` with nullable types (`Bug | null`)
- `useEffect` with dependencies
- HTTP status code checking (`response.ok`)
- Guard clauses for safe rendering
- State cleanup on prop changes

### **Common Mistakes**
- Using `useState<Bug>([])` - type mismatch!
- Missing `bugId` in useEffect dependency array
- Not checking `response.ok` before parsing JSON
- Not resetting error state when bugId changes
- Rendering bug properties without null check

### **Success Criteria**
- [ ] Component shows loading state initially
- [ ] Displays bug when fetch succeeds
- [ ] Shows error when bug not found
- [ ] Refetches when `bugId` prop changes
- [ ] No console errors or warnings

### **Key Code Pattern**
```typescript
interface Props {
  bugId: string;
}

const BugDetail = ({ bugId }: Props) => {
  const [bug, setBug] = useState<Bug | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Reset state on bugId change
    setLoading(true);
    setError(null);
    setBug(null);

    fetch(`http://localhost:5001/api/bugs/${bugId}`)
      .then(response => {
        if (!response.ok) throw new Error('Bug not found');
        return response.json();
      })
      .then(data => {
        setBug(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, [bugId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!bug) return <p>Not found</p>;

  return <div>{/* Display bug */}</div>;
};
```

### **Bonus Challenges**
- Add "Edit" button that navigates to edit page
- Show created/updated timestamps in human-readable format
- Add "Back to list" button
- Display assignee information

---

## Challenge 4: Add POST Endpoint ⭐⭐⭐

### **Goal**
Create an endpoint that accepts data and creates a new resource.

### **Requirements**
1. Add route in `apps/server/src/routes/bugs.ts`
2. Route: `POST /api/bugs`
3. Read data from `req.body` (type as `CreateBugDTO`)
4. Generate new ID using `crypto.randomUUID()`
5. Set default `status` to `'open'`
6. Add timestamps: `createdAt`, `updatedAt` (use `new Date().toISOString()`)
7. Add new bug to `bugs` array
8. Return created bug with 201 status

### **Key Concepts**
- POST request handling
- Request body parsing (`express.json()` middleware)
- ID generation (`crypto.randomUUID()`)
- HTTP 201 (Created) status
- Default values
- Timestamp generation

### **Common Mistakes**
- Forgetting to set `status: 'open'`
- Using `res.json()` without `res.status(201)`
- Not generating unique IDs
- Missing timestamps
- Not validating required fields

### **Success Criteria**
- [ ] POST creates new bug
- [ ] Bug has unique ID
- [ ] Bug has default status 'open'
- [ ] Bug has timestamps
- [ ] Returns 201 status
- [ ] Bug appears in GET /api/bugs

### **Test Command**
```bash
curl -X POST http://localhost:5001/api/bugs \
  -H "Content-Type: application/json" \
  -d '{
    "title": "New bug",
    "description": "Test bug",
    "priority": "high"
  }'
```

### **Key Code Pattern**
```typescript
router.post('/', (req, res) => {
  const bugData: CreateBugDTO = req.body;

  const newBug: Bug = {
    id: crypto.randomUUID(),
    ...bugData,
    status: 'open',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  bugs.push(newBug);

  res.status(201).json(newBug);
});
```

### **Bonus Challenges**
- Validate that required fields are present (return 400 if missing)
- Check that priority is valid value
- Prevent duplicate titles
- Add `POST /api/users` endpoint

---

## Challenge 5: Create Bug Form ⭐⭐⭐

### **Goal**
Build a form that collects user input and creates a new bug.

### **Requirements**
1. Create `apps/client/src/components/CreateBugForm.tsx`
2. Form fields:
   - `title` - text input (required)
   - `description` - textarea (required)
   - `priority` - select dropdown (critical/high/medium/low)
   - `assignee` - text input (optional)
3. Use controlled inputs (useState for each field)
4. Handle form submission
5. POST data to `/api/bugs`
6. Clear form after success
7. Show success message
8. Show error message if POST fails

### **Key Concepts**
- Controlled form inputs
- Form submission handling
- POST requests with fetch
- Request headers (`Content-Type: application/json`)
- Form validation
- User feedback

### **Common Mistakes**
- Forgetting `e.preventDefault()` in onSubmit
- Not using `JSON.stringify()` for request body
- Missing `Content-Type` header
- Not clearing form after success
- Not handling POST errors

### **Success Criteria**
- [ ] Form collects all bug data
- [ ] Can't submit with empty title/description
- [ ] POST creates bug on server
- [ ] Form clears after success
- [ ] Shows success/error messages
- [ ] No page reload on submit

### **Key Code Pattern**
```typescript
const CreateBugForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<BugPriority>('medium');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('http://localhost:5001/api/bugs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, description, priority }),
      });

      if (!response.ok) throw new Error('Failed to create bug');

      // Clear form
      setTitle('');
      setDescription('');
      setPriority('medium');
      setMessage('Bug created successfully!');
    } catch (err) {
      setMessage('Error creating bug');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Form fields */}
    </form>
  );
};
```

### **Bonus Challenges**
- Disable submit button while loading
- Add client-side validation (min length for title)
- Refresh bug list after creating (callback prop)
- Add "Cancel" button that clears form
- Show character count for description

---

## Challenge 6: Add Error Handling ⭐⭐

### **Goal**
Improve BugList component with comprehensive error handling.

### **Requirements**
1. Open `apps/client/src/components/BugList.tsx`
2. Add `error` state: `useState<string | null>(null)`
3. Add `.catch()` to fetch chain
4. Display error message if fetch fails
5. Test by:
   - Stopping the server
   - Using wrong URL
   - Simulating network error

### **Key Concepts**
- Error state management
- Promise error handling (`.catch()`)
- User-friendly error messages
- Graceful degradation

### **Common Mistakes**
- Not adding error state
- Forgetting to set `loading` to false in catch
- Showing technical error messages to users
- Not testing error scenarios

### **Success Criteria**
- [ ] Shows error when server is down
- [ ] Shows error when network fails
- [ ] Shows error when wrong URL
- [ ] Error message is user-friendly
- [ ] Can recover when server comes back

### **Bonus Challenges**
- Add "Retry" button
- Show different messages for different error types
- Add error boundary for component crashes
- Log errors to console for debugging

---

## Challenge 7: Add Filter and Search ⭐⭐⭐

### **Goal**
Allow users to filter bugs by priority and search by title.

### **Requirements**
1. Add priority filter dropdown to BugList
2. Add search input for bug title
3. Store filter and search in state
4. Filter bugs based on selections
5. Display filtered results
6. Show "No bugs found" when filters match nothing
7. Show result count: "Showing X of Y bugs"

### **Key Concepts**
- Derived state (filtering without mutating original)
- Multiple filters combined
- Case-insensitive search
- Array `.filter()` method
- Controlled select and input

### **Common Mistakes**
- Mutating original bugs array
- Case-sensitive search
- Not handling empty results
- Filter logic bugs (AND vs OR)

### **Success Criteria**
- [ ] Can filter by priority
- [ ] Can search by title
- [ ] Both filters work together
- [ ] Shows correct result count
- [ ] Clears filters shows all bugs

### **Key Code Pattern**
```typescript
const [bugs, setBugs] = useState<Bug[]>([]);
const [priorityFilter, setPriorityFilter] = useState<BugPriority | 'all'>('all');
const [searchTerm, setSearchTerm] = useState('');

// Derived state - doesn't modify original bugs array
const filteredBugs = bugs.filter(bug => {
  const matchesPriority = priorityFilter === 'all' || bug.priority === priorityFilter;
  const matchesSearch = bug.title.toLowerCase().includes(searchTerm.toLowerCase());
  return matchesPriority && matchesSearch;
});

return (
  <div>
    <input
      value={searchTerm}
      onChange={e => setSearchTerm(e.target.value)}
      placeholder="Search bugs..."
    />

    <select value={priorityFilter} onChange={e => setPriorityFilter(e.target.value)}>
      <option value="all">All Priorities</option>
      <option value="critical">Critical</option>
      <option value="high">High</option>
      <option value="medium">Medium</option>
      <option value="low">Low</option>
    </select>

    <p>Showing {filteredBugs.length} of {bugs.length} bugs</p>

    {filteredBugs.map(bug => (...))}
  </div>
);
```

### **Bonus Challenges**
- Add status filter
- Add sort options (by date, priority, title)
- Add "Clear filters" button
- Persist filters in URL query params
- Add assignee filter

---

## Challenge 8: Environment Variables ⭐⭐

### **Goal**
Move hardcoded values to environment variables for better configuration management.

### **Requirements**
1. Create `.env` file in `apps/client/`
2. Add `VITE_API_URL=http://localhost:5001`
3. Update all fetch calls to use `import.meta.env.VITE_API_URL`
4. Create `.env.example` with dummy values
5. Add `.env` to `.gitignore`
6. Test that it works

### **Key Concepts**
- Environment variables
- Vite env variable naming (`VITE_` prefix)
- `.env` vs `.env.example`
- Git security (don't commit secrets)
- Configuration management

### **Common Mistakes**
- Forgetting `VITE_` prefix (won't work!)
- Committing `.env` to git
- Not restarting dev server after changing `.env`
- Hardcoding in some places, using env in others

### **Success Criteria**
- [ ] All fetch calls use env variable
- [ ] Can change API URL in one place
- [ ] `.env` is in `.gitignore`
- [ ] `.env.example` exists for reference
- [ ] No hardcoded URLs remain

### **Files to Update**
```typescript
// Before
fetch('http://localhost:5001/api/bugs')

// After
const API_URL = import.meta.env.VITE_API_URL;
fetch(`${API_URL}/api/bugs`)
```

### **Bonus Challenges**
- Add server environment variables
- Add `VITE_APP_NAME` for branding
- Create `.env.development` and `.env.production`
- Add environment indicator in UI (dev/prod badge)

---

## Challenge 9: Loading Spinner ⭐

### **Goal**
Replace text loading states with visual spinners.

### **Requirements**
1. Create `apps/client/src/components/LoadingSpinner.tsx`
2. Use CSS or shadcn/ui to create spinner
3. Replace all `<p>Loading...</p>` with `<LoadingSpinner />`
4. Center spinner on screen
5. Make it reusable across components

### **Key Concepts**
- Component reusability
- CSS animations
- Conditional rendering
- UI/UX best practices

### **Common Mistakes**
- Making spinner too large/small
- Not centering properly
- Hardcoding size (should be configurable)
- Spinner not visible on all backgrounds

### **Success Criteria**
- [ ] Spinner shows while loading
- [ ] Spinner is centered
- [ ] Spinner is smooth (not janky)
- [ ] Works in BugList and BugDetail
- [ ] Accessible (has aria-label)

### **Simple CSS Spinner**
```typescript
// LoadingSpinner.tsx
export const LoadingSpinner = () => (
  <div className="spinner-container">
    <div className="spinner" aria-label="Loading"></div>
  </div>
);

// CSS
.spinner-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 200px;
}

.spinner {
  border: 4px solid #f3f3f3;
  border-top: 4px solid #3498db;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
```

### **Bonus Challenges**
- Add size prop (small/medium/large)
- Add color prop
- Add loading text below spinner
- Use shadcn/ui Spinner component

---

## Challenge 10: Update Bug Status ⭐⭐⭐

### **Goal**
Allow users to update bug status via PATCH request.

### **Requirements**
**Server:**
1. Add `PATCH /api/bugs/:id` route
2. Read `UpdateBugDTO` from `req.body`
3. Find bug by ID
4. Update only provided fields
5. Update `updatedAt` timestamp
6. Return updated bug

**Client:**
1. Add status dropdown to each bug in BugList
2. On change, send PATCH request
3. Update local state after success
4. Show error if update fails

### **Key Concepts**
- PATCH vs PUT (partial vs full update)
- Partial object updates
- Array immutability (`.map()` to update)
- Optimistic vs pessimistic updates
- Timestamp management

### **Common Mistakes**
- Using PUT instead of PATCH
- Mutating array directly (`bugs[i] = ...`)
- Not updating `updatedAt` timestamp
- Not handling PATCH errors
- Updating UI before server confirms

### **Success Criteria**
- [ ] Can change bug status via dropdown
- [ ] Change persists on page reload
- [ ] `updatedAt` timestamp updates
- [ ] Other fields remain unchanged
- [ ] Shows error if update fails

### **Key Code Pattern (Server)**
```typescript
router.patch('/:id', (req, res) => {
  const { id } = req.params;
  const updates: UpdateBugDTO = req.body;

  const bugIndex = bugs.findIndex(b => b.id === id);

  if (bugIndex === -1) {
    return res.status(404).json({ error: 'Bug not found' });
  }

  // Update only provided fields
  bugs[bugIndex] = {
    ...bugs[bugIndex],
    ...updates,
    updatedAt: new Date().toISOString(),
  };

  res.json(bugs[bugIndex]);
});
```

### **Key Code Pattern (Client)**
```typescript
const handleStatusChange = async (bugId: string, newStatus: BugStatus) => {
  try {
    const response = await fetch(`${API_URL}/api/bugs/${bugId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: newStatus }),
    });

    if (!response.ok) throw new Error('Update failed');

    const updatedBug = await response.json();

    // Update local state
    setBugs(bugs.map(bug =>
      bug.id === bugId ? updatedBug : bug
    ));
  } catch (err) {
    alert('Failed to update bug');
  }
};
```

### **Bonus Challenges**
- Add priority update dropdown
- Add assignee update field
- Implement optimistic updates (update UI immediately)
- Add undo functionality
- Batch update multiple bugs

---

## Challenge 11: Delete Bug Endpoint ⭐⭐

### **Goal**
Add ability to delete bugs from the system.

### **Requirements**
**Server:**
1. Add `DELETE /api/bugs/:id` route
2. Find bug by ID
3. Remove from bugs array
4. Return 204 (No Content) status

**Client:**
1. Add "Delete" button to each bug
2. Show confirmation dialog
3. Send DELETE request on confirm
4. Remove from local state after success
5. Show error if delete fails

### **Key Concepts**
- DELETE requests
- HTTP 204 status (No Content)
- Array `.filter()` for removal
- Confirmation dialogs
- Optimistic deletion

### **Common Mistakes**
- Not asking for confirmation
- Mutating array with `.splice()`
- Returning deleted bug (should return nothing)
- Not removing from UI after delete

### **Success Criteria**
- [ ] Can delete bugs
- [ ] Asks for confirmation
- [ ] Bug removed from server
- [ ] Bug removed from UI
- [ ] Cannot delete non-existent bug

### **Key Code Pattern (Server)**
```typescript
router.delete('/:id', (req, res) => {
  const { id } = req.params;

  const bugIndex = bugs.findIndex(b => b.id === id);

  if (bugIndex === -1) {
    return res.status(404).json({ error: 'Bug not found' });
  }

  bugs.splice(bugIndex, 1);

  res.status(204).send(); // No content
});
```

### **Key Code Pattern (Client)**
```typescript
const handleDelete = async (bugId: string, title: string) => {
  const confirmed = window.confirm(`Delete bug: "${title}"?`);
  if (!confirmed) return;

  try {
    const response = await fetch(`${API_URL}/api/bugs/${bugId}`, {
      method: 'DELETE',
    });

    if (!response.ok) throw new Error('Delete failed');

    // Remove from UI
    setBugs(bugs.filter(bug => bug.id !== bugId));
  } catch (err) {
    alert('Failed to delete bug');
  }
};
```

### **Bonus Challenges**
- Add "Undo" after deletion (soft delete)
- Batch delete multiple bugs
- Archive instead of delete
- Add deleted count to UI

---

## Challenge 12: Pagination ⭐⭐⭐

### **Goal**
Display large lists in pages to improve performance and UX.

### **Requirements**
**Server:**
1. Update `GET /api/bugs` to accept query params:
   - `page` (default: 1)
   - `limit` (default: 10)
2. Return paginated bugs
3. Return metadata: `{ bugs, total, page, limit, totalPages }`

**Client:**
1. Add pagination controls (Previous/Next buttons)
2. Show current page and total pages
3. Fetch correct page when buttons clicked
4. Disable Previous on page 1
5. Disable Next on last page

### **Key Concepts**
- Query parameters (`req.query`)
- Array slicing (`.slice()`)
- Pagination math
- Disabled button states
- Page state management

### **Common Mistakes**
- Off-by-one errors in pagination math
- Not validating page/limit params
- Negative page numbers
- Not showing total pages

### **Success Criteria**
- [ ] Shows 10 bugs per page
- [ ] Can navigate between pages
- [ ] Shows "Page X of Y"
- [ ] Previous/Next buttons work correctly
- [ ] Handles edge cases (empty pages)

### **Key Code Pattern (Server)**
```typescript
router.get('/', (req, res) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;

  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;

  const paginatedBugs = bugs.slice(startIndex, endIndex);
  const totalPages = Math.ceil(bugs.length / limit);

  res.json({
    bugs: paginatedBugs,
    total: bugs.length,
    page,
    limit,
    totalPages,
  });
});
```

### **Key Code Pattern (Client)**
```typescript
const [page, setPage] = useState(1);
const [totalPages, setTotalPages] = useState(1);

useEffect(() => {
  fetch(`${API_URL}/api/bugs?page=${page}&limit=10`)
    .then(res => res.json())
    .then(data => {
      setBugs(data.bugs);
      setTotalPages(data.totalPages);
    });
}, [page]);

return (
  <div>
    {/* Bug list */}

    <div>
      <button
        onClick={() => setPage(p => p - 1)}
        disabled={page === 1}
      >
        Previous
      </button>

      <span>Page {page} of {totalPages}</span>

      <button
        onClick={() => setPage(p => p + 1)}
        disabled={page === totalPages}
      >
        Next
      </button>
    </div>
  </div>
);
```

### **Bonus Challenges**
- Add page number buttons (1, 2, 3...)
- Add "Jump to page" input
- Add page size selector (10, 25, 50, 100)
- Show result range ("Showing 1-10 of 42")
- Persist page in URL query params

---

## Challenge 13: Input Validation ⭐⭐⭐

### **Goal**
Validate user input on both client and server to prevent bad data.

### **Requirements**
**Server:**
1. Validate POST/PATCH request bodies
2. Check required fields exist
3. Check field types are correct
4. Check enum values are valid
5. Return 400 with error messages

**Client:**
1. Add validation to CreateBugForm
2. Show validation errors inline
3. Disable submit if form invalid
4. Validate on blur and on submit

### **Key Concepts**
- Client-side validation (UX)
- Server-side validation (security)
- Input sanitization
- Error messages
- Form state management

### **Validation Rules**
```typescript
// Bug validation
title:
  - Required
  - Min length: 5
  - Max length: 100

description:
  - Required
  - Min length: 10
  - Max length: 1000

priority:
  - Required
  - Must be: low | medium | high | critical

status:
  - Must be: open | in-progress | resolved | closed

assignee:
  - Optional
  - Must be valid email if provided
```

### **Common Mistakes**
- Only validating on client (insecure!)
- Poor error messages ("Invalid input")
- Not showing which field has error
- Validating on every keystroke (annoying)

### **Success Criteria**
- [ ] Cannot submit invalid data
- [ ] Shows specific error messages
- [ ] Server rejects invalid data (400)
- [ ] Client shows inline errors
- [ ] Good UX (validate on blur, not on type)

### **Key Code Pattern (Server)**
```typescript
router.post('/', (req, res) => {
  const { title, description, priority } = req.body;

  const errors: string[] = [];

  if (!title || title.trim().length < 5) {
    errors.push('Title must be at least 5 characters');
  }

  if (!description || description.trim().length < 10) {
    errors.push('Description must be at least 10 characters');
  }

  const validPriorities = ['low', 'medium', 'high', 'critical'];
  if (!priority || !validPriorities.includes(priority)) {
    errors.push('Invalid priority');
  }

  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  // Create bug...
});
```

### **Key Code Pattern (Client)**
```typescript
const [errors, setErrors] = useState<Record<string, string>>({});

const validate = () => {
  const newErrors: Record<string, string> = {};

  if (title.trim().length < 5) {
    newErrors.title = 'Title must be at least 5 characters';
  }

  if (description.trim().length < 10) {
    newErrors.description = 'Description must be at least 10 characters';
  }

  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};

const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();
  if (!validate()) return;

  // Submit form...
};

return (
  <form onSubmit={handleSubmit}>
    <input
      value={title}
      onChange={e => setTitle(e.target.value)}
      onBlur={validate}
    />
    {errors.title && <span className="error">{errors.title}</span>}

    {/* Other fields... */}
  </form>
);
```

### **Bonus Challenges**
- Use Zod for schema validation
- Add email validation for assignee
- Add URL validation if bugs have links
- Prevent XSS by sanitizing inputs
- Show character count for text fields

---

## Challenge 14: Debounced Search ⭐⭐⭐

### **Goal**
Implement search that only triggers after user stops typing (performance optimization).

### **Requirements**
1. Add search input to BugList
2. Implement debounce (wait 300ms after last keystroke)
3. Only search when user pauses typing
4. Show loading indicator while searching
5. Cancel previous search if new one starts

### **Key Concepts**
- Debouncing (performance)
- Timeouts and cleanup
- useEffect cleanup function
- Search UX best practices

### **Common Mistakes**
- Searching on every keystroke (too many requests!)
- Not clearing previous timeout
- Not showing search is happening
- Debounce time too long/short

### **Success Criteria**
- [ ] Doesn't search while typing
- [ ] Searches after 300ms pause
- [ ] Shows "Searching..." indicator
- [ ] Cancels old searches
- [ ] Smooth user experience

### **Key Code Pattern**
```typescript
const [searchTerm, setSearchTerm] = useState('');
const [debouncedTerm, setDebouncedTerm] = useState('');

// Debounce search term
useEffect(() => {
  const timer = setTimeout(() => {
    setDebouncedTerm(searchTerm);
  }, 300);

  return () => clearTimeout(timer); // Cleanup!
}, [searchTerm]);

// Fetch when debounced term changes
useEffect(() => {
  if (debouncedTerm) {
    // Perform search with debouncedTerm
    fetch(`${API_URL}/api/bugs?search=${debouncedTerm}`)
      .then(res => res.json())
      .then(data => setBugs(data));
  }
}, [debouncedTerm]);

return (
  <input
    value={searchTerm}
    onChange={e => setSearchTerm(e.target.value)}
    placeholder="Search bugs..."
  />
);
```

### **Bonus Challenges**
- Create reusable `useDebounce` hook
- Add search on server (vs client-side filter)
- Highlight search matches in results
- Show "No results for X" message
- Add search history dropdown

---

## Challenge 15: Optimistic Updates ⭐⭐⭐

### **Goal**
Update UI immediately before server confirms (feels instant).

### **Requirements**
1. When user updates bug status, update UI immediately
2. Send PATCH request to server
3. If server confirms, keep UI change
4. If server fails, revert UI change
5. Show subtle error notification

### **Key Concepts**
- Optimistic UI updates
- Rollback on failure
- Error recovery
- User experience
- Race conditions

### **Common Mistakes**
- Not handling server failures
- Not rolling back on error
- Losing user's place in UI
- Showing jarring error states

### **Success Criteria**
- [ ] UI updates instantly
- [ ] Reverts if server fails
- [ ] Smooth error handling
- [ ] No flickering or jank
- [ ] User knows when error occurs

### **Key Code Pattern**
```typescript
const handleStatusChange = async (bugId: string, newStatus: BugStatus) => {
  // 1. Save old state for rollback
  const oldBugs = [...bugs];

  // 2. Update UI optimistically
  setBugs(bugs.map(bug =>
    bug.id === bugId
      ? { ...bug, status: newStatus }
      : bug
  ));

  try {
    // 3. Send to server
    const response = await fetch(`${API_URL}/api/bugs/${bugId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: newStatus }),
    });

    if (!response.ok) throw new Error('Update failed');

    // 4. Success - keep optimistic update
    const updatedBug = await response.json();
    setBugs(bugs.map(bug =>
      bug.id === bugId ? updatedBug : bug
    ));

  } catch (err) {
    // 5. Failure - rollback!
    setBugs(oldBugs);
    alert('Failed to update. Changes reverted.');
  }
};
```

### **Bonus Challenges**
- Add loading state while request in flight
- Queue multiple updates
- Add retry mechanism
- Show toast notification instead of alert
- Highlight recently updated items

---

## 🎓 Learning Patterns

### **After Each Challenge**
1. ✅ Complete the requirements
2. 📝 Document what you learned
3. 🐛 Note mistakes you made
4. ⏱️ Record time taken
5. 💡 Identify key code patterns

### **Weekly Review**
- Redo 2-3 challenges from memory
- Compare with first attempt
- Note improvement areas
- Update mastery status

### **Monthly Practice**
- Complete all 15 in a new project
- See how much faster you are
- Teach someone else
- Write blog post about learnings

---

## 📚 Additional Resources

### **TypeScript**
- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
- [Type Challenges](https://github.com/type-challenges/type-challenges)

### **React**
- [React Docs (New)](https://react.dev/)
- [React TypeScript Cheatsheet](https://react-typescript-cheatsheet.netlify.app/)

### **Express**
- [Express Routing Guide](https://expressjs.com/en/guide/routing.html)
- [REST API Best Practices](https://stackoverflow.blog/2020/03/02/best-practices-for-rest-api-design/)

### **Patterns**
- [JavaScript Patterns](https://www.patterns.dev/)
- [Refactoring Guru](https://refactoring.guru/design-patterns)

---

## 🎯 Mastery Checklist

Mark ✅ when you can do each WITHOUT looking at docs:

**TypeScript**
- [ ] Define interfaces and types
- [ ] Use generics (useState<T>)
- [ ] Type function parameters and returns
- [ ] Use union types and type guards

**React**
- [ ] Create functional components
- [ ] Use useState and useEffect
- [ ] Handle forms with controlled inputs
- [ ] Manage component props
- [ ] Implement conditional rendering
- [ ] Handle async data fetching

**Express**
- [ ] Create GET/POST/PATCH/DELETE routes
- [ ] Use route parameters and query strings
- [ ] Handle request bodies
- [ ] Return appropriate status codes
- [ ] Organize routes with Router

**Full-Stack**
- [ ] Share types across client/server
- [ ] Handle errors on both ends
- [ ] Validate data on both ends
- [ ] Manage async state
- [ ] Build complete CRUD features

---

## 💪 Next Steps After Mastery

Once mastered these 15 challenges:

1. **Add Database** - Replace in-memory arrays with PostgreSQL + Prisma
2. **Add Authentication** - JWT tokens, login/signup, protected routes
3. **Add Testing** - Jest, React Testing Library, Supertest
4. **Add Deployment** - Docker, CI/CD, hosting (Vercel/Railway)
5. **Add Real-time** - WebSockets for live updates
6. **Add File Upload** - Handle bug attachments
7. **Add Email** - Notifications for bug assignments
8. **Add Teams** - Multi-user collaboration

---

