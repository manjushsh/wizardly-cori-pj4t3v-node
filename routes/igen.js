const express = require("express");
const { HfInference } = require("@huggingface/inference");
const S3Service = require("../services/s3_service");
const Constants = require("../services/constants");

const router = express.Router();

/* Post for V1 */
router.post("/img_gen_v1", async function (req, res, _) {
  const { HF_ACCESS_TOKEN } = process.env;
  const { prompt, negetivePrompt } = req.body;

  const inference = new HfInference(HF_ACCESS_TOKEN);
  const prompGenResponse = await inference.textGeneration({
    model: Constants.SSDXL1_PROMPTGEN,
    inputs: prompt,
  });
  const responseSDXL1 = await inference.textToImage({
    model: Constants.SDXL1_BASE1,
    inputs: prompGenResponse.generated_text,
    parameters: {
      negative_prompt: negetivePrompt || "blurry",
    },
  });
  const response = await inference.imageToImage({
    model: Constants.SDXL1_REFINER,
    inputs: responseSDXL1,
    parameters: {
      negative_prompt: negetivePrompt || "blurry",
    },
  });
  const s3UploadResponse = await S3Service.uploadFileToS3(response);
  await S3Service.uploadPromptTextToS3(
    prompt,
    prompGenResponse.generated_text,
    s3UploadResponse.imageUrl,
  );
  res.send(s3UploadResponse);
});

router.post("/", function (req, res, next) {
  res.send("respond with a resource");
});

module.exports = router;
