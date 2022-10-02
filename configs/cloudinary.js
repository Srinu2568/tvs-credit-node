const cloudinary = require("cloudinary");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");
const { promisify } = require("util");

const uploadAsync = promisify(
  cloudinary.uploader.upload.bind(cloudinary.uploader)
);

const fs = require("fs");
cloudinary.config({
  cloud_name: "dy8dcyq13",
  api_key: "476628673658786",
  api_secret: "2-j-XaTgQkqXrTd0FdokL9dxZrg",
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let path = `./uploads/`;
    // fs.mkdirSync(path);
    cb(null, path);
  },
});

const cloudinaryUploads = (file, folder) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(
      file,
      (result) => {
        resolve({
          url: result.url,
          id: result.public_id,
        });
      },
      {
        resource_type: "auto",
        folder: folder,
      }
    );
  });
};

// deleting all of the assets in library
// cloudinary.api.delete_all_resources().then((res) => console.log(res));

const fileUpload = multer({ storage, limits: { fileSize: 1024 * 1024 } });

module.exports = { fileUpload, cloudinaryUploads };
