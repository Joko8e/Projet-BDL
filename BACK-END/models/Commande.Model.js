const mongoose = require("mongoose");
const Commande = mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Chaussure",
        required: true
    },
    marque: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Marque",
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    totalPrice: {
        type: Number,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    orderDate: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        enum: ["En traitement", "expédié", "livré", "annulé"],
        default: "En traitement"
    },    
},
    { timestamps: true }
)

module.exports = mongoose.model("Commande", Commande);