import React, { useState, useEffect, ReactElement } from "react";
import { makeStyles } from "@material-ui/core/styles";
import BeerModal from "./BeerModal";
import BeersChart from "./BeersChart";
import BeersTable from "./BeersTable";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Beer } from "./types";
import api from "./api";

const useStyles = makeStyles(() => ({
  progress: { position: "absolute", top: "50%", left: "50%" },
}));

const limit = 25;

export default function BeersPage(): ReactElement {
  const classes = useStyles();
  const [beers, setBeers] = useState<Beer[]>([]);
  const [pageLoading, setPageLoading] = useState(false);
  const [beer, setBeer] = useState<Beer | undefined>();

  useEffect(() => {
    (async () => {
      setPageLoading(true);
      setBeers(await api.getBeers(0, limit));
      setPageLoading(false);
    })();
  }, []);

  return (
    <>
      {pageLoading ? (
        <CircularProgress className={classes.progress} />
      ) : (
        <>
          <BeersChart beers={beers} setBeer={setBeer} />
          <BeersTable
            beers={beers}
            setBeer={setBeer}
            setBeers={setBeers}
            limit={limit}
          />
          <BeerModal beer={beer} setBeer={setBeer}></BeerModal>
        </>
      )}
    </>
  );
}
