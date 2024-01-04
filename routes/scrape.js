const express = require("express");
const { ScrapeDataV1 } = require("../controllers/scrape.controller");
const router = express.Router();

/* Scrape data extract */
router.get("/", ScrapeDataV1);
