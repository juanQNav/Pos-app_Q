const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {

        const imagePath = path.join(__dirname, '../../angular-frontend/public/images/products/');
        cb(null, imagePath);
    },
    filename: function (req, file, cb) {
        const extension = path.extname(file.originalname);
        cb(null, `${req.params.id}${extension}`);
    }
});

const upload = multer({ storage: storage });

module.exports = upload;
