const { HuggingFaceInferenceEmbeddings } = require("langchain/embeddings/hf");

const hfEmbeddings = new HuggingFaceInferenceEmbeddings({
  apiKey: process.env?.HF_ACCESS_TOKEN,
});

module.exports = hfEmbeddings;
