import { useState, useEffect, useRef } from "react";
import { nanoid } from "nanoid";
import { useLocation, useNavigate, NavLink } from "react-router-dom";
import { forOwn } from "lodash";
import axios from "axios";

// material design imports
import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
// import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import {
  Alert,
  AlertTitle,
  CircularProgress,
  Input,
  Snackbar,
} from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";

import FileUpload from "react-mui-fileuploader";

export default function UsedCarForm(props) {
  useEffect(() => {
    document.title = props.title;
  }, [props.title]);

  const [carModelVal, setCarModelVal] = useState("Select Your Car Model");

  const [locationVal, setLocationVal] = useState("");
  const [yearVal, setYearVal] = useState("");
  const [kilometers, setKilometers] = useState("");
  const [ownerType, setOwnerType] = useState("");
  const [fuelType, setFuelType] = useState("");
  const [power, setPower] = useState("");
  const [price, setPrice] = useState("");
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [fetchedCarModels, setFetchedCarModels] = useState(
    <MenuItem value={""}></MenuItem>
  );
  const [fetchedLocations, setFetchedLocations] = useState(
    <MenuItem value={""}></MenuItem>
  );

  let formData = new FormData();

  const [errorsArray, setErrorsArray] = useState([]);
  const [isErrors, setIsErrors] = useState(false);
  const [isSignUpSuccess, setIsSignUpSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  async function sendUsedCarData(usedCarData) {
    // return await axios
    //   .post("http://localhost:3001/api/v1/ucd-form/form", formData)

    return await fetch("/api/v1/ucd-form/form", {
      method: "POST",
      headers: {
        Accept: "*/*",
        Connection: "keep-alive",
      },
      body: formData,
    })
      .then((data) => {
        setIsLoading(false);
        return data.json();
      })
      .catch((err) => {
        setIsLoading(false);
      });
  }

  function removeAllImages() {
    const inputEl = document.getElementsByClassName(
      "MuiButtonBase-root MuiButton-root MuiButton-text MuiButton-textPrimary MuiButton-sizeSmall MuiButton-textSizeSmall MuiButton-root MuiButton-text MuiButton-textPrimary MuiButton-sizeSmall MuiButton-textSizeSmall css-1knaqv7-MuiButtonBase-root-MuiButton-root"
    );

    inputEl.click();
  }

  const displayError = [];
  let loadingSpinner = "Submit";

  if (isLoading) {
    loadingSpinner = <CircularProgress />;
  }
  if (isErrors === true) {
    errorsArray.forEach((errObj) => {
      forOwn(errObj, (value, key) => {
        const errorObj = (
          <Alert severity="error" key={nanoid()} sx={{ width: 1, m: 1 }}>
            <AlertTitle>{key}</AlertTitle>
            {value}
          </Alert>
        );
        displayError.push(errorObj);
      });
    });
  }

  // if (isSignUpSuccess === true) {
  //   return <></>;
  // }

  function filesChangeHandler(files) {
    // let encodedImg = [];
    // let files = Array.from(event.target.files);
    // files.forEach((el, ind, arr) => {
    //   const reader = new FileReader();
    //   reader.readAsDataURL(el);
    //   reader.onload = () => {
    //     encodedImg.push(reader.result);
    //   };
    // });

    setSelectedFiles(files);
  }

  useEffect(() => {
    async function carAndLocationFetcher() {
      await CarModelItemsFetcher();
      await locationsItemsFetcher();
    }

    carAndLocationFetcher();
    // return () => {
    //   second
    // }
  }, []);

  async function locationsItemsFetcher() {
    let locations = await axios.get("/api/v1/ucd-form/get-allLoc");
    let locationsArr = Object.values(locations.data.data);
    let menuItemsJsxElArr = [];
    for (const location of locationsArr) {
      console.log(location);
      let menuItem = (
        <MenuItem key={location.location} value={location.location}>
          {location.location}
        </MenuItem>
      );
      menuItemsJsxElArr.push(menuItem);
    }
    setFetchedLocations(menuItemsJsxElArr);
  }

  async function CarModelItemsFetcher() {
    let carModels = await axios.get("/api/v1/ucd-form/get-acm");
    let carModelsArr = Object.values(carModels.data.data);
    let menuItemsJsxElArr = [];
    console.log(carModels.data);
    for (const carModel of carModelsArr) {
      // console.log(carModelsArr);
      let menuItem = (
        <MenuItem key={carModel.carName} value={carModel.carName}>
          {carModel.carName}
        </MenuItem>
      );
      menuItemsJsxElArr.push(menuItem);
    }
    setFetchedCarModels(menuItemsJsxElArr);
  }
  const handleSubmit = async (event) => {
    event.preventDefault();

    formData.append("carModel", carModelVal);
    formData.append("location", locationVal);
    formData.append("year", yearVal);
    formData.append("kilometers", kilometers);
    formData.append("ownerType", ownerType);
    formData.append("fuelType", fuelType);
    formData.append("power", power);
    formData.append("price", price);
    for (let i = 0; i < selectedFiles.length; i++) {
      formData.append("vehicle_images", selectedFiles[i].path);
    }

    // console.log(props);
    setIsLoading(true);
    const queryRes = await sendUsedCarData(formData);

    console.log(queryRes);
    if (!queryRes) {
      return;
    }

    // console.log(queryRes);
    if (queryRes.success === true) {
      setIsSignUpSuccess(true);
    } else if (queryRes.success === false) {
      setIsErrors(true);
      setErrorsArray(queryRes.error);
      setIsSignUpSuccess(false);
    }

    // clear all of the fields.
    setCarModelVal("");
    setLocationVal("");
    setFuelType("");
    setOwnerType("");
    setPrice("");
    setPower("");
    setKilometers("");
  };
  return (
    <Container component="main" maxWidth="70%">
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
          Used Car Data Submission <br />
          For Evaluation
        </Typography>
        {displayError}
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <InputLabel id="car-name">Your Car Model Name</InputLabel>
          <Select
            required
            labelId="car-name"
            id="car-name-selector"
            value={carModelVal}
            label="Your Car Model Name"
            onChange={(e) => {
              console.log(e.target.value);
              setCarModelVal(e.target.value);
            }}
            fullWidth
          >
            {fetchedCarModels}
          </Select>
          <InputLabel id="location-name">Your Location</InputLabel>
          <Select
            required
            labelId="location-name"
            id="location-selector"
            value={locationVal}
            label="Your Location"
            onChange={(e) => {
              console.log(e.target.value);
              setLocationVal(e.target.value);
            }}
            fullWidth
          >
            {fetchedLocations}
          </Select>
          <InputLabel id="year">Year Of Purchase</InputLabel>
          <Select
            required
            labelId="year"
            id="year-selector"
            value={yearVal}
            label="Your Location"
            onChange={(e) => {
              console.log(e.target.value);
              setYearVal(e.target.value);
            }}
            fullWidth
          >
            <MenuItem value={"2003"}>Below 2003</MenuItem>
            <MenuItem value={"2003"}>2003</MenuItem>
            <MenuItem value={"2004"}>2004</MenuItem>
            <MenuItem value={"2005"}>2005</MenuItem>
            <MenuItem value={"2006"}>2006</MenuItem>
            <MenuItem value={"2007"}>2007</MenuItem>
            <MenuItem value={"2008"}>2008</MenuItem>
            <MenuItem value={"2009"}>2009</MenuItem>
            <MenuItem value={"2010"}>2010</MenuItem>
            <MenuItem value={"2011"}>2011</MenuItem>
            <MenuItem value={"2012"}>2012</MenuItem>
            <MenuItem value={"2013"}>2013</MenuItem>
            <MenuItem value={"2014"}>2014</MenuItem>
            <MenuItem value={"2015"}>2015</MenuItem>
            <MenuItem value={"2016"}>2016</MenuItem>
            <MenuItem value={"2017"}>2017</MenuItem>
            <MenuItem value={"2018"}>2018</MenuItem>
            <MenuItem value={"2019"}>2019</MenuItem>
            <MenuItem value={"2019"}>Above 2019</MenuItem>
          </Select>
          <TextField
            margin="normal"
            required
            fullWidth
            name="kilometers"
            label="Number Of Kilometers"
            id="kilometers"
            onChange={(e) => {
              // console.log(e.target.value);
              setKilometers(e.target.value);
            }}
          />
          <InputLabel id="ownerType">Owner Type</InputLabel>
          <Select
            required
            labelId="ownerType"
            id="owner-type-selector"
            value={ownerType}
            label="Owner Type"
            onChange={(e) => {
              console.log(e.target.value);
              setOwnerType(e.target.value);
            }}
            fullWidth
          >
            <MenuItem value={"First"}>First</MenuItem>
            <MenuItem value={"Second"}>Second</MenuItem>
            <MenuItem value={"Third"}>Third</MenuItem>
            <MenuItem value={"Third"}>Above Third</MenuItem>
          </Select>

          <InputLabel id="fuelType">Type Of Fuel</InputLabel>
          <Select
            required
            labelId="fuelType"
            id="fuel-type-selector"
            value={fuelType}
            label="Fuel Type"
            onChange={(e) => {
              console.log(e.target.value);
              setFuelType(e.target.value);
            }}
            fullWidth
          >
            <MenuItem value={"CNG"}>CNG</MenuItem>
            <MenuItem value={"Diesel"}>Diesel</MenuItem>
            <MenuItem value={"Petrol"}>Petrol</MenuItem>
          </Select>
          <TextField
            margin="normal"
            required
            fullWidth
            name="power"
            label="Power (horse power) of vehicle"
            id="fuelType"
            onChange={(e) => {
              // console.log(e.target.value);
              setPower(e.target.value);
            }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="price"
            label="Base Price When Vehicle Is Purchased In Lakhs like 2.85"
            id="price"
            onChange={(e) => {
              // console.log(e.target.value);
              setPrice(e.target.value);
            }}
          />
          <FileUpload
            multiFile={true}
            disabled={false}
            title="Upload vehicle images"
            header="[Drag to drop]"
            leftLabel="or"
            rightLabel="to select files"
            buttonLabel="click here"
            buttonRemoveLabel="Remove all"
            maxFileSize={20}
            maxUploadFiles={0}
            maxFilesContainerHeight={357}
            errorSizeMessage={"You can only upload 20 files maximum."}
            allowedExtensions={["jpg", "jpeg", "png"]}
            onFilesChange={filesChangeHandler}
            // onError={handleFileUploadError}
            bannerProps={{ elevation: 0, variant: "outlined" }}
            containerProps={{ elevation: 0, variant: "outlined" }}
          />
          {/* <input
            type="file"
            name="vehicle_images"
            multiple="multiple"
            onChange={filesChangeHandler}
          ></input> */}

          <Button
            type="submit"
            fullWidth
            disabled={isLoading}
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            {loadingSpinner}
          </Button>
        </Box>
      </Box>
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        open={isSignUpSuccess}
        // message={`successfully created a user \n please login to continue`}
        autoHideDuration={6000}
      >
        <Alert severity="success" sx={{ width: "100%" }}>
          {`successfully submitted for evaluation of vehicle.`}
        </Alert>
      </Snackbar>
    </Container>
  );
}
