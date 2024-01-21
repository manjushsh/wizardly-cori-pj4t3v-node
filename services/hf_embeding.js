const { HuggingFaceInference } = require("@langchain/community/llms/hf");

function getHfEmbeding(model) {
  return new HuggingFaceInference({
    model: "gpt2",
    apiKey: process.env?.HF_ACCESS_TOKEN,
  });
}

module.exports = { getHfEmbeding };
