const mongoose = require("mongoose");
mongoose.set("useUnifiedTopology", true);
mongoose.connect("mongodb://localhost/teamsdb", { useNewUrlParser: true });
module.exports = mongoose;