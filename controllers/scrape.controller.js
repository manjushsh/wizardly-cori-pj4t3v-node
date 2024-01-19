const { HfInference } = require("@huggingface/inference");
const Constants = require("../services/constants");

async function ScrapeDataV1(req, res, _) {
  const { HF_ACCESS_TOKEN } = process.env;
  const inference = new HfInference(HF_ACCESS_TOKEN);

  try {
    return res.send({ message: "Hello" });
  } catch (err) {
    console.debug("Caught error: ", err);
    return res.status(500).send({ error: err });
  }
}

module.exports = { ScrapeDataV1 };
