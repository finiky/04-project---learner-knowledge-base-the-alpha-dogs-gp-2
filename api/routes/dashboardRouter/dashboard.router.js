const express = require("express");
const dashboardRouter = express();
const dashboardRepository = require("./dashboard.repository");

dashboardRouter.get("/", async (req, res) => {
  try {
    const result = await dashboardRepository.getAllFaqs();
    res.json(result);
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
});

module.exports = dashboardRouter;
