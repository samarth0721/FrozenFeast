const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ["Admin", "Customer"],
        default: "Customer"
    },
    phone: {
        type: String,
    },
    // Using Mixed to stay compatible with any shape of stored data
    // (avoids cast errors when old documents have different field names/types)
    favorites: {
        type: [mongoose.Schema.Types.Mixed],
        default: []
    },
    recentOrders: {
        type: [mongoose.Schema.Types.Mixed],
        default: []
    }
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);