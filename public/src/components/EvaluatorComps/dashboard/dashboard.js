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
import { CardActionArea } from "@mui/material";
import { useLocation, useNavigate, NavLink } from "react-router-dom";

import axios from "axios";
import { v4 as uuidv4 } from "uuid";
export default function BasicCard(props) {
  let [allUsedCars, setAllUsedCars] = useState([]);
  // let [usedCarCards, setUsedCarCards] = useState([]);
  // let [needReload, setNeedReload] = useState([]);
  useEffect(() => {
    document.title = props.title || "dashboard";
  }, [props.title]);
  useEffect(() => {
    async function runner() {
      let fetchedUsedCars = await axios
        .get("api/v1/evaluator/get-auc")
        .then((res) => {
          let fetchedUsedCars = res.data.data;
          // console.log(fetchedUsedCars);
          for (const usedCar of fetchedUsedCars) {
            usedCar.images = JSON.parse(usedCar.images);
          }
          setAllUsedCars(fetchedUsedCars);
          return fetchedUsedCars;
        });
    }
    runner();
  }, []);

  return (
    <Container component="main" height={"100%"} width={"70%"} maxWidth="90%">
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
          Evaluator Dashboard
          <br />
        </Typography>

        {allUsedCars.map((el) => {
          // console.log(el);
          return (
            <Card
              variant="outlined"
              sx={{
                minWidth: 275,
                width: "80%",
                marginTop: "5vh",
                marginBottom: "5vh",
              }}
              key={uuidv4()}
            >
              <CardActionArea>
                <CardContent>
                  <Typography gutterBottom variant="h3" component="div">
                    {el.carModel}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    location : {el.location}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    year : {el.year}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Fuel Type : {el.fuelType}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    kilometers : {el.kilometers}
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Button
                  component={NavLink}
                  to={`/eval-vehicle/${el.ucId}`}
                  variant="contained"
                  fullWidth
                  color="primary"
                  sx={{ mt: 0.5, mb: 4 }}
                >
                  Evaluate vehicle
                </Button>
              </CardActions>
            </Card>
          );
        })}
      </Box>
    </Container>
  );
}
