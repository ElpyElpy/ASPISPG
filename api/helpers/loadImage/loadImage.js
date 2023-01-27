const multer = require('multer');




const defineLoadingParams = () => {
    // ------------------------------------------------ NEW CODE
    const storage = multer.memoryStorage();
    const isImage = (req, file, cb) => {
        if (file.mimetype.startsWith('image')) {
            if (file.size < 5000000) {
                cb(null, true);
            } else {
                cb(null, Error('Not an image'));
            }
        } else {
            cb(null, Error('Not an image'));
        }
    }
    const upload = multer({ storage: storage, fileFilter: isImage });
    return upload



    // ------------------------------------------------ OLD CODE
    // const storage = multer.diskStorage({
    //     destination: (req, file, cb) => {
    //         cb(null, './uploads');
    //     },
    //     filename: (req, file, cb) => {
    //         cb(null, `image-${Date.now()}.${file.originalname}`);
    //     }
    // });

    // const isImage = (req, file, cb) => {
    //     if (file.mimetype.startsWith('image')) {
    //         if (file.size < 5000000) {
    //             cb(null, true);
    //         } else {
    //             cb(null, Error('Not an image'));
    //         }
    //     } else {
    //         cb(null, Error('Not an image'));
    //     }

    // }

    // const upload = multer({ storage: storage, fileFilter: isImage })

    // return upload;
}

module.exports = { defineLoadingParams };