import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Login() {
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [error, setError] = useState("");

const navigate = useNavigate();

const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
    setError("Please enter email and password");
    return;
    }

    try {
    const response = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify({
        email: email,
        password: password,
        }),
    });

    const data = await response.json();

    if (!response.ok) {
        setError(data.message || "Invalid email or password");
        return;
    }

      // Store logged-in user
    localStorage.setItem("user", JSON.stringify(data));

      // Check role
    if (data.role === "ADMIN") {
        navigate("/admin");
    } else if (data.role === "EMPLOYEE") {
        navigate("/employee");
    } else {
        setError("Invalid user role");
    }
    } catch (err) {
    setError("Unable to connect to server");
    console.error(err);
    }
};

return (
    <div className="login-container">
    <div className="login-box">
        <h2>Leave Management System</h2>

        <h3>Login</h3>

        {error && <p className="error">{error}</p>}

        <form onSubmit={handleLogin}>
        <div className="form-group">
            <label>Email</label>

            <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            />
        </div>

        <div className="form-group">
            <label>Password</label>

            <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            />
        </div>
        <button type="submit">Login</button>
        </form>

        <p>
        Don't have an account? <Link to="/register">Register</Link>
        </p>
    </div>
    </div>
);
}

export default Login;
