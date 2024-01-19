const Constants = {
  MODELS: {
    SD_PROMPTGEN: "Gustavosta/MagicPrompt-Stable-Diffusion",
    SDXL1_BASE1: "stabilityai/stable-diffusion-xl-base-1.0",
    SDXL1_REFINER: "stabilityai/stable-diffusion-xl-refiner-1.0",
    STABILITYAI_1_5: "runwayml/stable-diffusion-v1-5",
    STABILITYAI_UD_1_5: "stablediffusionapi/sdxl-unstable-diffusers-y",
    STABILITYAI_2_1: "stabilityai/stable-diffusion-2-1",
    MICROSOFT_PHI2: "microsoft/phi-2",
    TINYLLMA1_1B_CHAT_V1_0: "TinyLlama/TinyLlama-1.1B-Chat-v1.0",
  },

  STATUS_CODES: {
    CONTINUE: 100,
    SWITCHING_PROTOCOLS: 101,
    SUCCESS: 200,
    CREATED: 201,
    ACCEPTED: 202,
    NO_CONTENT: 204,
    MOVED_PERMANENTLY: 301,
    FOUND: 302,
    NOT_MODIFIED: 304,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    PAYMENT_REQUIRED: 402,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    METHOD_NOT_ALLOWED: 405,
    NOT_ACCEPTABLE: 406,
    REQUEST_TIMEOUT: 408,
    CONFLICT: 409,
    GONE: 410,
    LENGTH_REQUIRED: 411,
    PAYLOAD_TOO_LARGE: 413,
    URI_TOO_LONG: 414,
    RANGE_NOT_SATISFIABLE: 416,
    EXPECTATION_FAILED: 417,
    I_AM_A_TEAPOT: 418,
    TOO_MANY_REQUESTS: 419,
    LOGIN_TIMEOUT: 440,
    INTERNAL_SERVER_ERROR: 500,
    BAD_GATEWAY: 502,
    SERVIICE_UNAVAILABLE: 503,
    GATEWAY_TIMEOUT: 504,
  },

  INSTRUCTIONS: {
    DEFAULT_INSTRUCTION: `<|system|>
  You are a chatbot who can help extract data from given HTML sanitized string!</s>`,
  },
};

module.exports = Constants;
