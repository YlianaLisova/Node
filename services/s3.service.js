const S3 = require('aws-sdk/clients/s3');

const {AWS_S3_BUCKET, AWS_S3_ACCESS_KEY, AWS_S3_SECRET_KEY, AWS_S3_REGION} = require('../constants/configs')

const BucketConfig = new S3({
    region: AWS_S3_REGION,
    secretAccessKey: AWS_S3_SECRET_KEY,
    accessKeyId: AWS_S3_ACCESS_KEY
});

const uploadFile = async (file) => {
   return  BucketConfig
       .upload({
        Bucket: AWS_S3_BUCKET,
        Key: file.name,
        ACL: "public-read",
        Body: file.data
    })
        .promise()
}

module.exports = {
    uploadFile
}
