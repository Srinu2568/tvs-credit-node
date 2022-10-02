const router = require("express").Router();

const { Router } = require("express");
const { authInfoExtraction } = require("../middlewares/authentication");
const getAllUsedCars = require("../controllers/evaluatorControllers/getAllUsedCars");
const getUCById = require("../controllers/evaluatorControllers/getUCById");
const predictPrice = require("../controllers/evaluatorControllers/predictPrice");
const updateEvaluatedPrice = require("../controllers/evaluatorControllers/updateEvalPrice");
const isEvalFinished = require("../controllers/evaluatorControllers/isEvalFinished");
const evalFeedback = require("../controllers/evaluatorControllers/evalFeedback");

router.route("/get-auc").get(getAllUsedCars);
router.route("/get-uc").get(getUCById);
router.route("/predict-price").get(predictPrice);
router.route("/uep").post(updateEvaluatedPrice);
router.route("/ief").post(isEvalFinished);
router.route("/feedback-text").post(evalFeedback);

/*
auc - all used cars
uc - used car

uap - update evaluated price
ief - is eval finished


*/

module.exports = router;
