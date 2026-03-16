import { useState } from 'react'
import type { Bug } from '@bugpilot/shared'

function App() {
  const [bugs, setBugs] = useState<Bug[]>([])

  return (
    <div style={{ padding: '2rem' }}>
      <h1>BugPilot</h1>
      <p>Bug tracking application</p>

      <div>
        <h2>Bugs ({bugs.length})</h2>
        {bugs.length === 0 && <p>No bugs yet!</p>}
      </div>

      <div style={{ marginTop: '2rem', padding: '1rem', background: '#f5f5f5', borderRadius: '8px' }}>
        <h3>Monorepo Setup Complete!</h3>
        <p>This client app can now use shared types from @bugpilot/shared</p>
        <p>Check the <code>src/App.tsx</code> file to see the imported Bug type in action.</p>
      </div>
    </div>
  )
}

export default App
