const { HfInference } = require("@huggingface/inference");
const S3Service = require("../services/s3_service");
const { MODELS } = require("../services/constants");

function extractRequestData(req) {
  const { HF_ACCESS_TOKEN } = process.env;
  const { prompt, negetivePrompt, magicPrompt } = req.body;
  return { HF_ACCESS_TOKEN, prompt, negetivePrompt, magicPrompt };
}

async function ImageGenV1(req, res, _) {
  const { HF_ACCESS_TOKEN, prompt, negetivePrompt, magicPrompt } =
    extractRequestData(req);
  const inference = new HfInference(HF_ACCESS_TOKEN);
  try {
    let prompGenResponse = null;
    if (magicPrompt) {
      await inference.textGeneration({
        model: MODELS.SD_PROMPTGEN,
        inputs: prompt,
      });
    }
    const responseSDXL1 = await inference.textToImage({
      model: MODELS.SDXL1_BASE1,
      inputs: prompGenResponse?.generated_text || prompt,
      parameters: {
        negative_prompt: negetivePrompt || "blurry",
      },
    });
    const response = await inference.imageToImage({
      model: MODELS.SDXL1_REFINER,
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
}

async function ImageGen1_5(req, res, _) {
  const { HF_ACCESS_TOKEN, prompt, negetivePrompt, magicPrompt } =
    extractRequestData(req);

  const inference = new HfInference(HF_ACCESS_TOKEN);
  try {
    let prompGenResponse = null;
    if (magicPrompt) {
      await inference.textGeneration({
        model: MODELS.SD_PROMPTGEN,
        inputs: prompt,
      });
    }
    const responseFromSDXL15 = await inference.textToImage({
      model: MODELS.STABILITYAI_1_5,
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
}

async function ImageGenV1_5_UD(req, res, _) {
  const { HF_ACCESS_TOKEN, prompt, negetivePrompt, magicPrompt } =
    extractRequestData(req);

  const inference = new HfInference(HF_ACCESS_TOKEN);
  try {
    let prompGenResponse = null;
    if (magicPrompt) {
      await inference.textGeneration({
        model: MODELS.SD_PROMPTGEN,
        inputs: prompt,
      });
    }
    const responseFromSDXL15 = await inference.textToImage({
      model: MODELS.STABILITYAI_UD_1_5,
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
}

async function ImageGenV2(req, res, _) {
  const { HF_ACCESS_TOKEN, prompt, negetivePrompt, magicPrompt } =
    extractRequestData(req);

  const inference = new HfInference(HF_ACCESS_TOKEN);
  try {
    let prompGenResponse = null;
    if (magicPrompt) {
      await inference.textGeneration({
        model: MODELS.SD_PROMPTGEN,
        inputs: prompt,
      });
    }
    const responseFromSDXL2 = await inference.textToImage({
      model: MODELS.STABILITYAI_2_1,
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
}

module.exports = { ImageGenV1, ImageGen1_5, ImageGenV1_5_UD, ImageGenV2 };
