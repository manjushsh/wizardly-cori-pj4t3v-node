const express = require("express");
const {
  ImageGenV1,
  ImageGen1_5,
  ImageGenV1_5_UD,
  ImageGenV2,
} = require("../controllers/igen.controller");
const { STATUS_CODES } = require("../services/constants");

const router = express.Router();

/* Post for V1 */
router.post("/img_gen_v1", ImageGenV1);

/* Post for V1.5 standard */
router.post("/img_gen_v1_5", ImageGen1_5);

/* Post for V1.5 ud */
router.post("/img_gen_v1_5_ud", ImageGenV1_5_UD);

/* Post for V2.1 base */
router.post("/img_gen_v2", ImageGenV2);

router.post("/", function (_, res) {
  res.status(STATUS_CODES.UNAUTHORIZED).send({ message: "Access denied." });
});

module.exports = router;
