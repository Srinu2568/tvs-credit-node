const router = require("express").Router();

const { fileUpload, upload } = require("../configs/cloudinary");

const postForm = require("../controllers/userFormControllers/postForm");
const deleteAUC = require("../controllers/userFormControllers/deleteAUC");
const getAllLocations = require("../controllers/userFormControllers/getAllLocations");
const getAllCarModels = require("../controllers/userFormControllers/getAllCarModels");

router.route("/form").post(fileUpload.array("vehicle_images", 20), postForm);
router.route("/del-auc").get(deleteAUC);
router.route("/get-acm").get(getAllCarModels);
router.route("/get-allLoc").get(getAllLocations);

module.exports = router;
