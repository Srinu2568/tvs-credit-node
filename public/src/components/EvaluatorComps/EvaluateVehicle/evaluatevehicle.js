// import { TaggedContentCard } from "react-ui-cards";

import * as React from "react";
import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import CardMedia from "@mui/material/CardMedia";
import { ButtonBase, CardActionArea } from "@mui/material";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import ImageGallery from "react-image-gallery";
import Carousel from "framer-motion-carousel";
// material design imports
import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Divider from "@mui/material/Divider";
import { Alert, AlertTitle, CircularProgress, Snackbar } from "@mui/material";
import { DomLink } from "react-router-dom";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
// import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";

import { Divider as HrDivider } from "@react-md/divider";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

import { useLocation, useNavigate, NavLink, useParams } from "react-router-dom";

import axios from "axios";
import { v4 as uuidv4 } from "uuid";

const Item = styled(Paper)(({ theme }) => ({
  // backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  // ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
}));

export default function BasicCard(props) {
  let { id } = useParams();
  let [allUsedCars, setAllUsedCars] = useState([]);
  let [vehicleInfo, setVehicleInfo] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [predictedPrice, setPredictedPrice] = useState("");
  const [ucId, setUcId] = useState("");
  const [evaluatedPrice, setEvaluatedPrice] = useState("");
  const [evalFeedbackText, setEvalFeedbackText] = useState("");
  const [isEvalFinished, setIsEvalFinished] = useState(false);

  async function submitEvalPrice(data) {
    return fetch("api/v1/evaluator/uep", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((data) => {
        setIsLoading(false);
        return data.json();
      })
      .catch((err) => {
        setIsLoading(false);
      });
  }

  async function submitEvalFeedback(data) {
    return fetch("http://localhost:3001/api/v1/evaluator/feedback-text", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((data) => {
        setIsLoading(false);
        return data.json();
      })
      .catch((err) => {
        setIsLoading(false);
      });
  }
  async function submitIsEvalFinished(data) {
    return fetch("http://localhost:3001/api/v1/evaluator/ief", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((data) => {
        setIsLoading(false);
        return data.json();
      })
      .catch((err) => {
        setIsLoading(false);
      });
  }

  useEffect(() => {
    document.title = props.title || "dashboard";
  }, [props.title]);
  useEffect(() => {
    async function runner() {
      let fetcheVehicleInfo = await fetch(
        `http://localhost:3001/api/v1/evaluator/get-uc?ucId=${id}`,
        {
          method: "GET",
        }
      ).then(async (res) => {
        let fetchedUsedCar = await res.json();
        fetchedUsedCar.data.images = JSON.parse(fetchedUsedCar.data.images);
        setUcId(ucId);
        delete fetchedUsedCar.data.videos;
        delete fetchedUsedCar.data.id;
        delete fetchedUsedCar.data.updatedAt;
        delete fetchedUsedCar.data.ucId;
        if (fetchedUsedCar.data.isEvalFinished === false) {
          delete fetchedUsedCar.data.evaluatedPrice;
          delete fetchedUsedCar.data.predictedPrice;
          // delete fetchedUsedCar.data.isEvalFinished;
          delete fetchedUsedCar.data.evalFeedback;
          delete fetchedUsedCar.data.ucId;
          delete fetchedUsedCar.data.isEvalFinished;
        }
        setIsEvalFinished(fetchedUsedCar.data.isEvalFinished);
        // console.log(fetchedUsedCar.data);
        delete fetchedUsedCar.data.isEvalFinished;
        setVehicleInfo(fetchedUsedCar.data);
        return fetchedUsedCar.data;
      });
    }
    runner();
  }, []);

  let allGrids = [];
  let vehicleInfoKeys = Object.keys(vehicleInfo);

  let processedImgArrForSlides = [];

  for (let key of vehicleInfoKeys) {
    if (key === "images") continue;
    let grid = (
      <Grid
        container
        rowSpacing={1}
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        sx={{ mt: 2, mb: 2 }}
      >
        <Grid item xs={6}>
          <Typography variant="h6" component="h6" align="center">
            {key === "createdAt"
              ? "Submitted date For Evaluation"
              : key.replace(/([A-Z]+)/g, " $1").replace(/([A-Z][a-z])/g, " $1")}
            <br />
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="h6" component="h6" align="center">
            {key === "createdAt"
              ? new Date(vehicleInfo[key]).toLocaleDateString()
              : vehicleInfo[key]}
            {/* {vehicleInfo[key]} */}
            <br />
          </Typography>
          {/* {vehicleInfo[key]} */}
        </Grid>
      </Grid>
    );
    allGrids.push(grid);
  }

  let loadingSpinner = "Submit Evaluation Report";

  if (isLoading) {
    loadingSpinner = <CircularProgress />;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    let updatedEvalPrice = await submitEvalPrice({
      ucId: id,
      evaluatedPrice: evaluatedPrice,
    });
    let updateEvalFeedback = await submitEvalFeedback({
      ucId: id,
      feedbackText: evalFeedbackText,
    });
    let updateIsEvalFinished = await submitIsEvalFinished({
      ucId: id,
      isEvalFinished: isEvalFinished,
    });
    setPredictedPrice("");
    setEvalFeedbackText("");
    setEvaluatedPrice("");
  }
  async function getPredictedPrice() {
    let { predictedPrice } = await fetch(
      `http://localhost:3001/api/v1/evaluator/predict-price?ucId=${id}`
    ).then((res) => res.json());
    console.log(predictedPrice.prediction);
    setPredictedPrice(`${predictedPrice.prediction} Lakhs`);
  }
  return (
    <Container component="main" height={"100%"} width={"50%"}>
      <CssBaseline />
      <Box
        sx={{
          marginTop: 3,
          marginBottom: 7,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography variant="h4" component="h2" align="center">
          Evaluate Price For Vehicle
          <br />
        </Typography>
        {allGrids}
        <Typography
          variant="h5"
          component="h2"
          align="center"
          sx={{ mt: 5, mb: 5 }}
        >
          Images Of Vehicle
          <br />
        </Typography>
        {vehicleInfo.images ? (
          <div style={{ width: 600, height: 400, margin: "0 auto" }}>
            <Carousel>
              {vehicleInfo.images.map((item, i) => (
                <img
                  draggable="false"
                  src={`${item.url}`}
                  key={i}
                  width="100%"
                  alt=""
                />
              ))}
            </Carousel>
          </div>
        ) : (
          ""
        )}
        <Typography variant="h4" component="h2" sx={{ mt: 5, mb: 5 }}>
          Evaluation Report
          <br />
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit}
          noValidate
          sx={{ mt: 1, mb: 2 }}
        >
          <TextField
            margin="normal"
            required
            fullWidth
            id="predictedPrice"
            label="Predicted Price"
            name="predictedPrice"
            value={predictedPrice}
            onChange={(e) => {
              // setEmailValue(e.target.value)
              setPredictedPrice(e.target.value);
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    edge="end"
                    color="primary"
                    onClick={getPredictedPrice}
                  >
                    <Button variant="outlined">Predict Price By Ai</Button>
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="evaluatedPrice"
            label="evaluated Price"
            placeholder="In Lakhs"
            id="evaluatedPrice"
            value={evaluatedPrice}
            onChange={(e) => {
              // console.log(e.target.value);
              setEvaluatedPrice(e.target.value);
            }}
          />
          <TextField
            margin="normal"
            multiline
            fullWidth
            name="evalFeedback"
            label="evaluation Feedback"
            id="evalFeedback"
            placeholder="enter few lines about the evaluation and points to consider about the vehicle"
            value={evalFeedbackText}
            onChange={(e) => {
              // console.log(e.target.value);
              setEvalFeedbackText(e.target.value);
            }}
          />
          <InputLabel id="isEvalFinished">Is Evaluation Finished</InputLabel>
          <Select
            required
            labelId="isEvalFinished"
            id="is-eval-finished"
            value={isEvalFinished}
            label="Owner Type"
            onChange={(e) => {
              console.log(e.target.value);
              setIsEvalFinished(e.target.value);
            }}
            fullWidth
          >
            <MenuItem value={"false"}>False</MenuItem>
            <MenuItem value={"true"}>True</MenuItem>
          </Select>

          {isEvalFinished === true ? (
            <Button
              type="submit"
              fullWidth
              disabled={true}
              // disabled={isLoading}
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              {loadingSpinner}
            </Button>
          ) : (
            <Button
              type="submit"
              fullWidth
              disabled={isLoading}
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              {loadingSpinner}
            </Button>
          )}
        </Box>
      </Box>
    </Container>
  );
}
