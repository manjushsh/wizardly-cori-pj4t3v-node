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
  try {
    let prompGenResponse = null;
    if (req?.body.magicPrompt) {
      await inference.textGeneration({
        model: Constants.SD_PROMPTGEN,
        inputs: prompt,
      });
    }
    const responseSDXL1 = await inference.textToImage({
      model: Constants.SDXL1_BASE1,
      inputs: prompGenResponse?.generated_text || prompt,
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
      prompGenResponse?.generated_text || "",
      s3UploadResponse.imageUrl,
    );
    res.send(s3UploadResponse);
  } catch (err) {
    console.debug("Caught error: ", err);
  }
});

/* Post for V1.5 standard */
router.post("/img_gen_v1_5", async function (req, res, _) {
  const { HF_ACCESS_TOKEN } = process.env;
  const { prompt, negetivePrompt } = req.body;

  const inference = new HfInference(HF_ACCESS_TOKEN);
  try {
    let prompGenResponse = null;
    if (req?.body.magicPrompt) {
      await inference.textGeneration({
        model: Constants.SD_PROMPTGEN,
        inputs: prompt,
      });
    }
    const responseFromSDXL15 = await inference.textToImage({
      model: Constants.STABILITYAI_1_5,
      inputs: prompGenResponse?.generated_text || prompt,
      parameters: {
        negative_prompt: negetivePrompt,
      },
    });
    const s3Response = await S3Service.uploadFileToS3(responseFromSDXL15);
    await S3Service.uploadPromptTextToS3(
      prompt,
      prompGenResponse?.generated_text || "",
      s3Response.imageUrl,
    );

    res.send(s3Response);
  } catch (err) {
    console.debug("Caught error: ", err);
  }
});

/* Post for V1.5 ud */
router.post("/img_gen_v1_5_ud", async function (req, res, _) {
  const { HF_ACCESS_TOKEN } = process.env;
  const { prompt, negetivePrompt } = req.body;

  const inference = new HfInference(HF_ACCESS_TOKEN);
  try {
    let prompGenResponse = null;
    if (req?.body.magicPrompt) {
      await inference.textGeneration({
        model: Constants.SD_PROMPTGEN,
        inputs: prompt,
      });
    }
    const responseFromSDXL15 = await inference.textToImage({
      model: Constants.STABILITYAI_UD_1_5,
      inputs: prompGenResponse?.generated_text || prompt,
      parameters: {
        negative_prompt: negetivePrompt,
      },
    });
    const s3Response = await S3Service.uploadFileToS3(responseFromSDXL15);
    await S3Service.uploadPromptTextToS3(
      prompt,
      prompGenResponse?.generated_text || "",
      s3Response.imageUrl,
    );

    res.send(s3Response);
  } catch (err) {
    console.debug("Error: ", err);
  }
});

/* Post for V2.1 base */
router.post("/img_gen_v2", async function (req, res, _) {
  const { HF_ACCESS_TOKEN } = process.env;
  const { prompt, negetivePrompt } = req.body;

  const inference = new HfInference(HF_ACCESS_TOKEN);
  try {
    let prompGenResponse = null;
    if (req?.body.magicPrompt) {
      await inference.textGeneration({
        model: Constants.SD_PROMPTGEN,
        inputs: prompt,
      });
    }
    const responseFromSDXL2 = await inference.textToImage({
      model: Constants.STABILITYAI_2_1,
      inputs: prompGenResponse?.generated_text || prompt,
      parameters: {
        negative_prompt: negetivePrompt,
      },
    });
    const s3Response = await S3Service.uploadFileToS3(responseFromSDXL2);
    await S3Service.uploadPromptTextToS3(
      prompt,
      prompGenResponse?.generated_text || "",
      s3Response.imageUrl,
    );

    res.send(s3Response);
  } catch (err) {
    console.debug("Error: ", err);
  }
});

router.post("/", function (req, res, next) {
  res.send("Ok");
});

module.exports = router;
