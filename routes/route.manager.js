const profileRoute = require('./api/profile.route');
// const tradeRoute = require('./api/trade.route');

const routeManager = (app) => {
    // API Routes
    app.use("/api/profile", profileRoute);
    // app.use("/api/trade", tradeRoute);
}

module.exports = routeManager
