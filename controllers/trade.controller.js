const { ethers, JsonRpcProvider, Contract } = require("ethers");
const P2PTradeABI = require("../abis/P2PTrade.json");
const config = require("../config");
const contractAddress = config.blockchain.contractAddress;

class TradeController {
  constructor() {
    this.provider = new  JsonRpcProvider(config.blockchain.rpcUrl);
    
    this.contract = new Contract(contractAddress, P2PTradeABI, this.provider);
  }

  // Utility function to check if the user (wallet address in req.id) is the admin.
  async isAdmin(userAddress) {
    try {
      const adminAddress = await this.contract.admin();
      return userAddress.toLowerCase() === adminAddress.toLowerCase();
    } catch (error) {
      console.error("Error fetching admin address:", error);
      return false;
    }
  }

  // =======================
  // Asset Management Functions (Admin only)
  // =======================
  async addSupportedToken(req, res) {
    try {
      const userAddress = req.id;
      if (!(await this.isAdmin(userAddress))) {
        return res.status(403).json({ error: "Only admin can call this function" });
      }
      const { tokenAddress } = req.body;
      if (!tokenAddress)
        return res.status(400).json({ error: "tokenAddress is required" });
      const txData = this.contract.interface.encodeFunctionData("addSupportedToken", [
        tokenAddress,
      ]);
      return res.json({ txData });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Server error" });
    }
  }

  async removeSupportedToken(req, res) {
    try {
      const userAddress = req.id;
      if (!(await this.isAdmin(userAddress))) {
        return res.status(403).json({ error: "Only admin can call this function" });
      }
      const { tokenAddress } = req.body;
      if (!tokenAddress)
        return res.status(400).json({ error: "tokenAddress is required" });
      const txData = this.contract.interface.encodeFunctionData("removeSupportedToken", [
        tokenAddress,
      ]);
      return res.json({ txData });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Server error" });
    }
  }

  async addSupportedFiat(req, res) {
    try {
      const userAddress = req.id;
      if (!(await this.isAdmin(userAddress))) {
        return res.status(403).json({ error: "Only admin can call this function" });
      }
      const { fiatCode } = req.body;
      if (!fiatCode)
        return res.status(400).json({ error: "fiatCode is required" });
      const txData = this.contract.interface.encodeFunctionData("addSupportedFiat", [
        fiatCode,
      ]);
      return res.json({ txData });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Server error" });
    }
  }

  async removeSupportedFiat(req, res) {
    try {
      const userAddress = req.id;
      if (!(await this.isAdmin(userAddress))) {
        return res.status(403).json({ error: "Only admin can call this function" });
      }
      const { fiatCode } = req.body;
      if (!fiatCode)
        return res.status(400).json({ error: "fiatCode is required" });
      const txData = this.contract.interface.encodeFunctionData("removeSupportedFiat", [
        fiatCode,
      ]);
      return res.json({ txData });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Server error" });
    }
  }

  // =======================
  // Ad Management Functions
  // =======================
  async createAd(req, res) {
    try {
      const { token, cryptoAmount, fiatAmount, fiatCurrency } = req.body;
      if (!token || !cryptoAmount || !fiatAmount || !fiatCurrency) {
        return res.status(400).json({ error: "Missing required parameters" });
      }
      // Signing done in frontend
      const txData = this.contract.interface.encodeFunctionData("createAd", [
        token,
        cryptoAmount,
        fiatAmount,
        fiatCurrency,
      ]);
      return res.json({ txData });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Server error" });
    }
  }

  async updateAd(req, res) {
    try {
      const { tradeId, newFiatAmount } = req.body;
      if (!tradeId || newFiatAmount === undefined) {
        return res.status(400).json({ error: "Missing required parameters" });
      }
      
      const txData = this.contract.interface.encodeFunctionData("updateAd", [
        tradeId,
        newFiatAmount,
      ]);
      return res.json({ txData });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Server error" });
    }
  }

