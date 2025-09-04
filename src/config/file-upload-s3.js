import multer from 'multer';
import multerS3 from "multer-s3";
import aws from "aws-sdk";
import { REGION, ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY} from "./server-config.js";

aws.config.update({
    region: REGION,
    secretAccessKey: AWS_SECRET_ACCESS_KEY,
    accessKeyId: ACCESS_KEY_ID 
});

const s3 = new aws.S3();
const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: 'some-bucket',
        acl: 'public-read',
        metadata: function (req, file, cb) {
            cb(null, {fileName: file.fieldname});
        },
        key: function (req, file, cb) {
            cb(null, Date.now().toString())
        }
    })
});

export default upload;