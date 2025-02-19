const authRoute = require("./auth.route")
const profileRoute = require('./api/profile.route');

const routeManager = (app) => {

    // API Routes
    app.use("/auth", authRoute);
    app.use("/api/profile", profileRoute);

}

module.exports = routeManager