  async cancelAd(req, res) {
    try {
      const { tradeId } = req.body;
      if (!tradeId) {
        return res.status(400).json({ error: "Missing tradeId" });
      }
      const txData = this.contract.interface.encodeFunctionData("cancelAd", [tradeId]);
      return res.json({ txData });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Server error" });
    }
  }

  // =======================
  // Trade Management Functions
  // =======================
  async buyFromAd(req, res) {
    try {
      const { tradeId, amount } = req.body;
      if (!tradeId || !amount) {
        return res.status(400).json({ error: "Missing required parameters" });
      }
      const txData = this.contract.interface.encodeFunctionData("buyFromAd", [
        tradeId,
        amount,
      ]);
      return res.json({ txData });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Server error" });
    }
  }

  async completeTrade(req, res) {
    try {
      const { tradeId } = req.body;
      if (!tradeId) {
        return res.status(400).json({ error: "Missing tradeId" });
      }
      const txData = this.contract.interface.encodeFunctionData("completeTrade", [
        tradeId,
      ]);
      return res.json({ txData });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Server error" });
    }
  }

  // =======================
  // Dispute Resolution Functions
  // =======================
  async fileDispute(req, res) {
    try {
      const { tradeId } = req.body;
      if (!tradeId) {
        return res.status(400).json({ error: "Missing tradeId" });
      }
      const txData = this.contract.interface.encodeFunctionData("fileDispute", [
        tradeId,
      ]);
      // Retrieve the dispute fee (in wei) from the contract (required as msg.value)
      const disputeFee = await this.contract.disputeFee();
      return res.json({ txData, value: disputeFee.toString() });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Server error" });
    }
  }

  async resolveDispute(req, res) {
    try {
      const userAddress = req.id;
      if (!(await this.isAdmin(userAddress))) {
        return res.status(403).json({ error: "Only admin can call this function" });
      }
      const { tradeId, inFavorOfSeller } = req.body;
      if (!tradeId || inFavorOfSeller === undefined) {
        return res.status(400).json({ error: "Missing required parameters" });
      }
      const txData = this.contract.interface.encodeFunctionData("resolveDispute", [
        tradeId,
        inFavorOfSeller,
      ]);
      return res.json({ txData });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Server error" });
    }
  }

  // =======================
  // Fee Management Functions (Admin only)
  // =======================
  async setPlatformFee(req, res) {
    try {
      const userAddress = req.id;
      if (!(await this.isAdmin(userAddress))) {
        return res.status(403).json({ error: "Only admin can call this function" });
      }
      const { newFeePercentage } = req.body;
      if (newFeePercentage === undefined) {
        return res.status(400).json({ error: "Missing newFeePercentage" });
      }
      const txData = this.contract.interface.encodeFunctionData("setPlatformFee", [
        newFeePercentage,
      ]);
      return res.json({ txData });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Server error" });
    }
  }

  async setDisputeFee(req, res) {
    try {
      const userAddress = req.id;
      if (!(await this.isAdmin(userAddress))) {
        return res.status(403).json({ error: "Only admin can call this function" });
      }
      const { newDisputeFee } = req.body;
      if (newDisputeFee === undefined) {
        return res.status(400).json({ error: "Missing newDisputeFee" });
      }
      const txData = this.contract.interface.encodeFunctionData("setDisputeFee", [
        newDisputeFee,
      ]);
      return res.json({ txData });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Server error" });
    }
  }

  async collectFees(req, res) {
    try {
      const userAddress = req.id;
      if (!(await this.isAdmin(userAddress))) {
        return res.status(403).json({ error: "Only admin can call this function" });
      }
      const txData = this.contract.interface.encodeFunctionData("collectFees");
      return res.json({ txData });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Server error" });
    }
  }

  // =======================
  // View Function
  // =======================
  async calculateFee(req, res) {
    try {
      const { amount } = req.query;
      if (!amount) {
        return res.status(400).json({ error: "Missing amount" });
      }
      const fee = await this.contract.calculateFee(amount);
      return res.json({ fee: fee.toString() });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Error calculating fee" });
    }
  }
}

module.exports = TradeController;
