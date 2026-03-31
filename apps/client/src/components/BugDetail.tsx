import { useEffect, useState } from "react";
import {Bug} from '@bugpilot/shared';

interface Props{
    bugId: string;
}

const BugDetail = ({bugId} : Props) => {
    const [bug, setBug] = useState<Bug | null>(null);
    const [loading, setLoading] = useState(true)
    const [error, setError]  = useState<string | null>(null)

    useEffect(() => {
        setLoading(true);
        setError(null);
        setBug(null);
        
        fetch(`http://localhost:5001/api/bugs/${bugId}`)
        .then(response => {
            if(!response.ok){
                throw new Error('Bug not found')
            }
            return response.json();
        })
        .then(data => {
            setBug(data);
            setLoading(false)
        })
        .catch(err => {
            setError(err.message);
            setLoading(false);
        })
    }, [bugId])

    if(loading) return <p>Loading bug details...</p>
    if(error) return <p>Error: {error}</p>

    if(!bug) return <p>Bug not found.</p>

    return (
        <div>
            <h1>Bug Detail</h1>
           <div style={{ border: '1px solid #ccc', padding: '12px', marginBottom: '8px', borderRadius: '6px' }}>
            <strong>{bug.title}</strong>         
            <p>{bug.description}</p>
            <span>Status: {bug.status}</span>
            <span> | Priority: {bug.priority}</span>
        </div>
        </div>
    );
};

export default BugDetail;