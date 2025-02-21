const authRoute = require("./auth.route")
const profileRoute = require('./api/profile.route');
const tradeRoute = require('./api/trade.route');

const routeManager = (app) => {
    // API Routes
    app.use("/auth", authRoute);
    app.use("/api/profile", profileRoute);
    app.use("/api/trade", tradeRoute);
}

module.exports = routeManager