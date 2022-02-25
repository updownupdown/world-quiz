import React from "react";
import * as d3 from "d3";
import * as topojson from "topojson-client";
import { Globe } from "./globe/Globe";

function App() {
  const [data, setData] = React.useState<any>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    d3.json("./data/countries-110m.json").then((d) => {
      setData(d);
      setLoading(false);
    });
    return () => undefined;
  }, []);

  return (
    <div className="App">
      <header className="layout">
        {loading ? (
          <div>loading</div>
        ) : (
          <Globe data={data} rotation={[0, 0, 0]} size={600} />
        )}
      </header>
    </div>
  );
}

export default App;
