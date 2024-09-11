import NavBar from "../components/NavBar";
import { AgCharts } from "ag-charts-react";
import { useEffect, useState } from "react";
import {
  McvandMcp,
  timeslotConvert,
  Solargeneration,
} from "../constants/constants";
import "ag-charts-enterprise";
import axios from "axios";
const DashBoard = () => {
  const [solardata, setsolardata] = useState(Solargeneration);
  const [options, setOptions] = useState({
    zoom: {
      enabled: true,

      enableSelecting: true,
    },
    data: solardata,
    height: 600,

    series: [
      {
        type: "line",
        xKey: "timeslot",
        yKey: "Solargeneration",
        yName: "Solargeneration",
        interpolation: { type: "smooth" },
      },
    ],
    axes: [
      {
        type: "category",
        position: "bottom",
        keys: ["timeslot"],
        label: {
          rotation: 80,
          minSpacing: 10,
          formatter: (params) => {
            return timeslotConvert[params.value - 1];
          },
        },
      },

      {
        type: "number",
        position: "left",
        keys: ["Solargeneration"],
        title: {
          enabled: true,
          text: "Solar Production(kWh)",
        },
      },
    ],
  });
  const [options1, setOptions1] = useState({
    zoom: {
      enabled: true,
      rangeX: {
        start: "00:00-00:15",
        end: "02:00-02:15",
      },
      enableSelecting: true,
    },
    data: McvandMcp,
    height: 700,
    series: [
      {
        type: "line",
        xKey: "timeslot",
        yKey: "price",
        yName: "Price(in Rupee)",
      },
      {
        type: "line",
        xKey: "timeslot",
        yKey: "volume",
        yName: "Volume (kWh)",
      },
    ],
    axes: [
      {
        type: "category",
        position: "bottom",
        label: {
          rotation: 80,
          minSpacing: 10,

          formatter: (params) => {
            return timeslotConvert[params.value - 1];
          },
        },
      },
      {
        type: "number",
        position: "left",
        keys: ["volume"],
        title: {
          text: "Volume (kWh)",
        },
      },
      {
        type: "number",
        position: "right",
        keys: ["price"],
        title: {
          enabled: true,
          text: "Price(in Rupee)",
        },
      },
    ],
  });
  useEffect(() => {
    const reqHandler = async () => {
      const username = localStorage.getItem("username");
      const password = localStorage.getItem("password");

      try {
        const res = await axios.get(
          `${
            import.meta.env.VITE_BASE_BACKEND
          }/discom/aggregated/solarproduction`,
          {
            headers: {
              username: username,
              password: password,
            },
          }
        );
        setsolardata(res.data.message);
      } catch (err) {
        console.log(err);
      }
    };
    reqHandler();
  }, []);
  useEffect(() => {
    console.log(solardata);
    const optionscopy = { ...options };
    optionscopy.data = solardata;
    setOptions(optionscopy);
  }, [solardata]);
  return (
    <div>
      <NavBar></NavBar>
      <div class="flex justify-center p-4">
        <h2 class="text-4xl font-extrabold">Today's Solar Production</h2>
      </div>
      <div class="px-4">
        <AgCharts options={options}></AgCharts>
      </div>
      <div class="flex justify-center p-4">
        <h2 class="text-4xl font-extrabold">Today's Market Data</h2>
      </div>
      <div class="px-4">
        <AgCharts options={options1}></AgCharts>
      </div>
    </div>
  );
};
export default DashBoard;
