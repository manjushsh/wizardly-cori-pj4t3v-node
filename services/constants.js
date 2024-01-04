const Constants = {
  SD_PROMPTGEN: "Gustavosta/MagicPrompt-Stable-Diffusion",
  SDXL1_BASE1: "stabilityai/stable-diffusion-xl-base-1.0",
  SDXL1_REFINER: "stabilityai/stable-diffusion-xl-refiner-1.0",
  STABILITYAI_1_5: "runwayml/stable-diffusion-v1-5",
  STABILITYAI_UD_1_5: "stablediffusionapi/sdxl-unstable-diffusers-y",
  STABILITYAI_2_1: "stabilityai/stable-diffusion-2-1",
  MICROSOFT_PHI2: "microsoft/phi-2",
  TINYLLMA1_1B_CHAT_V1_0: "TinyLlama/TinyLlama-1.1B-Chat-v1.0",

  DEFAULT_INSTRUCTION: `<|system|>
  You are a chatbot who can help extract data from given HTML sanitized string!</s>`,
};

module.exports = Constants;
