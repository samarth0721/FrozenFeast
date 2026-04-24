import { useState } from "react";
import iceCreamIcon from '../assets/logo.png';
import './LoginCard.css';
import { Link, useNavigate } from "react-router-dom"; // Added useNavigate for redirection

const LoginCard = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [remember, setRemember] = useState(false);
    const [loading, setLoading] = useState(false); // Added loading state
    const [showPopup, setShowPopup] = useState(false);
    const [popupMessage, setPopupMessage] = useState(""); // Dynamic message for success/error
    const API_URL = process.env.REACT_APP_API_URL;

    const navigate = useNavigate(); // For redirection after login

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email || !password) {
            setPopupMessage("Please fill in all fields.");
            setShowPopup(true);
            setTimeout(() => setShowPopup(false), 3000);
            return;
        }

        setLoading(true);
        try {
            // Backend API call to login endpoint
            const response = await fetch(`http://localhost:4000/api/v1/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
                credentials: "include",
            });

            const responseData = await response.json();

            if (response.ok && responseData.success) {
                // Successful login - store token (assuming backend returns { success: true, token: '...' })
                const token = responseData.token;

                localStorage.setItem('token', token); // Persistent storage


                setPopupMessage("✅ Logged in successfully!");
                setShowPopup(true);
                setTimeout(() => {
                    setShowPopup(false);
                    navigate('/'); // Redirect to dashboard or home (adjust route as needed)
                }, 1500);
            } else {
                throw new Error(responseData.message || 'Login failed');
            }
        } catch (error) {
            console.error("Login error:", error);
            setPopupMessage(`❌ ${error.message}`);
            setShowPopup(true);
            setTimeout(() => setShowPopup(false), 3000);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="body">
            <div className="container">
                <form className="login-form" onSubmit={handleSubmit}>
                    <img src={iceCreamIcon} alt="KulfiVerse" className="logo" />
                    <h2>Login to Frozen Feast</h2>

                    {/* Email input */}
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        disabled={loading} // Disable during loading
                    />

                    {/* Password input */}
                    <div className="password-wrapper">
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            minLength={6}
                            disabled={loading} // Disable during loading
                        />
                        <span className="toggle-password"
                            onClick={() => setShowPassword(!showPassword)}
                            aria-label={showPassword ? "Hide password" : "Show password"}
                            title={showPassword ? "Hide Password" : "Show Password"}
                            style={{ opacity: loading ? 0.5 : 1 }} // Dim during loading
                        >
                            {showPassword ? "🙈" : "👁️"}
                        </span>
                    </div>

                    {/* Remember input */}
                    <div className="options">
                        <label>
                            <input
                                type="checkbox"
                                checked={remember}
                                onChange={(e) => setRemember(e.target.checked)}
                                disabled={loading} // Disable during loading
                            />
                            Remember me
                        </label>
                        <a href="#">Forgot your password?</a>
                    </div>

                    <button type="submit" disabled={loading}>
                        {loading ? (
                            <>
                                <div className="spinner"></div>
                                Signing in...
                            </>
                        ) : (
                            'Sign in'
                        )}
                    </button>

                    <p className="signup">
                        Don't have an account? <Link to="/signup">Create account</Link>
                    </p>

                    <p>-----------------------   OR   ----------------------- </p>
                    <div className="social-login">
                        <button className="google" aria-label="Sign in with Google" disabled={loading}>
                            G
                        </button>
                        <button className="facebook" aria-label="Sign in with Facebook" disabled={loading}>
                            F
                        </button>
                    </div>
                </form>
                {showPopup && (
                    <div className={`popup ${popupMessage.includes('❌') ? 'error' : 'success'}`}>
                        {popupMessage}
                    </div>
                )}
            </div>
        </div>
    );
};

export default LoginCard;
