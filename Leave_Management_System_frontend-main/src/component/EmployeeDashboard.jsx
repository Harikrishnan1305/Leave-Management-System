import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProfileModal from "./ProfileModal";

function EmployeeDashboard() {

    const [user, setUser] = useState(null);
    const [leaves, setLeaves] = useState([]);
    const [error, setError] = useState("");
    const [showProfileModal, setShowProfileModal] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {

        const storedUser = localStorage.getItem("user");

        if (!storedUser) {
            navigate("/login");
            return;
        }

        const loggedUser = JSON.parse(storedUser);
 
        if (loggedUser.role !== "EMPLOYEE") {
            navigate("/login");
            return;
        }

        setUser(loggedUser);

        fetchLeaves(loggedUser.id);

    }, [navigate]);

 

    const fetchLeaves = async (employeeId) => {

        try {

            const response = await fetch(
                `http://localhost:8080/api/leaves/employee/${employeeId}`
            );

            if (!response.ok) {
                throw new Error("Failed to load leave requests");
            }

            const data = await response.json();

            setLeaves(data);

        } catch (error) {

            setError(error.message);
        }
    };

 

    const handleCancel = async (leaveId) => {

        if (!window.confirm("Are you sure you want to cancel this leave?")) {
            return;
        }

        try {

            const response = await fetch(
                `http://localhost:8080/api/leaves/${leaveId}/employee/${user.id}`,
                {
                    method: "DELETE"
                }
            );

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.message || "Failed to cancel leave");
            }
 
            fetchLeaves(user.id);

        } catch (error) {

            setError(error.message);
        }
    };

 
    const handleEdit = (leave) => {
 
        navigate("/employee/apply-leave", {
            state: {
                leave: leave
            }
        });
    };

 
    const handleLogout = () => {

        localStorage.removeItem("user");

        navigate("/login");
    };


    if (!user) {
        return <p>Loading...</p>;
    }


    return (

        <div className="employee-dashboard">
 

            <header className="dashboard-header">

                <div>
                    <h2>Employee Dashboard</h2>

                    <p>
                        Welcome, <strong>{user.name}</strong> 
                        {user.designation && <span className="user-designation-chip"> • {user.designation}</span>}
                    </p>
                </div>

                <div className="header-actions">
                    <button
                        onClick={() => setShowProfileModal(true)}
                        className="profile-btn"
                        title="View My Profile"
                    >
                        👤 View Profile
                    </button>

                    <button
                        onClick={handleLogout}
                        className="logout-button"
                    >
                        Logout
                    </button>
                </div>

            </header>

 

            <main className="dashboard-content">

                <div className="dashboard-actions">

                    <button
                        onClick={() =>
                            navigate("/employee/apply-leave")
                        }
                    >
                        Apply Leave
                    </button>

                </div>

 

                {error && (
                    <p className="error">
                        {error}
                    </p>
                )}

 

                <section>

                    <h3>My Leave Requests</h3>

                    {leaves.length === 0 ? (

                        <p>
                            No leave requests found.
                        </p>

                    ) : (

                        <table>

                            <thead>

                                <tr>
                                    <th>Leave Type</th>
                                    <th>Start Date</th>
                                    <th>End Date</th>
                                    <th>Reason</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                </tr>

                            </thead>

                            <tbody>

                                {leaves.map((leave) => (

                                    <tr key={leave.id}>

                                        <td>
                                            {leave.leaveType}
                                        </td>

                                        <td>
                                            {leave.startDate}
                                        </td>

                                        <td>
                                            {leave.endDate}
                                        </td>

                                        <td>
                                            {leave.reason}
                                        </td>

                                        <td>

                                            <span
                                                className={`status ${leave.status?.toLowerCase()}`}
                                            >
                                                {leave.status}
                                            </span>

                                        </td>

                                        <td>

                                            {leave.status === "PENDING" && (
                                                <div className="action-buttons">
                                                    <button
                                                        onClick={() =>
                                                            handleEdit(leave)
                                                        }
                                                    >
                                                        Edit
                                                    </button>

                                                    <button
                                                        onClick={() =>
                                                            handleCancel(leave.id)
                                                        }
                                                    >
                                                        Cancel
                                                    </button>
                                                </div>
                                            )}

                                            {leave.status === "APPROVED" && (
                                                <span className="action-badge finalized">
                                                    🔒 Finalized
                                                </span>
                                            )}

                                            {leave.status === "REJECTED" && (
                                                <span className="action-badge closed">
                                                    🚫 Closed
                                                </span>
                                            )}

                                        </td>

                                    </tr>

                                ))}

                            </tbody>

                        </table>

                    )}

                </section>

            </main>

            {showProfileModal && (
                <ProfileModal 
                    user={user} 
                    onClose={() => setShowProfileModal(false)} 
                />
            )}

        </div>
    );
}

export default EmployeeDashboard;
