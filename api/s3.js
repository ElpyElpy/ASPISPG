const { S3Client, PutObjectCommand, ListObjectsV2Command, GetObjectCommand } = require('@aws-sdk/client-s3');
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const { v4: uuid } = require('uuid');


credentials = {
    accessKeyId: "AKIA4EP5Z4RVAV5RLHHJ",
    secretAccessKey: "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"
}

const s3 = new S3Client({
    region: 'eu-central-1',
    credentials: credentials,
    forcePathStyle: true,
})

const BUCKET = "pg-avatars"


const uploadToS3 = async ({ file, userId }) => {
    const key = `${userId.toString()}/${uuid().replace(/-/g, '')}`;
    const command = new PutObjectCommand({
        Bucket: BUCKET,
        Key: key,
        Body: file.buffer,
        ContentType: file.mimetype,
    });

    try {
        await s3.send(command);
        return { key };
    } catch (error) {
        console.log(error);
        return { error };
    }
};


const getImageKeysByUser = async (userId = false) => {

    if (userId) {
        var command = new ListObjectsV2Command({
            Bucket: BUCKET,
            Prefix: userId.toString(),
        })
    } else {
        var command = new ListObjectsV2Command({
            Bucket: BUCKET,
        })
    }

    try {
        var { Contents = [] } = await s3.send(command);
    } catch (error) {
        console.log(error);
    }

    return Contents.sort(
        (a, b) => new Date(b.LastModified) - new Date(a.LastModified)
    ).map((image) => image.Key);
};


const getUserPresignedUrls = async (userId = false) => {

    try {
        if (userId) {
            var imageKeys = await getImageKeysByUser(userId);
        } else {
            var imageKeys = await getImageKeysByUser();
        }
        const presignedUrls = await Promise.all(
            imageKeys.map((key) => {
                const command = new GetObjectCommand({ Bucket: BUCKET, Key: key });
                return getSignedUrl(s3, command, { expiresIn: 900 }); // default
            })
        );
        return { presignedUrls };
    } catch (error) {
        console.log(error);
        return { error };
    }
};

module.exports = { uploadToS3, getImageKeysByUser, getUserPresignedUrls };