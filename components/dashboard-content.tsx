
export async function DashboardContent({userId}: {userId: string}) {
    
    return (
        <div>
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <p>Welcome, user with ID: {userId}</p>
        </div>
    );
}