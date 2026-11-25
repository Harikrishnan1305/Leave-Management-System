import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function LeaveForm() {
    const navigate = useNavigate();
    const location = useLocation();

    const editingLeave = location.state?.leave;

    const [leaveType, setLeaveType] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [reason, setReason] = useState("");

    const [error, setError] = useState("");
    const [user, setUser] = useState(null);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [submittedData, setSubmittedData] = useState(null);

    // Today's date in YYYY-MM-DD for datepicker min restriction
    const today = new Date().toISOString().split("T")[0];

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

        if (editingLeave) {
            setLeaveType(editingLeave.leaveType || "");
            setStartDate(editingLeave.startDate || "");
            setEndDate(editingLeave.endDate || "");
            setReason(editingLeave.reason || "");
        }
    }, [navigate, editingLeave]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError("");

        if (!leaveType || !startDate || !endDate || !reason) {
            setError("Please fill all fields");
            return;
        }

        if (startDate < today && !editingLeave) {
            setError("Start date cannot be in the past. Select today or a future date.");
            return;
        }

        if (endDate < startDate) {
            setError("End date cannot be before start date");
            return;
        }

        try {
            let response;

            if (editingLeave) {
                response = await fetch(
                    `http://localhost:8080/api/leaves/${editingLeave.id}`,
                    {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            leaveType: leaveType,
                            startDate: startDate,
                            endDate: endDate,
                            reason: reason
                        })
                    }
                );
            } else {
                response = await fetch(
                    "http://localhost:8080/api/leaves",
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            employeeId: user.id,
                            leaveType: leaveType,
                            startDate: startDate,
                            endDate: endDate,
                            reason: reason
                        })
                    }
                );
            }

            const data = await response.json();

            if (!response.ok) {
                setError(data.message || "Something went wrong");
                return;
            }

            setSubmittedData({
                leaveType,
                startDate,
                endDate,
                reason,
                isEdit: !!editingLeave
            });
            setIsSubmitted(true);

        } catch (err) {
            setError("Unable to connect to server");
            console.error(err);
        }
    };

    const handleBack = () => {
        navigate("/employee");
    };

    const handleApplyAnother = () => {
        setLeaveType("");
        setStartDate("");
        setEndDate("");
        setReason("");
        setIsSubmitted(false);
        setSubmittedData(null);
    };

    if (!user) {
        return <p>Loading...</p>;
    }

    // Success Screen view once leave is applied
    if (isSubmitted) {
        return (
            <div className="login-container">
                <div className="login-box success-card">
                    <div className="success-icon-badge">✅</div>
                    <h2>{submittedData?.isEdit ? "Leave Updated Successfully!" : "Leave Applied Successfully!"}</h2>
                    <p className="success-subtitle">Your leave request has been sent to the Admin for approval.</p>

                    <div className="submitted-details-box">
                        <div className="detail-row">
                            <span className="detail-label">Leave Type:</span>
                            <span className="detail-value">{submittedData?.leaveType}</span>
                        </div>
                        <div className="detail-row">
                            <span className="detail-label">From:</span>
                            <span className="detail-value">{submittedData?.startDate}</span>
                        </div>
                        <div className="detail-row">
                            <span className="detail-label">To:</span>
                            <span className="detail-value">{submittedData?.endDate}</span>
                        </div>
                        <div className="detail-row">
                            <span className="detail-label">Reason:</span>
                            <span className="detail-value">{submittedData?.reason}</span>
                        </div>
                        <div className="detail-row">
                            <span className="detail-label">Status:</span>
                            <span className="status pending">PENDING</span>
                        </div>
                    </div>

                    <button 
                        type="button" 
                        className="primary-btn" 
                        onClick={handleBack}
                    >
                        ⬅ Back to Employee Dashboard
                    </button>

                    <button 
                        type="button" 
                        className="secondary-btn" 
                        style={{ marginTop: "10px" }}
                        onClick={handleApplyAnother}
                    >
                        + Apply Another Leave
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="login-container">
            <div className="login-box">
                <h2>{editingLeave ? "Edit Leave Request" : "Apply Leave"}</h2>

                {error && <p className="error">{error}</p>}

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Leave Type *</label>
                        <select
                            value={leaveType}
                            required
                            onChange={(e) => setLeaveType(e.target.value)}
                        >
                            <option value="">Select Leave Type</option>
                            <option value="SICK">🤒 Sick / Medical Leave</option>
                            <option value="CASUAL">🏖️ Casual Leave</option>
                            <option value="ANNUAL">✈️ Annual / Earned Leave</option>
                            <option value="MATERNITY_PATERNITY">👶 Maternity / Paternity Leave</option>
                            <option value="BEREAVEMENT">💔 Bereavement Leave</option>
                            <option value="STUDY">🎓 Study / Exam Leave</option>
                            <option value="WFH">🏠 Work From Home (WFH)</option>
                            <option value="HALF_DAY">⏳ Half-Day Leave</option>
                            <option value="OTHER">❓ Other</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Start Date * (Today or Future)</label>
                        <input
                            type="date"
                            value={startDate}
                            min={today}
                            required
                            onChange={(e) => {
                                setStartDate(e.target.value);
                                if (endDate && e.target.value > endDate) {
                                    setEndDate(e.target.value);
                                }
                            }}
                        />
                    </div>

                    <div className="form-group">
                        <label>End Date *</label>
                        <input
                            type="date"
                            value={endDate}
                            min={startDate || today}
                            required
                            onChange={(e) => setEndDate(e.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <label>Reason *</label>
                        <textarea
                            placeholder="Enter detailed reason for leave..."
                            value={reason}
                            required
                            onChange={(e) => setReason(e.target.value)}
                            rows="4"
                        />
                    </div>

                    <button type="submit">
                        {editingLeave ? "Update Leave" : "Apply Leave"}
                    </button>

                    <button
                        type="button"
                        onClick={handleBack}
                        className="secondary-btn"
                        style={{ marginTop: "10px" }}
                    >
                        Back
                    </button>
                </form>
            </div>
        </div>
    );
}

export default LeaveForm;