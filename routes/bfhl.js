const express = require("express");
const router = express.Router();

const {
  fibonacciSeries,
  filterPrimes,
  calculateLCM,
  calculateHCF
} = require("../utils/math.js");

const { askAI } = require("../utils/ai.js");

const EMAIL = process.env.OFFICIAL_EMAIL;


router.get("/health", (req, res) => {
  res.status(200).json({
    is_success: true,
    official_email: EMAIL
  });
});

router.post("/bfhl", async (req, res) => {
  try {
    const body = req.body;
    const keys = Object.keys(body);

    if (keys.length !== 1) {
      return res.status(400).json({
        is_success: false,
        official_email: EMAIL,
        error: "Exactly one input key is required"
      });
    }

    const key = keys[0];
    let data;

    switch (key) {
      case "fibonacci":
        if (!Number.isInteger(body[key]) || body[key] < 0)
          throw "Invalid fibonacci input";
        data = fibonacciSeries(body[key]);
        break;

      case "prime":
        if (!Array.isArray(body[key]))
          throw "Invalid prime input";
        data = filterPrimes(body[key]);
        break;

      case "lcm":
        if (!Array.isArray(body[key]))
          throw "Invalid lcm input";
        data = calculateLCM(body[key]);
        break;

      case "hcf":
        if (!Array.isArray(body[key]))
          throw "Invalid hcf input";
        data = calculateHCF(body[key]);
        break;

      case "AI":
        if (typeof body[key] !== "string")
          throw "Invalid AI input";
        data = await askAI(body[key]);
        break;

      default:
        throw "Invalid key";
    }

    res.status(200).json({
      is_success: true,
      official_email: EMAIL,
      data
    });

  } catch (err) {
    res.status(400).json({
      is_success: false,
      official_email: EMAIL,
      error: err.toString()
    });
  }
});

module.exports = router;
