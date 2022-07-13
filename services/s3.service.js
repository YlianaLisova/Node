const S3 = require('aws-sdk/clients/s3');
const uuid = require('uuid').v4;

const {AWS_S3_BUCKET, AWS_S3_ACCESS_KEY, AWS_S3_SECRET_KEY, AWS_S3_REGION, AWS_S3_BUCKET_URL} = require('../constants/configs')

const BucketConfig = new S3({
    region: AWS_S3_REGION,
    secretAccessKey: AWS_S3_SECRET_KEY,
    accessKeyId: AWS_S3_ACCESS_KEY
});

const uploadFile = async (file, itemType, itemId) => {
    const Key = _buildFilePath(file.name, itemType, itemId);

    return BucketConfig
        .upload({
            Bucket: AWS_S3_BUCKET,
            Key,
            ContentType: file.mimetype,
            ACL: "public-read",
            Body: file.data
        })
        .promise()
}

const updateFile = async (file, fileURL) => {
    const path = fileURL.split(AWS_S3_BUCKET_URL).pop();
    console.log(path);
    return BucketConfig
        .putObject({
            Bucket: AWS_S3_BUCKET,
            Key: path,
            ContentType: file.mimetype,
            ACL: "public-read",
            Body: file.data
        })
        .promise()
}

const deleteFile = async (fileURL) => {
    const path = fileURL.split(AWS_S3_BUCKET_URL).pop();

    return BucketConfig
        .deleteObject({
            Bucket: AWS_S3_BUCKET,
            Key: path,
        })
        .promise()
}

module.exports = {
    uploadFile,
    updateFile,
    deleteFile
}

function _buildFilePath(fileName = '', itemType, itemId) {

    const ext1 = fileName.split('.').pop(); // return jpg
    // const ext2 = path.extname(fileName); // return .jpg


    // return `${itemType}/${itemId}/${Date.now()}${ext2}`
    return `${itemType}/${itemId}/${uuid()}.${ext1}`
}
