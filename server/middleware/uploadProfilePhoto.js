const multer = require("multer");
const path = require("path");
const fs = require("fs");


// ==========================================
// PROFILE PHOTO UPLOAD DIRECTORY
// ==========================================

const uploadDirectory = path.join(
    __dirname,
    "..",
    "uploads",
    "profiles"
);


// Create directory if it does not exist

if (!fs.existsSync(uploadDirectory)) {
    fs.mkdirSync(uploadDirectory, {
        recursive: true
    });
}


// ==========================================
// STORAGE
// ==========================================

const storage = multer.diskStorage({

    destination: (req, file, cb) => {
        cb(null, uploadDirectory);
    },

    filename: (req, file, cb) => {

        const extension =
            path.extname(file.originalname)
                .toLowerCase();

        const uniqueName =
            `profile-${req.user.id}-${Date.now()}${extension}`;

        cb(null, uniqueName);
    }

});


// ==========================================
// FILE VALIDATION
// ==========================================

const fileFilter = (req, file, cb) => {

    const allowedTypes = [
        "image/jpeg",
        "image/jpg",
        "image/png",
        "image/webp"
    ];

    if (!allowedTypes.includes(file.mimetype)) {

        return cb(
            new Error(
                "Only JPG, JPEG, PNG and WEBP images are allowed"
            )
        );

    }

    cb(null, true);
};


// ==========================================
// MULTER
// ==========================================

const uploadProfilePhoto = multer({

    storage,

    fileFilter,

    limits: {
        fileSize: 5 * 1024 * 1024
    }

});

module.exports = uploadProfilePhoto;