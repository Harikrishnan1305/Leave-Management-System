import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProfileModal from "./ProfileModal";

function AdminDashboard() {

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

        if (loggedUser.role !== "ADMIN") {
            navigate("/login");
            return;
        }

        setUser(loggedUser);

        fetchLeaves();

    }, [navigate]);



    const fetchLeaves = async () => {

        try {

            setError("");

            const response = await fetch(
                "http://localhost:8080/api/admin/leaves"
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



    const handleApprove = async (leaveId) => {

        if (!window.confirm("Approve this leave request?")) {
            return;
        }

        try {

            const response = await fetch(
                `http://localhost:8080/api/admin/leaves/${leaveId}/approve`,
                {
                    method: "PUT"
                }
            );

            if (!response.ok) {

                const data = await response.json();

                throw new Error(
                    data.message || "Failed to approve leave"
                );
            }

            fetchLeaves();

        } catch (error) {

            setError(error.message);
        }
    };



    const handleReject = async (leaveId) => {

        if (!window.confirm("Reject this leave request?")) {
            return;
        }

        try {

            const response = await fetch(
                `http://localhost:8080/api/admin/leaves/${leaveId}/reject`,
                {
                    method: "PUT"
                }
            );

            if (!response.ok) {

                const data = await response.json();

                throw new Error(
                    data.message || "Failed to reject leave"
                );
            }

            fetchLeaves();

        } catch (error) {

            setError(error.message);
        }
    };

 

    const handleLogout = () => {

        localStorage.removeItem("user");

        navigate("/login");
    };


    if (!user) {
        return <p>Loading...</p>;
    }


    return (

        <div className="admin-dashboard">
 

            <header className="dashboard-header">

                <div>

                    <h2>Admin Dashboard</h2>

                    <p>
                        Welcome, <strong>{user.name}</strong>
                        {user.designation && <span className="user-designation-chip"> • {user.designation}</span>}
                    </p>

                </div>

                <div className="header-actions">
                    <button
                        onClick={() => setShowProfileModal(true)}
                        className="profile-btn"
                        title="View Admin Profile"
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

                <div className="admin-title">

                    <h3>Leave Requests</h3>

                    <button onClick={fetchLeaves}>
                        Refresh
                    </button>

                </div>

 

                {error && (
                    <p className="error">
                        {error}
                    </p>
                )}

 

                {leaves.length === 0 ? (

                    <p>
                        No leave requests found.
                    </p>

                ) : (

                    <div className="table-container">

                        <table>

                            <thead>

                                <tr>

                                    <th>Employee</th>

                                    <th>Email</th>

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
                                            <strong>{leave.employee?.name}</strong>
                                            {leave.employee?.designation && (
                                                <div className="employee-desig-sub">
                                                    {leave.employee.designation}
                                                </div>
                                            )}
                                        </td>
 

                                        <td>
                                            {leave.employee?.email}
                                        </td>
 

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

                                            {leave.status === "PENDING" ? (

                                                <div className="action-buttons">

                                                    <button
                                                        onClick={() =>
                                                            handleApprove(
                                                                leave.id
                                                            )
                                                        }
                                                    >
                                                        Approve
                                                    </button>

                                                    <button
                                                        onClick={() =>
                                                            handleReject(
                                                                leave.id
                                                            )
                                                        }
                                                    >
                                                        Reject
                                                    </button>

                                                </div>

                                            ) : leave.status === "APPROVED" ? (

                                                <span className="action-badge finalized">
                                                    ✅ Approved
                                                </span>

                                            ) : (

                                                <span className="action-badge closed">
                                                    ❌ Rejected
                                                </span>

                                            )}

                                        </td>

                                    </tr>

                                ))}

                            </tbody>

                        </table>

                    </div>

                )}

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

export default AdminDashboard; 