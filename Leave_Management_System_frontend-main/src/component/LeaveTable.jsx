
function LeaveTable({
    leaves,
    isAdmin,
    onEdit,
    onCancel,
    onApprove,
    onReject
}) {

    if (!leaves || leaves.length === 0) {

        return (
            <p className="no-data">
                No leave requests found.
            </p>
        );
    }

    return (

        <div className="table-container">

            <table>

                <thead>

                    <tr>

                        {isAdmin && (
                            <>
                                <th>Employee</th>
                                <th>Email</th>
                            </>
                        )}

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

                            {isAdmin && (
                                <>
                                    <td>
                                        {leave.employee?.name}
                                    </td>

                                    <td>
                                        {leave.employee?.email}
                                    </td>
                                </>
                            )}


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

                            
                                {!isAdmin && leave.status === "PENDING" && (

                                    <div className="action-buttons">

                                        <button
                                            onClick={() =>
                                                onEdit(leave)
                                            }
                                        >
                                            Edit
                                        </button>

                                        <button
                                            onClick={() =>
                                                onCancel(leave.id)
                                            }
                                        >
                                            Cancel
                                        </button>

                                    </div>

                                )}


                            
                                {isAdmin && leave.status === "PENDING" && (

                                    <div className="action-buttons">

                                        <button
                                            onClick={() =>
                                                onApprove(leave.id)
                                            }
                                        >
                                            Approve
                                        </button>

                                        <button
                                            onClick={() =>
                                                onReject(leave.id)
                                            }
                                        >
                                            Reject
                                        </button>

                                    </div>

                                )}
 
                                {leave.status !== "PENDING" && (
                                    <span className={`action-badge ${leave.status === "APPROVED" ? "finalized" : "closed"}`}>
                                        {leave.status === "APPROVED" ? (isAdmin ? "✅ Approved" : "🔒 Finalized") : (isAdmin ? "❌ Rejected" : "🚫 Closed")}
                                    </span>
                                )}

                            </td>

                        </tr>

                    ))}

                </tbody>

            </table>

        </div>
    );
}

export default LeaveTable;