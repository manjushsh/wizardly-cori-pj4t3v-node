const { getHfEmbeding } = require("../services/hf_embeding");
const { MODELS } = require("../services/constants");

async function ScrapeDataV1(req, res, _) {
  try {
    const phiModel = getHfEmbeding(MODELS.MICROSOFT_PHI2);
    console.debug("Invoking...");
    const response = await phiModel.invoke("Meaning of life is: ");
    console.debug("Response: ", response);
    // return res.send({ message: "Hello" });
  } catch (err) {
    console.debug("Caught error: ", err);
    // return res.status(500).send({ error: err });
  }
}

module.exports = { ScrapeDataV1 };

ScrapeDataV1();
