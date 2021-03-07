import * as React from "react";
import {
  Chart,
  BarSeries,
  Title,
  ArgumentAxis,
  ValueAxis,
} from "@devexpress/dx-react-chart-material-ui";

import {
  Animation,
  EventTracker,
  HoverState,
  TargetData,
} from "@devexpress/dx-react-chart";
import { ReactElement } from "react";
import { Beer } from "./types";

type Props = {
  beers: Beer[];
  setBeer: (beer: Beer) => void;
};

export default function BeersChart({ beers, setBeer }: Props): ReactElement {
  return (
    <Chart data={beers} rotated={true}>
      <Title text="Beers ABV" />
      <ArgumentAxis />
      <ValueAxis />
      <BarSeries valueField="abv" argumentField="name" />
      <Animation />
      <EventTracker
        onClick={(e: TargetData) => {
          const beer = beers[e.targets[0]?.point];
          setBeer(beer);
        }}
      />
      <HoverState />
    </Chart>
  );
}
