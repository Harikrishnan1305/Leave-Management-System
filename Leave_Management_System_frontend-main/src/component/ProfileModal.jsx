function ProfileModal({ user, onClose }) {
    if (!user) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content profile-modal" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <div className="profile-avatar-circle">
                        {user.name ? user.name.charAt(0).toUpperCase() : "U"}
                    </div>
                    <div>
                        <h3>{user.name}</h3>
                        <span className="profile-role-badge">{user.role}</span>
                    </div>
                    <button className="modal-close-btn" onClick={onClose}>&times;</button>
                </div>

                <div className="modal-body">
                    <div className="profile-item">
                        <span className="profile-label">Email</span>
                        <span className="profile-value">{user.email || "-"}</span>
                    </div>

                    <div className="profile-item">
                        <span className="profile-label">Designation / Role</span>
                        <span className="profile-value">{user.designation || (user.role === "ADMIN" ? "HR Administrator" : "Employee")}</span>
                    </div>

                    <div className="profile-item">
                        <span className="profile-label">Department</span>
                        <span className="profile-value">{user.department || (user.role === "ADMIN" ? "Human Resources" : "Operations")}</span>
                    </div>

                    <div className="profile-item">
                        <span className="profile-label">Mobile Number</span>
                        <span className="profile-value">{user.mobileNo || "Not provided"}</span>
                    </div>

                    <div className="profile-item">
                        <span className="profile-label">WhatsApp Number</span>
                        <span className="profile-value">
                            {user.whatsappNo ? (
                                <a 
                                    href={`https://wa.me/${user.whatsappNo.replace(/[^0-9]/g, '')}`} 
                                    target="_blank" 
                                    rel="noreferrer"
                                    className="whatsapp-link"
                                >
                                    💬 {user.whatsappNo}
                                </a>
                            ) : "Not provided"}
                        </span>
                    </div>
                </div>

                <div className="modal-footer">
                    <button className="primary-btn" onClick={onClose}>Close</button>
                </div>
            </div>
        </div>
    );
}

export default ProfileModal;
