import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCalendarAlt, FaMapMarkerAlt, FaEnvelope, FaPhoneAlt, FaUserAlt, FaCheckCircle, FaUtensils } from 'react-icons/fa';
import './Catering.css';

const Catering = () => {
    const [fname, setFname] = useState("");
    const [email, setEmail] = useState("");
    const [contact, setContact] = useState("");
    const [eventDate, setEventDate] = useState("");
    const [eventType, setEventType] = useState('');
    const [streetAddress, setStreetAddress] = useState('');
    const [district, setDistrict] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false); 
    const [showPopup, setShowPopup] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Example: fake API delay
        setTimeout(() => {
            console.log({
                fname, email, contact, eventDate, eventType, streetAddress, district
            });

            setIsSubmitting(false);
            setShowPopup(true);
            handleClear();

            // hide popup after 3s
            setTimeout(() => setShowPopup(false), 3000);
        }, 2000);
    };

    const handleClear = () => {
        setFname('');
        setEmail('');
        setContact('');
        setEventDate('');
        setEventType('');
        setStreetAddress('');
        setDistrict('');
    };

    return (
        <motion.div 
            className="catering-wrapper"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
        >
            <div className="catering-hero">
                <motion.div 
                    className="catering-hero-content"
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                >
                    <h1 className="hero-title">Exclusive <span className="highlight">Event Catering</span></h1>
                    <p className="hero-subtitle">Make your special moments unforgettable with our premium frozen delights tailored to your event.</p>
                </motion.div>
            </div>

            <motion.div 
                className="form-container-premium"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.6 }}
            >
                <form onSubmit={handleSubmit} className="premium-form">
                    <h2 className="form-heading"><FaUtensils className="heading-icon" /> Event Details</h2>
                    
                    <div className="form-grid">
                        <div className="form-group-premium">
                            <label><FaUserAlt className="input-icon" /> Full Name</label>
                            <input
                                type='text'
                                placeholder='John Doe'
                                value={fname}
                                onChange={(e) => setFname(e.target.value)}
                                required
                                maxLength={30}
                            />
                        </div>

                        <div className="form-group-premium">
                            <label><FaEnvelope className="input-icon" /> Email Address</label>
                            <input
                                type="email"
                                placeholder="john@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group-premium">
                            <label><FaPhoneAlt className="input-icon" /> Contact Number</label>
                            <input
                                type="tel"
                                placeholder='+91 9876543210'
                                value={contact}
                                onChange={(e) => setContact(e.target.value)}
                                maxLength={10}
                                required
                            />
                        </div>

                        <div className="form-group-premium">
                            <label><FaCalendarAlt className="input-icon" /> Event Date</label>
                            <input
                                type="date"
                                value={eventDate}
                                onChange={(e) => setEventDate(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <div className="form-group-premium full-width">
                        <label className="text">Type of Event Service</label>
                        <div className="radio-group-modern">
                            {[
                                "Self Service Pickup",
                                "Self Service Delivery",
                                "Full Service Catering",
                                "Not Sure, Want To Learn More"
                            ].map((type) => (
                                <motion.label 
                                    className={`radio-card ${eventType === type ? 'active' : ''}`} 
                                    key={type}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    <input
                                        type="radio"
                                        name="eventType"
                                        value={type}
                                        checked={eventType === type}
                                        onChange={(e) => setEventType(e.target.value)}
                                    />
                                    <span className="radio-text">{type}</span>
                                </motion.label>
                            ))}
                        </div>
                    </div>

                    <div className="form-group-premium full-width">
                        <label><FaMapMarkerAlt className="input-icon" /> Complete Address</label>
                        <input
                            type="text"
                            placeholder="Street Address, Area, Landmark"
                            value={streetAddress}
                            onChange={(e) => setStreetAddress(e.target.value)}
                            className="address-input"
                            required
                        />
                    </div>
                    
                    <div className="form-group-premium full-width">
                        <label>Select District</label>
                        <select
                            value={district}
                            onChange={(e) => setDistrict(e.target.value)}
                            required
                        >
                            <option value="" disabled>-- Choose your district --</option>
                            {["Ahmednagar", "Amravati", "Beed", "Bhandara", "Chandrapur", "Dhule", "Gadchiroli", "Hingoli", "Kolhapur", "Mumbai", "Pune"].map(d => (
                                <option key={d} value={d}>{d}</option>
                            ))}
                        </select>
                    </div>

                    <div className="button-group-premium">
                        <motion.button
                            type="button"
                            className="clear-btn-premium"
                            onClick={handleClear}
                            disabled={isSubmitting}
                            whileHover={{ backgroundColor: "rgba(255,255,255,0.1)" }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Clear Form
                        </motion.button>
                        <motion.button
                            type="submit"
                            className="submit-btn-premium"
                            disabled={isSubmitting}
                            whileHover={{ scale: 1.05, boxShadow: "0 10px 20px rgba(224, 64, 251, 0.4)" }}
                            whileTap={{ scale: 0.95 }}
                        >
                            {isSubmitting ? (
                                <div className="loader"></div>
                            ) : (
                                "Request Catering"
                            )}
                        </motion.button>
                    </div>
                </form>
            </motion.div>

            <AnimatePresence>
                {showPopup && (
                    <motion.div 
                        className="popup-premium"
                        initial={{ opacity: 0, y: -50, x: '-50%' }}
                        animate={{ opacity: 1, y: 20, x: '-50%' }}
                        exit={{ opacity: 0, y: -50, x: '-50%' }}
                    >
                        <FaCheckCircle className="popup-icon" />
                        <div>
                            <h4>Success!</h4>
                            <p>Your event request has been submitted.</p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

export default Catering;