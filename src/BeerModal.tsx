import React, { ReactElement } from "react";
import Modal from "@material-ui/core/Modal";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import { Beer } from "./types";

const useStyles = makeStyles(() => ({
  modal: {
    width: "400px",
    height: "0",
    margin: "100px auto 0",
  },
  cardMedia: {
    backgroundSize: "contain",
    height: "100px",
  },
}));

type Props = {
  beer: Beer | undefined;
  setBeer: (beer: Beer | undefined) => void;
};

export default function BeerModal({ beer, setBeer }: Props): ReactElement {
  const classes = useStyles();

  return (
    <Modal
      open={!!beer}
      className={classes.modal}
      onClose={() => setBeer(undefined)}
    >
      <Card>
        <CardHeader
          title={beer?.name}
          subheader={`Brewed: ${beer?.first_brewed} | ${beer?.abv}`}
        />
        <CardHeader subheader={beer?.tagline} />
        {beer?.image_url ? (
          <CardMedia
            image={beer?.image_url}
            title={beer?.name}
            className={classes.cardMedia}
          />
        ) : null}
        <CardContent>
          {beer?.description}
          <br />
          <br />
          <strong>Tips:</strong> {beer?.brewers_tips}
        </CardContent>
      </Card>
    </Modal>
  );
}
