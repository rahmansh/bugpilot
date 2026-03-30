import { Router } from "express";
import {Bug} from '@bugpilot/shared';

const router = Router();

const bugs: Bug[] = [
    {
        id: '1',
        title: 'Login button not working on Safari',
        description: 'Users on Safari 16+ cannot click the login button.',
        status: 'open',
        priority: 'high',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
    {
      id: '2',
      title: 'Dashboard charts rendering slowly',
      description: 'Charts take 5+ seconds to load on first visit.',
      status: 'in-progress',
      priority: 'medium',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
]


router.get('/', (req, res) => {
    res.json(bugs);
})

router.get("/:id", (req, res) => {
    const {id} = req.params;
    const bug = bugs.find(b => b.id === id);
    
    if(!bug){
        return res.status(404).json({error: 'Bug not found'})
    }

    res.json(bug);
    
})

export default router;