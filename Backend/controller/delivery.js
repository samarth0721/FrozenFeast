const Delivery = require("../models/Delivery");
const User = require("../models/User");

exports.createDelivery = async (req, res) => {
    try {
        if (!req.user || !req.user.email) {
            return res.status(401).json({ success: false, message: "User not authenticated" });
        }

        const email = req.user.email;
        const userId = req.user.id;
        const { name, contact, streetAdd, city, pin, district } = req.body;

        if (!name || !contact || !streetAdd || !city || !pin || !district) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }

        const newDelivery = await Delivery.create({
            userId,
            name,
            email,
            contact,
            streetAdd,
            city,
            pin,
            district
        });

        res.status(201).json({
            success: true,
            message: "Delivery address added successfully",
            delivery: newDelivery
        });
    } catch (error) {
        console.error("Create delivery error:", error);
        res.status(500).json({ success: false, message: "Failed to add delivery address" });
    }
};

exports.getMyDeliveries = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ success: false, message: "User not authenticated" });
        }

        const email = req.user.email;

        const deliveries = await Delivery.find({ email }).sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: deliveries.length,
            deliveries
        });
    } catch (error) {
        console.error("Get deliveries error:", error);
        res.status(500).json({ success: false, message: "Failed to fetch delivery addresses" });
    }
};

exports.deleteDelivery = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ success: false, message: "User not authenticated" });
        }

        const { id } = req.params;
        const email = req.user.email;

        // Only delete if the delivery belongs to this user
        const deleted = await Delivery.findOneAndDelete({ _id: id, email });

        if (!deleted) {
            return res.status(404).json({ success: false, message: "Address not found or not yours" });
        }

        res.json({ success: true, message: "Address deleted successfully" });
    } catch (error) {
        console.error("Delete delivery error:", error);
        res.status(500).json({ success: false, message: "Failed to delete address" });
    }
};