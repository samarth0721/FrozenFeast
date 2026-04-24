const mongoose = require("mongoose");

const deliverySchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: false, // optional for backward compat
    },
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    contact: {
        type: String,
        required: true,
    },
    streetAdd: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    pin: {
        type: String,
        required: true,
    },
    district: {
        type: String,
        required: true,
    }
}, { timestamps: true });

module.exports = mongoose.model("Delivery", deliverySchema);