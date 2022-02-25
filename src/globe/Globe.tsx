import React, { useEffect } from "react";
import * as d3 from "d3";
import * as topojson from "topojson-client";
import "./Globe.scss";

interface Props {
  rotation: [number, number] | [number, number, number];
  size: number;
  data: any;
}

export const Globe = ({ rotation, size, data }: Props) => {
  // create globe
  let geoJson = topojson.feature(data, data.objects.countries);

  let projection = d3
    .geoOrthographic()
    .fitSize([size, size], geoJson)
    .rotate(rotation);

  let geoGenerator = d3.geoPath().projection(projection);
  let pathString = geoGenerator(geoJson) || undefined;

  // tests
  // var globe = {type: "Sphere"},

  const land = topojson.feature(data, data.objects.land);
  // @ts-ignore
  const countries = topojson.feature(data, data.objects.countries).features;
  const n = countries.length;
  const borders = topojson.mesh(data, data.objects.countries, function (a, b) {
    return a !== b;
  });
  let i = -1;

  // useEffect(() => {
  // transition();
  // }, []);

  // @ts-ignore
  // let context = d3.select(".globe")!.node()!.getContext("2d");
  let context = d3.select(".globe")!.node().getContext("2d");

  console.log(context);

  return (
    <>
      <svg className="globe" width={size} height={size}>
        <path d={pathString} />
      </svg>
    </>
  );
};
