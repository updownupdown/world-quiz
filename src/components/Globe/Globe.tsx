import { memo, useState, useEffect } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Sphere,
} from "react-simple-maps";
import clsx from "clsx";
import { countryList } from "../../data/countryData";
import "./Globe.scss";
import { ZoomOut } from "../Icons/ZoomOut";
import { ZoomIn } from "../Icons/ZoomIn";

const geoUrl = process.env.PUBLIC_URL + "/data/world-110m.json";

const globeRadius = 300;

const zoom = {
  min: globeRadius / 2.2,
  max: globeRadius,
  default: globeRadius / 2.2,
};

interface GeoProps {
  geometry: any;
  properties: {
    ABBREV?: string;
    CONTINENT?: string;
    FORMAL_EN?: string;
    GDP_MD_EST?: number;
    GDP_YEAR?: number;
    ISO_A2: string;
    ISO_A3: string;
    NAME: string;
    NAME_LONG?: string;
    POP_EST?: number;
    POP_RANK?: number;
    POP_YEAR?: number;
    REGION_UN?: string;
    SUBREGION?: string;
  };
  rsmKey: string;
  svgPath: any;
  type: string;
}

interface Props {
  guessedCountries: string[];
  setGuessedCountries: (countries: string[]) => void;
  focusOnCountry: string;
  setFocusOnCountry: (country: string) => void;
  selectedCountry: string;
  setSelectedCountry: (country: string) => void;
  allowSelection: boolean;
  allowHover: boolean;
}

const Globe = ({
  guessedCountries,
  setGuessedCountries,
  focusOnCountry,
  setFocusOnCountry,
  selectedCountry,
  setSelectedCountry,
  allowSelection,
  allowHover,
}: Props) => {
  const [rotation, setRotation] = useState<[number, number, number]>([0, 0, 0]);
  const [scale, setScale] = useState(zoom.default);

  const [isDragging, setIsDragging] = useState(false);
  const [mouseOnDown, setMouseOnDown] = useState({ x: 0, y: 0 });
  const [targetOnDown, setTargetOnDown] = useState({ x: 0, y: 0 });

  function rotateToCountry(targetCountry: string) {
    const latLon = countryList.filter(
      (country) => country.code === targetCountry
    )[0].latLon;

    setRotation([-latLon[1], -latLon[0], 0]);
  }

  function selectCountry(country: string) {
    setGuessedCountries([country]);
  }

  function zoomGlobe(zoomIn: boolean) {
    const zoomFactor = 50;
    let newScale = zoomIn ? scale + zoomFactor : scale - zoomFactor;

    if (newScale < zoom.min) newScale = zoom.min;
    if (newScale > zoom.max) newScale = zoom.max;

    setScale(newScale);
  }

  useEffect(() => {
    if (focusOnCountry) {
      rotateToCountry(focusOnCountry);
      setFocusOnCountry("");
    }
  }, [focusOnCountry, setFocusOnCountry]);

  return (
    <>
      <div
        className={clsx(
          "globe",
          isDragging && "globe--dragging",
          allowHover && "globe--hoverable"
        )}
      >
        <div
          className="sphere-glow"
          style={{ width: `${scale * 4}px`, height: `${scale * 4}px` }}
        />

        <div className="zoom-buttons">
          <button
            className="button--icon"
            onClick={() => zoomGlobe(false)}
            disabled={scale === zoom.min}
          >
            <ZoomOut />
          </button>
          <button
            className="button--icon"
            onClick={() => zoomGlobe(true)}
            disabled={scale === zoom.max}
          >
            <ZoomIn />
          </button>
        </div>

        <ComposableMap
          data-tip=""
          width={globeRadius}
          height={globeRadius}
          projection={"geoOrthographic"}
          projectionConfig={{ scale: scale, rotate: rotation }}
          onMouseDown={(event) => {
            setMouseOnDown({
              x: event.clientX - window.innerWidth / 2,
              y: event.clientY - window.innerHeight / 2,
            });
            setTargetOnDown({
              x: rotation[0],
              y: rotation[1],
            });

            setIsDragging(true);
          }}
          onMouseMove={(event) => {
            if (isDragging) {
              const mouse = {
                x: event.clientX - window.innerWidth / 2,
                y: event.clientY - window.innerHeight / 2,
              };
              setRotation([
                targetOnDown.x +
                  (mouse.x - mouseOnDown.x) * 0.2 * (500 / scale),
                targetOnDown.y +
                  (mouse.y - mouseOnDown.y) * -0.2 * (500 / scale),
                0,
              ]);
            }
          }}
          onMouseUp={() => {
            setIsDragging(false);
          }}
          onMouseLeave={() => {
            setIsDragging(false);
          }}
        >
          <Sphere
            id="sphere"
            fill="var(--globe-sea)"
            stroke="var(--globe-outline)"
            strokeWidth={0}
          />

          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map((geo: GeoProps) => {
                const isSelected = guessedCountries.includes(
                  geo.properties.ISO_A2
                );

                return (
                  <Geography
                    className={clsx(
                      "path-country",
                      isSelected && "path-country--selected"
                    )}
                    key={geo.rsmKey}
                    geography={geo}
                    onMouseDown={() => {
                      if (allowSelection) {
                        const clickedCountry = geo.properties.ISO_A2;
                        rotateToCountry(clickedCountry);
                        selectCountry(clickedCountry);
                        setSelectedCountry(clickedCountry);
                      }
                    }}
                  />
                );
              })
            }
          </Geographies>
        </ComposableMap>
      </div>
    </>
  );
};

export default memo(Globe);