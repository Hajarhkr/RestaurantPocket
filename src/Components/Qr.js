import React, { useState, useRef } from "react";
import {
  Container,
  Card,
  CardContent,
  makeStyles,
  Grid,
  TextField,
  Button,
} from "@material-ui/core";
import QRCode from "qrcode";
import "./globale";

import NavigationBar from "./NavigationBar";

function Qr() {
  const [imageUrl, setImageUrl] = useState("");
  const classes = useStyles();

  const generateQrCode = async () => {
    try {
      const response = await QRCode.toDataURL(localStorage.getItem("myData").toString());
      setImageUrl(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <NavigationBar />
      <div>
        {" "}
        <br />
        <br />
        <br />
      </div>
      <Container className={classes.conatiner}>
        <Card>
          <h2 className={classes.title}>
            Générer et télécharger votre code Qr ICI{" "}
          </h2>
          <CardContent>
            <Grid container spacing={2}>
              <Grid>
                <Button
                  className={classes.btn}
                  variant="contained"
                  color="primary"
                  onClick={() => generateQrCode()}
                >
                  Obtenir
                </Button>
                <br />
                <br />
                <br />

                {imageUrl ? (
                  <a href={imageUrl} download>
                    <img
                      src={imageUrl}
                      alt="img"
                      style={{ marginLeft: "100%", width: "100%" }}
                    />
                  </a>
                ) : null}
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Container>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  conatiner: {
    width: "100%",
    height: "50%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  title: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#f7f6e7",
    color: "black",
    padding: 10,
  },
  btn: {
    marginTop: "20%",
    marginLeft: "100%",
    width: 200,
    padding: 25,
    alignItems: "center",
    background: "#c05812cc",
  },
}));
export default Qr;
