import express from 'express';
import cors from 'cors';
import bugsRouter from './routes/bugs';


const app = express();
const PORT = process.env.PORT || 5001

app.use(cors())
app.use(express.json())

app.get("/", (req, res) => {
  res.json({message: 'BugPilot API - Server is runnig!'});
})

app.use('/api/bugs', bugsRouter);

// Start server
app.listen(PORT, () => {
  console.log(`Server runnig on http://localhost:${PORT}`)
})
