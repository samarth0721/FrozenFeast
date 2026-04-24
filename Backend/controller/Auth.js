const bcrypt = require("bcrypt");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const { randomUUID } = require("crypto");

require("dotenv").config();

// ─── Token Helper ────────────────────────────────────────────────────────────
const extractToken = (req) => {
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer ")) {
        return req.headers.authorization.split(" ")[1];
    }
    if (req.cookies && req.cookies.token) {
        return req.cookies.token;
    }
    return null;
};

const verifyToken = (token) => jwt.verify(token, process.env.JWT_SECRET);

// ─── Signup ───────────────────────────────────────────────────────────────────
exports.signup = async (req, res) => {
    try {
        const { name, email, password, role, adminCode, phone } = req.body;

        if (role === "Admin") {
            if (!adminCode || adminCode !== process.env.ADMIN_CODE) {
                return res.status(400).json({ success: false, message: "Invalid admin code" });
            }
            if (!phone) {
                return res.status(400).json({ success: false, message: "Phone number required for admin" });
            }
        }

        const existingEmail = await User.findOne({ email: email.trim().toLowerCase() });
        if (existingEmail) {
            return res.status(400).json({ success: false, message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await User.create({
            name,
            email: email.trim().toLowerCase(),
            password: hashedPassword,
            role,
            ...(phone && { phone })
        });

        return res.status(201).json({ success: true, message: "User created successfully" });
    } catch (error) {
        console.error("Signup error:", error);
        return res.status(500).json({ success: false, message: "User cannot be registered. Please try later" });
    }
};

// ─── Login ────────────────────────────────────────────────────────────────────
exports.login = async (req, res) => {
    try {
        let { email, password } = req.body;
        email = email.trim().toLowerCase();

        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ success: false, message: "User does not exist" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(403).json({ success: false, message: "Incorrect password" });
        }

        const payload = { email: user.email, id: user._id, role: user.role };
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1d" });

        user = user.toObject();
        delete user.password;

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 24 * 60 * 60 * 1000
        });

        return res.status(200).json({
            success: true,
            message: "Logged in successfully",
            token,
            user
        });
    } catch (error) {
        console.error("Login error:", error);
        return res.status(500).json({ success: false, message: "Login failed" });
    }
};

// ─── Get Profile ──────────────────────────────────────────────────────────────
exports.profile = async (req, res) => {
    try {
        const token = extractToken(req);
        if (!token) return res.status(401).json({ success: false, message: "No token provided" });

        const decoded = verifyToken(token);
        const user = await User.findById(decoded.id).select("-password -__v");

        if (!user) return res.status(404).json({ success: false, message: "User not found" });

        res.json({
            success: true,
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                phone: user.phone || null,
                favorites: user.favorites || [],
                recentOrders: user.recentOrders || [],
            }
        });
    } catch (error) {
        console.error("Profile error:", error);
        if (error.name === "JsonWebTokenError" || error.name === "TokenExpiredError") {
            return res.status(401).json({ success: false, message: "Invalid or expired token" });
        }
        res.status(500).json({ success: false, message: "Server error" });
    }
};

// ─── Update Profile ───────────────────────────────────────────────────────────
exports.updateProfile = async (req, res) => {
    try {
        const token = extractToken(req);
        if (!token) return res.status(401).json({ success: false, message: "No token provided" });

        const decoded = verifyToken(token);
        const { name, email } = req.body;

        if (!name || !email) {
            return res.status(400).json({ success: false, message: "Name and email are required" });
        }

        const existingEmail = await User.findOne({ email: email.toLowerCase(), _id: { $ne: decoded.id } });
        if (existingEmail) {
            return res.status(400).json({ success: false, message: "Email already in use by another account" });
        }

        const updatedUser = await User.findByIdAndUpdate(
            decoded.id,
            { name, email: email.toLowerCase() },
            { new: true, runValidators: true }
        ).select("-password -__v");

        if (!updatedUser) return res.status(404).json({ success: false, message: "User not found" });

        res.json({
            success: true,
            message: "Profile updated successfully",
            user: {
                _id: updatedUser._id,
                name: updatedUser.name,
                email: updatedUser.email,
                role: updatedUser.role,
                phone: updatedUser.phone || null,
            }
        });
    } catch (error) {
        console.error("Update profile error:", error);
        if (error.name === "JsonWebTokenError" || error.name === "TokenExpiredError") {
            return res.status(401).json({ success: false, message: "Invalid or expired token" });
        }
        res.status(500).json({ success: false, message: "Server error" });
    }
};

