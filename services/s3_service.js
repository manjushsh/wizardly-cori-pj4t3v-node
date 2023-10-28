const {
  S3Client,
  ListBucketsCommand,
  PutObjectCommand,
} = require("@aws-sdk/client-s3");
const { format } = require("date-fns");
const CommonService = require("./common-service");

const YEAR = format(new Date(), "yyyy");
const MONTH = format(new Date(), "MM");
const IPFS_GATEWAY_BASE_URL = "https://ipfs.filebase.io/ipfs/";

let CID = null;

const client = new S3Client({
  credentials: {
    accessKeyId: process?.env?.FILEBASE_AWS_ACCESS_KEY || "",
    secretAccessKey: process?.env?.FILEBASE_AWS_SECRET_KEY || "",
    sessionToken: "SessionToken",
  },
  region: process?.env?.AWS_REGION,
  endpoint: process?.env?.FILEBASE_ENDPOINT,
});

const S3Service = {
  uploadFileToS3: async (blob) => {
    const formatedDate = format(new Date(), "yyyy-MM-dd_HH:mm:ss");
    const fileName = `imggen-${formatedDate}.jpg`;
    const imageBuffer = await CommonService.createBufferFromBlob(blob);
    const pc = new PutObjectCommand({
      Bucket: process?.env?.AWS_BUCKET_NAME,
      Key: `hf_stable_diffussion2/${fileName}`, //  `${YEAR}/${MONTH}/log-${formatedDate}.json`,
      Body: imageBuffer,
      ContentType: "image/jpg",
    });
    const putObjectCommand = S3Service.addPutObjectMiddleware(pc);
    return {
      ...(await client.send(putObjectCommand)),
      imageUrl: IPFS_GATEWAY_BASE_URL + "" + CID,
    };
  },
  uploadPromptTextToS3: async (text, createdPrompt, filePath) => {
    const formatedDate = format(new Date(), "yyyy-MM-dd_HH:mm:ss");
    const pc = new PutObjectCommand({
      Bucket: process?.env?.AWS_BUCKET_NAME,
      Key: `prompts/prompt-${formatedDate}.txt`,
      Body: `User Prompt: ${text} \n
            Generated prompt: ${createdPrompt} \n
            File stored at: ${filePath}`,
    });
    const putObjectCommand = S3Service.addPutObjectMiddleware(pc);
    return await client.send(putObjectCommand);
  },
  uploadTextToS3: async (text, translated) => {
    const formatedDate = format(new Date(), "yyyy-MM-dd_HH:mm:ss");
    const pc = new PutObjectCommand({
      Bucket: process?.env?.AWS_BUCKET_NAME,
      Key: `translations/translation-${formatedDate}.txt`,
      Body: `Original: ${text}
            Translated: ${translated}`,
    });
    const putObjectCommand = S3Service.addPutObjectMiddleware(pc);
    return await client.send(putObjectCommand);
  },
  listAllBuckets: async () => {
    try {
      const inputFilter = ""; // Empty string provided. So returns all buckets.
      const listBucketCommand = new ListBucketsCommand(inputFilter);
      return await client.send(listBucketCommand);
    } catch (err) {
      return { message: `Oops! Caught error. Error: ${err?.message}` };
    }
  },
  /**
   *
   * @param putObjectCommand
   *
   * This is used for FileBase middleware access.
   * Once file is uploaded we get `IPFS CID` from response headers which denotes unique ID
   * for accessing that file in FileBase.
   */
  addPutObjectMiddleware: (putObjectCommand) => {
    putObjectCommand.middlewareStack.add(
      (next) => async (args) => {
        // Check if request is incoming as middleware works both ways
        const response = await next(args);
        if (!response?.response?.statusCode) return response;

        // Get cid from headers
        const cid = response.response?.headers["x-amz-meta-cid"];
        CID = cid;
        return response;
      },
      {
        step: "build",
        name: "addCidToOutput",
      },
    );
    return putObjectCommand;
  },
};

module.exports = S3Service;
