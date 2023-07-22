import React, {useEffect, useState} from "react";
import {Bars} from "../components/index.js";
import {getWeatherData} from "../utils/queries/Weather.js";
const Main = () => {
  const dimensions = {
    height: 600,
    width: 800
  };
  const [data, setData] = useState([]);
  const [count, setCount] = useState(0);
  const weatherData = getWeatherData(45.43, -122.77, ["current", "hourly", "daily", "alerts"]).hourly;
  useEffect(() => {
    if (typeof weatherData !== "undefined")
      setData(() => weatherData.map((d) => ({
        dt: new Date(d.dt),
        humidity: d.humidity
      })));
  }, [weatherData]);
  return /* @__PURE__ */ React.createElement("div", {
    className: "App"
  }, /* @__PURE__ */ React.createElement("header", {
    className: "App-header"
  }, /* @__PURE__ */ React.createElement(Bars, {
    data,
    dimensions
  })));
};
export default Main;
