import { useEffect, useState } from "react";
import { User } from "@bugpilot/shared";

const UserList = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('http://localhost:5001/api/users')
        .then(res => res.json())
        .then(data => {
            setUsers(data);
            setLoading(false);
        })
    }, [])

    if(loading) return <p>Loading users....</p>;

    return (
        <div>
            <h1>User List ({users.length})</h1>
            {
                users.map(user => (
                    <div key={user.id} style={{ border: '1px solid #ccc', padding: '12px', marginBottom: '8px' }}>
                        <strong>{user.name}</strong>
                        <p>{user.email}</p>
                        <span>Role: {user.role}</span>
                    </div>
                ))
            }
        </div>
    );
};

export default UserList;