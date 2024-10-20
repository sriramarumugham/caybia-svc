import AWS = require("aws-sdk");
require("dotenv").config();

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY,
});

const awsupload = async (filename: any, fileContent: any) => {
  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: `productDeck/${filename}`,
    Body: fileContent,
  };
  return new Promise((resolve, reject) => {
    try {
      //@ts-ignore
      s3.upload(params, (err: any, data: any) => {
        if (err) {
          reject(err);
        }
        resolve(data.Location);
      });
    } catch (err) {
      console.log(err);
    }
  });
};

export { awsupload };
