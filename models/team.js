const mongoose = require("../db");

const teamSchema = new mongoose.Schema({
    _id: { type: Number },
    name: { type: String, required: true },
    country: { type: String },
    trophies: { type: Number, min: 0, max: 200 },
    players: [String]
}, {
    toJSON: {
        transform: (doc, obj, options) => {
            delete obj.__v;
            return obj;
        }
    }
});

const Team = mongoose.model('Team', teamSchema);

module.exports = Team;