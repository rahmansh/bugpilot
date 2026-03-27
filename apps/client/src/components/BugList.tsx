import { useEffect, useState } from "react";
import {Bug} from '@bugpilot/shared';

export function BugList(){
    const [bugs, setBugs] = useState<Bug[]>([]);
    const [loading, setLoading] = useState(true);

    const getPriorityColor = (priority: string) => {
        switch(priority){
            case 'critical': return 'red'
            case 'high': return 'orange'
            case 'medium': return 'yellow'
            case 'low': return 'gray'
            default: return 'black'
        }
    }

    useEffect(() => {
        fetch('http://localhost:5001/api/bugs')
        .then(res => res.json())
        .then(data => {
            setBugs(data);
            setLoading(false);
        })
    }, []);

    if(loading) return <p>Loading bugs...</p>;

    return (
        <div>
            <h1>Bug List</h1>
            {
                bugs.map(bug => (
                    <div key={bug.id} style={{ border: '1px solid #ccc', padding: '12px', marginBottom: '8px', borderRadius: '6px' }}>
                        <strong>{bug.title}</strong>
                        <p>{bug.description}</p>
                        <span>Status: {bug.status}</span>
                        <span className="ml-2" style={{color: getPriorityColor(bug.priority), fontWeight: 'bold'}}>Priority: {bug.priority}</span>
                    </div>
                ))
            }
        </div>
    )
}