// ─── Toggle / Sync Favorites ──────────────────────────────────────────────────
exports.updateFavorites = async (req, res) => {
    try {
        const token = extractToken(req);
        if (!token) return res.status(401).json({ success: false, message: "No token provided" });

        const decoded = verifyToken(token);
        const { favorites } = req.body;

        if (!Array.isArray(favorites)) {
            return res.status(400).json({ success: false, message: "favorites must be an array" });
        }

        // Normalize favorites — ensure _id is a string for consistency
        const normalizedFavs = favorites.map(f => ({
            _id: String(f._id),
            iceName: f.iceName || f.name || "",
            name: f.name || f.iceName || "",
            price: Number(f.price) || 0,
            iceUrl: f.iceUrl || "",
            description: f.description || "",
            tags: f.tags || f.tag || "",
        }));

        const updatedUser = await User.findByIdAndUpdate(
            decoded.id,
            { $set: { favorites: normalizedFavs } },
            { new: true }
        ).select("favorites");

        if (!updatedUser) return res.status(404).json({ success: false, message: "User not found" });

        res.json({ success: true, message: "Favorites updated", favorites: updatedUser.favorites });
    } catch (error) {
        console.error("Update favorites error:", error);
        if (error.name === "JsonWebTokenError" || error.name === "TokenExpiredError") {
            return res.status(401).json({ success: false, message: "Invalid or expired token" });
        }
        res.status(500).json({ success: false, message: "Server error" });
    }
};

// ─── Add a Single Order (push, max 20) ───────────────────────────────────────
exports.addOrder = async (req, res) => {
    try {
        const token = extractToken(req);
        if (!token) return res.status(401).json({ success: false, message: "No token provided" });

        const decoded = verifyToken(token);
        const { items, total, addressId } = req.body;

        if (!items || !Array.isArray(items) || items.length === 0) {
            return res.status(400).json({ success: false, message: "Order items are required" });
        }
        if (total === undefined || total === null) {
            return res.status(400).json({ success: false, message: "Order total is required" });
        }

        const newOrder = {
            orderId: randomUUID(),
            date: new Date(),
            items: items.map(item => ({
                _id: String(item._id),
                iceName: item.iceName || item.name || "",
                name: item.name || item.iceName || "",
                price: Number(item.price) || 0,
                quantity: Number(item.quantity) || 1,
                iceUrl: item.iceUrl || "",
                description: item.description || "",
                tags: item.tags || item.tag || "",
            })),
            total: Number(total),
            addressId: addressId || null,
            status: "Placed"
        };

        // Push new order to front, keep max 20 orders
        const user = await User.findById(decoded.id);
        if (!user) return res.status(404).json({ success: false, message: "User not found" });

        user.recentOrders.unshift(newOrder);
        if (user.recentOrders.length > 20) {
            user.recentOrders = user.recentOrders.slice(0, 20);
        }
        user.markModified('recentOrders');
        await user.save();

        res.status(201).json({
            success: true,
            message: "Order placed successfully",
            order: newOrder,
            recentOrders: user.recentOrders
        });
    } catch (error) {
        console.error("Add order error:", error);
        if (error.name === "JsonWebTokenError" || error.name === "TokenExpiredError") {
            return res.status(401).json({ success: false, message: "Invalid or expired token" });
        }
        res.status(500).json({ success: false, message: "Server error" });
    }
};

// ─── Get Recent Orders ────────────────────────────────────────────────────────
exports.getOrders = async (req, res) => {
    try {
        const token = extractToken(req);
        if (!token) return res.status(401).json({ success: false, message: "No token provided" });

        const decoded = verifyToken(token);
        const user = await User.findById(decoded.id).select("recentOrders");

        if (!user) return res.status(404).json({ success: false, message: "User not found" });

        res.json({ success: true, recentOrders: user.recentOrders || [] });
    } catch (error) {
        console.error("Get orders error:", error);
        if (error.name === "JsonWebTokenError" || error.name === "TokenExpiredError") {
            return res.status(401).json({ success: false, message: "Invalid or expired token" });
        }
        res.status(500).json({ success: false, message: "Server error" });
    }
};

// ─── Legacy: Full recentOrders replace (kept for compat) ─────────────────────
exports.updateRecentOrders = async (req, res) => {
    try {
        const token = extractToken(req);
        if (!token) return res.status(401).json({ success: false, message: "No token provided" });

        const decoded = verifyToken(token);
        const { recentOrders } = req.body;

        if (!Array.isArray(recentOrders)) {
            return res.status(400).json({ success: false, message: "recentOrders must be an array" });
        }

        const updatedUser = await User.findByIdAndUpdate(
            decoded.id,
            { $set: { recentOrders } },
            { new: true }
        ).select("recentOrders");

        if (!updatedUser) return res.status(404).json({ success: false, message: "User not found" });

        res.json({ success: true, recentOrders: updatedUser.recentOrders });
    } catch (error) {
        console.error("Update recent orders error:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};