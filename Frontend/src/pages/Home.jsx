import { NavLink } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Home1 from "../assets/Home-1.jpg";
import Home2 from "../assets/Home-2.jpg";
import Home3 from "../assets/Home-3.jpg";
import Home4 from "../assets/Home-4.jpg";
import HomeRegular from "../assets/Home-Regular.jpg";
import HomeGelato from "../assets/HomeGelato.jpg";
import HomeSorbet from "../assets/Home-Sorbet.jpg";
import HomeFY from "../assets/Home-Frozen-Yoghurt.jpg";
import HomeVegan from "../assets/Home-Vegan.jpg";
import HomeDineIn from "../assets/Home-DineIn.png";
import HomeDelivery from "../assets/Home-Delivery.png";
import HomeCatering from "../assets/Home-Catering.png";
import RangeFlavour from "../assets/HomeFR.png";
import Hygine from "../assets/HomeHygine.png";
import Quality from "../assets/HomeQuality.png";
import Fun from "../assets/HomeFun.png";
import './Home.css';
import { FaArrowRight, FaStar, FaLeaf, FaShieldAlt, FaSmile } from "react-icons/fa";

/* ── animation variants ── */
const fadeUp = {
    hidden: { opacity: 0, y: 60 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] } },
};
const fadeUpSlow = {
    hidden: { opacity: 0, y: 80 },
    show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] } },
};
const stagger = {
    hidden: {},
    show: { transition: { staggerChildren: 0.12 } },
};
const scaleIn = {
    hidden: { opacity: 0, scale: 0.8, rotate: -5 },
    show: { opacity: 1, scale: 1, rotate: 0, transition: { duration: 0.6, ease: "easeOut" } },
};
const slideLeft = {
    hidden: { opacity: 0, x: -80 },
    show: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } },
};
const slideRight = {
    hidden: { opacity: 0, x: 80 },
    show: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const Home = () => {
    const heroRef = useRef(null);
    const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
    const heroY = useTransform(scrollYProgress, [0, 1], [0, 150]);
    const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

    const flavors = [
        { img: HomeRegular, title: "Regular", tag: "Classic", accent: "#e040fb" },
        { img: HomeGelato, title: "Gelato", tag: "Italian", accent: "#00e5ff" },
        { img: HomeSorbet, title: "Sorbet", tag: "Fruity", accent: "#ff4081" },
        { img: HomeFY, title: "Frozen Yogurt", tag: "Healthy", accent: "#69f0ae" },
        { img: HomeVegan, title: "Vegan", tag: "Plant-Based", accent: "#b388ff" },
    ];

    const services = [
        {
            img: HomeDineIn, title: "Dine-In",
            sub: "Chill With Us — Indulge In-Store",
            desc: "Savor handcrafted scoops, decadent sundaes and custom creations in our vibrant parlors.",
            link: "/dinein", cta: "Find nearest store",
        },
        {
            img: HomeDelivery, title: "Delivery",
            sub: "Ice Cream On the Go — To Your Door",
            desc: "Freshly scooped goodness delivered straight to your doorstep — fast, fresh & frozen to perfection.",
            link: "/delivery", cta: "Enter your address",
        },
        {
            img: HomeCatering, title: "Catering",
            sub: "Sweeten Your Event",
            desc: "Custom ice cream bars, sundae stations & full-service catering for parties, weddings and corporate events.",
            link: "/catering", cta: "Plan your event",
        },
    ];

    const whyData = [
        { img: RangeFlavour, icon: <FaStar />, title: "Range of Flavors", desc: "From classic vanilla to exotic matcha — a flavor for every mood." },
        { img: Hygine, icon: <FaShieldAlt />, title: "Hygiene & Safety", desc: "Highest hygiene standards, ensuring every scoop is safe & delicious." },
        { img: Quality, icon: <FaLeaf />, title: "Best Quality", desc: "Only the finest, freshest ingredients make it into our ice cream." },
        { img: Fun, icon: <FaSmile />, title: "Fun Atmosphere", desc: "Vibrant parlors designed to make every visit a sweet memory." },
    ];

    return (
        <div className="ff-home">
            {/* ═══════════ HERO ═══════════ */}
            <section className="ff-hero" ref={heroRef}>
                {/* Animated ambient orbs */}
                <div className="ff-hero__glow ff-hero__glow--1"></div>
                <div className="ff-hero__glow ff-hero__glow--2"></div>
                <div className="ff-hero__glow ff-hero__glow--3"></div>

                {/* Floating particle dots */}
                <div className="ff-hero__particles">
                    {[...Array(6)].map((_, i) => (
                        <span key={i} className={`ff-particle ff-particle--${i}`}></span>
                    ))}
                </div>

                <motion.div className="ff-hero__inner" style={{ y: heroY, opacity: heroOpacity }}>
                    <motion.div
                        className="ff-hero__text"
                        initial={{ opacity: 0, y: 60 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
                    >
                        <motion.span
                            className="ff-hero__badge"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.3, duration: 0.5 }}
                        >
                            🍦 Premium Frozen Delights
                        </motion.span>

                        <h1 className="ff-hero__title">
                            <motion.span
                                className="ff-hero__title-line"
                                initial={{ opacity: 0, y: 40 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2, duration: 0.8 }}
                            >
                                Scoop into
                            </motion.span>
                            <motion.span
                                className="ff-hero__title-line ff-hero__title-highlight"
                                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                transition={{ delay: 0.4, duration: 0.8 }}
                            >
                                <span className="ff-gradient-text ff-shimmer">Happiness</span>
                            </motion.span>
                        </h1>

                        <motion.p
                            className="ff-hero__subtitle"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.6, duration: 0.8 }}
                        >
                            Welcome to Frozen Feast — where frozen dreams come alive.
                            Indulge in handcrafted scoops, delivered fresh or savored in-store.
                        </motion.p>

                        <motion.div
                            className="ff-hero__actions"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.8, duration: 0.6 }}
                        >
                            <NavLink to="/products">
                                <motion.button
                                    className="ff-btn ff-btn--primary ff-btn--lg"
                                    whileHover={{ scale: 1.06, boxShadow: "0 0 35px rgba(224, 64, 251, 0.6)" }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <span className="ff-btn__pulse"></span>
                                    Order Now <FaArrowRight />
                                </motion.button>
                            </NavLink>
                            <NavLink to="/dinein">
                                <motion.button
                                    className="ff-btn ff-btn--ghost ff-btn--lg"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    Find a Store
                                </motion.button>
                            </NavLink>
                        </motion.div>

                        {/* Trust badges */}
                        <motion.div
                            className="ff-hero__stats"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1.2, duration: 0.8 }}
                        >
                            <div className="ff-stat">
                                <strong>50+</strong><span>Flavors</span>
                            </div>
                            <div className="ff-stat__divider"></div>
                            <div className="ff-stat">
                                <strong>10K+</strong><span>Happy Customers</span>
                            </div>
                            <div className="ff-stat__divider"></div>
                            <div className="ff-stat">
                                <strong>4.9</strong><span>⭐ Rating</span>
                            </div>
                        </motion.div>
                    </motion.div>

                    <motion.div
                        className="ff-hero__gallery"
                        variants={stagger}
                        initial="hidden"
                        animate="show"
                    >
                        {[Home1, Home2, Home3, Home4].map((img, i) => (
                            <motion.div
                                key={i}
                                className={`ff-hero__img-wrap ff-hero__img-wrap--${i}`}
                                variants={scaleIn}
                                whileHover={{ scale: 1.08, zIndex: 5, boxShadow: "0 20px 50px rgba(224, 64, 251, 0.25)" }}
                                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                            >
                                <img src={img} alt={`Ice cream ${i + 1}`} loading="lazy" />
                                <div className="ff-hero__img-shine"></div>
                            </motion.div>
                        ))}
                    </motion.div>
                </motion.div>

                {/* Scroll indicator */}
                <motion.div
                    className="ff-scroll-indicator"
                    animate={{ y: [0, 10, 0] }}
                    transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                >
                    <div className="ff-scroll-indicator__mouse">
                        <div className="ff-scroll-indicator__wheel"></div>
                    </div>
                    <span>Scroll to explore</span>
                </motion.div>
            </section>

            {/* ═══════════ FLAVORS ═══════════ */}
            <section className="ff-flavors">
                <motion.div
                    className="ff-section-head"
                    variants={fadeUpSlow}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-80px" }}
                >
                    <span className="ff-section-head__tag">Explore</span>
                    <h2>Find Your <span className="ff-gradient-text">Taste</span></h2>
                    <p>From creamy classics to bold sorbets — discover your perfect scoop.</p>
                </motion.div>

                <motion.div
                    className="ff-flavors__grid"
                    variants={stagger}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-40px" }}
                >
                    {flavors.map((f, i) => (
                        <motion.div
                            className="ff-flavor-card"
                            key={i}
                            variants={fadeUp}
                            whileHover={{ y: -10, boxShadow: `0 20px 40px ${f.accent}22` }}
                            transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        >
                            <div className="ff-flavor-card__img">
                                <img src={f.img} alt={f.title} loading="lazy" />
                                <span className="ff-flavor-card__tag" style={{ background: f.accent }}>{f.tag}</span>
                                <div className="ff-flavor-card__overlay">
                                    <NavLink to="/products" className="ff-flavor-card__cta">Explore →</NavLink>
                                </div>
                            </div>
                            <h3>{f.title}</h3>
                            <div className="ff-flavor-card__dot" style={{ background: f.accent }}></div>
                        </motion.div>
                    ))}
                </motion.div>
            </section>

            {/* ═══════════ SERVICES ═══════════ */}
            <section className="ff-services">
                <motion.div
                    className="ff-section-head"
                    variants={fadeUpSlow}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                >
                    <span className="ff-section-head__tag">What We Do</span>
                    <h2>How to <span className="ff-gradient-text">Indulge</span></h2>
                </motion.div>

                <div className="ff-services__grid">
                    {services.map((s, i) => (
                        <motion.div
                            className="ff-service-card"
                            key={i}
                            variants={i === 0 ? slideLeft : i === 2 ? slideRight : fadeUp}
                            initial="hidden"
                            whileInView="show"
                            viewport={{ once: true, margin: "-60px" }}
                            whileHover={{ y: -10, boxShadow: "0 20px 50px rgba(224, 64, 251, 0.12)" }}
                            transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        >
                            <div className="ff-service-card__img">
                                <img src={s.img} alt={s.title} loading="lazy" />
                                <div className="ff-service-card__number">{String(i + 1).padStart(2, '0')}</div>
                            </div>
                            <div className="ff-service-card__body">
                                <h3>{s.title}</h3>
                                <h4>{s.sub}</h4>
                                <p>{s.desc}</p>
                                <NavLink to={s.link} className="ff-service-card__link">
                                    {s.cta} <FaArrowRight />
                                </NavLink>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* ═══════════ WHY US ═══════════ */}
            <section className="ff-why">
                <motion.div
                    className="ff-why__inner"
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    variants={stagger}
                >
                    <motion.div className="ff-why__header" variants={slideLeft}>
                        <span className="ff-section-head__tag">Why Choose Us</span>
                        <h2>Why <span className="ff-gradient-text">FrozenFeast</span></h2>
                        <p>Every scoop is an unforgettable experience. Here's what makes us special.</p>
                    </motion.div>

                    <motion.div className="ff-why__grid" variants={stagger}>
                        {whyData.map((w, i) => (
                            <motion.div
                                className="ff-why-card"
                                key={i}
                                variants={fadeUp}
                                whileHover={{ scale: 1.04, borderColor: "rgba(224,64,251,0.35)" }}
                                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                            >
                                <div className="ff-why-card__icon">
                                    <img src={w.img} alt={w.title} />
                                </div>
                                <div className="ff-why-card__text">
                                    <h4>{w.title}</h4>
                                    <p>{w.desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </motion.div>
            </section>

            {/* ═══════════ CTA BANNER ═══════════ */}
            <section className="ff-cta-banner">
                <motion.div
                    className="ff-cta-banner__inner"
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <div className="ff-cta-banner__glow"></div>
                    <h2>Ready to taste the <span className="ff-gradient-text">magic</span>?</h2>
                    <p>Order now and get your first delivery free!</p>
                    <NavLink to="/products">
                        <motion.button
                            className="ff-btn ff-btn--primary ff-btn--lg"
                            whileHover={{ scale: 1.06, boxShadow: "0 0 40px rgba(224, 64, 251, 0.6)" }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Explore Menu <FaArrowRight />
                        </motion.button>
                    </NavLink>
                </motion.div>
            </section>
        </div>
    );
};

export default Home;