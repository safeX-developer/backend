const express = require("express");
const router = express.Router();
const requireAuth = require("../../middleware/requireAuth");
const TradeController = require("../../controllers/trade.controller");
const controller = new TradeController();

// Asset Management (Admin only)
router.post("/addSupportedToken", requireAuth, controller.addSupportedToken.bind(controller));
router.post("/removeSupportedToken", requireAuth, controller.removeSupportedToken.bind(controller));
router.post("/addSupportedFiat", requireAuth, controller.addSupportedFiat.bind(controller));
router.post("/removeSupportedFiat", requireAuth, controller.removeSupportedFiat.bind(controller));

// Ad Management
router.post("/createAd", requireAuth, controller.createAd.bind(controller));
router.post("/updateAd", requireAuth, controller.updateAd.bind(controller));
router.post("/cancelAd", requireAuth, controller.cancelAd.bind(controller));

// Trade Management
router.post("/buyFromAd", requireAuth, controller.buyFromAd.bind(controller));
router.post("/completeTrade", requireAuth, controller.completeTrade.bind(controller));

// Dispute Resolution
router.post("/fileDispute", requireAuth, controller.fileDispute.bind(controller));
router.post("/resolveDispute", requireAuth, controller.resolveDispute.bind(controller));

// Fee Management (Admin only)
router.post("/setPlatformFee", requireAuth, controller.setPlatformFee.bind(controller));
router.post("/setDisputeFee", requireAuth, controller.setDisputeFee.bind(controller));
router.post("/collectFees", requireAuth, controller.collectFees.bind(controller));

// View Function
router.get("/calculateFee", requireAuth, controller.calculateFee.bind(controller));

module.exports = router;
