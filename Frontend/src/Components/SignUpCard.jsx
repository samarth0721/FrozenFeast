import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Added for redirection
import iceCreamIcon from '../assets/logo.png';
import './SignUpCard.css';
import { Link } from "react-router-dom";

const SignUpCard = () => {
    const [identity, setIdentity] = useState("");
    const [fname, setFname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [adminCode, setAdminCode] = useState(""); // Added for admin code
    const [phone, setPhone] = useState(""); // Added for phone number
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false); // Added loading state
    const [showPopup, setShowPopup] = useState(false);
    const [popupMessage, setPopupMessage] = useState(""); // Dynamic message for success/error

    const navigate = useNavigate(); // For redirection after signup

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!identity || !fname || !email || !password) {
            setPopupMessage("Please fill in all required fields.");
            setShowPopup(true);
            setTimeout(() => setShowPopup(false), 3000);
            return;
        }

        setLoading(true);
        try {
            // Prepare payload based on identity
            const payload = {
                name: fname,
                email,
                password,
                role: identity === "admin" ? "Admin" : "Customer",
                ...(identity === 'admin' && { adminCode, phone }),
            };


            // Backend API call to signup endpoint
            const response = await fetch('http://localhost:4000/api/v1/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            const responseData = await response.json();

            if (response.ok && responseData.success) {
                // Successful signup - store token if provided (assuming backend returns { success: true, token: '...' })
                if (responseData.token) {
                    localStorage.setItem('token', responseData.token); // Store token for auth
                }

                // Clear form
                setIdentity("");
                setFname("");
                setEmail("");
                setPassword("");
                setAdminCode("");
                setPhone("");

                setPopupMessage("✅ Signed up successfully!");
                setShowPopup(true);
                setTimeout(() => {
                    setShowPopup(false);
                    navigate('/'); // Redirect to login (or '/dashboard' if auto-login)
                }, 1500);
            } else {
                throw new Error(responseData.message || 'Signup failed');
            }
        } catch (error) {
            console.error("Signup error:", error);
            setPopupMessage(`❌ ${error.message}`);
            setShowPopup(true);
            setTimeout(() => setShowPopup(false), 3000);
        } finally {
            setLoading(false);
        }
    };

    const getFormFields = () => {
        switch (identity) {
            case 'user':
                return (
                    <>
                        <input
                            type="text"
                            value={fname}
                            placeholder="Full Name"
                            onChange={(e) => setFname(e.target.value)}
                            required
                            disabled={loading} // Disable during loading
                        />
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            disabled={loading} // Disable during loading
                        />
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
                            <span
                                className="toggle-password"
                                onClick={() => !loading && setShowPassword(!showPassword)} // Disable toggle during loading
                                aria-label={showPassword ? "Hide password" : "Show password"}
                                title={showPassword ? "Hide Password" : "Show Password"}
                                style={{ opacity: loading ? 0.5 : 1 }} // Dim during loading
                            >
                                {showPassword ? "🙈" : "👁️"}
                            </span>
                        </div>
                    </>
                );

            case 'admin':
                return (
                    <>
                        <input
                            type="text"
                            value={fname}
                            placeholder="Admin Full Name"
                            onChange={(e) => setFname(e.target.value)}
                            required
                            disabled={loading} // Disable during loading
                        />
                        <input
                            type="email"
                            placeholder="Admin Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            disabled={loading} // Disable during loading
                        />
                        <div className="password-wrapper">
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Secure Admin Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                disabled={loading} // Disable during loading
                            />
                            <span className="toggle-password"
                                onClick={() => !loading && setShowPassword(!showPassword)} // Disable toggle during loading
                                aria-label={showPassword ? "Hide password" : "Show password"}
                            >
                                {showPassword ? "🙈" : "👁️"}
                            </span>
                        </div>
                        <input
                            type="text"
                            placeholder="Admin Code"
                            value={adminCode}
                            onChange={(e) => setAdminCode(e.target.value)}
                            required
                            disabled={loading} // Disable during loading
                        />
                        <input
                            type="tel"
                            placeholder="Phone Number"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            required
                            disabled={loading} // Disable during loading
                        />
                    </>
                );

            default:
                return (
                    <div className="select-prompt">
                        <p>Please select your identity to continue</p>
                    </div>
                );
        }
    };

    return (
        <div className="body">
            <div className="container">
                <form className="signup-form" onSubmit={handleSubmit}>
                    <img src={iceCreamIcon} alt="Frozen Feast" className="logo" />
                    <h2>Sign up to Frozen Feast</h2>

                    {/* Select identity */}
                    <select
                        name="identity"
                        id="select-identity"
                        value={identity}
                        onChange={(e) => setIdentity(e.target.value)}
                        required
                        disabled={loading} // Disable during loading
                    >
                        <option value="">Select Identity</option>
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                    </select>

                    {/* get the interface acc to indentity */}
                    {getFormFields()}

                    {/* Show submit button only if identity is selected */}
                    {identity && (
                        <button type="submit" className="signup-btn" disabled={loading}>
                            {loading ? "Signing up..." : `Continue as ${identity.charAt(0).toUpperCase() + identity.slice(1)}`}
                        </button>
                    )}

                    <p className="signup">
                        Already have an account? <Link to="/login">Login</Link>
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

export default SignUpCard;
