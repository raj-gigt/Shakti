import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { AgCharts } from "ag-charts-react";
import { yesterdayPlatformOptions } from "../constants/constants";
import "ag-charts-enterprise";

const YesterdayGraph = () => {
  const [options, setOptions] = useState(yesterdayPlatformOptions);
  const [data, setData] = useState(null);
  useEffect(() => {
    const reqHandler = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BASE_BACKEND}/getTransactions`,
          {
            headers: {
              Authorization: `${localStorage.getItem("token")}`,
            },
          }
        );
        const data = res.data.transactions;
        console.log(data);
        setData(data);
      } catch (err) {
        console.log(err);
      }
    };
    reqHandler();
  }, []);

  useEffect(() => {
    if (data) {
      let optionscopy = { ...options };
      optionscopy.data = data;

      setOptions(optionscopy);
    }
  }, [data]);

  return <AgCharts options={options} />;
};

export default YesterdayGraph;
