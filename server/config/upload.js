const multer = require("multer");
const path = require("path");
const fs = require("fs");


// ==========================================
// UPLOAD DIRECTORY
// ==========================================

const uploadDirectory = path.join(
    __dirname,
    "../uploads"
);


// ==========================================
// CREATE DIRECTORY IF NOT EXISTS
// ==========================================

if (!fs.existsSync(uploadDirectory)) {

    fs.mkdirSync(
        uploadDirectory,
        {
            recursive: true
        }
    );

}


// ==========================================
// STORAGE
// ==========================================

const storage = multer.diskStorage({

    destination: (req, file, cb) => {

        cb(
            null,
            uploadDirectory
        );

    },


    filename: (req, file, cb) => {

        const uniqueName =
            Date.now() +
            "-" +
            Math.round(
                Math.random() * 1E9
            ) +
            path.extname(
                file.originalname
            );


        cb(
            null,
            uniqueName
        );

    }

});


// ==========================================
// FILE FILTER
// ==========================================

const fileFilter = (req, file, cb) => {

    const allowedExtensions = [

        ".pdf",

        ".jpg",

        ".jpeg",

        ".png",

        ".webp"

    ];


    const extension =
        path.extname(
            file.originalname
        ).toLowerCase();


    if (
        allowedExtensions.includes(
            extension
        )
    ) {

        cb(
            null,
            true
        );

    } else {

        cb(
            new Error(
                "Only PDF, JPG, JPEG, PNG and WEBP files are allowed"
            )
        );

    }

};


// ==========================================
// MULTER
// ==========================================

const upload = multer({

    storage,

    fileFilter,

    limits: {

        fileSize:
            10 * 1024 * 1024

    }

});


module.exports = upload;