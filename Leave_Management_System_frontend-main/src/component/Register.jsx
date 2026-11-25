import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Register() {
const [name, setName] = useState("");
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [confirmPassword, setConfirmPassword] = useState("");
const [designation, setDesignation] = useState("");
const [department, setDepartment] = useState("");
const [mobileNo, setMobileNo] = useState("");
const [whatsappNo, setWhatsappNo] = useState("");
const [sameAsMobile, setSameAsMobile] = useState(true);
const [error, setError] = useState("");
const [success, setSuccess] = useState("");
const navigate = useNavigate();

const handleMobileChange = (e) => {
    const val = e.target.value;
    setMobileNo(val);
    if (sameAsMobile) {
        setWhatsappNo(val);
    }
};

const handleSameAsMobileToggle = (e) => {
    const checked = e.target.checked;
    setSameAsMobile(checked);
    if (checked) {
        setWhatsappNo(mobileNo);
    }
};

const handleRegister = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (!name || !email || !password || !confirmPassword) {
        setError("Please fill all required fields");
        return;
    }

    if (password !== confirmPassword) {
        setError("Passwords do not match");
        return;
    }

    try {
        const response = await fetch("http://localhost:8080/api/auth/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: name,
                email: email,
                password: password,
                designation: designation || "Employee",
                department: department || "Operations",
                mobileNo: mobileNo,
                whatsappNo: sameAsMobile ? mobileNo : whatsappNo,
            }),
        });

        const data = await response.json();

        if (!response.ok) {
            setError(data.message || "Registration failed");
            return;
        }

        setSuccess("Registration successful!");

        setTimeout(() => {
            navigate("/login");
        }, 1500);
    } catch (err) {
        setError("Unable to connect to server");
        console.error(err);
    }
};

return (
    <div className="login-container">
    <div className="login-box register-box">
        <h2>Leave Management System</h2>

        <h3>Employee Registration</h3>

        {error && <p className="error">{error}</p>}

        {success && <p className="success">{success}</p>}

        <form onSubmit={handleRegister}>
        <div className="form-group">
            <label>Name *</label>
            <input
                type="text"
                placeholder="Enter your name"
                value={name}
                required
                onChange={(e) => setName(e.target.value)}
            />
        </div>
        <div className="form-group">
            <label>Email *</label>
            <input
                type="email"
                placeholder="Enter your email"
                value={email}
                required
                onChange={(e) => setEmail(e.target.value)}
            />
        </div>

        <div className="form-row">
            <div className="form-group">
                <label>Designation / Role in Company</label>
                <input
                    type="text"
                    placeholder="e.g. Software Engineer, QA, HR"
                    value={designation}
                    onChange={(e) => setDesignation(e.target.value)}
                />
            </div>
            <div className="form-group">
                <label>Department</label>
                <input
                    type="text"
                    placeholder="e.g. IT, Operations, Marketing"
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                />
            </div>
        </div>

        <div className="form-row">
            <div className="form-group">
                <label>Mobile Number</label>
                <input
                    type="tel"
                    placeholder="e.g. +91 9876543210"
                    value={mobileNo}
                    onChange={handleMobileChange}
                />
            </div>
            <div className="form-group">
                <label>WhatsApp Number</label>
                <input
                    type="tel"
                    placeholder="e.g. +91 9876543210"
                    value={sameAsMobile ? mobileNo : whatsappNo}
                    disabled={sameAsMobile}
                    onChange={(e) => setWhatsappNo(e.target.value)}
                />
                <label className="checkbox-label">
                    <input
                        type="checkbox"
                        checked={sameAsMobile}
                        onChange={handleSameAsMobileToggle}
                    />
                    <span>Same as Mobile</span>
                </label>
            </div>
        </div>

        <div className="form-row">
            <div className="form-group">
                <label>Password *</label>
                <input
                    type="password"
                    placeholder="Enter password"
                    value={password}
                    required
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>

            <div className="form-group">
                <label>Confirm Password *</label>
                <input
                    type="password"
                    placeholder="Confirm password"
                    value={confirmPassword}
                    required
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
            </div>
        </div>

        <button type="submit">Register</button>
        </form>

        <p>
        Already have an account? <Link to="/login">Login</Link>
        </p>
    </div>
    </div>
);
}

export default Register;
