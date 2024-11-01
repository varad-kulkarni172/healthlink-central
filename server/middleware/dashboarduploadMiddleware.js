    // server/middleware/dashboarduploadMiddleware.js
    const multer = require('multer');
    const path = require('path');

    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, 'uploads/');
        },
        filename: (req, file, cb) => {
            cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
        }
    });

    const fileFilter = (req, file, cb) => {
        if (file.mimetype === 'application/pdf' || file.mimetype === 'text/csv') {
            cb(null, true);
        } else {
            cb(new Error('Invalid file type, only PDF and CSV are allowed!'), false);
        }
    };

    const upload = multer({
        storage: storage,
        fileFilter: fileFilter
    });

    module.exports = upload;