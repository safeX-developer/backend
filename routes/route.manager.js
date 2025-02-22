const profileRoute = require('./api/profile.route');

const routeManager = (app) => {
    app.use("/api/profile", profileRoute);
}

module.exports = routeManager
