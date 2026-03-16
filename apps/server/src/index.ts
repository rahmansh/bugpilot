import express from 'express'
import cors from 'cors'
import type { Bug } from '@bugpilot/shared'

const app = express()
const PORT = process.env.PORT || 5001

// Middleware
app.use(cors())
app.use(express.json())

// Sample data (will be replaced with database later)
const bugs: Bug[] = []

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'BugPilot API - Server is running!' })
})

app.get('/api/bugs', (req, res) => {
  res.json(bugs)
})

app.post('/api/bugs', (req, res) => {
  const newBug: Bug = req.body
  bugs.push(newBug)
  res.status(201).json(newBug)
})

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
  console.log('Monorepo setup complete! Shared types are working.')
})
